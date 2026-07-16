# AgentKit SEO → VitaeContext migration

This repository contains the minimal legacy-host migration surface for the former
AgentKit SEO website. VitaeContext is the current project and canonical brand.

- Current website: <https://vitaecontext.github.io/>
- Current source: <https://github.com/vitaecontext/vitaecontext>
- Migration report: [`docs/migration/agentkit-seo-to-vitaecontext.md`](docs/migration/agentkit-seo-to-vitaecontext.md)
- URL map: [`docs/migration/url-map.md`](docs/migration/url-map.md)
- Owner actions: [`docs/migration/owner-actions.md`](docs/migration/owner-actions.md)

## Local validation

```sh
npm ci
npm run build
npm test
npm run lint
npm run validate
npm run migration:audit
```

The site is dependency-free static HTML. `npm run build` copies the committed
`site/` tree to `dist/` after the migration audit passes.
