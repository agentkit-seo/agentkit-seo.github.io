# Owner actions after repository preparation

None of these external actions is claimed complete.

## GitHub repository and Pages

1. Review and merge/push these changes to `agentkit-seo/agentkit-seo.github.io` on `main` using an admin account with a verified email.
2. Change the repository visibility from private to **public**. The organization is on GitHub Free, so the current private repository cannot publish this public Pages site. If visibility must remain private, first move the organization to a plan that supports Pages from private repositories.
3. In organization **Settings → Member privileges → Pages creation**, verify public Pages publication remains allowed.
4. In repository **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source. Do not select `main /docs`; `docs/` contains reports, while the workflow publishes only `dist/`.
5. In repository **Settings → Environments → github-pages**, restrict deployment to the default `main` branch if desired.
6. Confirm both `Migration audit` and `Deploy GitHub Pages` workflows pass. Inspect the artifact and deployment URL. Re-run the deployment workflow manually if Pages was enabled after the first push.
7. Verify the Pages REST endpoint now reports the site and `https://agentkit-seo.github.io/` returns the prepared transition page instead of GitHub's platform 404.

## DNS and CNAME

- No `CNAME` file or custom hostname is needed for either `agentkit-seo.github.io` or `vitaecontext.github.io`; GitHub controls DNS for both default hostnames.
- Do not add a CNAME pointing the retired site at VitaeContext. A repository `CNAME` file alone does not configure a Pages custom domain, and a mistaken domain assignment could disrupt the current site.
- If a previously used custom AgentKit SEO domain is discovered in account history or webmaster tools, inventory its DNS separately and implement server-side 301/308 redirects at that domain's host where possible.

## Post-deployment inspection

Check response status, rendered text, canonical, meta refresh, visible links, and final destination for at least:

- `https://agentkit-seo.github.io/`
- `https://agentkit-seo.github.io/docs/installation/`
- `https://agentkit-seo.github.io/docs/usage/`
- `https://agentkit-seo.github.io/providers/`
- `https://agentkit-seo.github.io/skills/agent-context-optimization/`
- `https://agentkit-seo.github.io/skills/agentkit-seo/`
- `https://agentkit-seo.github.io/playbooks/github/`
- `https://agentkit-seo.github.io/playbooks/agentkit-seo/`
- `https://agentkit-seo.github.io/examples/sample-career-context.md`
- `https://agentkit-seo.github.io/not-a-former-route/`
- `https://agentkit-seo.github.io/robots.txt`
- `https://agentkit-seo.github.io/sitemap.xml`

Also test one known URL with a query string and fragment. Confirm there is no request or link from VitaeContext back to the retired host.

## Google Search Console

1. Verify ownership of URL-prefix properties for both `https://agentkit-seo.github.io/` and `https://vitaecontext.github.io/` using the same Google account.
2. Submit `https://agentkit-seo.github.io/sitemap.xml` for the old property and confirm Google can fetch it.
3. Use URL Inspection on the old homepage and representative renamed/deep routes; run live tests and request indexing after the pages deploy.
4. Inspect the corresponding current URLs and confirm Google-selected canonicals converge on VitaeContext.
5. Attempt Change of Address only after deployment and only if Search Console accepts the two URL-prefix properties. The tool checks for server-side 301 redirects and may reject this GitHub Pages meta-refresh implementation; document the result and do not claim success if it does. Google's documented prerequisites require ownership of both properties and redirects.
6. Monitor Pages indexing, canonical selection, crawl errors, impressions, and legacy branded queries. Do not use temporary removals or `noindex` for routine migration canonicalization.

## Bing Webmaster Tools

1. Add or verify both old and current HTTPS sites.
2. Submit the old migration sitemap and the current VitaeContext sitemap.
3. Use URL Inspection/Site Explorer on the representative routes above.
4. Submit the old homepage and a small representative set of changed deep URLs through URL Submission after deployment. Bing accepts redirects and dead URLs for recrawl notification; repeated submission does not accelerate processing.
5. Monitor crawl errors, sitemap processing, indexed legacy URLs, and branded queries.

References: [Bing URL Submission](https://www.bing.com/webmasters/help/URL-Submission-62f2860b) and [Bing sitemaps](https://www.bing.com/webmasters/help/sitemaps-3b5cf6ed).

## External listings and monitoring

Update every controlled listing that still uses the former identity or host, prioritizing:

- GitHub repository descriptions, topics, profile/org links, releases, Discussions, and pinned repositories;
- npm package metadata, deprecation notices, README links, and package registry ownership pages;
- Claude/plugin marketplaces and provider registries;
- personal portfolios, CVs, LinkedIn, X/Twitter, blog posts, launch posts, videos, and presentations;
- directory listings, community posts, documentation backlinks, social cards, and saved campaign links;
- AI-readable files or datasets that describe the old project as active.

Ask third-party site owners to update links directly to the closest VitaeContext URL. Keep the migration site available for at least 12 months; 18–24 months is preferable for low-frequency backlinks and AI/search recrawls. Review weekly for the first month, monthly through month six, then quarterly through the retention period. Track old-host requests where GitHub-provided analytics permit it, webmaster crawl/index reports, branded-query impressions, and broken destination reports.
