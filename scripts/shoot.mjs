// Usage: node scripts/shoot.mjs / /how-it-works ...
// Serves dist/ locally and screenshots each route at 1440x900 and 390x844, light and dark,
// into .screenshots/. Also reports horizontal overflow at 360 and 390 px.
import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const out = path.join(root, ".screenshots");

async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch {
    return await import("/opt/node-tools/node_modules/playwright/index.mjs");
  }
}

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".txt": "text/plain",
};

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  const candidates = [clean, path.join(clean, "index.html"), `${clean}.html`];
  for (const c of candidates) {
    const f = path.join(dist, c);
    if (!f.startsWith(dist)) continue;
    try {
      const st = await fs.stat(f);
      if (st.isFile()) return f;
    } catch {
      /* try next */
    }
  }
  return null;
}

const server = http.createServer(async (req, res) => {
  const file = await resolveFile(req.url ?? "/");
  if (!file) {
    const nf = path.join(dist, "404.html");
    const body = await fs.readFile(nf).catch(() => "Not found");
    res.writeHead(404, { "content-type": "text/html; charset=utf-8" });
    res.end(body);
    return;
  }
  res.writeHead(200, { "content-type": types[path.extname(file)] ?? "application/octet-stream" });
  res.end(await fs.readFile(file));
});

const routes = process.argv.slice(2);
if (routes.length === 0) routes.push("/");

await fs.mkdir(out, { recursive: true });
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;

const { chromium } = await loadPlaywright();
const browser = await chromium.launch();
let overflow = false;

try {
  const sizes = [
    { name: "1440", width: 1440, height: 900 },
    { name: "390", width: 390, height: 844 },
  ];
  for (const route of routes) {
    const slug = route === "/" ? "home" : route.replace(/^\/|\/$/g, "").replace(/\//g, "_");
    for (const size of sizes) {
      for (const scheme of ["light", "dark"]) {
        const ctx = await browser.newContext({
          viewport: { width: size.width, height: size.height },
          colorScheme: scheme,
        });
        const page = await ctx.newPage();
        await page.goto(base + route, { waitUntil: "networkidle" });
        await page.evaluate(() => document.fonts.ready);
        const file = path.join(out, `${slug}-${size.name}-${scheme}.png`);
        await page.screenshot({ path: file, fullPage: true });
        console.log(`saved ${path.relative(root, file)}`);
        await ctx.close();
      }
    }
    for (const width of [360, 390]) {
      const ctx = await browser.newContext({ viewport: { width, height: 844 } });
      const page = await ctx.newPage();
      await page.goto(base + route, { waitUntil: "networkidle" });
      const sw = await page.evaluate(() => document.documentElement.scrollWidth);
      const bad = sw > width;
      if (bad) overflow = true;
      console.log(`${route} @${width}px: scrollWidth ${sw} ${bad ? "OVERFLOW" : "ok"}`);
      await ctx.close();
    }
  }
} finally {
  await browser.close();
  server.close();
}
if (overflow) process.exitCode = 1;
