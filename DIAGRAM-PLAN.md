# Reverie website: diagram and visual plan

**Status:** **approved by the owner on 2026-10-05.** No diagram has been coded for the site yet; the homepage figures are drawn in the static preview. Implementation follows `IMPLEMENTATION-TASKS.md`.
**Date:** 2026-10-05 · **Companion to:** [`WEBSITE-DESIGN-PLAN.md`](./WEBSITE-DESIGN-PLAN.md) (§9 summarises this file)
**Approval:** every visual below needs sign-off before implementation. §8 is a review checklist.
**Reference rendering:** V1, P1, F1, M1, F2 and O1, and the reserved V2 frame, are drawn in [`design/homepage-preview/home.html`](./design/homepage-preview/home.html) (version 2), in both desktop and mobile compositions. Screenshots, and a storyboard of the M1 animation, are in `design/homepage-preview/screenshots/`. Port their geometry and keyframes when implementing. Where wording differs between the preview and this file, the preview is newer.
**Revision 2 (2026-10-05):** after the owner's review of the first preview, the homepage became visual-led. V1 and F1 were simplified, F2 lost its supporting copy, and P1, M1 and O1 were added. §1, §3, §5, §7 and §8 are updated.

All factual elements cite their source. Most cite **PRODUCT.md** (the implementation archaeology) or **INSTALLATION.md**; a few cite the paper *Reverie: A Biological Memory Architecture for AI Agents* (5 Sep 2026), but only where the paper agrees with the implementation (see design plan §1.7A).

---

## 1. Rules and budget

1. **Zero to three diagrams or explanatory visuals per page.** Zero is a valid answer. **Exception:** the homepage is visual-led by owner decision (2026-10-05) and carries six visuals, each replacing copy.
2. A visual must communicate something that would otherwise be **harder to understand**. Decoration fails this test.
3. Every element of every visual is **true to the implementation**. Example values are computed with the product's real rules and labelled `Example`.
4. **Nothing imitates a product UI that doesn't exist**: no app windows, dashboards, title-bar dots or fake terminals.
5. Diagrams are **static by default**. Interaction is allowed only when it explains (Fig. 5). There is no ambient animation, with one exception: **M1**, the homepage memory map. It is an explanatory loop with a pause button; it stops off screen and is static under reduced motion.
6. Every visual has a **mobile composition**: content re-laid vertically, never scaled down, with text never below 13 px.
7. Every visual has a **text equivalent** (design plan §15).
8. **Prefer a diagram wherever it explains better than text** (owner rule, 2026-10-05). Figure labels are at most eight words.

### Budget by page

| Page | Visuals | Count |
|---|---|---|
| Home `/` | V1 hero graph · P1 Every session starts from zero · F1 From one session to the next · Fig. 2: M1 memory map above F2 one conclusion, up close · O1 Your memory, not your agent's · plus the S3b video slot (a reserved frame until V2 exists) | **6** plus the slot (owner exception) |
| Home, after the continuity experiment is published | V1 · P1 · F1 · M1 · O1 · V2 side-by-side recording (F2 leaves the homepage; S4 links to F5) | **6** |
| How it works `/how-it-works` | F3 Anatomy of a conclusion · F4 Two brains and a review gate · F5 The life of a conclusion, step by step | **3** |
| Paper `/research/biological-memory-architecture` | F4 (reused) · F5 static variant (reused) | **2** |
| EC-Bench `/research/ec-bench` | F6 How an EC-Bench run works | **1** |
| Continuity experiment `/research/continuity-experiment` | Design state: none (optional F6 variant, §4) · Published: V2, plus an optional F6 variant | **0 / ≤ 2** |
| Research index `/research` | — | **0** |
| Notebook entries `/research/notes/[slug]` | — | **0** |
| About `/about` | — | **0** |
| 404 | — | **0** |

**Tables are not counted as diagrams.** They are typographic content (the MCP tools, the supported agents, scope retirement rules, the results ledger, the archive list) and follow the design system's table styles.

**One throughline.** The homepage and How it works illustrate the *same* example conclusion, the token-refresh invariant from the paper's own example: *"Cache invalidation must follow token refresh; clearing the cache first serves stale authentication tokens."* It appears in V1 (with its neighbours), P1 (worked out again each day), M1 (among related conclusions), F2 and F5 (evolving) and F3 (dissected). §6 contains the worked numbers.

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
| **Process arrow** | 1.5 px ink line, 6 px open arrowhead | Tool names in mono (`ec_observe`), actions in serif. No tool names on the homepage. |
| **Hazy neighbour** (V1) | A record at about 50% opacity, still legible | Serif 12.5 px; relationship label in mono above |
| **Out-of-focus record** (V1) | A small record with grey text bars, about 40% opacity, blurred about 1 px | — |
| **Event label** (M1) | — | Serif italic 14 px; it explains a change (for example *strengthened*) and is never a status name |
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
- **Colour.** Ink on paper, with `--accent` only for the reviewed bar and the current-step wash in Fig. 5. `--challenged` (amber) is used only for challenged states and contradiction ticks. No other colours. Dark theme: tokens swap automatically (design plan §10.3).
- **Minimum sizes.** Diagram text at least 13 px rendered; stroke at least 1 px; arrowheads at least 6 px.

### 2.3 Construction

- **One data definition per diagram** (nodes, edges, labels, steps) drives **two compositions**:
  - **Desktop (≥ 768 px):** inline SVG with real `<text>`, rendered at intrinsic size (at most 1200 px wide; switches to the mobile composition before text would drop below 13 px).
  - **Mobile (< 768 px):** HTML/CSS vertical layout (ordered lists, small inline SVG arrows).

  Only one composition is rendered at a time (`display: none` on the other), so assistive technology reads one.
- Implemented as **React server components** (no client JavaScript), except F5 (stepper) and M1 (pause button and off-screen observer), which are small client islands.
- Confidence values come from `lib/confidence.ts`, a TypeScript port of the `ec/confidence.py` rules using `DEFAULT_CONFIG` constants. Its unit tests compare against values from the Python implementation (design plan §19.3).

### 2.4 Captions and accessibility pattern

```html
<figure aria-labelledby="fig1-cap" aria-describedby="fig1-desc">
  <svg role="img" aria-labelledby="fig1-cap">…</svg>          <!-- desktop composition -->
  <ol class="mobile-composition">…</ol>                         <!-- mobile composition -->
  <figcaption id="fig1-cap"><i>Fig. 1</i> From one session to the next. One-sentence takeaway.</figcaption>
  <div id="fig1-desc" class="sr-only"><!-- ordered, structured text equivalent --></div>
</figure>
```

Figure numbers run per page (Fig. 1, Fig. 2…) and are serif italic. The caption always states the takeaway, not just a title.

---

## 3. Visual specifications

### V1 · The hero graph: "One reviewed conclusion and its links"

| Field | Specification |
|---|---|
| **Name** | V1, the hero graph |
| **Page** | Home, S1 (hero). The specimen card is reused at full detail by F3 on How it works. |
| **Purpose** | Show the *unit of memory* at first glance (one conclusion with its confidence, scope, grounding and status), and show that conclusions are connected, without showing many of them. |
| **Question it answers** | "What exactly does Reverie remember?" |
| **Contains** | **Specimen** (330 px wide): <br>• Header: `conclusion` on the left; the reviewed mark and `reviewed` on the right. <br>• Conclusion, in serif 18.5 px: *"Cache invalidation must follow token refresh; clearing the cache first serves stale authentication tokens."* <br>• Fields, in mono: `type invariant` · `scope repo:myapp > module:auth` · `confidence 0.67` with a thin bar · `grounding auth/token_manager.rs`, `auth/cache.rs @ d64d0e0`. <br>• Foot, in serif italic: *"Verify against current code before acting."* <br>**First ring** (hazy, at about 50% opacity, still legible): three neighbours to the right, each with a mono relationship label: <br>• `supports`: *"Token refresh completes before any cache read"* (solid edge into the card); <br>• `depends on`: *"TokenManager is the only writer of the token cache"* (dashed edge out of the card); <br>• `replaced`: *"Random logouts come from session-store expiry"* (struck through; the card replaced it). <br>**Second ring** (out of focus): two small records with grey text bars, blurred by about 1 px, linked to the first ring. <br>**Caption:** *"One reviewed conclusion and its links."* plus an `Example` tag. |
| **Leaves out** | Tool names (`ec_query`); the words *canonical* and *ECU*; window chrome; UUIDs, embeddings, timestamps and scores; more than three legible neighbours; any dashboard framing. |
| **Composition** | **Desktop:** columns 7–12 (588 px). The card is on the left and the network fills the remaining 258 px; nothing crosses the grid's right edge. **Mobile:** the card at full width, then the neighbours as an indented list at reduced opacity. |
| **Why a visual beats text** | One concrete record makes "engineering conclusions with confidence and grounding" legible at once. The faded neighbours say "connected memory" without a paragraph, and the blur keeps the eye on the card. |
| **Static or interactive** | Static. |
| **Mobile** | As above; mono at 13 px; paths wrap at `/`; no horizontal scroll. |
| **Sources** | Fields: PRODUCT.md §13 and §5.1. Relationship types (supports, depends_on, supersedes): PRODUCT.md §12. Results returned grouped with related conclusions: PRODUCT.md §13. `confidence 0.67`: §6, step 4. The foot shortens the framing note in PRODUCT.md §13. Example conclusion, files and commit: PRODUCT.md §5.3 (shape exact, values illustrative). |
| **Before launch** | V1 is an illustration labelled `Example`, not a literal `ec_query` output, but its fields must match a real record's shape. The literal capture now goes to F3 on How it works. The blur is the single exception to "no blur" (design plan §10.3), made at the owner's request for hazy neighbours. |

```text
                                    supports
 ┌ conclusion ─────────── ▌reviewed ┐ ◄── ▌ Token refresh completes      ░░▌░░░░
 │ Cache invalidation must follow   │      before any cache read     ░░░░░░  (out of focus)
 │ token refresh; clearing the …    │   depends on
 │ type        invariant            │ ┄┄► ▌ TokenManager is the only     ░░▌░░░░
 │ scope       repo:myapp > …       │      writer of the token cache
 │ confidence  0.67 ▬▬▬▬▬▭▭         │   replaced
 │ grounding   auth/token_manager.rs│ ──►  (struck) Random logouts come from …
 │ Verify against current code …    │
 └──────────────────────────────────┘
```

---

### P1 · "Every session starts from zero"

| Field | Specification |
|---|---|
| **Name** | P1, Every session starts from zero |
| **Page** | Home, S2 (problem), columns 7–12 |
| **Purpose** | Make the continuity problem felt in about two seconds. |
| **Question it answers** | "What goes wrong without memory?" |
| **Contains** | Three rows labelled in mono `Monday`, `Tuesday` and `Wednesday`. In each, five grey reasoning bars (the agent working) lead to the same dashed record, *why users get logged out*. A dashed vertical line labelled *session ends* closes every row. Caption: *"Each new session works it out again, from zero."* |
| **Leaves out** | Axes, curves, numbers, time estimates, any claim about how much time is lost, and other approaches. |
| **Composition** | Desktop: 588 × 196 SVG. Mobile: 350 × 236, with each day's label above its bars. |
| **Why a diagram beats text** | The repetition is the message: three identical rows say "again and again" faster than the paragraph they replace. |
| **Static or interactive** | Static. |
| **Sources** | The problem framing: paper §1–2 (*"The bottleneck is not intelligence. It is continuity."*). The scenario: the throughline, from the paper's own example. Dashed means the conclusion exists only in the session (§2.1). |

```text
                                                              ┆ session ends
 Monday     ▬▬▬ ▬▬ ▬▬▬▬ ▬▬ ▬▬▬   ┊ why users get logged out ┊ ┆
 Tuesday    ▬▬▬ ▬▬ ▬▬▬▬ ▬▬ ▬▬▬   ┊ why users get logged out ┊ ┆
 Wednesday  ▬▬▬ ▬▬ ▬▬▬▬ ▬▬ ▬▬▬   ┊ why users get logged out ┊ ┆
```

---

### F1 · "From one session to the next"

| Field | Specification |
|---|---|
| **Name** | Fig. 1, From one session to the next |
| **Page** | Home, S3 (How it works) |
| **Purpose** | Explain the whole mechanism in one view, with the two governance ideas visible: **you review at the session boundary**, and **the agent asks after reading the code**. |
| **Question it answers** | "When my session ends, what survives, who decides, and how does it come back?" |
| **Contains** | Four drawn stations (each 240 × 150) from left to right. A dashed line labelled *session ends* separates stations 1 and 2, and one labelled *next session* separates 3 and 4. <br>**1 Your agent works.** A session panel with grey reasoning bars and two dashed records labelled *conclusion*. Line: *"Conclusions are extracted as it goes."* <br>**2 You review.** Two dashed records pass a gate (a 2 px vertical bar). One becomes solid with a ✓; the other fades, struck through, with ×. Line: *"Keep what's right. Drop the rest."* <br>**3 Memory builds up.** A sunken band of solid records with links between them; one is stronger (2 px border) and one has faded. Line: *"Grounded in your code."* <br>**4 Your agent asks.** A session panel with reasoning bars; a solid record, *relevant conclusion*, arrives from memory, noted *checked against the code*. Line: *"After reading the code, not before."* <br>Arrows join the stations. Caption: *"Fig. 1 Dashed: not yet reviewed. Solid, with a blue edge: reviewed by you."* |
| **Leaves out** | Tool names; the repository band; *skip* (How it works shows it); confidence numbers; relationship types; maintenance; scope levels; model details; any curve implying improvement. |
| **Composition** | **Desktop:** a 1200 × 270 SVG with stations at x = 30, 330, 630 and 930; each station's title and line sit under it. **Mobile:** the four station drawings stacked (each at most 330 px wide), with the two boundaries as dashed dividers between them. |
| **Why a diagram beats text** | The insight is spatial: where the boundary falls, where review sits, and what crosses it. The drawings carry the meaning; the labels stay short. |
| **Static or interactive** | Static. The revision-1 hover link is dropped because the steps now live inside the figure. |
| **Sources** | Extraction during the session: PRODUCT.md §3.2, §6. Review at session end, accept and reject (skip is covered on How it works): PRODUCT.md §10, §8. Only accepted conclusions reach long-term memory: PRODUCT.md §9. Grounding: PRODUCT.md §5.1, §14.2. The agent asks after reading the code: PRODUCT.md §3.2; INSTALLATION.md §7.6. The verify framing: PRODUCT.md §13. |

```text
               ┆ session ends                              ┆ next session
 ┌──────────┐  ┆   ┊ ┊ ──►┃ ▌▭▭ ✓      ░░░░░░░░░░░░░░░░    ┆   ┌───────────────┐
 │ ▬▬▬▬▬▬   │──┼─► ┊ ┊ ──►┃ ─▭─ ×  ──► ░ ▌▭ ▌▭ ▌▭ (links) ░ ──┼─► │ ▌relevant …   │
 │ ┊concl.┊ │  ┆          ┃            ░░░░░░░░░░░░░░░░    ┆   │ checked against│
 └──────────┘  ┆                                           ┆   └───────────────┘
 1 Your agent works  2 You review   3 Memory builds up     ┆ 4 Your agent asks
```

---

### M1 · The memory map (Fig. 2, top panel)

| Field | Specification |
|---|---|
| **Name** | M1, the memory map |
| **Page** | Home, S4 (*Memory that can change its mind*), above F2 in the same figure |
| **Purpose** | Show memory as a living structure whose beliefs change. Conclusions are added after review, strengthen each other, get challenged and replaced with their history kept, and fade when unused. |
| **Question it answers** | "Isn't this just a pile of notes?" |
| **Contains** | Thirteen short conclusions drawn as solid records with blue edges, linked by `supports` (solid) and `depends on` (dashed) edges; the static layout is in the preview. A **16-second loop** plays five events, each with a serif-italic label: <br>1. **Added** (0.5–4.4 s). A new conclusion, *cache cleared too early*, slides in 28 px from the left as a dashed record (*new · awaiting review*). It turns solid at 2.2–2.9 s (*added after review*), and its `supports` edge draws into *cache reads wait for refresh* (3.2–4.4 s). <br>2. **Strengthened** (4.0–5.0 s). That conclusion's border thickens from 1 px to 2.4 px (*strengthened*). <br>3. **Challenged** (5.6–9.9 s). A newer conclusion, *tokens refresh before expiry*, drops in 18 px from above. An amber contradiction edge with a perpendicular tick reaches *tokens refresh at expiry*, whose left bar turns amber (*challenged*). <br>4. **Superseded** (9.3–14.4 s). The older conclusion is struck through and dimmed to 45%, with a `replaces` arrow from the newer one (*superseded · kept*). <br>5. **Fading** (9.6–14.7 s). An unused conclusion, *build cache per lockfile*, fades to 20% opacity together with its edge (*fading · unused*). <br>From 14.4 s to 16 s everything returns to the start state. <br>A legend sits under the map (*new, awaiting review · strengthened · challenged · superseded, kept · fading when unused*), with a *pause* button above its right edge. |
| **Leaves out** | Numerals and confidence bars (F2 below carries them); the open-question step (F2 shows it; the map compresses challenge → supersession); tool names; scope levels; any deletion. |
| **Composition** | **Desktop:** a 1200 × 280 SVG. Records are 28 px tall with 13 px serif labels; event labels are 14 px serif italic. **Mobile:** a separate 360 × 410 map with six conclusions and the same events. |
| **Motion rules** | This is the single motion exception (design plan §16). <br>• **Mechanism:** CSS keyframes on SVG elements, sharing one 16 s cycle. <br>• **When it plays:** it starts when 30% of it is visible and pauses off screen (IntersectionObserver). <br>• **Control:** a visible pause/play button (a real `<button>` whose accessible name switches between "Pause animation" and "Play animation"; no `aria-pressed`). <br>• **Reduced motion:** under `prefers-reduced-motion: reduce`, a static map shows every event's end state with its label. <br>• **What may change:** only opacity, translations of at most 28 px, `stroke-dashoffset`, stroke width and colour. Nothing affects layout. <br>• **Arrowheads** appear only after their line has finished drawing. |
| **Why a diagram beats text** | Belief change happens over time, and a moving map shows it in one loop. The four lines it replaces took a paragraph and couldn't show a structure changing. |
| **Text equivalent** | An ordered list of the five events, in the visually hidden description. |
| **Sources** | Added after review, with pending evidence applied at review: PRODUCT.md §7.2, §8, §10. Support raises confidence: PRODUCT.md §11. A contradiction marks the existing conclusion challenged: PRODUCT.md §7.2. Supersession keeps the old conclusion, frozen and linked: PRODUCT.md §9, §12. Fading is lazy decay by scope and is never written: PRODUCT.md §11. Nothing is hard-deleted: PRODUCT.md §14; paper §8. The node labels are illustrative conclusions, covered by the caption *"Example values…"*. |

```text
 ┊cache cleared too early┊ ─(slides in, turns solid)─► ▌cache reads wait for refresh  (border thickens)
 ▌tokens refresh before expiry ──┤ amber ──► ▌tokens refresh at expiry  → challenged
                               └─ replaces ──► (struck) tokens refresh at expiry  → superseded · kept
 ▌build cache per lockfile  ░░░ (fades)  → fading · unused
```

---

### F2 · "One conclusion, up close" (Fig. 2, bottom panel)

| Field | Specification |
|---|---|
| **Name** | F2, the life of one conclusion (summary) |
| **Page** | Home, S4, under M1 and the mono panel label *One conclusion, up close*. It leaves the homepage when V2 ships, because F5 on How it works covers it (§1). |
| **Purpose** | Show that a remembered conclusion is a governed belief. It gains confidence, can be challenged, becomes an open question when a conflict persists, and is replaced by your decision with its history kept. |
| **Question it answers** | "What happens to a remembered conclusion when new evidence arrives?" |
| **Contains** | One horizontal track of **six states** for the throughline conclusion. Each state has a record glyph, a mono status label and a **confidence bar** (no numerals on the homepage), with a serif event label underneath: <br>1. `unreviewed`: dashed record (bar 0.56). Event: *Extracted*. <br>2. `reviewed`: solid record (0.56). Event: *You accept it*. <br>3. `reviewed`: 2.2 px border (0.67). Event: *Supported and used*. <br>4. `challenged`: amber bar (0.55). Event: *A new one disagrees*. <br>5. `open question`: dashed record plus `?`, bar frozen. Event: *Conflict persists*. <br>6. `superseded`: struck-through text, with a `replaces` edge from a small *newer conclusion* record above it; bar frozen at 0.55. Event: *You prefer the newer*. <br>A footnote line under the track reads: *"If the code it cites is deleted, a conclusion like this is retired automatically."* |
| **Leaves out** | Numerals, log-odds, similarity values, priors, thresholds, the decay step, the names of edge types other than `replaces`, propagation to dependents. Status labels stay in mono and use real statuses only; explanations go in the serif event labels. |
| **Composition** (desktop, 1200 × 250) | A single horizontal rail of six state cells (164 px records) joined by thin arrows. Status labels in mono sit under the records, then the bars, then the event labels in serif. The newer conclusion appears only at step 6, as a small solid record above the rail with a `replaces` arrow down. |
| **Why a diagram beats text** | It is a state sequence where the *direction* of change matters: up, then down, then frozen, then replaced. Six labelled states with bars convey it in about three seconds. |
| **Static or interactive** | Static. |
| **Mobile** | A vertical timeline: states stacked along a left rail, each row with its status label, event text and bar. All six states are kept. |
| **Sources** | States and transitions: PRODUCT.md §9 (active → challenged → open_question; open_question → superseded by user preference). Support and contradiction move confidence: PRODUCT.md §11 (log-odds updates), §7.2. Retrieval reinforcement: PRODUCT.md §11, §3.1. Open-question parking after a scope-dependent persistence limit: PRODUCT.md §14 (the forgetting task). User resolution, "(b) mark one preferred → loser superseded with a real supersedes edge": PRODUCT.md §10. Superseded confidence frozen and history kept: PRODUCT.md §9, §12. Retirement on code deletion: PRODUCT.md §14.2. All bar values: the §6 worked scenario. |

```text
                                                                                    ▌newer conclusion
                                                                                          │ replaces
┊A┊ ──► ▌A ──► ▌A (2 px) ──► ▌A (amber) ──► ┊A ?┊ ──► A (struck)
unreviewed  reviewed  reviewed   challenged    open question   superseded
▬▬▬▬▭▭     ▬▬▬▬▭▭    ▬▬▬▬▬▭     ▬▬▬▬▭▭         ▬▬▬▬▭▭ (frozen) ▬▬▬▬▭▭ (frozen)
Extracted  You accept it  Supported and used  A new one disagrees  Conflict persists  You prefer the newer
          If the code it cites is deleted, a conclusion like this is retired automatically.
```

---

### O1 · "Your memory, not your agent's" (Fig. 3)

| Field | Specification |
|---|---|
| **Name** | O1, Fig. 3, the ownership hub |
| **Page** | Home, S5 |
| **Purpose** | Show that the memory belongs to the developer and that every agent they connect shares it, whatever model the agent runs. |
| **Question it answers** | "Am I locked into one agent? Where does my memory live?" |
| **Contains** | **The hub:** a central solid record with a 4 px blue edge: *Your memory* (serif 21 px), `~/.ec/ec.db` (mono), *on your machine · reviewed by you* (serif italic). <br>**The agents:** five records around it: Claude Code and Cursor on the left; OpenCode, Codex and *Any MCP agent* (dashed) on the right. <br>**Connectors:** thin lines to the hub, with no arrowheads, because agents both read and write. One `MCP` label per side. <br>**Caption:** *"Fig. 3 Solid: set up for you. Dashed: set up by hand."* |
| **Leaves out** | Tool names; model logos or names; any cloud or sync icon; arrows suggesting data leaving the machine; agent counts. |
| **Composition** | **Desktop:** a 1200 × 290 SVG. **Mobile:** the hub as a bordered block, then the agents in a two-column grid, with a short connector from the hub. |
| **Why a diagram beats text** | "Shared by every agent" is a topology: one hub, many spokes. |
| **Static or interactive** | Static. |
| **Sources** | One SQLite file at `~/.ec/ec.db`, shared: PRODUCT.md §1, §15. The installer configures four agents: INSTALLATION.md §2. Other MCP clients can be set up by hand: INSTALLATION.md §10.5. Each agent's MCP entry starts the same local server: INSTALLATION.md §7–8. Reviewed by you: PRODUCT.md §9–10. |
| **Before launch** | Design plan §20, question 20: verify one client the installer doesn't configure, or remove *Any MCP agent*. |

```text
 ┌ Claude Code ┐ ─MCP─╮   ┌──────────────────────────┐   ╭─── ┌ OpenCode ┐
                       ├──►│▌ Your memory             │◄──┼──── ┌ Codex    ┐
 ┌ Cursor      ┐ ─────╯   │  ~/.ec/ec.db              │   ╰┄┄┄ ┊ Any MCP agent ┊  (by hand)
                           │  on your machine · reviewed by you │
                           └──────────────────────────┘
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
| **Pages** | Continuity experiment (published state); Home S3b, which shows a reserved frame now and the video once published. |
| **Purpose** | Let a visitor *watch* the same agent continue work across sessions with and without Reverie, as evidence. It is not an advertisement. |
| **Question it answers** | "What does Reverie actually change in a real session?" |
| **Contains** | (1) **Highlight cut** (90 s or less): a composited side-by-side, produced for legibility (zoomed crops, large terminal type), with **on-screen speed-up disclosure** and session chapter cards. (2) **Full recordings** per arm, with chapters (Session 1, 2, 3…) and key-moment markers. (3) **Captions** (WebVTT) and a **text transcript**. (4) **Metadata block** next to the player, as listed in design plan §13. |
| **Leaves out** | Background music, outcome text over the video ("Reverie wins"), any splicing that changes the order of events, any unexplained speed changes. |
| **Composition** | **Experiment page (desktop):** the highlight player at full width (16:9), with the metadata block in a right column or directly below. The full recordings sit below as two players with optional synchronised play and seek. <br>**Home S3b:** the condition labels (*Without Reverie*, *With Reverie*) in a two-column row above the poster frame and play button. Below: one metadata line (date · agent and model · sessions · speed-up) and *Protocol, recordings and results →*. |
| **Reserved state (Home, now)** | A dashed 1200 × 260 frame split into two halves, labelled *Without Reverie* and *With Reverie*. Each half names its condition: *No memory between sessions* and *Reviewed conclusions between sessions*. Under it: an `In design` tag and *"The recording will appear here, whatever it shows."* There is no player, play button or thumbnail, and nothing that predicts a result. On mobile the halves stack. |
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
| EngineeringBrain (unused) | `components/svg/engineering-brain.tsx` | — | Invented nodes, glow filters, and evolution labels ("merge / evolve / fade / strengthen") that don't match the real mechanics. | The honest version of its idea is M1, F2, F5 and F4: every event in M1 maps to a real rule |
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
  3. the homepage set: V1, P1, F1, M1, F2 and O1;
  4. F3, F4 and F5;
  5. F6;
  6. V2 when the experiment ships.
- **Visual QA per figure:** both themes; widths 360, 390, 768, 1024, 1280 and 1440 px; 200% zoom; forced colours (strokes must stay visible: use `currentColor` and `CanvasText`-safe styles); reduced motion (F5 and M1: the static map must show every event's end state); keyboard (F5 and the M1 pause button); screen reader (the caption and structured description are read once).
- **Content QA per figure:** every label maps to a source row in this document; no element appears that isn't listed in that figure's "Contains" field.
- **Performance:** server-rendered SVG with no runtime libraries; the F5 and M1 client islands are each under 5 KB gzipped. M1 animates only compositor-friendly properties and pauses off screen.

---

## 8. Review checklist (for approval)

For each visual, please confirm or strike:

| Visual | Approve purpose? | Approve content and exclusions? | Approve composition? | Approve interaction? | Notes |
|---|---|---|---|---|---|
| V1 Hero graph | ☐ | ☐ | ☐ | n/a | Neighbour wording; the blur exception |
| P1 Every session starts from zero | ☐ | ☐ | ☐ | n/a | |
| F1 From one session to the next | ☐ | ☐ | ☐ | n/a | "Drop the rest" simplifies skip |
| M1 Memory map | ☐ | ☐ | ☐ | ☐ (16 s loop, pause) | The one motion exception |
| F2 One conclusion, up close | ☐ | ☐ | ☐ | n/a | Leaves Home when V2 ships? |
| O1 Your memory, not your agent's | ☐ | ☐ | ☐ | n/a | "Any MCP agent" depends on design plan §20, question 20 |
| F3 Anatomy of a conclusion | ☐ | ☐ | ☐ | ☐ (optional JSON disclosure) | |
| F4 Two brains and a review gate | ☐ | ☐ | ☐ | n/a | Show the `ec_reconsolidate` exception as drawn? |
| F5 Life of a conclusion, step by step | ☐ | ☐ | ☐ | ☐ (stepper) | Worked numbers in §6 |
| F6 How an EC-Bench run works | ☐ | ☐ | ☐ | n/a | Confirm protocol accuracy |
| V2 Side-by-side recording | ☐ | ☐ | ☐ | ☐ | Hosting; preregistration; the homepage slot is visible before release (owner decision) |
| Retire all eight existing SVGs (§5) | ☐ | | | | |
| "No diagram" pages (§4) | ☐ | | | | |
