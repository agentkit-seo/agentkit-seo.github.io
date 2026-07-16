# AgentKit SEO to VitaeContext migration report

Date prepared: 2026-07-16.

## Repository and publishing state found

- Remote: `https://github.com/agentkit-seo/agentkit-seo.github.io`.
- Owner and repository: organization `agentkit-seo`, repository `agentkit-seo.github.io`.
- Repository visibility at baseline: private.
- Viewer permission during inspection: `ADMIN`.
- Organization plan: GitHub Free; organization settings reported public Pages creation as allowed.
- Default and only branch: `main` at `5a02154` (`Initial commit`), tracking `origin/main`; it is unprotected.
- History and contents: one commit and one file, `README.md`, containing only the old repository name. No site history exists in this repository.
- Pages REST endpoint: HTTP 404, meaning no Pages site is configured for this repository.
- Workflows: none before this change.
- CNAME: absent. No custom domain was found.
- Framework/build/package configuration: absent before this change.
- Routes, metadata, structured data, robots, sitemap, and `llms.txt`: absent before this change.
- Live baseline: `https://agentkit-seo.github.io/` returned GitHub's platform-level HTTP 404 on 2026-07-16.

The repository name is the required organization-site repository name, and the authenticated account has admin access to it and its organization. It can therefore own `https://agentkit-seo.github.io/`. At baseline it could not publish because Pages was unconfigured and the repository was private under a GitHub Free organization. GitHub documents Pages on Free organizations for public repositories. That blocker was resolved during final deployment as recorded below; no unrelated organization setting was changed.

Authoritative GitHub references: [configuring a Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [organization Pages permissions](https://docs.github.com/en/organizations/managing-organization-settings/managing-the-publication-of-github-pages-sites-for-your-organization), and [custom 404 support](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-custom-404-page-for-your-github-pages-site).

## Destination verification and route recovery

The current site and source repository were verified from the live VitaeContext site, the public `vitaecontext/vitaecontext.github.io` repository configuration and source, and the public `vitaecontext/vitaecontext` repository configuration:

- Canonical website: `https://vitaecontext.github.io/` (HTTP 200).
- Current product source: `https://github.com/vitaecontext/vitaecontext` (HTTP 200).

The current website repository retains the former website's Git history, including its pre-rebrand sitemap generator, route data, page tree, content collection, navigation, and `llms.txt`. The commit immediately before the 2026-07-11 rebrand was used as the authoritative former-route snapshot. Search results independently recovered the homepage, usage, installation, providers, GitHub guide, web-portfolio guide, X/Twitter guide, and web-portfolio skill. The complete mapping is in [url-map.md](url-map.md).

## Implementation

The repository now contains a dependency-free static migration site under `site/`, a deterministic build that copies it to `dist/`, a Pages deployment workflow, and a separate migration audit workflow.

Each of 31 known HTML routes has:

- one clear H1: “AgentKit SEO is now VitaeContext”;
- a brief factual transition explanation;
- a visible, descriptive closest-destination link;
- visible links to the current website and current source repository;
- an absolute canonical pointing at the current equivalent;
- a zero-second HTML meta refresh;
- current VitaeContext Open Graph metadata;
- semantic HTML and one small shared stylesheet;
- optional JavaScript that only preserves a query string or fragment; navigation does not depend on it.

The homepage alone has minimal JSON-LD: a `WebPage` about `SoftwareSourceCode` named VitaeContext, with AgentKit SEO only as `alternateName`. No page describes the former brand as a current `SoftwareApplication`.

The custom 404 does not automatically send every unknown URL to the homepage. It explains the migration and links to the current docs hub, website, and source repository. A small exact-path lookup is only a progressive enhancement if GitHub happens to serve the fallback for a known route.

This approach is appropriate because GitHub Pages serves static files and does not expose configurable server-side 301 rules on the default `github.io` hostname. Google recommends server-side permanent redirects when possible, but explicitly treats an instant meta refresh as permanent; it also treats redirects and `rel=canonical` as strong canonicalization signals. See [Google's redirect guidance](https://developers.google.com/search/docs/crawling-indexing/301-redirects) and [canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

## Search, metadata, robots, and sitemap decisions

- VitaeContext is the only current identity in titles, Open Graph site name, canonical destinations, visible current-project links, and structured data.
- The former name appears only to explain the transition.
- No former documentation, commands, package claims, screenshots, product schema, manifest, or navigation was copied.
- `llms.txt` is a short migration notice rather than a former-product catalog.
- Migration pages are not blocked in `robots.txt`; it has one general allow rule and one sitemap reference.
- The sitemap lists exactly the 31 intentional HTML migration routes. It excludes the 404, support assets, Markdown notice, and `llms.txt`.
- No route uses `noindex`. Crawlers need to fetch the pages to process the redirect and canonical signals, and Google advises against using `noindex` as a canonicalization mechanism.
- Query strings and fragments are preserved where JavaScript runs. The zero-second meta refresh and visible links remain functional without JavaScript.

## Validation

Baseline commands could not be run before editing because there was no package manifest, dependency lockfile, build system, test suite, linter, or validation script. Repository/GitHub inspection and direct HTTP checks completed successfully.

After implementation, these deterministic local commands are available and pass without live-service dependencies:

```sh
npm ci
npm run build
npm test
npm run lint
npm run validate
npm run migration:audit
```

The audit checks the exact recovered route inventory, HTTPS destinations, loop prevention, generated files, transition copy, one H1, visible destinations, source links, canonical and meta-refresh alignment, Open Graph alignment, absence of obsolete commands and product schema, sitemap/robots consistency, lack of obsolete internal navigation, custom 404 behavior, and non-JavaScript fallbacks.

## Final deployment status

Deployment completed and was directly verified on 2026-07-16:

- Migration implementation commit `5600f7cf333873ba636a468695778457037d56a4` was pushed to `main`.
- The GitHub API confirmed repository visibility changed from private to public.
- The Pages API confirmed `build_type: workflow`, `public: true`, HTTPS enforcement, no CNAME, and `https://agentkit-seo.github.io/` as the site URL.
- Migration audit workflow run `29504445278` completed successfully.
- Initial deployment run `29504445206` failed at Pages creation because it began while the repository was still private and Pages was not yet configured. It did not deploy an artifact.
- After configuring Pages through the authenticated GitHub API, workflow-dispatch run `29504510460` completed successfully: build, audit, `dist/` artifact upload, and Pages deployment all passed.

Live validation results:

| URL | Result | Verified migration signal |
|---|---:|---|
| `https://agentkit-seo.github.io/` | HTTP 200 | Canonical and instant refresh to VitaeContext homepage; visible H1 and link |
| `https://agentkit-seo.github.io/docs/` | HTTP 200 | Canonical and instant refresh to current docs |
| `https://agentkit-seo.github.io/skills/agentkit-seo/` | HTTP 200 | Canonical and instant refresh to `/skills/vitaecontext/` |
| `https://agentkit-seo.github.io/playbooks/agent-context-optimization/` | HTTP 200 | Canonical and instant refresh to `/playbooks/context-builder/` |
| `https://agentkit-seo.github.io/a-route-that-never-existed` | HTTP 404 | Custom fallback with canonical and visible link to current docs; no blanket meta refresh |
| `https://agentkit-seo.github.io/robots.txt` | HTTP 200 | Allows crawling and references the migration sitemap |
| `https://agentkit-seo.github.io/sitemap.xml` | HTTP 200 | Contains exactly 31 retained HTML migration URLs |

The shared stylesheet also returned HTTP 200. The live HTML source, not only the local build, was inspected for canonical, zero-second refresh, transition H1, and visible destination links. This confirms essential migration behavior remains available without JavaScript.

## Known limitations

- Static GitHub Pages migration pages return HTTP 200 plus instant meta refresh, not HTTP 301/308. This is the strongest per-route mechanism available on the default hostname without moving to infrastructure that supports response redirects.
- GitHub repository redirects are separate from GitHub Pages hostname behavior and are not relied on.
- GitHub Pages cannot add a per-file canonical HTTP header for the Markdown and plain-text endpoints; those contain explicit current URLs instead.
- Query/fragment preservation is progressive enhancement and may lose state when scripting is disabled or the refresh wins the browser scheduling race.
- The successful workflow emitted a non-failing warning that several upstream GitHub actions still declare Node.js 20 metadata while GitHub forces them to Node.js 24. All build and deployment steps nevertheless passed.
- Search result replacement, recrawling, indexing, Google Search Console, Bing Webmaster Tools, and external listings were not changed or verified as complete.

Manual deployment and webmaster tasks are in [owner-actions.md](owner-actions.md).
