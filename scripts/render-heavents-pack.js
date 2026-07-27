#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const packDir = path.resolve(root, "heavents-recruiter-pack");
const profile = JSON.parse(fs.readFileSync(path.resolve(root, "data/profile.json"), "utf8"));
const siteUrl = (process.env.SITE_URL || profile.site.baseUrl).replace(/\/+$/, "");

const docs = [
  {
    source: "questions-techniques.md",
    output: "questions-techniques.html",
    label: "Questions techniques",
    description: "IA, maintenabilité, validation et intégration équipe.",
    lang: "fr",
    alternate: "questions-techniques-en.html",
    navLabel: "Documents Sonomundi",
    cvBackLabel: "Retour à l’étude de cas",
  },
  {
    source: "architecture-anonymisee.md",
    output: "architecture-anonymisee.html",
    label: "Architecture anonymisée",
    description: "Composants, flux, invariants et limites sans secret.",
    lang: "fr",
    alternate: "architecture-anonymisee-en.html",
    navLabel: "Documents Sonomundi",
    cvBackLabel: "Retour à l’étude de cas",
  },
  {
    source: "questions-techniques-en.md",
    output: "questions-techniques-en.html",
    label: "Technical questions",
    description: "AI, maintainability, validation and team integration.",
    lang: "en",
    alternate: "questions-techniques.html",
    navLabel: "Sonomundi documents",
    cvBackLabel: "Back to the case study",
  },
  {
    source: "architecture-anonymisee-en.md",
    output: "architecture-anonymisee-en.html",
    label: "Anonymized architecture",
    description: "Components, flows, invariants and limits without secrets.",
    lang: "en",
    alternate: "architecture-anonymisee.html",
    navLabel: "Sonomundi documents",
    cvBackLabel: "Back to the case study",
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function inlineMarkdown(value) {
  let html = escapeHtml(value);
  const links = [];

  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\[([^\]]+)]\(([^)]+)\)/g, (match, label, href) => {
    const token = `@@LINK_${links.length}@@`;
    links.push(`<a href="${escapeAttr(href)}">${inlineMarkdown(label)}</a>`);
    return token;
  });
  html = html.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>',
  );
  links.forEach((link, index) => {
    html = html.replace(`@@LINK_${index}@@`, link);
  });

  return html;
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableDivider(line) {
  return splitTableRow(line).every((cell) => /^:?-{3,}:?$/.test(cell));
}

function renderTable(lines) {
  const rows = lines.map(splitTableRow);
  const hasHeader = rows.length > 1 && isTableDivider(lines[1]);
  const bodyRows = hasHeader ? rows.slice(2) : rows;
  const head = hasHeader
    ? `<thead><tr>${rows[0].map((cell) => `<th>${inlineMarkdown(cell)}</th>`).join("")}</tr></thead>`
    : "";
  const body = `<tbody>${bodyRows
    .map((row) => `<tr>${row.map((cell) => `<td>${inlineMarkdown(cell)}</td>`).join("")}</tr>`)
    .join("")}</tbody>`;
  return `<div class="table-wrap"><table>${head}${body}</table></div>`;
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let paragraph = [];
  let listType = null;
  let quote = [];
  let inCode = false;
  let codeLang = "";
  let codeLines = [];

  function closeParagraph() {
    if (paragraph.length) {
      html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  }

  function closeList() {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  }

  function closeQuote() {
    if (quote.length) {
      html.push(`<blockquote>${quote.map(inlineMarkdown).join("<br>")}</blockquote>`);
      quote = [];
    }
  }

  function closeOpenBlocks() {
    closeParagraph();
    closeList();
    closeQuote();
  }

  function openList(type) {
    closeParagraph();
    closeQuote();
    if (listType && listType !== type) {
      closeList();
    }
    if (!listType) {
      html.push(`<${type}>`);
      listType = type;
    }
  }

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index];
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (inCode) {
      if (trimmed.startsWith("```")) {
        html.push(
          `<pre><code class="language-${escapeAttr(codeLang)}">${escapeHtml(codeLines.join("\n"))}</code></pre>`,
        );
        inCode = false;
        codeLang = "";
        codeLines = [];
      } else {
        codeLines.push(rawLine);
      }
      continue;
    }

    if (!trimmed) {
      closeOpenBlocks();
      continue;
    }

    if (trimmed.startsWith("```")) {
      closeOpenBlocks();
      inCode = true;
      codeLang = trimmed.slice(3).trim();
      continue;
    }

    if (trimmed.startsWith("|")) {
      closeOpenBlocks();
      const tableLines = [];
      while (index < lines.length && lines[index].trim().startsWith("|")) {
        tableLines.push(lines[index]);
        index += 1;
      }
      index -= 1;
      html.push(renderTable(tableLines));
      continue;
    }

    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      closeOpenBlocks();
      const level = Math.min(heading[1].length, 4);
      const text = heading[2];
      const id = slugify(text);
      html.push(`<h${level} id="${id}">${inlineMarkdown(text)}</h${level}>`);
      continue;
    }

    if (trimmed.startsWith(">")) {
      closeParagraph();
      closeList();
      quote.push(trimmed.replace(/^>\s?/, ""));
      continue;
    }

    if (trimmed.startsWith("- ")) {
      openList("ul");
      html.push(`<li>${inlineMarkdown(trimmed.slice(2))}</li>`);
      continue;
    }

    const ordered = trimmed.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      openList("ol");
      html.push(`<li>${inlineMarkdown(ordered[1])}</li>`);
      continue;
    }

    closeList();
    closeQuote();
    paragraph.push(trimmed);
  }

  if (inCode) {
    html.push(
      `<pre><code class="language-${escapeAttr(codeLang)}">${escapeHtml(codeLines.join("\n"))}</code></pre>`,
    );
  }
  closeOpenBlocks();

  return html.join("\n");
}

function renderPage(markdown, currentDoc) {
  const title = markdown.match(/^#\s+(.+)$/m)?.[1] || currentDoc.label;
  const contentMarkdown = markdown.replace(/^#\s+.+\r?\n+/, "");
  const nav = docs
    .filter((doc) => doc.lang === currentDoc.lang)
    .map((doc) => {
      const current = doc.output === currentDoc.output ? ' aria-current="page"' : "";
      return `<a href="./${doc.output}"${current}>${doc.label}</a>`;
    })
    .join("\n        ");
  const langSwitch = `<span class="lang-switch">
        <a href="./${currentDoc.lang === "fr" ? currentDoc.output : currentDoc.alternate}" lang="fr" hreflang="fr"${currentDoc.lang === "fr" ? ' aria-current="page"' : ""}>FR</a>
        <a href="./${currentDoc.lang === "en" ? currentDoc.output : currentDoc.alternate}" lang="en" hreflang="en"${currentDoc.lang === "en" ? ' aria-current="page"' : ""}>EN</a>
      </span>`;
  const renderedNav = `${nav}\n        ${langSwitch}`;
  const backLink = `<a class="back" href="../${currentDoc.lang}/heavents/">${currentDoc.cvBackLabel}</a>`;
  const pageUrl = `${siteUrl}/heavents-recruiter-pack/${currentDoc.output}`;
  const alternateUrl = `${siteUrl}/heavents-recruiter-pack/${currentDoc.alternate}`;
  const socialImage = `${siteUrl}${profile.site.socialImage[currentDoc.lang]}`;

  return `<!DOCTYPE html>
<html lang="${currentDoc.lang}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} - Sonomundi</title>
  <meta name="description" content="${escapeAttr(currentDoc.description)}">
  <link rel="canonical" href="${pageUrl}">
  <link rel="alternate" hreflang="fr" href="${currentDoc.lang === "fr" ? pageUrl : alternateUrl}">
  <link rel="alternate" hreflang="en" href="${currentDoc.lang === "en" ? pageUrl : alternateUrl}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${escapeAttr(title)}">
  <meta property="og:description" content="${escapeAttr(currentDoc.description)}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="${socialImage}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttr(title)}">
  <meta name="twitter:description" content="${escapeAttr(currentDoc.description)}">
  <meta name="twitter:image" content="${socialImage}">
  <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml">
  <style>
    :root {
      color-scheme: light;
      --ink: #172033;
      --muted: #586174;
      --line: #d8dde8;
      --panel: #ffffff;
      --soft: #f5f7fb;
      --accent: #285ed8;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      background: var(--soft);
      color: var(--ink);
      font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      line-height: 1.6;
    }

    .page {
      width: min(960px, calc(100% - 32px));
      margin: 0 auto;
      padding: 32px 0 56px;
    }

    .back {
      color: var(--accent);
      font-size: 0.94rem;
      font-weight: 700;
      text-decoration: none;
    }

    header {
      margin: 22px 0 18px;
    }

    h1 {
      margin: 0 0 10px;
      font-size: clamp(2rem, 4vw, 3.4rem);
      line-height: 1.04;
      letter-spacing: 0;
    }

    .lead {
      max-width: 780px;
      margin: 0;
      color: var(--muted);
      font-size: 1.06rem;
    }

    nav {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin: 22px 0;
    }

    nav a {
      border: 1px solid var(--line);
      border-radius: 999px;
      color: var(--ink);
      background: #fff;
      font-weight: 700;
      padding: 8px 12px;
      text-decoration: none;
    }

    nav a[aria-current="page"] {
      border-color: var(--accent);
      color: #fff;
      background: var(--accent);
    }

    .lang-switch {
      display: flex;
      gap: 6px;
      margin-left: auto;
    }

    .lang-switch a {
      min-width: 42px;
      text-align: center;
    }

    .lang-switch a[aria-current="page"] {
      border-color: var(--accent);
      color: #fff;
      background: var(--accent);
    }

    article {
      border: 1px solid var(--line);
      border-radius: 8px;
      background: var(--panel);
      padding: clamp(22px, 4vw, 40px);
    }

    h2 {
      margin: 32px 0 10px;
      padding-top: 22px;
      border-top: 1px solid var(--line);
      font-size: 1.45rem;
      line-height: 1.25;
      letter-spacing: 0;
    }

    h1 + h2,
    article > h2:first-child {
      margin-top: 0;
      padding-top: 0;
      border-top: 0;
    }

    h3 {
      margin: 24px 0 8px;
      font-size: 1.08rem;
      letter-spacing: 0;
    }

    p,
    ul,
    ol,
    blockquote,
    .table-wrap,
    pre {
      margin: 12px 0;
    }

    ul,
    ol {
      padding-left: 1.25rem;
    }

    li + li {
      margin-top: 5px;
    }

    code {
      border-radius: 4px;
      background: #eef2f8;
      color: #13213d;
      font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
      font-size: 0.92em;
      padding: 0.08rem 0.28rem;
    }

    pre {
      overflow-x: auto;
      border-radius: 8px;
      background: #101827;
      color: #e8edf7;
      padding: 16px;
    }

    pre code {
      background: transparent;
      color: inherit;
      padding: 0;
    }

    blockquote {
      border-left: 4px solid var(--accent);
      color: var(--muted);
      margin-left: 0;
      padding-left: 14px;
    }

    a {
      color: var(--accent);
    }

    a:focus-visible {
      outline: 3px solid #a74412;
      outline-offset: 3px;
    }

    .table-wrap {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 0.95rem;
    }

    th,
    td {
      border: 1px solid var(--line);
      padding: 9px 10px;
      text-align: left;
      vertical-align: top;
    }

    th {
      background: #edf2fa;
    }

    @media (max-width: 640px) {
      .page {
        width: min(100% - 24px, 960px);
        padding-top: 24px;
      }

      article {
        padding: 18px;
      }

      nav a {
        width: 100%;
      }

      .lang-switch {
        width: 100%;
        margin-left: 0;
      }

      .lang-switch a {
        width: 50%;
      }
    }
  </style>
</head>
<body>
  <main class="page">
    ${backLink}
    <header>
      <h1>${escapeHtml(title)}</h1>
      <p class="lead">${escapeHtml(currentDoc.description)}</p>
      <nav aria-label="${escapeAttr(currentDoc.navLabel)}">
        ${renderedNav}
      </nav>
    </header>
    <article>
${renderMarkdown(contentMarkdown)}
    </article>
  </main>
</body>
</html>
`;
}

for (const doc of docs) {
  const source = path.resolve(packDir, doc.source);
  const output = path.resolve(packDir, doc.output);
  const markdown = fs.readFileSync(source, "utf8");
  fs.writeFileSync(output, renderPage(markdown, doc));
  console.log(`HTML written: ${path.relative(root, output)}`);
}
