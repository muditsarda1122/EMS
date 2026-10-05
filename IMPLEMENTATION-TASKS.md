# Reverie website: implementation tasks

**Status:** ready for implementation once the owner approves the design. **Date:** 2026-10-05.

This file breaks [`WEBSITE-DESIGN-PLAN.md`](./WEBSITE-DESIGN-PLAN.md) and [`DIAGRAM-PLAN.md`](./DIAGRAM-PLAN.md) into **self-contained tasks**, each small enough for one focused session. The visual target for the homepage is [`design/homepage-preview/`](./design/homepage-preview/): an HTML rendering plus screenshots.

---

## 0. How to run these tasks

**Use one task per session, and start each in a new session.** A fresh session reads only this file, the plan sections the task lists, and the code it touches. That keeps context small and the work focused. The design conversation that produced these files is very long, so implementing there would be slower and less precise.

**Opening prompt for each session** (replace `Tn`):

> Read `IMPLEMENTATION-TASKS.md`: §1 (global rules), §2 (definition of done) and **Task Tn**. Then read the plan sections Task Tn lists, and `design/homepage-preview/` where relevant. Implement **only Task Tn**. Run every definition-of-done check, fix what fails, then commit and push. List any `TODO(copy)` or `TODO(fact)` you left.

**Branching.** The live site deploys from `main` (Vercel, assumed). Use an integration branch:

1. Create a branch called `redesign` from `main`. The first session does this.
2. Point every task session at `redesign`, through a PR into `redesign` or commits on it.
3. Use `redesign`'s preview deployment to review.
4. Merge `redesign` into `main` only after T11 passes.

Partially redesigned pages never go live.

**Order and dependencies.**

```text
T1 Foundation ─┬─► T2 Confidence maths ─► T3 Diagram primitives + specimen ─┬─► T4 Homepage ─► T5 How it works ─► T8 Paper
               │                                                           └─► T7 EC-Bench
               ├─► T6 Research index + notebook + archive
               └─► T9 About + SEO
T4…T9 ──► T10 Cleanup + redirects + README ──► T11 QA ──► merge redesign → main
T12 Continuity experiment page: whenever the owner is ready (after T6)
```

**Suggested sessions:**

| Session | Tasks | Notes |
|---|---|---|
| A | T1 | |
| B | T2 + T3 | Small and related |
| C | T4 | Design-critical: compare against the preview screenshots carefully |
| D | T5 | Attach the source docs (P12) |
| E | T6 + T7 | |
| F | T8 + T9 | When P2, P7 and P8 are ready |
| G | T10 + T11 | |
| Later | T12 | |

Sonnet is fine for every task. T4 and T5 are the most design-sensitive, so ask for a screenshot comparison in the PR.

---

## 1. Global rules (apply to every task)

1. **Scope.** Touch only what the task lists. No drive-by refactors and no new pages beyond the task.
2. **Truth.**
   - Never invent numbers, claims, features, testimonials or copy.
   - All copy comes from the plan (§7 homepage, §8 other pages) or the preview.
   - If copy is missing, write `TODO(copy)`. If a fact isn't stated in the plan, `DIAGRAM-PLAN.md` or an attached source doc, write `TODO(fact)`. Then list both in the PR.
   - Every factual sentence you add gets a row in `docs/claims-ledger.md`.
   - **No numbers on the homepage** except dates.
   - **No installation commands anywhere.**
3. **Two voices.**
   - **Newsreader** for ideas: headings, prose, captions, nav, buttons.
   - **IBM Plex Mono** only for things that literally exist in Reverie (tool names, statuses, field names, values, paths, identifiers) and for small data labels.
   - Agent product names (Claude Code, Cursor…) are prose, so they are serif.
4. **Visual system** (plan §10). Use the tokens only.
   - Never use gradients, shadows (except the focus ring), blur or glass, rounded-2xl/3xl, pills, card grids, icon libraries or stock or AI imagery.
   - Radius is 2 px. Use hairline rules (1 px).
5. **Motion** (plan §16). No scroll-triggered animation of any kind, no page-load fades, no loops. Only the listed hover and focus transitions and the Fig. 5 stepper, all of which respect `prefers-reduced-motion`.
6. **Static export stays.** Keep `output: "export"`. Don't use API routes, server actions, `next/headers`, or `redirects()` in `next.config` (redirects go in `vercel.json` in T10).
7. **Accessibility** (plan §15).
   - Semantic landmarks and one `h1` per page.
   - Every figure is a `<figure>` with a caption and a text equivalent.
   - Focus is always visible.
   - Colour never carries meaning alone.
8. **Diagrams** (`DIAGRAM-PLAN.md` §2). One data definition drives a desktop SVG (real `<text>`) and a mobile HTML composition below 768 px, never a scaled-down SVG. Port geometry from `design/homepage-preview/home.html`.
9. **Keep the build green.** Never delete a component that an existing page still imports; T10 removes legacy code.
10. **Configuration states.** Read `repository.url` and `experiment.status` from `content/site.config.ts`. Never hard-code State A or State B.

## 2. Definition of done (every task)

- `npm run lint`, `npx tsc --noEmit` and `npm run build` all pass.
- **Visual check.**
  1. Run `node scripts/shoot.mjs <routes…>` (added in T1). It serves `dist/` locally and saves screenshots at 1440 px and 390 px, in light and dark, to `.screenshots/` (git-ignored).
  2. Look at the screenshots. For the homepage, compare against `design/homepage-preview/screenshots/`.
  3. Confirm there is no horizontal scrolling at 360 px or 390 px.
- **Claims.** New factual sentences have rows in `docs/claims-ledger.md`.
- **Commit message.** `Tn: <what changed>`. In the PR or summary, list remaining `TODO(copy)` and `TODO(fact)` items.

## 3. Owner decisions, and what they block

| ID | Decision or input (plan §20 ref) | Blocks | Default if not yet decided |
|---|---|---|---|
| P1 | Reconcile benchmark figures (#1) | Numbers in T7's ledger | T7 ships with outcomes and caveats, no figures |
| P2 | Corrected paper text, abstract and PDF (#2) | T8 full text | T8 abstract page plus errata box |
| P3 | A real `ec_query` output capture (exact format), ideally from a small demo repo | Final V1 and F3 content | Use the example values with an `Example` tag |
| P4 | Repository URL and licence (#3) | State B | State A (`repository.url = null`) |
| P5 | Product constants from `DEFAULT_CONFIG`: decay λ per scope (module, repo, project, organization, domain) and open-question persistence limits per scope | The F5 decay ghost bar and step-7 wording | Show "computed from config" text instead of a value |
| P6 | Continuity experiment status: preregister? (#5) | T12 | `hidden` |
| P7 | Domain (#9) | Absolute URLs, Open Graph, sitemap in T9 | Omit `metadataBase`; relative URLs |
| P8 | About copy: bio, links, "I" or "we", photo (#8) | T9 About content | `TODO(copy)` placeholders |
| P9 | Fonts approval (#7) | T1 | Newsreader + IBM Plex Mono |
| P10 | Hosting confirmation (#10) | T10 redirects | `vercel.json` |
| P11 | All four agents verified end to end (#11) | The wording of claim C1 | Keep "Works with…" but flag it in the PR |
| P12 | Make `PRODUCT.md`, `INSTALLATION.md` and the paper available to T5, T7 and T8 sessions by attaching them; they are not in this repository | Fact-checking of How it works, EC-Bench and the paper | Implementers use only the plan's stated facts; anything else is `TODO(fact)` |
| — | **Approve the homepage copy** in the preview (draft) | T4 final copy | Build with the preview copy; owner edits later |

---

## 4. Tasks

### T1 · Foundation: tokens, fonts, config, site chrome

**Goal.** Put the new design system and the global chrome in place without rewriting page content yet.

**Read first.** Plan §10 (all of it), §5.3 (nav and footer), §8.8 (404), §8.9 (metadata), §4.5 (repository states), §19.1–§19.4. The `<style>` block of `design/homepage-preview/home.html` (tokens, nav, buttons, footer).

**Do**
- **Fonts.** Load them with `next/font/google`: Newsreader (variable; `opsz` axis; normal and italic) and IBM Plex Mono (400, 500). Expose them as `--font-serif` and `--font-mono`.
- **`app/globals.css`.** Rewrite it with:
  - colour tokens for light, and dark via `prefers-color-scheme` (plan §10.3);
  - the type scale (§10.2) as CSS variables and utilities, using fluid `clamp()`;
  - base element styles;
  - a `.prose` long-form style (replacing `.article-content`, restyled to the new tokens).
  - Keep the old `btn-editorial`, `card-editorial`, `text-editorial` and `section-animate` styles inside a `/* LEGACY — delete in T10 */` block, because old pages still use them.
- **`content/site.config.ts`.**
  - Fields: name, tagline, description, `domain: null`, contactEmail (`muditsarda23@gmail.com`), `repository: { url: null, ref: null }`, `experiment: { status: "hidden" }`, version, supportedAgents (Claude Code, Cursor, OpenCode, Codex), nav items.
  - Export typed helpers, for example `isRepoPublic()`.
- **Components.**
  - `components/site/Wordmark.tsx`.
  - `SiteNav.tsx`: reuse the accessible toggle logic from `components/navigation.tsx`. On mobile, a full-width sheet with Esc to close and focus trap. The call to action comes from config: `Contact` (mailto with subject "Reverie") in State A, `GitHub ↗` in State B.
  - `SiteFooter.tsx` (§5.3).
  - `components/ui/ButtonLink.tsx` (primary, secondary, small), `ArrowLink.tsx`, `Tag.tsx` (solid or dashed), `Figure.tsx` (figure, number, caption, optional screen-reader description).
- **`app/layout.tsx`.**
  - Use the new fonts, nav and footer.
  - Metadata defaults: default title "Reverie — memory for coding agents"; template "%s · Reverie".
  - Replace the JSON-LD: remove `ems.dev` and the bare `github.com`; use `ResearchProject` + `Person` (§8.9).
  - **Remove `AnimateSections` and the `animate-fade-in` class.** Keep the skip link and Analytics.
- **`app/not-found.tsx`** (§8.8).
- **`docs/claims-ledger.md`**, seeded from plan §11.2.
- **`scripts/shoot.mjs`** (ESM; must pass lint). It should:
  - serve `dist/` with Node's `http` module;
  - try `import('playwright')` and fall back to `/opt/node-tools/node_modules/playwright/index.mjs` if present;
  - screenshot the given routes at 1440 × 900 and 390 × 844, light and dark, into `.screenshots/`.

  Add `.screenshots/` to `.gitignore`.
- **Delete** unimported dead code: `components/svg/engineering-brain.tsx`, `components/svg/research-desk.tsx`, `components/paper-card.tsx`, `components/research-artefact-card.tsx`, `components/comparison-block.tsx`, `components/animate-sections.tsx`. Replace the old `components/navigation.tsx` and `components/footer.tsx` with the new ones.

**Acceptance**
- The nav and footer match the preview at 1440 px and 390 px.
- Dark tokens apply under `prefers-color-scheme: dark`.
- The 404 page renders.
- The JSON-LD has no `ems.dev`.
- No `AnimateSections` anywhere.
- Old pages still build (they may look unstyled; that's expected on `redesign`).

**Not in T1.** Page content, redirects, deleting `FadeIn`, `PdfActions` or SVGs that old pages still use.
**Size.** M.

---

### T2 · Confidence maths library

**Goal.** A TypeScript port of Reverie's confidence rules, used by Figs 2 and 5, with tests that pin the worked numbers.

**Read first.** `DIAGRAM-PLAN.md` §6; plan §19.3.

**Do**
- **`lib/confidence.ts`.** Pure functions with no imports:
  - `logit`, `sigmoid`;
  - `prior(sourceType, scope, nSources)` (bases and multipliers from DIAGRAM-PLAN §6; corroboration +0.05 per extra source, capped at +0.15; clamped to [0.05, 0.95]);
  - `support(L, r, cSource)`, `contradict(L, r, cSource)`, `reinforce(L)` (+0.05);
  - `effective(L, scope, days)`;
  - threshold constants (0.3, 0.4, 0.7).

  The λ table has engineering 0.001 and subsystem 0.03. The other scopes are **`null` until P5**; `effective()` returns `null` for them.
- **`content/lifecycle-scenario.ts`.** The A/B/C scenario inputs (§6), plus a function that returns the step sequence: event, rule text, stored confidence, status.
- **Tests** (`lib/confidence.test.ts`). Expected values to 4 decimals:

  | Value | Expected |
  |---|---|
  | Prior for A | 0.5600 |
  | A after support | 0.6563 |
  | A after reinforcement | 0.6675 |
  | A after contradiction | 0.5460 |
  | Prior for C | 0.6100 |
  | C preferred | 0.6218 |

  Prefer Node's built-in runner (`node --test`, with TypeScript type stripping) and add `"test"` to `package.json` scripts. If TypeScript import extensions get in the way, adding `vitest` as a devDependency is acceptable; note it in the PR.

**Acceptance.** `npm test` passes; build unaffected.
**Blocked in part by.** P5 (decay for scopes other than engineering and subsystem).
**Size.** S.

---

### T3 · Diagram primitives and the specimen (V1)

**Goal.** Shared building blocks for every figure, plus the conclusion specimen component.

**Read first.** `DIAGRAM-PLAN.md` §2 and V1; plan §10.4 and §10.9; the `.specimen` and SVG classes in `design/homepage-preview/home.html`.

**Do**
- **`components/diagrams/primitives.tsx`** (server components):
  - `Record`, with variants session, canonical, challenged, openQuestion, superseded and deprecated (exact strokes, dashes and left bars per §2.1);
  - `Band`, `FlowArrow` (shared marker), `Boundary` (with a label that interrupts the line), `Gate`, `ConfidenceBar` (solid, frozen, or a ghost for *effective*);
  - relationship edges: supports, contradicts (amber tick), supersedes (`replaces` label), depends on (dashed).

  Use tokens, not hex values, so dark mode works.
- **`components/specimen/ConclusionRecord.tsx`.** Renders from JSON:
  - a header label and status mark;
  - the cognition text in serif;
  - a field list in mono;
  - the confidence bar;
  - the framing note;
  - an `Example` tag when `captured.source === "illustrative"`.

  The header must wrap cleanly on mobile (each label `nowrap`; the status drops below).
- **`content/specimens/token-refresh.json`.** Values from V1 / §6; `captured: { source: "illustrative" }`.

**Acceptance.** Render each primitive and the specimen on a scratch route, screenshot it at 1440 px and 390 px in both themes, then **delete the scratch route before committing**.
**Size.** M.

---

### T4 · Homepage `/`

**Goal.** Build the homepage exactly as specified and as rendered in the preview.

**Read first.** Plan §7 (all of it), §4.5, §16; `DIAGRAM-PLAN.md` V1, F1, F2 and §6; `design/homepage-preview/home.html` and `screenshots/`.

**Do**
- **`app/page.tsx`.** Rewrite it with S1–S7 using the preview's copy and layout:
  - S1: hero split (copy left, `ConclusionRecord` right);
  - S2: hanging heading;
  - S3: Fig. 1, then three steps with large index numerals aligned under the figure regions;
  - S4: Fig. 2, then four facts in a two-by-two grid;
  - S5: spec list;
  - S6: research list with mono category labels and a dashed `In design` tag;
  - S7: closing section in State A or State B.
- **`components/diagrams/SessionBoundary.tsx` (F1).**
  - Desktop SVG: port the geometry from the preview, including drawing the long-term band *before* the accept arrow.
  - Mobile HTML composition.
  - Optional enhancement: a small client island that highlights the matching figure region when a step is hovered or focused.
- **`components/diagrams/ConclusionLifecycle.tsx`**, `variant="summary"` (F2). Bars come from `lib/confidence.ts` via `content/lifecycle-scenario.ts`; no numerals.
- **Reserved slot S3b.** Renders nothing unless `experiment.status === "published"` (§7, §13).
- Add claims-ledger rows for every homepage claim (C1–C17 as applicable).

**Acceptance**
- The 1440 px and 390 px screenshots match the preview (font-metric differences are fine).
- No digits in the copy except dates and tool names.
- Each figure has a caption and a text equivalent.
- Keyboard focus is visible on every link and button.

**Size.** L.

---

### T5 · How it works `/how-it-works`

**Goal.** The full mechanism page, with Figs 3, 4 and 5.

**Read first.** Plan §8.1, §1.3–§1.8, §11.2, §11.3; `DIAGRAM-PLAN.md` F3, F4, F5 and §6. **Attach the source docs (P12).**

**Do**
- **Page structure:**
  - a sticky table of contents at 1024 px and wider; a `<details>` "On this page" list on mobile;
  - sections 1–9 per §8.1;
  - prose written **only** from facts stated in the plan or attached docs, otherwise `TODO(fact)`.
- **F3** `ConclusionAnatomy`: reuse `ConclusionRecord` with numbered annotations; leader lines on desktop, a numbered list on mobile. Optional *View as JSON* in a `<details>`.
- **F4** `TwoBrains`. Draw the `ec_reconsolidate` exception exactly as specified.
- **F5** `ConclusionLifecycle variant="detailed"`. A client stepper:
  - Prev and Next buttons, plus ←/→ when focused;
  - `aria-live="polite"` announcements;
  - 200 ms transitions, instant under reduced motion;
  - without JavaScript, all steps render expanded;
  - step 5 uses the ghost bar, or "computed from config" until P5.
- **Tables:** MCP tools, supported agents, scope retirement. They become stacked definition lists below 640 px.
- **FAQ** with native `<details>`; "Limits, today" with a *Last reviewed* date.
- **Grounding notes:** hidden in State A; linked to source at `repository.ref` in State B.

**Acceptance.** Every sentence traces to the plan or the attached docs; every number appears in §11.3 as allowed; the stepper is fully keyboard-operable.
**Size.** L.

---

### T6 · Research index, notebook, archive

**Goal.** `/research` and `/research/notes/[slug]`, with the archive moved and annotated.

**Read first.** Plan §8.2, §8.6, §12, §18.2, §10.14 (featured-entry pattern).

**Do**
- **`content/research.ts`.** Typed entries for the paper, EC-Bench, the experiment, notebook entries and archive items, each with a status (`Published`, `Ongoing`, `In design`, `Historical` or `Superseded`) and a one-line note.
- **`app/research/page.tsx`.** Rewrite it with:
  - the lineage list (dates from §8.2, flagged for owner verification);
  - "Start here", with the paper as the featured entry;
  - Evaluation, Notebook (`#notebook`) and Archive (`#archive`);
  - a Collaborate line.
- **Notes.**
  - Move `public/articles/everything-till-now.md` to `content/notes/everything-till-now.md` and add an `editorsNote` frontmatter field (text in plan §8.6).
  - Replace `lib/articles.ts` with a single `lib/markdown.ts` parser.
  - Create `app/research/notes/[slug]/page.tsx` using `next/link`.
- **Archive.** Move `public/EMS-artefacts/*.pdf` to `public/research/archive/`. T10 adds the redirects.
- **Delete** `app/notes/` (both pages), `app/research`'s old card markup, `lib/papers.ts` and `components/pdf-actions.tsx`.

**Acceptance.** The editor's note renders above the article; archive entries show status and note; no runtime HEAD requests remain.
**Size.** M.

---

### T7 · EC-Bench `/research/ec-bench`

**Goal.** The benchmark page, with Fig. 6 and the honest results ledger.

**Read first.** Plan §8.4, §1.7B, §19.3; `DIAGRAM-PLAN.md` F6. **Attach the source docs (P12).**

**Do**
- **`content/bench-runs.ts`** with three rows, all with sources:
  - July 2026, EMS v1 vs stateless baseline: `needs-reconciliation`;
  - Aug 2026, stored v2 run (`20260813-141550`): `needs-reconciliation`;
  - the planned controlled comparison: planned.
- **`components/research/ResultsLedger.tsx`.** Renders `figures` **only** when `status === "reconciled"`; otherwise it renders the outcome sentence, caveats and "figures under reconciliation". It stacks on mobile.
- **`components/diagrams/BenchProtocol.tsx`** (F6). No results in the figure.
- **Page sections 1–9** per §8.4.
- **Delete** `app/ec-bench/page.tsx` and `components/svg/ec-bench-diagram.tsx`.

**Acceptance.** No benchmark number appears anywhere unless its row is `reconciled`.
**Blocked in part by.** P1 (the page ships without numbers until then).
**Size.** M.

---

### T8 · Paper `/research/biological-memory-architecture`

**Goal.** The flagship paper, web-native, with a PDF; or the fallback abstract page.

**Read first.** Plan §8.3, §1.7A, §12. **Attach the corrected paper (P2).**

**Do**
- **If P2 is ready:**
  - an MDX page (`@next/mdx`; confirm it works with static export) or markdown sections;
  - a table of contents;
  - Fig. 4 and the static variant of Fig. 5, inline;
  - BibTeX Cite (copy to clipboard);
  - a changelog box;
  - the PDF in `public/research/`.
- **If P2 isn't ready:** an abstract page (summary, key sections, PDF) with an errata box listing the §1.7A items. **Never publish the uncorrected full text as HTML.**

**Acceptance.** No paper-only mechanism from §1.7A appears uncorrected.
**Size.** M (L for the full text).

---

### T9 · About and SEO

**Goal.** `/about`, plus complete metadata.

**Read first.** Plan §8.7, §8.9, §19.6.

**Do**
- **`app/about/page.tsx`.** Sections per §8.7. Use `TODO(copy)` for the bio until P8.
- **Per-page metadata.**
- **Static generation:** `app/sitemap.ts` and `app/robots.ts`.
- **Open Graph images.** Verify that `opengraph-image.tsx` is supported under static export in Next 16. If not, use pre-rendered PNGs in `public/`.
- **JSON-LD** per page (§8.9).
- **Optional:** `public/llms.txt`.

**Blocked in part by.** P7 (absolute URLs) and P8.
**Size.** M.

---

### T10 · Cleanup, redirects, README

**Goal.** Remove legacy code and wire the redirects.

**Read first.** Plan §17, §18.

**Do**
- **Delete** any remaining `app/ems/` and `app/ethos/`, all of `components/svg/*`, `components/fade-in.tsx`, the LEGACY CSS block and `public/articles/`. Run `npm uninstall framer-motion`.
- **`vercel.json` redirects**, exactly as §18.1 lists them.
- **Rewrite `README.md`:** what the site is, how to run, build and screenshot, the content model, where copy and claims live, and where the design references are.
- Grep for imports of deleted files.

**Blocked by.** P10 (hosting).
**Size.** S–M.

---

### T11 · QA and launch readiness

**Goal.** Verify every quality gate before merging `redesign` into `main`.

**Read first.** Plan §14, §15, §19.7.

**Do**
- Lint, typecheck and build.
- Screenshots of **every route** at 360, 390, 768, 1024, 1280 and 1440 px, light and dark.
- An axe scan of every page (install `@axe-core/playwright` in a scratch directory, not the repo), plus Lighthouse if available.
- A keyboard-only pass; a reduced-motion pass.
- **Claims audit:** every factual sentence has a ledger row.
- **Numbers audit:** grep the copy for digits and check each against §11.3.
- Fix small issues. List larger ones for the owner.

**Size.** M.

---

### T12 · Continuity experiment `/research/continuity-experiment`

**Goal.** The reserved experiment page.

**Read first.** Plan §13; `DIAGRAM-PLAN.md` V2 and §4.

**Do**
- **`design` state:** question, neutral hypothesis, protocol, what will be published, last-updated date. No empty video frame.
- **`published` state** (later):
  - the `ComparisonVideo` component (highlight cut plus per-condition recordings with a timestamp-preserving toggle on mobile, captions and transcript);
  - the metadata block, a ledger row and caveats;
  - turn on homepage slot S3b, which moves Fig. 2 off the homepage.

**Blocked by.** P6.
**Size.** S (design state) or L (published).
