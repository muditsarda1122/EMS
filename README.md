# Reverie website

The public website for Reverie, memory for coding agents. It explains what the product does and how it works, and it hosts the research behind it: the EC-Bench results, the paper, the notebook and the archive of earlier documents.

This repository is the website only. It contains no installation instructions for Reverie itself.

Stack: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4. The site is a static export written to `dist/`.

## Run, build, test

```bash
npm install
npm run dev            # development server on http://localhost:3000
npm run build          # static export to dist/
npm run lint
npx tsc --noEmit
npm test               # unit tests for lib/*.test.ts (node --test)
```

## Screenshots

`scripts/shoot.mjs` serves `dist/` locally and screenshots the routes you give it at 1440 and 390 px, in light and dark, into `.screenshots/` (git-ignored). It also reports horizontal overflow at 360 and 390 px. Build first.

```bash
npm run build
node scripts/shoot.mjs / /how-it-works /research /research/ec-bench /about
```

It uses Playwright, found as an npm package or at `/opt/node-tools/node_modules/playwright`.

## Content model

Everything the pages say lives in `content/`, apart from page layout and diagram geometry.

| Path | Holds |
|---|---|
| `content/site.config.ts` | Site name, tagline, contact, navigation, configuration switches (below) |
| `content/research.ts` | Typed list of research documents: kind, status, dates, superseded-by, PDF |
| `content/paper.ts` | The paper's abstract, errata and citation data |
| `content/bench-runs.ts` | EC-Bench runs and caveats |
| `content/lifecycle-scenario.ts` | The scenario behind the lifecycle diagrams |
| `content/specimens/` | The example memory record and its anatomy |
| `content/notes/*.md` | Notebook entries (Markdown with frontmatter, including `editorsNote`) |
| `public/research/archive/` | The archived PDFs |

Diagram components are in `components/diagrams/`; page chrome in `components/site/`; shared pieces in `components/ui/`. Open Graph images are rendered at build from `lib/og/` (the Newsreader font there is under the SIL Open Font License, see `lib/og/OFL.txt`).

## Copy and claims

`docs/claims-ledger.md` lists every factual sentence on the site with its source. A new factual sentence needs a row there. Missing copy is marked `TODO(copy)` and unverified facts `TODO(fact)`.

## Configuration switches

Set in `content/site.config.ts`. Pages read these and never hard-code a state.

- `repository.url` and `repository.ref`: `null` is State A (repository not public; the header call to action is Contact). A URL is State B (the call to action is GitHub and repository links appear).
- `experiment.status`: `hidden`, `design`, `running` or `published`. Anything but `hidden` shows the continuity experiment page and its homepage slot (`experiment.homepageSlot`).
- `domain`: `null` keeps URLs relative. Set it to get absolute Open Graph, sitemap and canonical URLs.
- `claims.anyMcpAgent`: whether the site says any MCP agent works. Set it to `false` if that check fails.
- `supportedAgents`, `version`, `contactEmail`, `nav`.

## Hosting

`vercel.json` holds the permanent redirects from the old routes (`/ems`, `/ethos`, `/ec-bench`, `/notes`, `/notes/:slug`, `/EMS-artefacts/:file`) and the `Content-Type: image/png` header for the extensionless `opengraph-image` files. Next's `redirects()` does not work with a static export, which is why they are here. On another host, reproduce them there.

## Design references

- `WEBSITE-DESIGN-PLAN.md`: the design plan (voice, tokens, pages, redirects, architecture).
- `DIAGRAM-PLAN.md`: every diagram's data and layout.
- `IMPLEMENTATION-TASKS.md`: the build tasks and the rules each one follows.
- `design/homepage-preview/`: the static homepage preview, its fonts and reference screenshots.
