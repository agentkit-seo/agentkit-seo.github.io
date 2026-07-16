# AgentKit SEO to VitaeContext URL map

Inventory date: 2026-07-16. The inventory combines the former website source history, its sitemap generator and route data, generated endpoints, internal navigation, `llms.txt`, and current search results. The old repository itself contains no historical site files beyond its one-line README.

GitHub Pages cannot emit configurable HTTP 301 responses on its default hostname. Every retained HTML route therefore uses a static HTML page with a zero-second meta refresh, an absolute `rel=canonical`, a visible destination link, and a JavaScript-only query/fragment preservation enhancement. All listed equivalents returned HTTP 200 when checked on 2026-07-16.

| Former URL | Current destination | Mechanism | Canonical | Close equivalent | Notes |
|---|---|---|---|---:|---|
| `https://agentkit-seo.github.io/` | `https://vitaecontext.github.io/` | Static HTML + instant meta refresh | Current destination | Yes | Main transition page |
| `/vitaegraph/` | `https://vitaecontext.github.io/vitaegraph/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/profile-optimization/` | `https://vitaecontext.github.io/profile-optimization/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/playbooks/` | `https://vitaecontext.github.io/playbooks/` | Static HTML + instant meta refresh | Current destination | Yes | Current guides hub |
| `/skills/` | `https://vitaecontext.github.io/skills/` | Static HTML + instant meta refresh | Current destination | Yes | Current skills hub |
| `/providers/` | `https://vitaecontext.github.io/providers/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/design/` | `https://vitaecontext.github.io/design/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/docs/` | `https://vitaecontext.github.io/docs/` | Static HTML + instant meta refresh | Current destination | Yes | Current docs hub |
| `/docs/installation/` | `https://vitaecontext.github.io/docs/installation/` | Static HTML + instant meta refresh | Current destination | Yes | Current commands live only at destination |
| `/docs/usage/` | `https://vitaecontext.github.io/docs/usage/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/docs/context-file-example/` | `https://vitaecontext.github.io/docs/context-file-example/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/docs/cli/` | `https://vitaecontext.github.io/docs/cli/` | Static HTML + instant meta refresh | Current destination | Yes | Current CLI reference |
| `/faq/` | `https://vitaecontext.github.io/faq/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/changelog/` | `https://vitaecontext.github.io/changelog/` | Static HTML + instant meta refresh | Current destination | Yes | Current project history |
| `/contact/` | `https://vitaecontext.github.io/contact/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/skills/agent-context-optimization/` | `https://vitaecontext.github.io/skills/context-builder/` | Static HTML + instant meta refresh | Current destination | Yes | Skill renamed during rebrand |
| `/skills/cv-ats/` | `https://vitaecontext.github.io/skills/cv-ats/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/skills/vitaegraph/` | `https://vitaecontext.github.io/skills/vitaegraph/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/skills/linkedin/` | `https://vitaecontext.github.io/skills/linkedin/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/skills/github/` | `https://vitaecontext.github.io/skills/github/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/skills/web-portfolio/` | `https://vitaecontext.github.io/skills/web-portfolio/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/skills/x-twitter/` | `https://vitaecontext.github.io/skills/x-twitter/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/skills/agentkit-seo/` | `https://vitaecontext.github.io/skills/vitaecontext/` | Static HTML + instant meta refresh | Current destination | Yes | Root orchestration skill renamed |
| `/playbooks/agent-context-optimization/` | `https://vitaecontext.github.io/playbooks/context-builder/` | Static HTML + instant meta refresh | Current destination | Yes | Guide renamed during rebrand |
| `/playbooks/agentkit-seo/` | `https://vitaecontext.github.io/playbooks/vitaecontext/` | Static HTML + instant meta refresh | Current destination | Yes | Root orchestration guide renamed |
| `/playbooks/cv-ats/` | `https://vitaecontext.github.io/playbooks/cv-ats/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/playbooks/vitaegraph/` | `https://vitaecontext.github.io/playbooks/vitaegraph/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/playbooks/linkedin/` | `https://vitaecontext.github.io/playbooks/linkedin/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/playbooks/github/` | `https://vitaecontext.github.io/playbooks/github/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/playbooks/web-portfolio/` | `https://vitaecontext.github.io/playbooks/web-portfolio/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/playbooks/x-twitter/` | `https://vitaecontext.github.io/playbooks/x-twitter/` | Static HTML + instant meta refresh | Current destination | Yes | Same topic |
| `/examples/sample-career-context.md` | `https://vitaecontext.github.io/examples/sample-career-context.md` | Static Markdown migration notice with visible links | Not available in static file headers | Yes | Omitted from sitemap; GitHub Pages cannot set a per-file canonical HTTP header |
| `/llms.txt` | `https://vitaecontext.github.io/llms.txt` | Plain-text migration notice with visible URLs | Not available in static file headers | Yes | Replaces active former-product summary; omitted from sitemap |
| Any other old path | `https://vitaecontext.github.io/docs/` | Custom `404.html` with visible links; exact known paths are progressively enhanced | Current docs hub | No identified equivalent | No blanket automatic homepage redirect |

Infrastructure endpoints are not former content pages: `/robots.txt` now allows the migration surface and advertises `/sitemap.xml`; `/sitemap.xml` lists exactly the 31 retained HTML migration URLs. The former manifest, screenshots, social images, and other old assets are not recreated.
