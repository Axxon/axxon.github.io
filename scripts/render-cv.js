#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const profile = JSON.parse(fs.readFileSync(path.resolve(root, "data/profile.json"), "utf8"));
const completeCvUrl = profile.identity.website;
const source = path.resolve(root, process.argv[2] || "cv-short.md");
const outDir = path.resolve(root, "dist");
const baseName = path.basename(source, path.extname(source));
const htmlOut = path.resolve(outDir, `${baseName}.html`);
const compatibilityPdfOut = path.resolve(outDir, `${baseName}.pdf`);
const pdfOut = path.resolve(outDir, recruiterPdfName(baseName));

function recruiterPdfName(value) {
  const english = value.startsWith("cv-en-") || value.endsWith("-en");
  const officialNames = {
    "cv-short": "Sebastien-Grans-CV.pdf",
    "cv-short-en": "Sebastien-Grans-CV-EN.pdf",
    "cv-final": "Sebastien-Grans-CV-detaille.pdf",
    "cv-final-en": "Sebastien-Grans-CV-detailed-EN.pdf",
    "cv-ats": "Sebastien-Grans-CV-ATS.pdf",
    "cv-ats-en": "Sebastien-Grans-CV-ATS-EN.pdf",
    "cv-pole-emploi": "Sebastien-Grans-CV-France-Travail.pdf",
  };
  if (officialNames[value]) {
    return officialNames[value];
  }
  if (value.includes("neobrain")) {
    return `Sebastien-Grans-CV-NEOBRAIN${english ? "-EN" : ""}.pdf`;
  }
  const identifier = value
    .replace(/^cv-en-/, "")
    .replace(/^cv-/, "")
    .replace(/-en$/, "");
  return `Sebastien-Grans-CV-${identifier || "general"}${english ? "-EN" : ""}.pdf`;
}

if (!path.basename(pdfOut).startsWith("Sebastien-Grans-CV")) {
  throw new Error(`Invalid recruiter PDF name: ${path.basename(pdfOut)}`);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function inlineMarkdown(value) {
  let html = escapeHtml(value);
  const links = [];
  function stashLink(match, label, href) {
    const token = `@@LINK_${links.length}@@`;
    links.push(`<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`);
    return token;
  }

  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(
    /\[([^\]]+)]\((#[^)]+)\)/g,
    '<a href="$2">$1</a>',
  );
  html = html.replace(
    /\[([^\]]+)]\(((?:https?:\/\/|mailto:|tel:)[^)]+)\)/g,
    stashLink,
  );
  html = html.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>',
  );
  links.forEach((link, index) => {
    html = html.replace(`@@LINK_${index}@@`, link);
  });
  return html;
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function sectionClass(title) {
  const slug = slugify(title);
  if (slug.includes("profil")) {
    return "section section-profile";
  }
  if (slug.includes("competences-cles") || slug.includes("key-skills")) {
    return "section section-skills section-sidebar";
  }
  if (slug === "competences" || slug === "skills" || slug.includes("technical-skills")) {
    return "section section-skills";
  }
  if (slug.includes("projet-personnel") || slug.includes("side-project")) {
    return "section section-project";
  }
  if (slug.includes("formation")) {
    return "section section-other section-sidebar";
  }
  if (slug.includes("education")) {
    return "section section-other section-sidebar";
  }
  if (slug.includes("informations-complementaires") || slug.includes("additional-information")) {
    return "section section-other section-sidebar";
  }
  if (slug.includes("experience")) {
    return "section section-experience";
  }
  return "section";
}

function ensureCvHeader(markdown) {
  const lines = markdown.split(/\r?\n/);
  const headerEnd = lines.findIndex((line, index) =>
    index > 0 && (line.trim() === "---" || line.startsWith("## "))
  );
  let end = headerEnd === -1 ? lines.length : headerEnd;
  let header = lines.slice(0, end).join("\n");

  const identityValues = [profile.identity.name, profile.identity.email, profile.identity.github, profile.identity.linkedin];
  if (identityValues.some((value) => !header.includes(value))) {
    const contactLine = `${profile.identity.name} · [${profile.identity.email}](mailto:${profile.identity.email}) · [GitHub](${profile.identity.github}) · [LinkedIn](${profile.identity.linkedin})`;
    const titleLine = lines.findIndex((line, index) => index < end && line.startsWith("# "));
    lines.splice(titleLine === -1 ? 0 : titleLine + 1, 0, "", contactLine);
    end += 2;
    header = lines.slice(0, end).join("\n");
  }

  if (header.includes(completeCvUrl)) {
    return lines.join("\n");
  }

  const targetLine = lines.findIndex((line, index) =>
    index < end && /^(Poste visé|Cible|Objectif|Mission visée|Target role)\s*:/i.test(line.trim())
  );
  const insertAt = targetLine === -1 ? end : targetLine;
  lines.splice(insertAt, 0, `CV complet : ${completeCvUrl}`);
  return lines.join("\n");
}

function validateCvSource(markdown) {
  const forbiddenWorkAuthorization = /autorisation\s+de\s+travail|eu\s+work\s+authorization|authorized\s+to\s+work|work\s+permit|permis\s+de\s+travail|droit\s+de\s+travailler|right\s+to\s+work|work\s+eligib|citoyennet|citizenship/i;
  if (forbiddenWorkAuthorization.test(markdown)) {
    throw new Error(`Forbidden work-authorization wording found in ${path.relative(root, source)}`);
  }

  const normalized = ensureCvHeader(markdown);
  const lines = normalized.split(/\r?\n/);
  const headerEnd = lines.findIndex((line, index) =>
    index > 0 && (line.trim() === "---" || line.startsWith("## "))
  );
  const header = lines.slice(0, headerEnd === -1 ? lines.length : headerEnd).join("\n");
  if (!header.includes(completeCvUrl)) {
    throw new Error(`Complete CV URL missing from header in ${path.relative(root, source)}`);
  }

  for (const required of [profile.identity.name, profile.identity.email, profile.identity.github, profile.identity.linkedin]) {
    if (!header.includes(required)) {
      throw new Error(`Shared identity value missing from header in ${path.relative(root, source)}: ${required}`);
    }
  }

  if (/\([1-9][0-9]{0,2}\)/.test(normalized)) {
    throw new Error(`Parenthesized numbered reference found in ${path.relative(root, source)}`);
  }

  const officialSources = new Set(["cv-short", "cv-short-en", "cv-final", "cv-final-en", "cv-ats", "cv-ats-en"]);
  if (officialSources.has(baseName)) {
    const english = baseName.endsWith("-en");
    const evinaDates = english ? /June 2022\s*[-–]\s*June 2024/i : /Juin 2022\s*[-–]\s*Juin 2024/i;
    const heaventsStart = english ? /December 2025/i : /décembre 2025/i;
    const canonicalExperienceDates = english
      ? [
          ["Sapiendo", /February 2021\s*[-–]\s*May 2022/i],
          ["Groupe Blachere", /(?:December|Dec\.) 2020\s*[-–]\s*(?:January|Jan\.) 2021[^\n]*2 months/i],
          ["SensioLabs", /(?:April|Apr\.)\s*[-–]\s*(?:September|Sep\.) 2018[^\n]*6 months/i],
          ["Norsys", /2016\s*[-–]\s*2018/i],
          ["Activ’Company", /(?:December|Dec\.) 2013\s*[-–]\s*(?:January|Jan\.) 2015[^\n]*1 year 2 months/i],
          ["Studi", /July 2024/i],
          ["Evina end reason", /redundancy/i],
        ]
      : [
          ["Sapiendo", /Février 2021\s*[-–]\s*Mai 2022/i],
          ["Groupe Blachère", /(?:Décembre|déc\.) 2020\s*[-–]\s*(?:Janvier|janv\.) 2021[^\n]*2 mois/i],
          ["SensioLabs", /(?:Avril|avr\.)\s*[-–]\s*(?:Septembre|sept\.) 2018[^\n]*6 mois/i],
          ["Norsys", /2016\s*[-–]\s*2018/i],
          ["Activ’Company", /(?:Décembre|déc\.) 2013\s*[-–]\s*(?:Janvier|janv\.) 2015[^\n]*1 an 2 mois/i],
          ["Studi", /Juillet 2024/i],
          ["Motif de fin Evina", /licenciement économique/i],
        ];
    if (!evinaDates.test(normalized) || profile.timeline.lastSalariedRoleEnded !== "2024-06") {
      throw new Error(`Evina dates differ from shared data in ${path.relative(root, source)}`);
    }
    if (!heaventsStart.test(normalized) || profile.timeline.heaventsStarted !== "2025-12") {
      throw new Error(`Sonomundi start date differs from shared data in ${path.relative(root, source)}`);
    }
    for (const [label, pattern] of canonicalExperienceDates) {
      if (!pattern.test(normalized)) {
        throw new Error(`${label} dates differ from canonical chronology in ${path.relative(root, source)}`);
      }
    }
    if (/2013\s*[-–]\s*2018/.test(normalized)) {
      throw new Error(`Incorrect Norsys 2013–2018 date range found in ${path.relative(root, source)}`);
    }
  }
  return normalized;
}

function renderMarkdown(markdown, lang) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let inList = false;
  let inTitle = false;
  let inSection = false;
  let inEntry = false;

  function closeList() {
    if (inList) {
      html.push("</ul>");
      inList = false;
    }
  }

  function closeTitleIfNeeded(nextIsTitleLine) {
    if (inTitle && !nextIsTitleLine) {
      html.push("</header>");
      inTitle = false;
    }
  }

  function closeSection() {
    closeList();
    closeEntry();
    if (inSection) {
      html.push("</section>");
      inSection = false;
    }
  }

  function closeEntry() {
    closeList();
    if (inEntry) {
      html.push("</article>");
      inEntry = false;
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      closeList();
      continue;
    }

    if (trimmed === "---") {
      closeList();
      closeEntry();
      closeTitleIfNeeded(false);
      html.push("<hr>");
      continue;
    }

    if (trimmed.startsWith("# ")) {
      closeSection();
      closeTitleIfNeeded(false);
      inTitle = true;
      html.push('<header class="cv-title">');
      html.push(`<h1>${inlineMarkdown(trimmed.slice(2))}</h1>`);
      html.push(`<img class="cv-profile-photo" src="../profil-linkedin.jpeg" alt="${lang === "en" ? "Profile photo of Sebastien Grans" : "Photo de profil de Sébastien Grans"}">`);
      continue;
    }

    if (trimmed.startsWith("## ")) {
      closeSection();
      closeTitleIfNeeded(false);
      const title = trimmed.slice(3);
      const id = slugify(title);
      html.push(`<section class="${sectionClass(title)}" id="${id}">`);
      inSection = true;
      html.push(`<h2>${inlineMarkdown(title)}</h2>`);
      continue;
    }

    if (trimmed.startsWith("### ")) {
      closeList();
      closeEntry();
      closeTitleIfNeeded(false);
      html.push('<article class="entry">');
      inEntry = true;
      html.push(`<h3>${inlineMarkdown(trimmed.slice(4))}</h3>`);
      continue;
    }

    if (trimmed.startsWith("- ")) {
      closeTitleIfNeeded(false);
      if (!inList) {
        html.push("<ul>");
        inList = true;
      }
      html.push(`<li>${inlineMarkdown(trimmed.slice(2))}</li>`);
      continue;
    }

    closeList();
    const nextIsTitleLine = inTitle && !trimmed.startsWith("## ");
    html.push(`<p>${inlineMarkdown(trimmed.replace(/\s{2}$/, ""))}</p>`);
    closeTitleIfNeeded(nextIsTitleLine);
  }

  closeList();
  closeTitleIfNeeded(false);
  closeSection();

  return html.join("\n");
}

function renderHtml(markdown, variantLabel, lang, targetName) {
  markdown = ensureCvHeader(markdown);
  const title = markdown.match(/^#\s+(.+)$/m)?.[1] || "CV";
  const sheetClass = targetName.includes("final")
    ? "sheet sheet-detail"
    : targetName.includes("ats")
      ? "sheet sheet-ats"
      : "sheet sheet-short";
  const targetClass = targetName.includes("plus-que-pro")
    ? " sheet-plus-que-pro"
    : "";
  const rendered = renderMarkdown(markdown, lang);
  const firstSection = rendered.indexOf("<section ");
  const prefix = firstSection === -1 ? rendered : rendered.slice(0, firstSection);
  const sections = firstSection === -1
    ? []
    : [...rendered.slice(firstSection).matchAll(/<section class="([^"]*)"[\s\S]*?<\/section>/g)]
      .map((match) => ({ html: match[0], classes: match[1] }));
  const useSidebar = sheetClass.includes("sheet-short") && sections.some((section) => section.classes.includes("section-sidebar"));
  const content = useSidebar
    ? `${prefix}
  <div class="cv-layout">
    <aside class="cv-sidebar">
${sections.filter((section) => section.classes.includes("section-sidebar")).map((section) => section.html).join("\n")}
    </aside>
    <div class="cv-main">
${sections.filter((section) => !section.classes.includes("section-sidebar")).map((section) => section.html).join("\n")}
    </div>
  </div>`
    : rendered;
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} - ${escapeHtml(variantLabel)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../cv-print.css">
</head>
<body>
  <main class="${sheetClass}${targetClass}">
${content}
  </main>
</body>
</html>
`;
}

function chromeBinary() {
  for (const candidate of ["google-chrome", "chromium", "chromium-browser"]) {
    const result = spawnSync("which", [candidate], { encoding: "utf8" });
    if (result.status === 0) {
      return result.stdout.trim();
    }
  }
  return null;
}

fs.mkdirSync(outDir, { recursive: true });
const markdown = validateCvSource(fs.readFileSync(source, "utf8"));
const isEnglish = baseName.startsWith("cv-en-") || baseName.endsWith("-en");
const variantLabel = baseName.includes("plus-que-pro")
  ? "Développeur back-end senior PHP/Laravel — Plus que PRO"
  : baseName.includes("neobrain")
  ? "CV ciblé Neobrain"
  : baseName.includes("audiowizard")
    ? "CV ciblé AudioWizard"
  : baseName.includes("seyos")
    ? "CV - Seyos"
  : baseName.includes("les-tilleuls")
    ? "CV ciblé Les-Tilleuls.coop"
  : baseName.includes("pole-emploi")
    ? "CV Pôle emploi / France Travail"
  : baseName.includes("yield")
    ? "CV ciblé Yield"
  : baseName.includes("final")
  ? isEnglish ? "Detailed resume" : "CV détaillé"
  : baseName.includes("ats")
    ? isEnglish ? "ATS resume" : "CV texte recruteur"
    : isEnglish ? "Short resume" : "CV court";
fs.writeFileSync(htmlOut, renderHtml(markdown, variantLabel, isEnglish ? "en" : "fr", baseName));

console.log(`HTML written: ${path.relative(root, htmlOut)}`);

const chrome = chromeBinary();
if (!chrome) {
  console.warn("Chrome not found; PDF generation skipped.");
  process.exit(0);
}

const print = spawnSync(
  chrome,
  [
    "--headless",
    "--disable-gpu",
    "--no-sandbox",
    `--print-to-pdf=${pdfOut}`,
    `file://${htmlOut}`,
  ],
  { encoding: "utf8" },
);

if (print.status !== 0) {
  process.stderr.write(print.stderr || print.stdout || "PDF generation failed.");
  process.exit(print.status || 1);
}

fs.copyFileSync(pdfOut, compatibilityPdfOut);
console.log(`PDF written: ${path.relative(root, pdfOut)}`);
console.log(`Compatibility alias: ${path.relative(root, compatibilityPdfOut)}`);
