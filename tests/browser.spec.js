const { test, expect } = require("@playwright/test");

const baseUrl = process.env.TEST_BASE_URL || "http://127.0.0.1:4173";
const chromePath = process.env.CHROME_PATH || "/usr/bin/google-chrome";
const routes = [
  "/fr/",
  "/en/",
  "/fr/cv/",
  "/en/cv/",
  "/fr/sonomundi/",
  "/en/sonomundi/",
  "/heavents-recruiter-pack/architecture-anonymisee.html",
  "/heavents-recruiter-pack/architecture-anonymisee-en.html",
  "/heavents-recruiter-pack/questions-techniques.html",
  "/heavents-recruiter-pack/questions-techniques-en.html",
];

test.use({
  launchOptions: {
    executablePath: chromePath,
    args: ["--no-sandbox"],
  },
});

test("all localized routes respond and expose one main language", async ({ page }) => {
  for (const route of routes) {
    const response = await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
    expect(response?.status(), route).toBe(200);
    expect(await page.locator("main").count(), route).toBe(1);
    const expectedLanguage = route.startsWith("/fr/") || (route.includes("heavents-recruiter-pack") && !route.includes("-en.html")) ? "fr" : "en";
    expect(await page.locator("html").getAttribute("lang"), route).toBe(expectedLanguage);
  }
});

test("mobile and 200%-zoom-equivalent widths reflow without horizontal scrolling", async ({ page }) => {
  for (const width of [320, 640]) {
    await page.setViewportSize({ width, height: 800 });
    for (const route of routes) {
      await page.goto(`${baseUrl}${route}`, { waitUntil: "domcontentloaded" });
      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scrollWidth, `${route} overflows at ${width}px`).toBeLessThanOrEqual(dimensions.clientWidth);
    }
  }
});

test("keyboard order starts with the skip link and keeps a visible focus", async ({ page }) => {
  await page.goto(`${baseUrl}/fr/`, { waitUntil: "domcontentloaded" });

  await page.keyboard.press("Tab");
  let focused = await page.evaluate(() => ({
    className: document.activeElement?.className,
    text: document.activeElement?.textContent?.trim(),
    outlineStyle: getComputedStyle(document.activeElement).outlineStyle,
    outlineWidth: getComputedStyle(document.activeElement).outlineWidth,
  }));
  expect(focused.className).toContain("skip-link");
  expect(focused.text).toBe("Aller au contenu");
  expect(focused.outlineStyle).not.toBe("none");
  expect(focused.outlineWidth).not.toBe("0px");

  await page.keyboard.press("Tab");
  focused = await page.evaluate(() => ({
    tag: document.activeElement?.tagName,
    text: document.activeElement?.textContent?.trim().replace(/\s+/g, " "),
  }));
  expect(focused.tag).toBe("A");
  expect(focused.text).toContain("Sébastien Grans");

  for (let index = 0; index < 10; index += 1) {
    await page.keyboard.press("Tab");
    const state = await page.evaluate(() => ({
      tag: document.activeElement?.tagName,
      outline: getComputedStyle(document.activeElement).outlineStyle,
    }));
    expect(state.tag).toBe("A");
    expect(state.outline).not.toBe("none");
  }
});

test("primary downloadable resumes are reachable", async ({ request }) => {
  const pdfs = [
    "/dist/Sebastien-Grans-CV.pdf",
    "/dist/Sebastien-Grans-CV-EN.pdf",
  ];
  for (const pdf of pdfs) {
    const response = await request.get(`${baseUrl}${pdf}`);
    expect(response.status(), pdf).toBe(200);
    expect(response.headers()["content-type"], pdf).toContain("application/pdf");
  }
});
