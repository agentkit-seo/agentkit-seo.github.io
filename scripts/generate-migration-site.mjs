import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const siteRoot = join(root, "site");
const map = JSON.parse(await readFile(join(root, "migration-map.json"), "utf8"));

const escapeHtml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

const outputPathForRoute = (path) =>
  path === "/" ? join(siteRoot, "index.html") : join(siteRoot, path.slice(1), "index.html");

const transitionCopy =
  "The project evolved into VitaeContext, with a broader focus on private, reusable, evidence-aware career context for AI-assisted workflows.";

function redirectPage(route) {
  const destination = escapeHtml(route.destination);
  const label = escapeHtml(route.label);
  const structuredData = route.path === "/"
    ? `<script type="application/ld+json">${JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "AgentKit SEO is now VitaeContext",
        url: map.currentHomepage,
        about: {
          "@type": "SoftwareSourceCode",
          name: "VitaeContext",
          alternateName: "AgentKit SEO",
          url: map.currentHomepage,
          codeRepository: map.currentRepository,
        },
      })}</script>`
    : "";
  const structuredMarkup = structuredData ? `  ${structuredData}\n` : "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AgentKit SEO is now VitaeContext</title>
  <meta name="description" content="AgentKit SEO is now VitaeContext. Continue to the current VitaeContext project and documentation.">
  <link rel="canonical" href="${destination}">
  <meta http-equiv="refresh" content="0; url=${destination}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="VitaeContext">
  <meta property="og:title" content="VitaeContext — current project">
  <meta property="og:description" content="AgentKit SEO evolved into VitaeContext, the current project for private, reusable, evidence-aware career context.">
  <meta property="og:url" content="${destination}">
  <meta name="twitter:card" content="summary">
  <link rel="stylesheet" href="/assets/migration.css">
${structuredMarkup}  <script>
    (() => {
      const target = new URL(${JSON.stringify(route.destination)});
      if (location.origin !== target.origin && (location.search || location.hash)) {
        target.search = location.search;
        target.hash = location.hash;
        location.replace(target.href);
      }
    })();
  </script>
</head>
<body>
  <main>
    <h1>AgentKit SEO is now VitaeContext</h1>
    <p>${transitionCopy}</p>
    <p><a class="destination" href="${destination}">Continue to ${label}</a></p>
    <p><a href="${escapeHtml(map.currentHomepage)}">Visit the current VitaeContext website</a></p>
    <p><a href="${escapeHtml(map.currentRepository)}">View the current VitaeContext source repository</a></p>
  </main>
</body>
</html>
`;
}

for (const route of map.routes) {
  const output = outputPathForRoute(route.path);
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, redirectPage(route));
}

const browserMap = Object.fromEntries(map.routes.map(({ path, destination }) => [path, destination]));
const fallback = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AgentKit SEO is now VitaeContext</title>
  <meta name="description" content="This retired AgentKit SEO route has moved. Find the current project at VitaeContext.">
  <link rel="canonical" href="https://vitaecontext.github.io/docs/">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="VitaeContext">
  <meta property="og:title" content="VitaeContext — current project">
  <meta property="og:description" content="AgentKit SEO evolved into VitaeContext, the current project for private, reusable, evidence-aware career context.">
  <meta property="og:url" content="https://vitaecontext.github.io/docs/">
  <link rel="stylesheet" href="/assets/migration.css">
  <script>
    (() => {
      const routes = ${JSON.stringify(browserMap)};
      const destination = routes[location.pathname];
      if (!destination) return;
      const target = new URL(destination);
      target.search = location.search;
      target.hash = location.hash;
      if (location.origin !== target.origin) location.replace(target.href);
    })();
  </script>
</head>
<body>
  <main>
    <h1>AgentKit SEO is now VitaeContext</h1>
    <p>${transitionCopy}</p>
    <p>This former route has no separately identified equivalent. The current documentation is the most useful starting point.</p>
    <p><a class="destination" href="https://vitaecontext.github.io/docs/">Read the current VitaeContext documentation</a></p>
    <p><a href="${escapeHtml(map.currentHomepage)}">Visit the current VitaeContext website</a></p>
    <p><a href="${escapeHtml(map.currentRepository)}">View the current VitaeContext source repository</a></p>
  </main>
</body>
</html>
`;
await writeFile(join(siteRoot, "404.html"), fallback);

const sitemapUrls = map.routes
  .map(({ path }) => `  <url><loc>${escapeHtml(new URL(path, map.legacyOrigin).href)}</loc></url>`)
  .join("\n");
await writeFile(
  join(siteRoot, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`,
);

await writeFile(
  join(siteRoot, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${map.legacyOrigin}/sitemap.xml\n`,
);

await writeFile(
  join(siteRoot, "llms.txt"),
  `# VitaeContext\n\nAgentKit SEO is the former project name. VitaeContext is the current project and canonical identity.\n\n- Current website: ${map.currentHomepage}\n- Current source repository: ${map.currentRepository}\n- Current AI-readable summary: https://vitaecontext.github.io/llms.txt\n`,
);

const sampleRoute = map.nonHtmlRoutes.find(({ path }) => path.endsWith(".md"));
await mkdir(dirname(join(siteRoot, sampleRoute.path.slice(1))), { recursive: true });
await writeFile(
  join(siteRoot, sampleRoute.path.slice(1)),
  `# This example moved to VitaeContext\n\nAgentKit SEO is the former project name. The maintained sample career context is now available from VitaeContext:\n\n- [Open the current sample career context](${sampleRoute.destination})\n- [Visit the current VitaeContext website](${map.currentHomepage})\n- [View the current source repository](${map.currentRepository})\n`,
);

console.log(`Generated ${map.routes.length} HTML migration pages and migration support files.`);
