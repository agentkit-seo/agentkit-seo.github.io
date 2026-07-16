import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const siteRoot = join(root, "site");
const map = JSON.parse(await readFile(join(root, "migration-map.json"), "utf8"));

const expectedRoutes = [
  "/", "/vitaegraph/", "/profile-optimization/", "/playbooks/", "/skills/", "/providers/", "/design/",
  "/docs/", "/docs/installation/", "/docs/usage/", "/docs/context-file-example/", "/docs/cli/", "/faq/",
  "/changelog/", "/contact/", "/skills/agent-context-optimization/", "/skills/cv-ats/", "/skills/vitaegraph/",
  "/skills/linkedin/", "/skills/github/", "/skills/web-portfolio/", "/skills/x-twitter/", "/skills/agentkit-seo/",
  "/playbooks/agent-context-optimization/", "/playbooks/agentkit-seo/", "/playbooks/cv-ats/", "/playbooks/vitaegraph/",
  "/playbooks/linkedin/", "/playbooks/github/", "/playbooks/web-portfolio/", "/playbooks/x-twitter/",
];
const expectedNonHtmlRoutes = ["/examples/sample-career-context.md", "/llms.txt"];
const routePath = (path) => path === "/" ? join(siteRoot, "index.html") : join(siteRoot, path.slice(1), "index.html");
const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

assert.equal(map.legacyOrigin, "https://agentkit-seo.github.io");
assert.equal(map.currentHomepage, "https://vitaecontext.github.io/");
assert.equal(map.currentRepository, "https://github.com/vitaecontext/vitaecontext");
assert.deepEqual(map.routes.map(({ path }) => path).sort(), expectedRoutes.sort(), "known HTML route inventory changed");
assert.deepEqual(map.nonHtmlRoutes.map(({ path }) => path).sort(), expectedNonHtmlRoutes.sort(), "known non-HTML route inventory changed");

for (const route of [...map.routes, ...map.nonHtmlRoutes]) {
  const destination = new URL(route.destination);
  assert.equal(destination.protocol, "https:", `${route.path} destination must use HTTPS`);
  assert.equal(destination.origin, new URL(map.currentHomepage).origin, `${route.path} destination must use the canonical VitaeContext site`);
  assert.notEqual(destination.origin, map.legacyOrigin, `${route.path} creates a redirect loop`);
  assert.equal(route.equivalent, true, `${route.path} must document whether an equivalent exists`);
}

for (const route of map.routes) {
  const html = await readFile(routePath(route.path), "utf8");
  assert.match(html, /<h1>AgentKit SEO is now VitaeContext<\/h1>/, `${route.path} missing transition H1`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route.path} must have exactly one H1`);
  assert.match(html, /private, reusable, evidence-aware career context for AI-assisted workflows/, `${route.path} missing transition explanation`);
  assert.match(html, new RegExp(`<link rel="canonical" href="${escapeRegExp(route.destination)}">`), `${route.path} canonical mismatch`);
  assert.match(html, new RegExp(`<meta http-equiv="refresh" content="0; url=${escapeRegExp(route.destination)}">`), `${route.path} refresh mismatch`);
  assert.match(html, new RegExp(`<a class="destination" href="${escapeRegExp(route.destination)}">`), `${route.path} missing visible destination`);
  assert.match(html, new RegExp(`<a href="${escapeRegExp(map.currentRepository)}">`), `${route.path} missing source link`);
  assert.match(html, /<meta property="og:site_name" content="VitaeContext">/);
  assert.match(html, new RegExp(`<meta property="og:url" content="${escapeRegExp(route.destination)}">`), `${route.path} OG URL mismatch`);
  assert.doesNotMatch(html, /href="\/(?!assets\/)/, `${route.path} contains obsolete internal navigation`);
}

const homepage = await readFile(join(siteRoot, "index.html"), "utf8");
assert.match(homepage, /"@type":"WebPage"/, "homepage needs WebPage structured data");
assert.match(homepage, /"name":"VitaeContext"/, "structured data must identify VitaeContext as current");
assert.doesNotMatch(homepage, /"@type":"SoftwareApplication"/, "old product structured data remains");

const allFiles = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => entry.isDirectory() ? allFiles(join(directory, entry.name)) : join(directory, entry.name)));
  return nested.flat();
};
const publishedText = (await Promise.all((await allFiles(siteRoot)).map((file) => readFile(file, "utf8")))).join("\n");
assert.doesNotMatch(publishedText, /npx\s+agentkit-seo|plugin marketplace add agentkit-seo|plugin install agentkit-seo@|github\.com\/agentkit-seo\/agentkit-seo(?!\.github\.io)/i, "obsolete command or source link remains");
assert.doesNotMatch(publishedText, /VitaeContext\s*[\/]\s*AgentKit SEO/i, "persistent dual branding remains");

const sitemap = await readFile(join(siteRoot, "sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const expectedSitemapUrls = map.routes.map(({ path }) => new URL(path, map.legacyOrigin).href);
assert.deepEqual(sitemapUrls.sort(), expectedSitemapUrls.sort(), "sitemap does not match retained HTML migration pages");

const robots = await readFile(join(siteRoot, "robots.txt"), "utf8");
assert.equal(robots, `User-agent: *\nAllow: /\n\nSitemap: ${map.legacyOrigin}/sitemap.xml\n`, "robots.txt does not match migration strategy");

const fallback = await readFile(join(siteRoot, "404.html"), "utf8");
assert.equal((fallback.match(/<h1\b/g) || []).length, 1, "404 must have exactly one H1");
assert.doesNotMatch(fallback, /http-equiv="refresh"/, "404 must not redirect every unknown URL to one page");
assert.match(fallback, /https:\/\/vitaecontext\.github\.io\/docs\//, "404 must visibly lead to current docs");

console.log(`Migration audit passed: ${map.routes.length} HTML routes and ${map.nonHtmlRoutes.length} non-HTML routes mapped.`);
