/**
 * Submit every site URL to IndexNow (Bing/Yandex/Seznam instant indexing).
 *
 * Usage:  node scripts/indexnow-submit.mjs
 * Run after each production deploy that adds or changes pages.
 * URL list mirrors app/sitemap.ts (static pages + projects.json details).
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HOST = "www.delphinassociates.com";
const BASE_URL = `https://${HOST}`;
const KEY = "24f3fb5a92cb48e3a38ae7f365f4f943";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const projects = JSON.parse(readFileSync(join(root, "data", "projects.json"), "utf8"));

const urlList = [
  `${BASE_URL}/`,
  `${BASE_URL}/about`,
  `${BASE_URL}/services`,
  `${BASE_URL}/projects`,
  `${BASE_URL}/team`,
  `${BASE_URL}/contact`,
  ...projects.map((p) => `${BASE_URL}/projects/${p.id}`),
];

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, urlList }),
});

console.log(`Submitted ${urlList.length} URLs -> HTTP ${response.status} ${response.statusText}`);
if (!response.ok) {
  console.error(await response.text());
  process.exit(1);
}
urlList.forEach((u) => console.log("  " + u));
