# Reverie website: diagram and visual plan

**Status:** proposal for review. **No diagram has been drawn or coded.**
**Date:** 2026-10-05 · **Companion to:** [`WEBSITE-DESIGN-PLAN.md`](./WEBSITE-DESIGN-PLAN.md) (§9 summarises this file)
**Approval:** every visual below needs sign-off before implementation. §8 is a review checklist.
**Reference rendering:** V1, F1 and F2 are drawn in [`design/homepage-preview/home.html`](./design/homepage-preview/home.html), in both the desktop SVG and the mobile HTML compositions, with screenshots in `design/homepage-preview/screenshots/`. Port their geometry when implementing. Where wording differs between the preview and this file, the preview is newer.

All factual elements cite their source. Most cite **PRODUCT.md** (the implementation archaeology) or **INSTALLATION.md**; a few cite the paper *Reverie: A Biological Memory Architecture for AI Agents* (5 Sep 2026), but only where the paper agrees with the implementation (see design plan §1.7A).

---

## 1. Rules and budget

1. **Zero to three diagrams or explanatory visuals per page.** Zero is a valid answer.
2. A visual must communicate something that would otherwise be **harder to understand**. Decoration fails this test.
3. Every element of every visual is **true to the implementation**. Example values are computed with the product's real rules and labelled `Example`.
4. **Nothing imitates a product UI that doesn't exist**: no app windows, dashboards, title-bar dots or fake terminals.
5. Diagrams are **static by default**. Interaction is allowed only when it explains (Fig. 5) or links text to figure (Fig. 1). There is no ambient animation.
6. Every visual has a **mobile composition**: content re-laid vertically, never scaled down, with text never below 13 px.
7. Every visual has a **text equivalent** (design plan §15).

### Budget by page

| Page | Visuals | Count |
|---|---|---|
| Home `/` | V1 hero specimen · F1 Across the session boundary · F2 The life of a conclusion (summary) | **3** |
| Home, after the continuity experiment is published | V1 · F1 · V2 side-by-side recording (F2 leaves the homepage; S4 links to F5) | **3** |
| How it works `/how-it-works` | F3 Anatomy of a conclusion · F4 Two brains and a review gate · F5 The life of a conclusion, step by step | **3** |
| Paper `/research/biological-memory-architecture` | F4 (reused) · F5 static variant (reused) | **2** |
| EC-Bench `/research/ec-bench` | F6 How an EC-Bench run works | **1** |
| Continuity experiment `/research/continuity-experiment` | Design state: none (optional F6 variant, §4) · Published: V2, plus an optional F6 variant | **0 / ≤ 2** |
| Research index `/research` | — | **0** |
| Notebook entries `/research/notes/[slug]` | — | **0** |
| About `/about` | — | **0** |
| 404 | — | **0** |

**Tables are not counted as diagrams.** They are typographic content (the MCP tools, the supported agents, scope retirement rules, the results ledger, the archive list) and follow the design system's table styles.

**One throughline.** The homepage and How it works illustrate the *same* example conclusion, the token-refresh invariant from the paper's own example: *"Cache invalidation must follow token refresh; clearing the cache first serves stale authentication tokens."* It appears in V1 (retrieved), F1 (crossing the boundary), F2 and F5 (evolving) and F3 (dissected). §6 contains the worked numbers.

---

## 2. Shared diagram grammar

### 2.1 Elements

| Element | Drawing | Text |
|---|---|---|
| **Record** (a conclusion) | Rectangle, 2 px radius, 1 px stroke | Short conclusion text (serif) or a label |
| **Session record** (unreviewed) | Same shape, **dashed** 1 px stroke, no fill | — |
| **Canonical record** (reviewed) | **Solid** stroke plus a 3 px ink (`--accent`) bar on the left edge | — |
| **Challenged** | Left bar in amber (`--challenged`) | `challenged` (mono) |
| **Open question** | Dashed stroke plus `?` glyph | `open question` (mono) |
| **Superseded / deprecated** | Text in `--ink-3` with a strike-through | `superseded` or `deprecated` (mono) |
| **Band** (persists over time) | Full-width `--paper-sunken` rectangle, no radius | Label top-left, serif italic (for example *your repository*, *long-term memory*) |
| **Process arrow** | 1.5 px ink line, 6 px open arrowhead | Tool names in mono (`ec_observe`), actions in serif |
| **Session boundary** | Vertical dashed 1 px `--ink-3` line | *session ends* (serif italic) |
| **Gate** | Narrow bordered box | **Review** (serif 500) plus outcomes |
| **Edge: supports** | Solid 1 px line, filled arrowhead | — |
| **Edge: contradicts** | Solid 1 px line with an amber perpendicular tick at the target | — |
| **Edge: supersedes** | Solid line, arrowhead, small label `replaces` | — |
| **Edge: depends on** | Dashed 1 px line, arrowhead | — |
| **Confidence bar** | 1 px outline track, solid fill to value; a dashed "ghost" fill means *effective after decay* | A value in mono when numerals are shown |

The visual law: **hollow means unreviewed; solid means reviewed.** It is the same in every figure.

### 2.2 Type and colour

- **Two voices.** Concepts and prose are set in **Newsreader**. Anything that exists in the implementation (tool names, statuses, field names, values, paths) is set in **IBM Plex Mono**.
- **Colour.** Ink on paper, with `--accent` only for the reviewed bar and the hover/focus wash. `--challenged` (amber) is used only for challenged states and contradiction ticks. No other colours. Dark theme: tokens swap automatically (design plan §10.3).
- **Minimum sizes.** Diagram text at least 13 px rendered; stroke at least 1 px; arrowheads at least 6 px.

### 2.3 Construction

- **One data definition per diagram** (nodes, edges, labels, steps) drives **two compositions**:
  - **Desktop (≥ 768 px):** inline SVG with real `<text>`, rendered at intrinsic size (at most 1200 px wide; switches to the mobile composition before text would drop below 13 px).
  - **Mobile (< 768 px):** HTML/CSS vertical layout (ordered lists, small inline SVG arrows).

  Only one composition is rendered at a time (`display: none` on the other), so assistive technology reads one.
- Implemented as **React server components** (no client JavaScript), except F5 (stepper) and the F1 ↔ Home step highlight (a tiny client island).
- Confidence values come from `lib/confidence.ts`, a TypeScript port of the `ec/confidence.py` rules using `DEFAULT_CONFIG` constants. Its unit tests compare against values from the Python implementation (design plan §19.3).

### 2.4 Captions and accessibility pattern

```html
<figure aria-labelledby="fig1-cap" aria-describedby="fig1-desc">
  <svg role="img" aria-labelledby="fig1-cap">…</svg>          <!-- desktop composition -->
  <ol class="mobile-composition">…</ol>                         <!-- mobile composition -->
  <figcaption id="fig1-cap"><i>Fig. 1</i> Across the session boundary. One-sentence takeaway.</figcaption>
  <div id="fig1-desc" class="sr-only"><!-- ordered, structured text equivalent --></div>
</figure>
```

Figure numbers run per page (Fig. 1, Fig. 2…) and are serif italic. The caption always states the takeaway, not just a title.

---

## 3. Visual specifications

### V1 · Hero specimen: "A reviewed conclusion, as your agent gets it back"

| Field | Specification |
|---|---|
| **Name** | V1, the hero specimen |
| **Page** | Home, S1 (hero). Its data is reused by F3 on How it works. |
| **Purpose** | Show the *unit of memory* at first glance: a single conclusion with its confidence, scope, grounding and status, in the form the agent actually receives. |
| **Question it answers** | "What exactly does Reverie remember?" |
| **Contains** | **Header:** the mono label `ec_query · group 1` on the left; the status mark and `canonical · reviewed` on the right. **Conclusion text** (serif 20 px): *"Cache invalidation must follow token refresh; clearing the cache first serves stale authentication tokens."* **Field list** (mono): `type invariant` · `scope repo:myapp › module:auth` · `confidence 0.67` plus a thin bar · `source debugging` · `grounding auth/token_manager.rs · auth/cache.rs`, `TokenManager::refresh · TokenManager::clear_cache`, `@ d64d0e07c1ab` · `related supported by 1`. **Footer** (serif italic): *"Past engineering understanding. Verify against current code before acting."* **Caption:** *"A reviewed conclusion, as your agent gets it back in a later session."* plus an `Example` tag if values are illustrative. |
| **Leaves out** | Window chrome (no dots or title bar), UUIDs, embeddings, metadata timestamps, retrieval scores, any "dashboard" framing, any second record. |
| **Composition** | Desktop: right half of the hero (columns 7–12), top-aligned with the headline. Surface background, 1 px rule, 2 px radius, 24 px padding. Mobile: full width below the hero copy and calls to action. |
| **Why a visual beats text** | "Engineering conclusions with confidence and grounding" is abstract. One concrete record makes it immediately legible and shows the system is real. This is the honest version of the "show the product" principle, since the product's real surface is text the agent receives. |
| **Static or interactive** | Static. |
| **Mobile** | Full width; mono at 13 px; paths wrap at `/` and `::`; field labels stay in a left column at 9 characters wide; no horizontal scroll. |
| **Sources** | Field set and order: PRODUCT.md §13 (formatted output: CONCLUSION, CONFIDENCE with label, brain and reviewed flag, flags, SCOPE, TYPE, SOURCE, GROUNDING, SYMBOLS, slots; framing note verbatim) and §5.1 (fields). Example conclusion, files, symbols and commit: PRODUCT.md §5.3 (shape exact, values illustrative), lightly reworded to the throughline. `confidence 0.67`: the worked scenario in §6 (step 4). `canonical · reviewed`: PRODUCT.md §13 (brain and reviewed flags). |
| **Before launch** | **Capture the exact label wording and field order from a real `ec_query` run** (format verbatim). Prefer real values from a small demo repository built around this scenario; otherwise keep the §6 example values and show the `Example` tag. |

---

### F1 · "Across the session boundary"

| Field | Specification |
|---|---|
| **Name** | Fig. 1, Across the session boundary |
| **Page** | Home, S3 (How it works) |
| **Purpose** | Explain the whole mechanism in one view: what happens to a conclusion when a session ends, and how it comes back. It also makes the two governance ideas visible: **review sits at the boundary**, and **the agent asks after reading the code**. |
| **Question it answers** | "When my session ends, what survives, who decides, and how does it reach the next session?" |
| **Contains** | (1) A **repository band** across the top, labelled *your repository: the code persists*. (2) **Session 1** column: *agent works out why users are logged out* → `ec_observe` → *extract: keeps the conclusion; rejects facts and play-by-play* → **session memory** with two dashed (unreviewed) records, annotated *usable now*. (3) **Boundary**: vertical dashed line labelled *session ends*. (4) **Review** gate at the boundary with three outcomes: *accept* (arrow down into long-term memory), *reject* (×), *skip* (*→ next session*). (5) A **long-term memory band** across the bottom holding solid (reviewed) records, including the throughline conclusion. (6) **Session 2** column: *agent reads the auth code* → `ec_query` → an arrow **up** from the long-term memory band → *relevant conclusions, with confidence, scope and files* → *verifies against current code* → *continues*. |
| **Leaves out** | Confidence numbers, relationship types, maintenance, scope levels, model or LLM details, the session brain's internals, any axis or curve implying "more understanding", any claim of improvement. |
| **Composition** (desktop, about 1100 × 440) | See the sketch below. Three columns (Session 1 · boundary with gate · Session 2) between two full-width bands. Process arrows run downward inside sessions; the accept arrow drops into the bottom band; the retrieval arrow rises from the bottom band into Session 2. |
| **Why a diagram beats text** | The insight is spatial: the boundary, where review sits on it, and what crosses it. Three numbered steps beside the figure carry the words; the figure carries the topology. |
| **Static or interactive** | Static. **Enhancement:** hovering or focusing step 1, 2 or 3 in the copy applies an `--accent-wash` to the matching region (extract, review, retrieve). Without JavaScript it is fully static. |
| **Mobile** | A vertical composition (sketch below): Session 1 → *session ends* → Review → Long-term memory → *later* → Session 2. The repository band becomes a thin left rail labelled *your repository*. The `ec_query` arrow points **up** from long-term memory into Session 2's block. Steps 1–3 are interleaved with the figure stages. |
| **Sources** | `ec_observe`, `ec_query`: PRODUCT.md §3.2. Extraction keeps conclusions and rejects facts, code descriptions, process steps and summaries: PRODUCT.md §6. Session memory is usable in-session: PRODUCT.md §8 (session ECUs ranked ×0.8), §13 (both brains searched). Review at session end with accept, reject and skip; skipped items carried forward: PRODUCT.md §10, §8. Only accepted conclusions reach long-term memory: PRODUCT.md §9. Agent queries after reading code: PRODUCT.md §3.2 (tool description: never before grounding in the repo); INSTALLATION.md §7.6. Results carry confidence, scope and files, with the verify framing: PRODUCT.md §13. "The code persists" is a framing statement (the repository is unchanged by Reverie; grounding reads it: PRODUCT.md §14). |

Desktop sketch:

```text
╭─ your repository · the code persists ─────────────────────────────────────────────────────────────╮
╰────────────────────────────────────────────────────────────────────────────────────────────────────╯
 SESSION 1                                  ┆              ┆  SESSION 2
 agent works out why users                  ┆              ┆  agent reads the auth code
 are logged out                             ┆  ┌────────┐  ┆        │
        │ ec_observe                        ┆  │ Review │  ┆        │ ec_query
        ▼                                   ┆  │        │  ┆        ▼
 extract: keeps the conclusion,             ┆  │ accept │  ┆  relevant conclusions, with
 rejects facts and play-by-play             ┆  │ reject ×  ┆  confidence, scope and files
        ▼                                   ┆  │ skip → next┆        │
 ┌ session memory · usable now ┐ ───────────►  └───┬────┘  ┆        ▼
 │ ┊ cache invalidation… ┊ ┊ … ┊ │          ┆      │ accept ┆  verifies against current code,
 └──────────────────────────────┘          ┆      ▼       ┆  continues
                                     session ends            ▲
╭─ long-term memory · reviewed ──────────────────────────────────────────┼─────────────────────────╮
│   ▌ … ▌ …   ▌ cache invalidation must follow token refresh ────────────┘                         │
╰────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

Mobile sketch:

```text
│ your repository          SESSION 1
│                          agent works something out
│                            ↓ ec_observe
│                          extract: keeps the conclusion, rejects the rest
│                            ↓
│                          session memory  ┊○┊ ┊○┊   usable now
│                          ─ ─ ─ session ends ─ ─ ─
│                          REVIEW   accept · reject · skip (→ next session)
│                            ↓ accept
│                          LONG-TERM MEMORY  ▌● ▌● ▌●
│                          ─ ─ ─ later ─ ─ ─
│                          SESSION 2
│                          agent reads the code
│                            ↑ ec_query (from long-term memory)
│                          relevant conclusions + confidence, scope, files
│                            ↓
│                          verifies against current code
```

---

### F2 · "The life of a conclusion" (summary)

| Field | Specification |
|---|---|
| **Name** | Fig. 2, The life of a conclusion |
| **Page** | Home, S4 (*Memory that can change its mind*). It leaves the homepage when V2 ships; see §1. |
| **Purpose** | Show that a remembered conclusion is a governed belief: it gains confidence, can be challenged, becomes an open question when a conflict persists, and is replaced by your decision with history kept. |
| **Question it answers** | "What happens to a remembered conclusion when new evidence arrives?" |
| **Contains** | One horizontal track of **six states** for the throughline conclusion, each a record glyph plus a short event label, with a **confidence bar** (no numerals on the homepage) under each: <br>1. **Extracted**: dashed record, `session · unreviewed` (bar 0.56). <br>2. **Accepted**: solid record, `canonical · reviewed` (0.56). <br>3. **Supported and used**: *a later conclusion agrees; your agent retrieves it* (0.67). <br>4. **Contradicted**: amber bar, `challenged`; *after a migration, a new conclusion disagrees* (0.55). <br>5. **Open question**: dashed plus `?`; *the conflict persists* (bar frozen). <br>6. **Superseded**: struck-through text with a `replaces` edge from the newer conclusion; *you prefer the newer conclusion; the old one is kept and linked* (bar frozen at 0.55). <br>A footnote line under the track: *If the code it cites is deleted, a conclusion like this is retired automatically.* |
| **Leaves out** | Numerals, log-odds, similarity values, priors, thresholds, the decay step, the names of edge types other than `replaces`, propagation to dependents. |
| **Composition** (desktop, about 1100 × 220) | A single horizontal rail. Six evenly spaced state cells (each about 150 px wide) joined by thin arrows; event labels above the rail (serif, 15 px); state labels below (mono, 13 px); bars directly under the record glyphs. The newer conclusion C appears only at step 6, as a small solid record above the rail with a `replaces` arrow down into A. |
| **Why a diagram beats text** | It is a state sequence where the *direction* of change matters (up, then down, then frozen, then replaced). Six labelled states with bars convey it in about three seconds; prose takes a paragraph and still doesn't show the frozen history. |
| **Static or interactive** | Static. |
| **Mobile** | A vertical timeline: states stacked top to bottom along a left rail; each row has the record glyph, state label, event text and bar on the right. All six states are kept. |
| **Sources** | States and transitions: PRODUCT.md §9 (lifecycle diagram: active → challenged → open_question; open_question → superseded by user preference). Support and contradiction move confidence: PRODUCT.md §11 (log-odds updates), §7.2. Retrieval reinforcement: PRODUCT.md §11, §3.1. Open-question parking after a scope-dependent persistence limit: PRODUCT.md §14 (forgetting task). User resolution "(b) mark one preferred → loser superseded with a real supersedes edge": PRODUCT.md §10. Superseded confidence frozen and history kept: PRODUCT.md §9, §12. Retirement on code deletion: PRODUCT.md §14.2. All bar values: §6 worked scenario. |

```text
 a later conclusion        after a migration,       the conflict       you prefer the newer
 agrees; it's retrieved    one disagrees            persists           conclusion
┊A┊ ──► ▌A ──────► ▌A ──────────► ▌A (amber) ──────► ┊A?┊ ─────────► A̶  ◄── replaces ── ▌C
session  accepted   supported      challenged          open question      superseded
▭▭▭▭▭▭   ▭▭▭▭▭▭     ▭▭▭▭▭▭▭▭       ▭▭▭▭▭▭              ▭▭▭▭▭▭ (frozen)    ▭▭▭▭▭▭ (frozen)
           If the code it cites is deleted, a conclusion like this is retired automatically.
```

---

### F3 · "Anatomy of a conclusion"

| Field | Specification |
|---|---|
| **Name** | Fig. 3, Anatomy of a conclusion |
| **Page** | How it works §1 (*What gets remembered*). §5 (*How your agent gets it back*) refers to it again. |
| **Purpose** | Teach the data model, and at the same time show what the agent receives from a query. |
| **Question it answers** | "What is stored with each conclusion, and what does each part do?" |
| **Contains** | The V1 specimen, extended with the **related-conclusions slot** expanded to show the supporting conclusion B (*"Token refresh must complete before any cache read in the auth middleware."*, labelled `supports`), plus **nine numbered annotations**: <br>① **Conclusion**: one conclusion per record; never rewritten once accepted. <br>② **Type**: one of eight: implication, constraint, principle, decision, observation, pattern, invariant, trade-off. <br>③ **Scope**: one of seven levels (engineering → subsystem) plus a path; it sets how fast confidence fades, how retrieval ranks it, and what code deletion retires. <br>④ **Confidence**: moved by evidence in log-odds; ranking uses the value after decay. <br>⑤ **Brain and status**: `canonical · reviewed` here (versus `session · unreviewed`); only active, challenged and open-question conclusions are retrieved. <br>⑥ **Source**: how it was reached; it sets the starting confidence (debugging starts higher than planning). <br>⑦ **Grounding**: files, symbols and the commit at extraction, checked against the repository. <br>⑧ **Related**: supporting, contradicting, dependent and superseding conclusions, returned together. <br>⑨ **Framing note**: always attached; verify before acting. |
| **Leaves out** | Raw JSON (it can be offered behind an optional *View as JSON* disclosure that shows the captured payload), embeddings, UUIDs, metadata timestamps, ranking scores. |
| **Composition** | Desktop: specimen in columns 1–7; annotations in the right margin (columns 8–12), aligned to their rows, joined by thin leader lines ending in small numbered markers on the specimen. Mobile: numbered markers inline at the right edge of each specimen row; annotations as an ordered list directly below. |
| **Why a diagram beats text** | Annotating a real record ties each concept to where it physically appears. A field list in prose would be a documentation dump. |
| **Static or interactive** | Static. Optional *View as JSON* uses native `<details>`, with no script. |
| **Mobile** | As above; leader lines are dropped below 768 px. |
| **Sources** | Fields and vocabularies: PRODUCT.md §5.1 (types, scope levels, statuses, immutability), §11 (priors by source type and scope; log-odds; effective confidence after decay), §13 (retrievable statuses; groups with supporting_evidence, contradictions, dependencies, superseded_by slots; framing note), §14.2 (grounding verification and scope-based retirement). The edit-at-acceptance nuance behind "never rewritten once accepted": PRODUCT.md §5.1 (the review-gate edit preserves the original). Example values: §6. |

---

### F4 · "Two brains and a review gate"

| Field | Specification |
|---|---|
| **Name** | Fig. 4, Two brains and a review gate |
| **Pages** | How it works §2 (*Who decides what's kept*); reused in the Paper (§5). |
| **Purpose** | Show the architecture of trust: where conclusions live, what can write where, and that the review gate is the only path for extracted conclusions into long-term memory, including the one documented exception. |
| **Question it answers** | "What exactly is the review boundary, and can anything get around it?" |
| **Contains** | **Top:** *your agent* (Claude Code · Cursor · OpenCode · Codex) with three tool arrows: `ec_observe` ↓ into the session brain; `ec_query` ↑ reading **both** brains; `ec_reconsolidate` ↓ into the canonical brain, labelled *updates a conclusion it just retrieved, with verified evidence; recorded*. <br>**Left: SESSION BRAIN.** Notes: *per repo and branch* · *unreviewed, usable now* · *relates new conclusions: supports / contradicts* · *no decay*. A **dashed pending-updates arrow** runs from it toward the canonical brain, stopping at the gate: *evidence about long-term conclusions waits here*. <br>**Centre: REVIEW GATE.** *Open questions first* · *accept →* (solid arrow into the canonical brain) · *reject → discarded* · *skip → next session*. <br>**Right: CANONICAL BRAIN.** Notes: *shared across projects* · *reviewed, long-term* · *relates fully: supports / contradicts / supersedes / depends on* · *confidence fades by scope* · *weak conclusions can be superseded*. <br>**Below the canonical brain:** a small loop labelled *maintenance, in the background: grounding checks · open-question parking · supersession · reversal of evidence from retired conclusions*. |
| **Leaves out** | Clustering (dormant), activation internals, numeric thresholds, trust weights, table names, model names. |
| **Composition** (desktop, about 1100 × 460) | Three columns (session brain · gate · canonical brain) under a full-width agent row. The gate is visibly narrower, so all solid arrows into the canonical brain pass through it, **except** the labelled `ec_reconsolidate` arrow, which is drawn deliberately and honestly. |
| **Why a diagram beats text** | "What can write where" is a graph of permissions. A diagram makes the single path, and the single exception, auditable at a glance; prose invites misreading ("nothing ever bypasses review"). |
| **Static or interactive** | Static. |
| **Mobile** | Vertical: agent → session brain → review gate → canonical brain → maintenance. `ec_query` is shown as a side note on both brain blocks (*read by `ec_query`*). `ec_reconsolidate` is a labelled note on the canonical block. |
| **Sources** | Two brains, trust, scope, decay: PRODUCT.md §8, §9. Lightweight versus full diffusion (3-way versus 5-way; supersession and depends_on only in the canonical brain): PRODUCT.md §7.1, §7.2, §7.4. Pending updates held until review and applied with exact deltas, or discarded: PRODUCT.md §7.2, §8. Review gate order and outcomes: PRODUCT.md §10. The canonical brain's only writers: PRODUCT.md §9. Reconsolidation writes immediately behind the labile gate: PRODUCT.md §3.2, §7.3, §9. Maintenance tasks: PRODUCT.md §14. Supported agents: INSTALLATION.md §2. |

```text
                       your agent  (Claude Code · Cursor · OpenCode · Codex)
            ec_observe │              ▲ ec_query (reads both)               │ ec_reconsolidate
                       ▼              │                                     ▼ updates a conclusion it just
╭─ SESSION BRAIN ─────────────╮       │      ╭─ CANONICAL BRAIN ───────────────╮   retrieved; recorded
│ per repo + branch           │       │      │ shared across projects          │
│ unreviewed · usable now     │   ┌───┴───┐  │ reviewed · long-term            │
│ supports / contradicts      │──►│REVIEW │─►│ supports / contradicts /        │
│ no decay                    │   │open Qs│  │ supersedes / depends on         │
│ ┄┄ pending updates ┄┄┄┄┄┄┄┄┄┼┄┄►│accept │  │ confidence fades by scope       │
╰─────────────────────────────╯   │reject×│  ╰───────────────▲─────────────────╯
                                  │skip →  │                  │ maintenance (background): grounding ·
                                  └───────┘                  ╰ open questions · supersession · reversal
```

---

### F5 · "The life of a conclusion, step by step"

| Field | Specification |
|---|---|
| **Name** | Fig. 5, The life of a conclusion, step by step |
| **Pages** | How it works §3 (*How a conclusion changes*): **interactive**. Paper (§6/§8): **static variant** (all steps expanded). |
| **Purpose** | Show *how* belief changes, with the real rules and computed values, so a technical reader can verify the mechanism. |
| **Question it answers** | "By how much does evidence move a conclusion, what triggers a status change, and who decides the outcome?" |
| **Contains** | The same throughline as F2, expanded to **eight steps plus one branch**, each showing the **event**, the **rule applied** (one line, mono), the resulting **stored confidence** (two decimals), the **status**, and for step 5 a dashed "ghost" bar for *effective* confidence. Full values are in §6. <br>1. Extracted in a debugging session (prior 0.70 × module 0.80 = **0.56**; `session · unreviewed`). <br>2. Accepted at review (**0.56**; `canonical · reviewed`; full relating pass runs). <br>3. Supported by conclusion B (+1.0 × similarity 0.78 × 0.52 in log-odds → **0.66**; the delta is stored on the edge, so it's reversible). <br>4. Retrieved by `ec_query` (+0.05 log-odds → **0.67**; the decay clock resets). <br>5. Weeks pass unused (effective confidence for ranking falls at the module rate, computed and never written; ghost bar; stored value stays **0.67**). <br>6. Contradicted by conclusion C (genuine after the two-stage check; −1.0 × 0.84 × 0.61 → **0.55**; `challenged`). <br>7. The conflict outlasts the module's time limit (both A and C → `open question`; confidence frozen; retrieved at half weight). <br>8. You resolve it at review: *prefer C* (C +0.05 → **0.62**, `active`; A → `superseded` by C, frozen at **0.55**, kept and linked). <br>**Branch:** *If `auth/cache.rs` is deleted:* at the next grounding check A → `deprecated` (module scope: any cited file gone), and conclusions that depend on it → `challenged`. |
| **Leaves out** | Activation and spreading scores, clustering, the high-stakes flag (not triggered here), embedding details, Stage-1 rule internals beyond one line. |
| **Composition** | Desktop: the F2 rail across the top (eight state glyphs plus the branch stub), with the current step highlighted. Below it, a **detail panel**: event (serif), rule (mono), confidence bar with value, status label. Controls: `← Previous`, `Next →`, and a step counter `4 / 8`. Static variant (paper): all eight detail panels in a vertical list. |
| **Why a diagram beats text** | The behaviour is a sequence of state and value changes. Stepping through it lets the reader see cause and effect one event at a time. A static table of eight rows would be accurate but much harder to read. |
| **Static or interactive** | **Interactive** (How it works): buttons plus ←/→ keys when focused; `aria-live="polite"` announces *"Step 6 of 8: contradicted by a newer conclusion. Confidence 0.55. Status: challenged."* The bar width transitions in 200 ms; under reduced motion it changes instantly. Without JavaScript, all steps render expanded (the static variant). |
| **Mobile** | The rail is hidden. Steps become a vertical list of collapsible rows (native `<details>`), with step 1 open by default and controls removed. The branch is the last row. |
| **Sources** | Priors and multipliers (debugging 0.70, implementation 0.65; module 0.80; corroboration +0.05 per extra source): PRODUCT.md §11. Support and contradiction updates in log-odds, delta stored on the edge, reversible: PRODUCT.md §11, §12, §21.3. Reinforcement +0.05 and decay clock reset: PRODUCT.md §11, §3.1. Lazy decay by scope, never written: PRODUCT.md §11, §14 (λ for module scope read from `DEFAULT_CONFIG`). Two-stage contradiction check, challenged status: PRODUCT.md §7.2. Open-question parking after the persistence limit: PRODUCT.md §14 (module limit read from config). Resolution (b) with the winner's +alpha bump and the loser superseded: PRODUCT.md §10. Grounding deprecation by scope and dependents challenged: PRODUCT.md §14.2. Similarity values (0.78, 0.84) are **example inputs**, labelled as such. |

---

### F6 · "How an EC-Bench run works"

| Field | Specification |
|---|---|
| **Name** | Fig. 6, How an EC-Bench run works |
| **Page** | EC-Bench. A variant may be used on the Continuity experiment page. |
| **Purpose** | Make the experimental design legible: what is compared, what is held constant, what differs, and how judging works. This is the precondition for reading the results ledger honestly. |
| **Question it answers** | "What exactly is being compared in a benchmark run?" |
| **Contains** | **Top:** *identical copy of the repository (FastAPI) for each arm*. **Two horizontal lanes:** *Arm A: with Reverie* and *Arm B: baseline*. **Three session blocks** per lane, in the same columns: *Session 1: investigation and architecture (14 prompts)* · *Session 2: implementation and debugging (13)* · *Session 3: planning (3)*. In Arm A, between sessions, a small gate glyph labelled *review: auto-accept (harness setting)*; inside Arm A's blocks, a note: *fresh context per prompt*. **Bottom:** both lanes' transcripts flow into one box, *LLM judge (same for both arms, full transcript)* → *five weighted metrics: architectural continuity 0.30 · cognition reuse 0.30 · repository groundedness 0.15 · engineering quality 0.15 · debugging/investigation efficiency 0.10*. **Legend:** *held constant: repository, prompts, agent harness, model, judge · differs: access to Reverie*. |
| **Leaves out** | **All results and scores.** They belong in the ledger table, with caveats, so the figure cannot be read as a result. Also the model names for the agent, run IDs and per-prompt detail. Protocol deviations of specific runs are noted in the ledger rows, not in the figure. |
| **Composition** (desktop, about 1100 × 380) | Lanes as two full-width rows of three blocks; the judge box centred below with arrows converging; the legend as a single mono line at the foot. |
| **Why a diagram beats text** | A two-arm, three-session design with a shared judge is a matrix. Text describing it needs a careful paragraph; the figure is unambiguous. |
| **Static or interactive** | Static. |
| **Mobile** | Each session becomes a row containing Arm A and Arm B side by side as two compact cells; the review gate becomes a line between rows (Arm A only); the judge box and metrics follow; the legend comes last. |
| **Sources** | PRODUCT.md §17: runner behaviour (repository copied per condition; isolated `EC_HOME`; per-condition agent config; fresh context per prompt; `--all-accept` between sessions), spec (30 prompts; 14/13/3 across three sessions; FastAPI), judges (GLM-5.2; full-transcript judge), metric weights. |
| **Before launch** | The owner confirms the figure matches the protocol of the runs listed in the ledger (paper §11 describes the sessions differently, as "each prompt structured as three sessions"; PRODUCT.md is the source here). |

---

### V2 · Side-by-side recording (reserved)

| Field | Specification |
|---|---|
| **Name** | V2, the continuity experiment recording |
| **Pages** | Continuity experiment (published state); Home slot S3b (published state). |
| **Purpose** | Let a visitor *watch* the same agent continue work across sessions with and without Reverie, as evidence. It is not an advertisement. |
| **Question it answers** | "What does Reverie actually change in a real session?" |
| **Contains** | (1) **Highlight cut** (90 s or less): a composited side-by-side, produced for legibility (zoomed crops, large terminal type), with **on-screen speed-up disclosure** and session chapter cards. (2) **Full recordings** per arm, with chapters (Session 1, 2, 3…) and key-moment markers. (3) **Captions** (WebVTT) and a **text transcript**. (4) **Metadata block** next to the player, as listed in design plan §13. |
| **Leaves out** | Background music, outcome text over the video ("Reverie wins"), any splicing that changes the order of events, any unexplained speed changes. |
| **Composition** | Desktop: the highlight player full width (16:9), with the metadata block in a right column or directly below; full recordings below as two players with optional synchronised play and seek. Home S3b: poster frame, play button, one-line neutral description, date, link. |
| **Why a visual beats text** | Continuity is a behaviour over time. Seeing the agent ask for, retrieve and verify a conclusion (or fail to) is direct evidence that no description can replace. |
| **Static or interactive** | Interactive: a native `<video>` element with custom chapter links. No autoplay with sound; a muted autoplay preview on Home is **not** used. |
| **Mobile** | The highlight cut plays as produced. The full recordings use one player with a `Without · With Reverie` segmented toggle that preserves the current timestamp when switching. Never a shrunken split screen of terminal text. |
| **Sources** | The experiment's own artifacts (run log, transcripts, ECU dumps, review decisions). No existing source; reserved. |

---

## 4. Pages with no diagram, and why

| Page | Why no diagram is necessary |
|---|---|
| **Research index** | The lineage is a dated sequence of documents, best read as a typographic list. The old radial "research agenda" graph added no information a list doesn't. |
| **Notebook entries** | Long-form writing; figures would be decoration. |
| **About** | People and practices; prose is the right medium. An optional real portrait is a photograph, not an explanatory figure. |
| **404** | Recovery links only. |
| **Continuity experiment (design state)** | The protocol is stated in text. An empty frame or a results-shaped figure would read as unfinished or premature. **Exception:** if the final protocol has more than two arms or a non-obvious session structure, add an F6-style protocol figure (the same grammar, no results). |

---

## 5. Existing visuals: all retired

| Component | File | Used on | Reason for retirement | Replaced by |
|---|---|---|---|---|
| ProblemDiagram | `components/svg/problem-diagram.tsx` | Home | A chart with unmeasurable axes ("Engineering Understanding" over sessions), which is the "meaningless graph" pattern. It compares agents to a human rather than explaining Reverie, and it implies a measurable accumulation curve the evidence doesn't yet show. | F1, which shows the same problem **structurally** (what crosses the session boundary) without implying measured gains |
| EmsPipeline | `components/svg/ems-pipeline.tsx` | `/ems` | Invents components that don't exist in code ("Understanding Extractor", "Cognition Integrator", "Cognition Evolution Engine"). Its 2500-unit viewBox is illegible on mobile. It uses decorative flow dots, and its SMIL animation ignores reduced motion. | F1 (overview) and F4 (architecture with real components) |
| EcBenchDiagram | `components/svg/ec-bench-diagram.tsx` | `/ec-bench` | A rising "accumulated understanding" curve with no data, so it reads as a result the benchmark hasn't produced. Its caption text scales down to unreadable sizes. | F6 (protocol) plus the results ledger |
| ResearchGraph | `components/svg/research-graph.tsx` | `/research` | A radial agenda map: a list in disguise, with decorative animated dots. | The typographic lineage on `/research` |
| ConceptualEvolution | `components/svg/conceptual-evolution.tsx` | `/ethos` | Memory → Understanding → Beliefs → Cognition is a branding chain with no mechanism. It is the only framer-motion use, a scroll reveal now out of policy. | Copy ("conclusions, not conversations"); no figure needed |
| ResearchNotebook | `components/svg/research-notebook.tsx` | `/notes` | A decorative illustration with looping animation and no information. | — |
| EngineeringBrain (unused) | `components/svg/engineering-brain.tsx` | — | Invented nodes, glow filters, and evolution labels ("merge / evolve / fade / strengthen") that don't match the real mechanics. | The honest version of its idea is F2, F5 and F4 |
| ResearchDesk (unused) | `components/svg/research-desk.tsx` | — | Decorative, with embedded slogan text; it was built for a page that was never made. | — |

The only things carried forward from the old visuals are the **warm-paper and ink palette** and **SVG with real text and `<title>`/`<desc>`**. The circle-node language, flow dots and SMIL animation are not.

---

## 6. Worked scenario: the numbers behind V1, F2 and F5

**Throughline conclusion A:** *"Cache invalidation must follow token refresh; clearing the cache first serves stale authentication tokens."*

| Property | Value |
|---|---|
| Type | invariant |
| Scope | module (`repo:myapp › module:auth`) |
| Source | debugging |
| Evidence sources | 1 |
| Grounding | `auth/token_manager.rs`, `auth/cache.rs`; `TokenManager::refresh`, `TokenManager::clear_cache` |

**Rules** (PRODUCT.md §11):

- prior = base[source] × multiplier[scope] + min((n−1) × 0.05, 0.15), clamped to [0.05, 0.95];
- L = ln(c / (1−c));
- support: L′ = L + 1.0 · r · c_source;
- contradiction: L′ = L − 1.0 · r · c_source;
- reinforcement: L′ = L + 0.05;
- effective decay (never written): L_eff = L − λ[scope] · days since last reinforcement;
- supersession trigger: c < 0.3 and a replacement exists;
- dependents re-evaluated below 0.4;
- high-stakes flag when both sides are above 0.7.

| Step | Event | Computation | Stored confidence | Status |
|---|---|---|---|---|
| 1 | A extracted (Session 1) | 0.70 × 0.80 = 0.560 | **0.56** | `session · unreviewed` |
| 2 | A accepted at review | promoted with the same confidence; full relating pass finds nothing related | **0.56** (L = 0.2412) | `canonical · active` |
| 3 | B accepted later and classified **supports** A. B is *"Token refresh must complete before any cache read in the auth middleware."*: constraint, module, implementation, prior 0.65 × 0.80 = **0.52**; similarity r = **0.78** (example input) | L = 0.2412 + 0.78 × 0.52 = 0.2412 + 0.4056 = 0.6468; c = σ(0.6468) | **0.66** (0.6563) | `active`; delta 0.4056 stored on the edge |
| 4 | A retrieved by `ec_query` | L = 0.6468 + 0.05 = 0.6968 | **0.67** (0.6675) | `active`; last_reinforced reset; labile |
| 5 | Weeks pass unused | effective L = 0.6968 − λ_module × days, **with λ_module read from `DEFAULT_CONFIG`** (PRODUCT.md gives only engineering 0.001 and subsystem 0.03); shown as a ghost bar | **0.67** stored; effective computed at build | `active` |
| 6 | C accepted and classified **contradicts** A. C is *"Since the session-store migration, token refresh no longer reads the cache; the ordering constraint no longer applies."*: implication, module, debugging, 2 evidence sources, prior 0.56 + 0.05 = **0.61**; similarity r = **0.84** (example input). Same scope level and shared file, so it goes to Stage 2 adjudication, which returns *genuine*. | L = 0.6968 − 0.84 × 0.61 = 0.6968 − 0.5124 = 0.1844; c = σ(0.1844) | **0.55** (0.5460) | `challenged` (not high-stakes, since 0.55 < 0.7; no propagation, since 0.55 ≥ 0.4; no supersession, since 0.55 ≥ 0.3) |
| 7 | The conflict outlasts the module persistence limit (**read from config**; PRODUCT.md gives subsystem 20 d … repo 60 d) | maintenance "forgetting" parks **both** A and C | **0.55** frozen (C frozen at 0.61) | `open question` (retrieved at ×0.5) |
| 8 | At the next review you choose **(b) prefer C** | C: L = ln(0.61/0.39) + 0.05 = 0.4473 + 0.05 = 0.4973; c = σ(0.4973) | C **0.62** (0.6218); A stays **0.55** frozen | C `active`; A `superseded` (semantic, since similarity 0.84 < 0.92), with a `supersedes` edge C → A |
| Branch | `auth/cache.rs` is deleted (instead of steps 6–8) | grounding check; module scope means any cited file gone | frozen | A `deprecated`; its `depends_on` dependents `challenged` |

Values: σ(x) = 1 / (1 + e^(−x)). Four-decimal results were computed by hand from the formulas above. **Implementation must recompute every value with `lib/confidence.ts` and assert it in unit tests against the Python reference**, so the figures can never drift from the product.

**Display rules**

| Figure | What it shows |
|---|---|
| F2 (Home) | Bars at steps 1, 2, 3+4 (0.67), 6, 7 and 8, without numerals |
| F5 (How it works) | Numerals to two decimals plus the rule line |
| V1 (hero) | 0.67, the state after step 4, so the hero and the timeline agree |

The similarity values (0.78, 0.84) and the scenario itself are **examples** and are labelled as such in captions: *"Example values, computed with Reverie's update rules."*

---

## 7. Production notes

- **Build order:**
  1. shared primitives (record, band, arrow, edge, status mark, bar);
  2. `lib/confidence.ts` plus tests;
  3. F1, F2 and V1;
  4. F3, F4 and F5;
  5. F6;
  6. V2 when the experiment ships.
- **Visual QA per figure:** both themes; widths 360, 390, 768, 1024, 1280 and 1440 px; 200% zoom; forced colours (strokes must stay visible: use `currentColor` and `CanvasText`-safe styles); reduced motion (F5); keyboard (F5 and the F1 highlight); screen reader (the caption and structured description are read once).
- **Content QA per figure:** every label maps to a source row in this document; no element appears that isn't listed in that figure's "Contains" field.
- **Performance:** server-rendered SVG with no runtime libraries; F5's client island under 5 KB gzipped.

---

## 8. Review checklist (for approval)

For each visual, please confirm or strike:

| Visual | Approve purpose? | Approve content and exclusions? | Approve composition? | Approve interaction? | Notes |
|---|---|---|---|---|---|
| V1 Hero specimen | ☐ | ☐ | ☐ | n/a | Real capture or `Example` values? |
| F1 Across the session boundary | ☐ | ☐ | ☐ | ☐ (hover/focus link) | |
| F2 Life of a conclusion (summary) | ☐ | ☐ | ☐ | n/a | Leaves Home when V2 ships? |
| F3 Anatomy of a conclusion | ☐ | ☐ | ☐ | ☐ (optional JSON disclosure) | |
| F4 Two brains and a review gate | ☐ | ☐ | ☐ | n/a | Show the `ec_reconsolidate` exception as drawn? |
| F5 Life of a conclusion, step by step | ☐ | ☐ | ☐ | ☐ (stepper) | Worked numbers in §6 |
| F6 How an EC-Bench run works | ☐ | ☐ | ☐ | n/a | Confirm protocol accuracy |
| V2 Side-by-side recording | ☐ | ☐ | ☐ | ☐ | Hosting; preregistration |
| Retire all eight existing SVGs (§5) | ☐ | | | | |
| "No diagram" pages (§4) | ☐ | | | | |
