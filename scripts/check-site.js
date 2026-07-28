#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const data = JSON.parse(fs.readFileSync(path.join(root, "data/profile.json"), "utf8"));
const pages = [
  { file: "fr/index.html", lang: "fr", type: "home" },
  { file: "en/index.html", lang: "en", type: "home" },
  { file: "fr/cv/index.html", lang: "fr", type: "cv" },
  { file: "en/cv/index.html", lang: "en", type: "cv" },
  { file: "fr/sonomundi/index.html", lang: "fr", type: "heavents" },
  { file: "en/sonomundi/index.html", lang: "en", type: "heavents" },
];

const failures = [];
const checkedTargets = new Set();

function check(condition, message) {
  if (!condition) failures.push(message);
}

function count(source, pattern) {
  return [...source.matchAll(pattern)].length;
}

function textContent(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:nbsp|amp|quot|#039);/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extract(html, pattern) {
  return html.match(pattern)?.[1] || "";
}

function localTarget(pageFile, rawUrl) {
  const cleanUrl = rawUrl.split("#")[0].split("?")[0];
  if (!cleanUrl) return null;
  let decoded;
  try {
    decoded = decodeURIComponent(cleanUrl);
  } catch {
    failures.push(`${pageFile}: invalid URL encoding in ${rawUrl}`);
    return null;
  }

  let target;
  if (decoded.startsWith("/")) {
    target = path.join(root, decoded.slice(1));
  } else {
    target = path.resolve(path.dirname(path.join(root, pageFile)), decoded);
  }
  if (decoded.endsWith("/")) target = path.join(target, "index.html");
  return target;
}

function validateLocalReference(pageFile, html, rawUrl) {
  if (/^(?:https?:|mailto:|tel:|data:)/i.test(rawUrl)) return;
  const target = localTarget(pageFile, rawUrl);
  if (!target) {
    if (rawUrl.startsWith("#")) {
      const id = rawUrl.slice(1);
      check(html.includes(`id="${id}"`), `${pageFile}: missing anchor target ${rawUrl}`);
    }
    return;
  }

  const relativeTarget = path.relative(root, target);
  check(!relativeTarget.startsWith(".."), `${pageFile}: reference escapes repository: ${rawUrl}`);
  check(fs.existsSync(target), `${pageFile}: missing local target ${rawUrl} (${relativeTarget})`);
  checkedTargets.add(relativeTarget);

  const anchor = rawUrl.includes("#") ? rawUrl.split("#")[1] : "";
  if (anchor && fs.existsSync(target) && target.endsWith(".html")) {
    const targetHtml = fs.readFileSync(target, "utf8");
    check(targetHtml.includes(`id="${anchor}"`), `${pageFile}: missing anchor ${anchor} in ${relativeTarget}`);
  }
}

const titles = new Set();
const descriptions = new Set();
const canonicals = new Set();

for (const page of pages) {
  const fullPath = path.join(root, page.file);
  check(fs.existsSync(fullPath), `${page.file}: route is missing`);
  if (!fs.existsSync(fullPath)) continue;
  const html = fs.readFileSync(fullPath, "utf8");
  const main = extract(html, /<main\b[^>]*>([\s\S]*?)<\/main>/i);

  check(html.startsWith("<!DOCTYPE html>"), `${page.file}: missing HTML5 doctype`);
  check(new RegExp(`<html lang="${page.lang}"`).test(html), `${page.file}: incorrect html lang`);
  check(count(html, /<main\b/gi) === 1, `${page.file}: expected exactly one main element`);
  check(count(main, /<h1\b/gi) === 1, `${page.file}: expected exactly one h1 in main`);
  check(!html.includes("data-lang-page"), `${page.file}: contains legacy hidden-language markup`);
  check(!/<meta\s+name="keywords"/i.test(html), `${page.file}: meta keywords must not be present`);
  check(/<a class="skip-link" href="#contenu">/.test(html), `${page.file}: missing skip link`);
  check(/<link rel="canonical" href="https?:\/\//.test(html), `${page.file}: missing absolute canonical`);
  check(count(html, /hreflang="fr"/g) >= 1, `${page.file}: missing French hreflang links`);
  check(count(html, /hreflang="en"/g) >= 1, `${page.file}: missing English hreflang links`);
  check(/<meta property="og:title"/.test(html), `${page.file}: missing Open Graph title`);
  check(/<meta name="twitter:card" content="summary_large_image">/.test(html), `${page.file}: missing Twitter Card`);
  check(/<script type="application\/ld\+json">/.test(html), `${page.file}: missing structured data`);
  const footerHtml = extract(html, /(<footer\b[\s\S]*?<\/footer>)/i);
  check(!/(?:CV complet|Full resume|axxon\.github\.io\/)/i.test(footerHtml), `${page.file}: redundant portfolio link remains in footer`);
  check(!/(?:111\s+(?:tests\s+PHPUnit|PHPUnit\s+tests)|1[\s,.]241\s+assertions)/i.test(textContent(html)), `${page.file}: stale targeted PHPUnit metric remains`);

  const title = extract(html, /<title>([^<]+)<\/title>/i);
  const description = extract(html, /<meta name="description" content="([^"]+)"/i);
  const canonical = extract(html, /<link rel="canonical" href="([^"]+)"/i);
  check(title.length > 20 && title.length < 80, `${page.file}: title length is not useful (${title.length})`);
  check(description.length > 70 && description.length < 180, `${page.file}: meta description length is not useful (${description.length})`);
  check(!titles.has(title), `${page.file}: duplicate title`);
  check(!descriptions.has(description), `${page.file}: duplicate meta description`);
  check(!canonicals.has(canonical), `${page.file}: duplicate canonical`);
  titles.add(title);
  descriptions.add(description);
  canonicals.add(canonical);

  for (const script of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const structured = JSON.parse(script[1]);
      check(structured["@type"] === "Person", `${page.file}: structured data is not a Person`);
      check(structured.name === data.identity.name, `${page.file}: structured name differs from shared data`);
    } catch (error) {
      failures.push(`${page.file}: invalid JSON-LD (${error.message})`);
    }
  }

  for (const image of html.matchAll(/<img\b[^>]*>/gi)) {
    check(/\bwidth="\d+"/.test(image[0]), `${page.file}: image missing explicit width`);
    check(/\bheight="\d+"/.test(image[0]), `${page.file}: image missing explicit height`);
    check(/\balt="[^"]*"/.test(image[0]), `${page.file}: image missing alt attribute`);
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/gi)) {
    validateLocalReference(page.file, html, match[1]);
  }

  for (const anchor of html.matchAll(/<a\b[^>]*\bhref="https?:\/\/[^"]+"[^>]*>/gi)) {
    check(/\btarget="_blank"/i.test(anchor[0]), `${page.file}: external link does not open in a new tab`);
    check(/\brel="[^"]*\bnoopener\b[^"]*"/i.test(anchor[0]), `${page.file}: external link is missing noopener`);
    check(/\brel="[^"]*\bnoreferrer\b[^"]*"/i.test(anchor[0]), `${page.file}: external link is missing noreferrer`);
  }

  const headingLevels = [...main.matchAll(/<h([1-3])\b/gi)].map((match) => Number(match[1]));
  for (let index = 1; index < headingLevels.length; index += 1) {
    check(headingLevels[index] <= headingLevels[index - 1] + 1, `${page.file}: heading level skipped near heading ${index + 1}`);
  }

  if (page.lang === "fr") {
    check(!/(?:Download the resume|Core skills|Professional experience|Project status)/i.test(textContent(main)), `${page.file}: English editorial copy found in French main content`);
  } else {
    check(!/(?:Télécharger le CV|Compétences principales|Expérience professionnelle|État du projet|revue de code)/i.test(textContent(main)), `${page.file}: French editorial copy found in English main content`);
  }

  if (page.type === "home") {
    const wordCount = textContent(main).split(/\s+/).filter(Boolean).length;
    check(wordCount >= 500 && wordCount <= 1005, `${page.file}: home content has ${wordCount} words; expected 500–1005`);
    check(count(html, /id="heavents"/g) === 1, `${page.file}: Sonomundi summary must appear once`);
    check(!/(?:Disponible à l'écoute|Open to opportunities)/i.test(main), `${page.file}: unconfirmed availability is displayed`);
  }

  if (page.type === "cv") {
    const cvText = textContent(main);
    check(/Franprix/.test(cvText), `${page.file}: canonical Norsys client Franprix missing`);
    check(!/Monoprix/.test(cvText), `${page.file}: incorrect Norsys client Monoprix found`);
    check(!/référent technique de fait pour (?:trois|3) développeurs|de facto technical referent for (?:three|3) developers/i.test(cvText), `${page.file}: overstated Norsys responsibility found`);
    check(!/no-excuse/i.test(cvText), `${page.file}: no-excuse must not appear on a CV page`);
    check(!/Recherche d’emploi instrumentée|Instrumented job search|844 offres|844 consolidated roles/i.test(cvText), `${page.file}: instrumented job-search metrics must not appear on a CV page`);
    check(/href="https:\/\/activcompany\.com\/"[^>]*>Activ’Company<\/a>/.test(main), `${page.file}: Activ’Company link missing`);
  }

  if (page.type === "heavents") {
    check(count(main, /class="demo-access-note"/g) === 2, `${page.file}: demo account guidance must appear beside both demo calls to action`);
    check(textContent(main).includes(data.content[page.lang].case.demoHint), `${page.file}: demo account guidance differs from shared data`);
  }
}

const visibleHomeSkillCount = data.skills.reduce((total, group) => total + group.home.fr.length, 0);
check(visibleHomeSkillCount <= 20, `Shared data: ${visibleHomeSkillCount} skills shown on home; expected at most 20`);
const architectureSkills = data.skills.find((group) => group.id === "architecture");
check(architectureSkills?.home.fr.includes("Orchestration d’agents"), "French home: agent orchestration skill missing");
check(architectureSkills?.home.en.includes("Agent orchestration"), "English home: agent orchestration skill missing");
check(data.timeline.lastSalariedRoleEnded === "2024-06", "Shared data: unexpected end date for Evina");
check(data.timeline.heaventsStarted === "2025-12", "Shared data: unexpected Sonomundi start date");
check(data.timeline.studiStarted === "2024-07", "Shared data: unexpected Studi start date");
check(data.timeline.noExcuseCreated === "2026-07", "Shared data: unexpected no-excuse creation date");
check(data.timeline.availabilityConfirmed === false, "Shared data: availability must remain unconfirmed");
check(data.timeline.heaventsOutsideWorkConfirmed === true, "Shared data: Sonomundi/employment compatibility must remain confirmed");
const experiencesById = Object.fromEntries(data.experiences.map((experience) => [experience.id, experience]));
check(experiencesById.evina?.started === "2022-06" && experiencesById.evina?.ended === "2024-06", "Shared data: unexpected Evina dates");
check(experiencesById.evina?.role?.fr === "Développeur back-end senior", "Shared data: Evina senior title missing");
check(experiencesById.sapiendo?.started === "2021-02" && experiencesById.sapiendo?.ended === "2022-05", "Shared data: unexpected Sapiendo dates");
check(
  experiencesById.sapiendo?.employmentType?.fr === "CDI puis freelance"
    && experiencesById.sapiendo?.employmentType?.en === "Permanent contract, then freelance",
  "Shared data: Sapiendo must record the permanent-contract then freelance sequence",
);
check(experiencesById.blachere?.started === "2020-12" && experiencesById.blachere?.ended === "2021-01" && experiencesById.blachere?.durationMonths === 2, "Shared data: Groupe Blachère must be recorded as a two-month engagement");
check(experiencesById.sensiolabs?.started === "2018-04" && experiencesById.sensiolabs?.ended === "2018-09" && experiencesById.sensiolabs?.durationMonths === 6, "Shared data: unexpected SensioLabs dates");
check(experiencesById.norsys?.started === "2016" && experiencesById.norsys?.ended === "2018", "Shared data: unexpected Norsys dates");
check(
  experiencesById.norsys?.detail?.fr.some((item) => /Franprix/.test(item))
    && !experiencesById.norsys?.detail?.fr.some((item) => /Monoprix|référent technique de fait/i.test(item)),
  "Shared data: Norsys client or responsibility wording differs from canonical record",
);
const otherExperiencesByCompany = Object.fromEntries(data.otherExperiences.map((experience) => [experience.company, experience]));
const activCompanyExperience = data.otherExperiences.find((experience) => /Activ/.test(experience.company));
check(activCompanyExperience?.started === "2013-12" && activCompanyExperience?.ended === "2015-01" && activCompanyExperience?.durationMonths === 14, "Shared data: unexpected Activ’Company dates");
check(activCompanyExperience?.url === "https://activcompany.com/", "Shared data: Activ’Company link missing");
check(
  /Sur site/.test(activCompanyExperience?.dates?.fr ?? "")
    && /On-site/.test(activCompanyExperience?.dates?.en ?? ""),
  "Shared data: Activ’Company must be recorded as on-site",
);
check(
  otherExperiencesByCompany.YouMiam?.started === "2013-12"
    && otherExperiencesByCompany.YouMiam?.durationMonths === 1
    && /Décembre 2013/.test(otherExperiencesByCompany.YouMiam?.dates?.fr || ""),
  "Shared data: unexpected YouMiam chronology",
);
check(!/\d{4}/.test(otherExperiencesByCompany["E-testing"]?.dates?.fr || ""), "Shared data: E-testing date must remain undocumented");
check(!/\d{4}/.test(otherExperiencesByCompany.Indexx?.dates?.fr || ""), "Shared data: Indexx date must remain undocumented");
const noExcuseProject = data.projects.find((project) => /no-excuse/i.test(project.title.en));
check(noExcuseProject?.created === "2026-07", "Shared data: unexpected no-excuse project date");
check(noExcuseProject?.showOnCv === false, "Shared data: no-excuse must be excluded from CV pages");
const instrumentedJobSearch = data.projects.find((project) => /Instrumented job search/i.test(project.title.en));
check(instrumentedJobSearch?.showOnCv === false, "Shared data: instrumented job search must be excluded from CV pages");
check(/licenciement économique/i.test(experiencesById.evina?.endReason?.fr || ""), "Shared data: Evina economic-redundancy end reason missing");
check(data.metrics.heavents.phpunitInventoryDate === "2026-07-16", "Shared data: stale Sonomundi PHPUnit inventory date");
check(data.metrics.heavents.phpunitDeclaredTests === 2189, "Shared data: stale Sonomundi declared PHPUnit count");
check(data.metrics.heavents.phpunitTestFiles === 401, "Shared data: stale Sonomundi PHPUnit file count");
check(data.metrics.heavents.phpunitNamedMethods === 1687, "Shared data: stale Sonomundi named PHPUnit method count");
check(data.metrics.heavents.phpunitAttributedMethods === 502, "Shared data: stale Sonomundi attributed PHPUnit method count");
check(data.metrics.heavents.phpunitInventoryScope === "gitea/main-static-inventory", "Shared data: Sonomundi PHPUnit inventory scope must remain explicit");
check(data.metrics.heavents.commits === 3320, "Shared data: stale Sonomundi commit count");
const studiTraining = data.education.find((item) => /Studi/i.test(`${item.school.fr} ${item.school.en}`));
check(Boolean(studiTraining), "Shared data: Studi event training missing");
check(studiTraining?.started === "2024-07", "Shared data: Studi training must start in July 2024");
check(studiTraining?.year?.fr === "Juillet 2024–2025" && studiTraining?.year?.en === "July 2024–2025", "Shared data: Studi display period differs from canonical CV");
check(studiTraining?.completed === false, "Shared data: Studi training must not be presented as completed");
check(studiTraining?.hoursAttested === 1000, "Shared data: unexpected Studi attested hours");
check(data.content.fr.sections.heavents.points.some((point) => /hors temps de travail/i.test(point)), "French home: Sonomundi/employment compatibility message missing");
check(data.content.en.sections.heavents.points.some((point) => /outside working hours/i.test(point)), "English home: Sonomundi/employment compatibility message missing");

const canonicalTimelineSources = new Set(["cv-short.md", "cv-short-en.md", "cv-final.md", "cv-final-en.md", "cv-ats.md", "cv-ats-en.md"]);
for (const source of canonicalTimelineSources) {
  const markdown = fs.readFileSync(path.join(root, source), "utf8");
  check(markdown.includes("https://axxon.github.io/"), `${source}: complete CV URL missing`);
  check(/side project|projet parallèle/i.test(markdown), `${source}: Sonomundi side-project positioning missing`);
  check(/Senior Software Engineer/i.test(markdown), `${source}: canonical software-engineering title missing`);
  check(/agentique|agentic/i.test(markdown), `${source}: agentic-development positioning missing`);
  check(/Franprix/.test(markdown) && !/Monoprix/.test(markdown), `${source}: Norsys client must be Franprix, not Monoprix`);
  check(/validation\s+humaine|décision\s+humaine|human\s+validation|human\s+decisions?|intégration\s+finale\s+humaine|final\s+human\s+integration/i.test(markdown), `${source}: human-control wording missing`);
  check(!/\([1-9][0-9]{0,2}\)/.test(markdown), `${source}: parenthesized numbered reference found`);
  if (canonicalTimelineSources.has(source)) {
    check(!/Groupe Blach(?:è|e)re[^\n]*(?:2020\s*[-–]\s*2021)(?![^\n]*1 (?:mois|month))/i.test(markdown), `${source}: Groupe Blachère duration is ambiguous or overstated`);
    check(!/Norsys[^\n]*2013\s*[-–]\s*2018|2013\s*[-–]\s*2018[^\n]*Norsys/i.test(markdown), `${source}: incorrect Norsys 2013–2018 range found`);
  }
  check(!/démarche\s+entrepreneuriale|entrepreneurial\s+initiative/i.test(markdown), `${source}: stale entrepreneurial positioning found`);
  check(!/autorisation\s+de\s+travail|eu\s+work\s+authorization|authorized\s+to\s+work|work\s+permit|permis\s+de\s+travail|droit\s+de\s+travailler|right\s+to\s+work|work\s+eligib|citoyennet|citizenship/i.test(markdown), `${source}: forbidden work-authorization wording found`);

  const renderedHtml = fs.readFileSync(path.join(root, "dist", source.replace(/\.md$/, ".html")), "utf8");
  for (const anchor of renderedHtml.matchAll(/<a\b[^>]*\bhref="https?:\/\/[^"]+"[^>]*>/gi)) {
    check(/\btarget="_blank"/i.test(anchor[0]), `${source}: rendered external link does not request a new tab`);
    check(/\brel="[^"]*\bnoopener\b[^"]*"/i.test(anchor[0]), `${source}: rendered external link is missing noopener`);
    check(/\brel="[^"]*\bnoreferrer\b[^"]*"/i.test(anchor[0]), `${source}: rendered external link is missing noreferrer`);
  }
}

if (failures.length > 0) {
  console.error(`Site checks failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Site checks passed: ${pages.length} localized pages, ${checkedTargets.size} local targets, ${visibleHomeSkillCount} home skills.`);
