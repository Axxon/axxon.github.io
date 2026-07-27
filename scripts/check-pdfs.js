#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const documents = [
  { file: "Sebastien-Grans-CV.pdf", alias: "cv-short.pdf", lang: "fr", expectedPages: 1, timelineChecked: true },
  { file: "Sebastien-Grans-CV-detaille.pdf", alias: "cv-final.pdf", lang: "fr", timelineChecked: true },
  { file: "Sebastien-Grans-CV-ATS.pdf", alias: "cv-ats.pdf", lang: "fr", timelineChecked: true },
  { file: "Sebastien-Grans-CV-EN.pdf", alias: "cv-short-en.pdf", lang: "en", expectedPages: 1, timelineChecked: true },
  { file: "Sebastien-Grans-CV-detailed-EN.pdf", alias: "cv-final-en.pdf", lang: "en", timelineChecked: true },
  { file: "Sebastien-Grans-CV-ATS-EN.pdf", alias: "cv-ats-en.pdf", lang: "en", timelineChecked: true },
];

const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

function commandExists(command) {
  return spawnSync("which", [command], { encoding: "utf8" }).status === 0;
}

for (const command of ["pdfinfo", "pdftotext"]) {
  if (!commandExists(command)) {
    console.error(`${command} is required to validate generated PDFs.`);
    process.exit(2);
  }
}

for (const document of documents) {
  const filePath = path.join(dist, document.file);
  const aliasPath = path.join(dist, document.alias);
  check(document.file.startsWith("Sebastien-Grans-CV"), `${document.file}: invalid recruiter-facing name`);
  check(fs.existsSync(filePath), `${document.file}: recruiter-facing PDF is missing`);
  check(fs.existsSync(aliasPath), `${document.alias}: compatibility alias is missing`);
  if (!fs.existsSync(filePath)) continue;

  const info = spawnSync("pdfinfo", [filePath], { encoding: "utf8" });
  const links = spawnSync("pdfinfo", ["-url", filePath], { encoding: "utf8" });
  const text = spawnSync("pdftotext", [filePath, "-"], { encoding: "utf8" });
  check(info.status === 0, `${document.file}: pdfinfo failed`);
  check(text.status === 0, `${document.file}: pdftotext failed`);
  check(/Pages:\s+[1-9]/.test(info.stdout), `${document.file}: invalid page count`);
  if (document.expectedPages) {
    check(
      new RegExp(`Pages:\\s+${document.expectedPages}\\b`).test(info.stdout),
      `${document.file}: expected ${document.expectedPages} page(s)`,
    );
  }
  check(links.stdout.includes("https://axxon.github.io/"), `${document.file}: complete CV link is not clickable`);
  check(links.stdout.includes("mailto:sebastien.grans@gmail.com"), `${document.file}: email link is not clickable`);
  check(links.stdout.includes("https://github.com/Axxon"), `${document.file}: GitHub link is not clickable`);
  check(links.stdout.includes("https://www.linkedin.com/in/axxonn/"), `${document.file}: LinkedIn link is not clickable`);
  check(text.stdout.includes("Sébastien Grans"), `${document.file}: candidate name missing from extracted text`);
  check(
    document.lang === "fr"
      ? text.stdout.includes("06 89 91 89 11")
      : text.stdout.includes("+33 6 89 91 89 11"),
    `${document.file}: phone number missing from extracted text`,
  );
  check(text.stdout.includes("Evina"), `${document.file}: Evina missing from extracted text`);
  check(text.stdout.includes("Sapiendo"), `${document.file}: Sapiendo missing from extracted text`);
  check(text.stdout.includes("Sonomundi"), `${document.file}: Sonomundi missing from extracted text`);
  check(text.stdout.includes("Studi"), `${document.file}: Studi event training missing from extracted text`);
  check(text.stdout.includes("Franprix"), `${document.file}: canonical Norsys client Franprix missing`);
  check(!text.stdout.includes("Monoprix"), `${document.file}: incorrect Norsys client Monoprix found`);
  check(!/référent technique de fait pour (?:trois|3) développeurs|de facto technical referent for (?:three|3) developers/i.test(text.stdout), `${document.file}: overstated Norsys responsibility found`);
  check(/1(?:\s|,)*000/.test(text.stdout), `${document.file}: Studi attested hours missing from extracted text`);
  if (document.lang === "fr") {
    check(/1(?:\s|,)*000\s+heures\s+comptabilisées\s+sur\s+l.attestation,\s+hors\s+travail\s+personnel/i.test(text.stdout), `${document.file}: Studi attested-hours scope missing`);
  } else {
    check(/1(?:\s|,)*000\s+hours\s+recorded\s+on\s+the\s+attendance\s+certificate,\s+excluding\s+additional\s+personal\s+study/i.test(text.stdout), `${document.file}: Studi attested-hours scope missing`);
  }
  check(!/autorisation\s+de\s+travail|eu\s+work\s+authorization|authorized\s+to\s+work|work\s+permit|permis\s+de\s+travail|droit\s+de\s+travailler|right\s+to\s+work|work\s+eligib|citoyennet|citizenship/i.test(text.stdout), `${document.file}: forbidden work-authorization wording found`);
  check(!/\([1-9][0-9]{0,2}\)/.test(text.stdout), `${document.file}: parenthesized numbered reference found`);

  if (document.lang === "fr") {
    check(/Juin 2022\s*[-–]\s*Juin 2024/i.test(text.stdout), `${document.file}: Evina dates differ from shared facts`);
    check(/décembre 2025/i.test(text.stdout), `${document.file}: Sonomundi start date differs from shared facts`);
  } else {
    check(/June 2022\s*[-–]\s*June 2024/i.test(text.stdout), `${document.file}: Evina dates differ from shared facts`);
    check(/December 2025/i.test(text.stdout), `${document.file}: Sonomundi start date differs from shared facts`);
  }

  if (document.timelineChecked && document.lang === "fr") {
    check(/Février 2021\s*[-–]\s*Mai 2022/i.test(text.stdout), `${document.file}: Sapiendo dates differ from canonical chronology`);
    check(/CDI puis freelance/i.test(text.stdout), `${document.file}: Sapiendo contract sequence missing`);
    check(/(?:Décembre|déc\.) 2020\s*[-–]\s*(?:Janvier|janv\.) 2021[^\n]*2 mois/i.test(text.stdout), `${document.file}: Groupe Blachère must show its two-month duration`);
    check(/(?:Avril|avr\.)\s*[-–]\s*(?:Septembre|sept\.) 2018[^\n]*6 mois/i.test(text.stdout), `${document.file}: SensioLabs dates differ from canonical chronology`);
    check(/2016\s*[-–]\s*2018/i.test(text.stdout), `${document.file}: Norsys dates differ from canonical chronology`);
    check(/(?:Décembre|déc\.) 2013\s*[-–]\s*(?:Janvier|janv\.) 2015[\s\S]{0,160}1 an\s+2\s+mois[\s\S]{0,160}Sur site/i.test(text.stdout), `${document.file}: Activ’Company dates or on-site work mode differ from canonical record`);
    check(!/no-excuse/i.test(text.stdout), `${document.file}: no-excuse must not appear in an official CV`);
    check(/licenciement économique/i.test(text.stdout), `${document.file}: Evina end reason missing`);
  }
  if (document.timelineChecked && document.lang === "en") {
    check(/February 2021\s*[-–]\s*May 2022/i.test(text.stdout), `${document.file}: Sapiendo dates differ from canonical chronology`);
    check(/Permanent contract,\s+then freelance/i.test(text.stdout), `${document.file}: Sapiendo contract sequence missing`);
    check(/(?:December|Dec\.) 2020\s*[-–]\s*(?:January|Jan\.) 2021[^\n]*2 months/i.test(text.stdout), `${document.file}: Groupe Blachère must show its two-month duration`);
    check(/(?:April|Apr\.)\s*[-–]\s*(?:September|Sep\.) 2018[^\n]*6 months/i.test(text.stdout), `${document.file}: SensioLabs dates differ from canonical chronology`);
    check(/2016\s*[-–]\s*2018/i.test(text.stdout), `${document.file}: Norsys dates differ from canonical chronology`);
    check(/(?:December|Dec\.) 2013\s*[-–]\s*(?:January|Jan\.) 2015[\s\S]{0,160}1 year\s+2\s+months[\s\S]{0,160}On-site/i.test(text.stdout), `${document.file}: Activ’Company dates or on-site work mode differ from canonical record`);
    check(!/no-excuse/i.test(text.stdout), `${document.file}: no-excuse must not appear in an official CV`);
    check(/economic redundancy/i.test(text.stdout), `${document.file}: Evina end reason missing`);
  }
  if (document.timelineChecked) {
    check(!/2013\s*[-–]\s*2018/.test(text.stdout), `${document.file}: incorrect Norsys 2013–2018 range found`);
  }
}

if (failures.length > 0) {
  console.error(`PDF checks failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`PDF checks passed: ${documents.length} recruiter PDFs and ${documents.length} compatibility aliases.`);
