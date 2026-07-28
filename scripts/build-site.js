#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const data = JSON.parse(fs.readFileSync(path.join(root, "data/profile.json"), "utf8"));
const siteUrl = (process.env.SITE_URL || data.site.baseUrl).replace(/\/+$/, "");

const routes = {
  home: { fr: "/fr/", en: "/en/" },
  cv: { fr: "/fr/cv/", en: "/en/cv/" },
  heavents: { fr: "/fr/sonomundi/", en: "/en/sonomundi/" },
};

const outputPaths = {
  home: { fr: "fr/index.html", en: "en/index.html" },
  cv: { fr: "fr/cv/index.html", en: "en/cv/index.html" },
  heavents: { fr: "fr/sonomundi/index.html", en: "en/sonomundi/index.html" },
};

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function localize(value, lang) {
  if (value && typeof value === "object" && !Array.isArray(value) && Object.hasOwn(value, lang)) {
    return value[lang];
  }
  return value;
}

function absolute(relativeUrl) {
  return `${siteUrl}${relativeUrl.startsWith("/") ? relativeUrl : `/${relativeUrl}`}`;
}

function externalLinksOpenInNewTab(content) {
  return content.replace(/<a\b[^>]*>/gi, (anchor) => {
    const href = anchor.match(/\bhref="([^"]+)"/i)?.[1] || "";
    if (!/^https?:\/\//i.test(href)) {
      return anchor;
    }

    let updated = /\btarget="/i.test(anchor)
      ? anchor.replace(/\btarget="[^"]*"/i, 'target="_blank"')
      : anchor.replace(/>$/, ' target="_blank">');

    const rel = updated.match(/\brel="([^"]*)"/i);
    if (rel) {
      const values = new Set(rel[1].split(/\s+/).filter(Boolean));
      values.add("noopener");
      values.add("noreferrer");
      updated = updated.replace(rel[0], `rel="${[...values].join(" ")}"`);
    } else {
      updated = updated.replace(/>$/, ' rel="noopener noreferrer">');
    }

    return updated;
  });
}

function write(relativePath, content) {
  const target = path.join(root, relativePath);
  const output = relativePath.endsWith(".html")
    ? externalLinksOpenInNewTab(content)
    : content;
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, `${output.trim().replace(/[ \t]+$/gm, "")}\n`);
  console.log(`Written ${relativePath}`);
}

function pdfHref(fileName) {
  return `/dist/downloads/${encodeURIComponent(fileName)}`;
}

function pdfFiles(lang) {
  if (lang === "fr") {
    return {
      short: "Sebastien-Grans-CV.pdf",
      detailed: "Sebastien-Grans-CV-detaille.pdf",
      ats: "Sebastien-Grans-CV-ATS.pdf",
    };
  }
  return {
    short: "Sebastien-Grans-CV-EN.pdf",
    detailed: "Sebastien-Grans-CV-detailed-EN.pdf",
    ats: "Sebastien-Grans-CV-ATS-EN.pdf",
  };
}

function list(items, className = "") {
  const classAttribute = className ? ` class="${escapeHtml(className)}"` : "";
  return `<ul${classAttribute}>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`;
}

function personStructuredData(lang) {
  const identity = data.identity;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.name,
    url: absolute(routes.home[lang]),
    image: absolute(identity.photo),
    email: `mailto:${identity.email}`,
    jobTitle: localize(identity.role, lang),
    address: {
      "@type": "PostalAddress",
      addressRegion: lang === "fr" ? "Lozère" : "Lozere",
      addressCountry: "FR",
    },
    sameAs: [identity.github, identity.linkedin],
    knowsAbout: data.skills.flatMap((group) => localize(group.home, lang)),
    alumniOf: [{ "@type": "CollegeOrUniversity", name: lang === "fr" ? "Université de Limoges" : "University of Limoges" }],
  };
}

function head({ lang, type, title, description, ogType = "profile" }) {
  const route = routes[type][lang];
  const alternateLang = lang === "fr" ? "en" : "fr";
  const locale = lang === "fr" ? "fr_FR" : "en_GB";
  const alternateLocale = lang === "fr" ? "en_GB" : "fr_FR";
  const structuredData = JSON.stringify(personStructuredData(lang)).replaceAll("<", "\\u003c");

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <meta name="theme-color" content="#f6f4ef">
  <link rel="canonical" href="${escapeHtml(absolute(route))}">
  <link rel="alternate" hreflang="fr" href="${escapeHtml(absolute(routes[type].fr))}">
  <link rel="alternate" hreflang="en" href="${escapeHtml(absolute(routes[type].en))}">
  <link rel="alternate" hreflang="x-default" href="${escapeHtml(absolute(routes[type].fr))}">
  <meta property="og:type" content="${escapeHtml(ogType)}">
  <meta property="og:site_name" content="${escapeHtml(data.identity.name)} — CV">
  <meta property="og:locale" content="${locale}">
  <meta property="og:locale:alternate" content="${alternateLocale}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(absolute(route))}">
  <meta property="og:image" content="${escapeHtml(absolute(localize(data.site.socialImage, lang)))}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escapeHtml(`${data.identity.name} — ${localize(data.identity.role, lang)}`)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(absolute(localize(data.site.socialImage, lang)))}">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/styles.css">
  <script type="application/ld+json">${structuredData}</script>
</head>`;
}

function header(lang, type) {
  const copy = data.content[lang];
  const alternateLang = lang === "fr" ? "en" : "fr";
  const home = routes.home[lang];
  const inHome = type === "home";
  const homePrefix = inHome ? "" : home;
  const navItems = [
    { key: "home", href: home, current: type === "home" },
    { key: "proofs", href: `${homePrefix}#preuves`, current: false },
    { key: "heavents", href: routes.heavents[lang], current: type === "heavents" },
    { key: "cv", href: routes.cv[lang], current: type === "cv" },
    { key: "contact", href: `${homePrefix}#contact`, current: false },
  ];

  return `<a class="skip-link" href="#contenu">${escapeHtml(copy.skipLink)}</a>
<header class="site-header">
  <div class="container nav-shell">
    <a class="brand" href="${home}" aria-label="${escapeHtml(`${data.identity.name} — ${copy.nav.home}`)}">
      <span>${escapeHtml(data.identity.name)}</span>
      <small>Senior Web Software Engineer</small>
    </a>
    <nav aria-label="${escapeHtml(copy.navLabel)}">
      ${navItems.map((item) => `<a href="${item.href}"${item.current ? ' aria-current="page"' : ""}>${escapeHtml(copy.nav[item.key])}</a>`).join("\n      ")}
      <a class="language-link" href="${routes[type][alternateLang]}" lang="${alternateLang}" hreflang="${alternateLang}">${escapeHtml(copy.languageSwitch)}</a>
    </nav>
  </div>
</header>`;
}

function footer(lang) {
  return `<footer class="site-footer">
  <div class="container footer-grid">
    <p><strong>${escapeHtml(data.identity.name)}</strong><br>${escapeHtml(localize(data.identity.role, lang))}</p>
    <p><a href="mailto:${escapeHtml(data.identity.email)}">${escapeHtml(data.identity.email)}</a></p>
    <p><a href="${data.identity.github}" rel="me">GitHub</a> · <a href="${data.identity.linkedin}" rel="me">LinkedIn</a><br>${escapeHtml(localize(data.identity.location, lang))}</p>
  </div>
</footer>`;
}

function sectionHeading(section) {
  return `<div class="section-heading">
  <p class="eyebrow">${escapeHtml(section.eyebrow)}</p>
  <h2>${escapeHtml(section.title)}</h2>
  ${section.intro ? `<p>${escapeHtml(section.intro)}</p>` : ""}
</div>`;
}

function homePage(lang) {
  const copy = data.content[lang];
  const identity = data.identity;
  const files = pdfFiles(lang);

  const skills = data.skills.map((group) => `<article class="skill-group">
  <h3>${escapeHtml(localize(group.title, lang))}</h3>
  <p>${localize(group.home, lang).map(escapeHtml).join(" · ")}</p>
</article>`).join("\n");

  const proofs = data.proofs.map((proof) => `<article class="proof">
  <h3>${proof.url ? `<a href="${escapeHtml(proof.url)}">${escapeHtml(localize(proof.title, lang))}</a>` : escapeHtml(localize(proof.title, lang))}</h3>
  <p>${escapeHtml(localize(proof.context, lang))}</p>
  <p>${escapeHtml(localize(proof.action, lang))}</p>
  <p class="result">${escapeHtml(localize(proof.result, lang))}</p>
</article>`).join("\n");

  const heavents = copy.sections.heavents;
  const trajectory = copy.sections.trajectory;
  const contact = copy.sections.contact;

  return `${head({ lang, type: "home", title: copy.homeMeta.title, description: copy.homeMeta.description })}
<body>
${header(lang, "home")}
<main id="contenu">
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">${escapeHtml(copy.hero.eyebrow)}</p>
        <h1>${escapeHtml(identity.name)}</h1>
        <p class="role">${escapeHtml(localize(identity.role, lang))}</p>
        <p class="value-proposition">${escapeHtml(copy.hero.value)}</p>
        <p class="technical-line">${escapeHtml(copy.hero.technical)}</p>
        <ul class="hero-facts">
          <li>${escapeHtml(copy.hero.experience)}</li>
          <li>${escapeHtml(localize(identity.target, lang))}</li>
          <li>${escapeHtml(localize(identity.workMode, lang))}</li>
          <li>${escapeHtml(copy.hero.international)}</li>
        </ul>
        <div class="hero-actions">
          <a class="button button-primary" href="${pdfHref(files.short)}" download>${escapeHtml(copy.hero.primaryCta)}</a>
          <a class="button button-secondary" href="${routes.heavents[lang]}">${escapeHtml(copy.hero.secondaryCta)}</a>
          <a class="text-link" href="mailto:${escapeHtml(identity.email)}">${escapeHtml(copy.hero.tertiaryCta)}</a>
        </div>
      </div>
      <img class="profile-photo" src="${identity.photo}" width="400" height="400" alt="${escapeHtml(lang === "fr" ? `Portrait de ${identity.name}` : `Portrait of ${identity.name}`)}" fetchpriority="high">
    </div>
  </section>

  <section class="section" id="competences">
    <div class="container">
      ${sectionHeading(copy.sections.skills)}
      <div class="skills-grid">${skills}</div>
    </div>
  </section>

  <section class="section section-tinted" id="preuves">
    <div class="container">
      ${sectionHeading(copy.sections.proofs)}
      <div class="proofs-grid">${proofs}</div>
      <p class="section-action"><a class="text-link" href="${routes.cv[lang]}">${escapeHtml(copy.sections.experience.detailsLink)}</a></p>
    </div>
  </section>

  <section class="section" id="trajectoire">
    <div class="container split-layout">
      <div>${sectionHeading(trajectory)}</div>
      <div class="summary-panel">
        ${list(trajectory.points)}
        <p class="result">${escapeHtml(trajectory.outcome)}</p>
        <a class="text-link" href="${escapeHtml(trajectory.sourceUrl)}">${escapeHtml(trajectory.sourceLabel)}</a>
      </div>
    </div>
  </section>

  <section class="section heavents-summary" id="heavents">
    <div class="container split-layout">
      <div>${sectionHeading(heavents)}</div>
      <div class="summary-panel">
        ${list(heavents.points)}
        <p class="ai-note">${escapeHtml(heavents.ai)}</p>
        <a class="button button-secondary" href="${routes.heavents[lang]}">${escapeHtml(heavents.link)}</a>
      </div>
    </div>
  </section>

  <section class="section contact-section" id="contact">
    <div class="container split-layout">
      <div>${sectionHeading(contact)}</div>
      <address class="contact-card">
        <a class="button button-primary" href="mailto:${escapeHtml(identity.email)}">${escapeHtml(contact.cta)}</a>
        <p><a href="mailto:${escapeHtml(identity.email)}">${escapeHtml(identity.email)}</a></p>
        <p><a href="${identity.linkedin}" rel="me">LinkedIn</a> · <a href="${identity.github}" rel="me">GitHub</a></p>
        <p>${escapeHtml(localize(identity.location, lang))}<br>${escapeHtml(localize(identity.workMode, lang))}</p>
      </address>
    </div>
  </section>
</main>
${footer(lang)}
</body>
</html>`;
}

function detailedCvPage(lang) {
  const copy = data.content[lang];
  const cv = copy.cv;
  const identity = data.identity;
  const files = pdfFiles(lang);

  const downloads = Object.entries(cv.downloads).map(([key, label]) => `<a class="download-link" href="${pdfHref(files[key])}" download>
  <span>${escapeHtml(label)}</span>
  <small>PDF</small>
</a>`).join("\n");

  const experiences = data.experiences.map((experience) => `<article class="experience-item detailed-experience">
  <div class="experience-heading">
    <div>
      <h3><a href="${experience.url}">${escapeHtml(experience.company)}</a></h3>
      <p>${escapeHtml(localize(experience.role, lang))}</p>
    </div>
    <p class="date">${escapeHtml(localize(experience.dates, lang))}</p>
  </div>
  <p class="context">${escapeHtml(localize(experience.context, lang))}</p>
  ${list(localize(experience.detail, lang))}
  <p class="stack"><span>Stack</span> ${experience.technologies.map(escapeHtml).join(" · ")}</p>
</article>`).join("\n");

  const otherExperiences = data.otherExperiences.map((experience) => `<article class="compact-item">
  <h3>${experience.url ? `<a href="${escapeHtml(experience.url)}">${escapeHtml(experience.company)}</a>` : escapeHtml(experience.company)}</h3>
  <p class="date">${escapeHtml(localize(experience.dates, lang))}</p>
  <p>${escapeHtml(localize(experience.summary, lang))}</p>
</article>`).join("\n");

  const projects = data.projects.filter((project) => project.showOnCv !== false).map((project) => `<article class="compact-item">
  <h3>${project.url ? `<a href="${escapeHtml(project.url)}">${escapeHtml(localize(project.title, lang))}</a>` : escapeHtml(localize(project.title, lang))}</h3>
  <p>${escapeHtml(localize(project.summary, lang))}</p>
</article>`).join("\n");

  const education = data.education.map((item) => `<article class="education-item">
  <p class="date">${escapeHtml(localize(item.year, lang))}</p>
  <div><h3>${escapeHtml(localize(item.degree, lang))}</h3><p>${escapeHtml(localize(item.school, lang))}</p></div>
</article>`).join("\n");

  return `${head({ lang, type: "cv", title: copy.cvMeta.title, description: copy.cvMeta.description })}
<body>
${header(lang, "cv")}
<main id="contenu">
  <header class="page-hero">
    <div class="container reading-width">
      <p class="eyebrow">${escapeHtml(cv.eyebrow)}</p>
      <h1>${escapeHtml(cv.title)}</h1>
      <p class="page-intro">${escapeHtml(cv.intro)}</p>
      <p class="timeline-note">${escapeHtml(cv.timelineNote)}</p>
    </div>
  </header>

  <section class="section section-tight">
    <div class="container reading-width">
      <h2>${escapeHtml(cv.downloadsTitle)}</h2>
      <div class="downloads-grid">${downloads}</div>
    </div>
  </section>

  <section class="section">
    <div class="container reading-width">
      <h2>${escapeHtml(cv.experienceTitle)}</h2>
      <div class="experience-list">${experiences}</div>
    </div>
  </section>

  <section class="section heavents-cv">
    <div class="container reading-width">
      <p class="eyebrow">${escapeHtml(lang === "fr" ? "Produit personnel" : "Personal product")}</p>
      <h2>${escapeHtml(cv.heaventsTitle)}</h2>
      <p>${escapeHtml(cv.heaventsText)}</p>
      <p class="section-action"><a class="text-link" href="${routes.heavents[lang]}">${escapeHtml(cv.caseLink)}</a></p>
    </div>
  </section>

  <section class="section section-tinted">
    <div class="container reading-width">
      <h2>${escapeHtml(cv.otherTitle)}</h2>
      <div class="compact-grid">${otherExperiences}</div>
    </div>
  </section>

  <section class="section">
    <div class="container reading-width">
      <h2>${escapeHtml(cv.projectsTitle)}</h2>
      <div class="compact-grid">${projects}</div>
    </div>
  </section>

  <section class="section section-tinted">
    <div class="container reading-width two-column-details">
      <div>
        <h2>${escapeHtml(cv.educationTitle)}</h2>
        <div class="education-list">${education}</div>
      </div>
      <div>
        <h2>${escapeHtml(cv.languagesTitle)}</h2>
        <p>${escapeHtml(cv.languages)}</p>
        <p><a href="${escapeHtml(identity.englishInterview)}">${escapeHtml(cv.englishProof)}</a></p>
      </div>
    </div>
  </section>
</main>
${footer(lang)}
</body>
</html>`;
}

function caseStudyPage(lang) {
  const copy = data.content[lang];
  const caseCopy = copy.case;
  const statusCards = caseCopy.statuses.map((status) => `<article class="status-item">
  <h3>${escapeHtml(status.label)}</h3>
  <p>${escapeHtml(status.text)}</p>
</article>`).join("\n");

  const gallery = data.heavents.gallery.map((item) => `<figure>
  <a href="${item.src}"><img src="${item.src}" width="${item.width}" height="${item.height}" loading="lazy" decoding="async" alt="${escapeHtml(localize(item.alt, lang))}"></a>
  <figcaption>${escapeHtml(localize(item.caption, lang))}</figcaption>
</figure>`).join("\n");

  const workflowGraphic = data.heavents.workflowGraphic;
  const workflowGraphicContent = workflowGraphic.locales.includes(lang) ? `<figure class="workflow-graphic">
  <a class="workflow-graphic-preview" href="${workflowGraphic.src}" aria-label="${escapeHtml(workflowGraphic.fullSizeLabel)}">
    <img src="${workflowGraphic.src}" width="${workflowGraphic.width}" height="${workflowGraphic.height}" loading="lazy" decoding="async" alt="${escapeHtml(workflowGraphic.alt)}">
  </a>
  <p class="workflow-graphic-links"><a href="${workflowGraphic.src}">${escapeHtml(workflowGraphic.fullSizeLabel)}</a> · <a href="${workflowGraphic.animatedSrc}">${escapeHtml(workflowGraphic.animatedLabel)}</a></p>
  <figcaption>${escapeHtml(workflowGraphic.caption)}</figcaption>
</figure>
<details class="workflow-transcript">
  <summary>${escapeHtml(workflowGraphic.transcriptLabel)}</summary>
  <p>${escapeHtml(workflowGraphic.transcriptIntro)}</p>
  ${list(workflowGraphic.mappings)}
</details>` : "";

  const sections = caseCopy.sections.map((section) => {
    const paragraphs = (section.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("\n");
    const items = section.items ? list(section.items) : "";
    const aiContent = section.id === "ia" ? workflowGraphicContent : "";
    const demoContent = section.id === (lang === "fr" ? "demo" : "demo") ? `<div class="case-actions">
  <a class="button button-primary" href="${data.heavents.demo}">${escapeHtml(caseCopy.demoCta)}</a>
  <a class="button button-secondary" href="${data.heavents.technicalDocs[lang]}">${escapeHtml(caseCopy.docsCta)}</a>
</div>
<div class="gallery">${gallery}</div>` : "";
    return `<section class="case-section" id="${escapeHtml(section.id)}">
  <h2>${escapeHtml(section.title)}</h2>
  ${paragraphs}
  ${items}
  ${aiContent}
  ${demoContent}
</section>`;
  }).join("\n");

  return `${head({ lang, type: "heavents", title: copy.caseMeta.title, description: copy.caseMeta.description, ogType: "article" })}
<body>
${header(lang, "heavents")}
<main id="contenu">
  <header class="page-hero case-hero">
    <div class="container reading-width">
      <p class="eyebrow">${escapeHtml(caseCopy.eyebrow)}</p>
      <h1>${escapeHtml(caseCopy.title)}</h1>
      <p class="page-intro">${escapeHtml(caseCopy.intro)}</p>
      <div class="hero-actions">
        <a class="button button-primary" href="${data.heavents.demo}">${escapeHtml(caseCopy.demoCta)}</a>
        <a class="text-link" href="${routes.home[lang]}">${escapeHtml(caseCopy.backCta)}</a>
      </div>
    </div>
  </header>

  <section class="section section-tinted status-section">
    <div class="container reading-width">
      <h2>${escapeHtml(caseCopy.statusTitle)}</h2>
      <div class="status-grid">${statusCards}</div>
    </div>
  </section>

  <div class="container reading-width case-content">${sections}</div>
</main>
${footer(lang)}
</body>
</html>`;
}

function rootRedirect() {
  const canonical = absolute(routes.home.fr);
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(data.identity.name)} — CV</title>
  <meta name="description" content="${escapeHtml(data.content.fr.homeMeta.description)}">
  <meta http-equiv="refresh" content="0; url=/fr/">
  <link rel="canonical" href="${canonical}">
  <link rel="alternate" hreflang="fr" href="${absolute(routes.home.fr)}">
  <link rel="alternate" hreflang="en" href="${absolute(routes.home.en)}">
  <link rel="alternate" hreflang="x-default" href="${absolute(routes.home.fr)}">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="redirect-page">
  <main id="contenu" class="redirect-card">
    <p class="eyebrow">CV · Portfolio</p>
    <h1>${escapeHtml(data.identity.name)}</h1>
    <p>Redirection vers la version française.</p>
    <p><a class="button button-primary" href="/fr/">Ouvrir le site en français</a></p>
    <p><a class="text-link" href="/en/" hreflang="en">Ouvrir la version anglaise</a></p>
  </main>
</body>
</html>`;
}

function legacyCaseStudyRedirect(lang) {
  const target = routes.heavents[lang];
  const message = lang === "fr"
    ? "Sonomundi est le nouveau nom du projet. Redirection vers l’étude de cas."
    : "Sonomundi is the project’s new name. Redirecting to the case study.";
  const link = lang === "fr" ? "Ouvrir l’étude de cas Sonomundi" : "Open the Sonomundi case study";
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sonomundi — ${lang === "fr" ? "étude de cas" : "case study"}</title>
  <meta http-equiv="refresh" content="0; url=${target}">
  <link rel="canonical" href="${absolute(target)}">
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="redirect-page">
  <main id="contenu" class="redirect-card">
    <h1>Sonomundi</h1>
    <p>${message}</p>
    <p><a class="button button-primary" href="${target}">${link}</a></p>
  </main>
</body>
</html>`;
}

function resumeWebEntrypoint({ lang, htmlFile, pdfFile }) {
  const webTarget = `/dist/${htmlFile}`;
  const downloadTarget = pdfHref(pdfFile);
  const copy = lang === "fr"
    ? {
        title: "CV de Sébastien Grans",
        message: "Ouverture de la version web du CV, dont les liens externes s’ouvrent dans un nouvel onglet.",
        webLink: "Ouvrir le CV web",
        downloadLink: "Télécharger le PDF",
      }
    : {
        title: "Sébastien Grans resume",
        message: "Opening the web resume, where external links open in a new tab.",
        webLink: "Open the web resume",
        downloadLink: "Download the PDF",
      };

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${copy.title}</title>
  <meta http-equiv="refresh" content="0; url=${webTarget}">
  <link rel="canonical" href="${absolute(webTarget)}">
  <link rel="stylesheet" href="/styles.css">
</head>
<body class="redirect-page">
  <main id="contenu" class="redirect-card">
    <h1>${copy.title}</h1>
    <p>${copy.message}</p>
    <p><a class="button button-primary" href="${webTarget}">${copy.webLink}</a></p>
    <p><a class="text-link" href="${downloadTarget}" download>${copy.downloadLink}</a></p>
  </main>
</body>
</html>`;
}

for (const lang of ["fr", "en"]) {
  write(outputPaths.home[lang], homePage(lang));
  write(outputPaths.cv[lang], detailedCvPage(lang));
  write(outputPaths.heavents[lang], caseStudyPage(lang));
}

write("index.html", rootRedirect());
write("fr/heavents/index.html", legacyCaseStudyRedirect("fr"));
write("en/heavents/index.html", legacyCaseStudyRedirect("en"));

for (const entrypoint of [
  { lang: "fr", publicFile: "Sebastien-Grans-CV.pdf", htmlFile: "cv-short.html", pdfFile: "Sebastien-Grans-CV.pdf" },
  { lang: "fr", publicFile: "Sebastien-Grans-CV-detaille.pdf", htmlFile: "cv-final.html", pdfFile: "Sebastien-Grans-CV-detaille.pdf" },
  { lang: "fr", publicFile: "Sebastien-Grans-CV-ATS.pdf", htmlFile: "cv-ats.html", pdfFile: "Sebastien-Grans-CV-ATS.pdf" },
  { lang: "en", publicFile: "Sebastien-Grans-CV-EN.pdf", htmlFile: "cv-short-en.html", pdfFile: "Sebastien-Grans-CV-EN.pdf" },
  { lang: "en", publicFile: "Sebastien-Grans-CV-detailed-EN.pdf", htmlFile: "cv-final-en.html", pdfFile: "Sebastien-Grans-CV-detailed-EN.pdf" },
  { lang: "en", publicFile: "Sebastien-Grans-CV-ATS-EN.pdf", htmlFile: "cv-ats-en.html", pdfFile: "Sebastien-Grans-CV-ATS-EN.pdf" },
]) {
  write(`dist/${entrypoint.publicFile}/index.html`, resumeWebEntrypoint(entrypoint));
}

const sitemapPairs = [
  { fr: routes.home.fr, en: routes.home.en },
  { fr: routes.cv.fr, en: routes.cv.en },
  { fr: routes.heavents.fr, en: routes.heavents.en },
  { fr: "/heavents-recruiter-pack/architecture-anonymisee.html", en: "/heavents-recruiter-pack/architecture-anonymisee-en.html" },
  { fr: "/heavents-recruiter-pack/questions-techniques.html", en: "/heavents-recruiter-pack/questions-techniques-en.html" },
];
const sitemapUrls = sitemapPairs.flatMap((pair) => [pair.fr, pair.en]);

write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemapUrls.map((route) => {
  const pair = sitemapPairs.find((candidate) => candidate.fr === route || candidate.en === route);
  return `  <url>
    <loc>${absolute(route)}</loc>
    <lastmod>${data.site.lastModified}</lastmod>
    <xhtml:link rel="alternate" hreflang="fr" href="${absolute(pair.fr)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${absolute(pair.en)}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${absolute(pair.fr)}" />
  </url>`;
}).join("\n")}
</urlset>`);

write("robots.txt", `User-agent: *
Allow: /

Sitemap: ${absolute("/sitemap.xml")}`);

write("llms.txt", `# ${data.identity.name} — CV

## Français

- Accueil : ${absolute(routes.home.fr)}
- CV détaillé : ${absolute(routes.cv.fr)}
- Étude de cas Sonomundi : ${absolute(routes.heavents.fr)}

## English

- Home: ${absolute(routes.home.en)}
- Detailed resume: ${absolute(routes.cv.en)}
- Sonomundi case study: ${absolute(routes.heavents.en)}

## Technical documents

- Architecture FR: ${absolute("/heavents-recruiter-pack/architecture-anonymisee.html")}
- Architecture EN: ${absolute("/heavents-recruiter-pack/architecture-anonymisee-en.html")}
- Questions techniques FR: ${absolute("/heavents-recruiter-pack/questions-techniques.html")}
- Technical questions EN: ${absolute("/heavents-recruiter-pack/questions-techniques-en.html")}

## Contact

- Email: mailto:${data.identity.email}
- GitHub: ${data.identity.github}
- LinkedIn: ${data.identity.linkedin}`);
