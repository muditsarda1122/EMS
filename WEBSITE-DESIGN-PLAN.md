# Reverie website: design plan

**Status:** **approved by the owner on 2026-10-05.** Implementation runs on the `redesign` branch, task by task (see [`IMPLEMENTATION-TASKS.md`](./IMPLEMENTATION-TASKS.md)).
**Date:** 2026-10-05
**Branch:** `claude/elegant-hopper-xg43jw`
**Scope:** a ground-up redesign of the Reverie website, from information architecture down to the design system and an implementation plan.
**Design freeze:** no website code, styles, diagrams or content were changed while this plan was written. The only files added are planning documents: this plan, [`DIAGRAM-PLAN.md`](./DIAGRAM-PLAN.md) and [`IMPLEMENTATION-TASKS.md`](./IMPLEMENTATION-TASKS.md). There is also a static design preview in [`design/homepage-preview/`](./design/homepage-preview/), which is not part of the site build.
**Revision 2 (2026-10-05):** the homepage was revised after the owner reviewed the first preview. It now has less text and more diagrams, an animated memory map, and a section on who owns the memory. The changes touch §0, §1.5, §2, §4, §7, §9, §10, §11, §13, §15, §16, §19 and §20.

**Sources.** The plan draws on five documents:

- `PRODUCT.md`: product archaeology, the implementation source of truth.
- `INSTALLATION.md`: installer and harness archaeology.
- `WEBSITE.md`: archaeology of the current site.
- `DESIGN-REFERENCES.md`: design research and the analysis of AI-generated design clichés.
- *Reverie: A Biological Memory Architecture for AI Agents* (M. Sarda, 5 Sep 2026): the conceptual source.

It also uses a read-only pass over this repository (including the four PDFs in `public/EMS-artefacts/`) and web research on the agent-memory market. Where the paper and the implementation disagree, **the implementation wins** (see §1.7).

---

## 0. Decisions at a glance

| Question | Decision |
|---|---|
| What the site is for | A product site for Reverie, backed by its research. The order is: product, then how it works, then why it's different, then the research that explains and tests it. |
| Positioning | **Reverie is memory for coding agents. It keeps the engineering conclusions your agent reaches, reviewed by you, grounded in your repository, and revised as evidence changes. The memory is yours, not your agent's: one local file that any MCP agent can use, on any model.** |
| Category frame | Reverie sits among tools that give *the coding agent you already use* persistent memory. Being in that category isn't what makes it different: many tools are there now (§3). What differs is *what* it keeps (conclusions), *how belief is governed* (confidence, contradiction, supersession, grounding, review, and retrieval only when the agent asks) and *whose memory it is*: the developer's, shared by every agent they connect. |
| Homepage | Eight short sections, one of them the reserved place for the comparison video (S3b). About 340 words of copy and no numbers. It is visual-led: a diagram wherever one explains better than text (owner rule, 2026-10-05). Six visuals, one of them animated. |
| Pages | Home, How it works, Research, paper (web-native), EC-Bench, Continuity experiment (reserved), Notebook entries, About, 404. |
| Navigation | `Reverie` · How it works · Research · About · **[GitHub]** (or **Contact** until the repository is public). |
| Removed | `/ems`, `/ethos`, `/notes` (index), and all eight existing SVG components. Also the "At a Glance" cards, "The Shift" poem, the "Research Before Systems" manifesto, the scroll-fade animation layers and framer-motion. |
| Moved | `/ec-bench` → `/research/ec-bench`; `/notes/everything-till-now` → `/research/notes/everything-till-now` (with an editor's note); PDFs → `/research/archive/`. |
| Visual direction | "Two voices": a serif speaks for ideas and a monospace speaks for the system. Warm paper and ink, one ink-blue accent, and status colours used only where they mean something. Hairline rules, near-square corners, no cards, no gradients, no scroll animation. There is one explanatory animation (the homepage memory map); it can be paused and is static under reduced motion. |
| Diagrams | Nine figures and two artifacts across the whole site. No page has more than three visuals, except the homepage, which is visual-led by owner decision. Five pages have none. Full spec in `DIAGRAM-PLAN.md`. |
| Comparison video | A homepage section reserves its place now (S3b, after How it works; owner decision). Until the recording exists, it is a dashed two-sided frame marked `In design`; then the side-by-side video takes the same spot. Protocol, recordings and results live on `/research/continuity-experiment`. Nothing about the result appears before it exists. |
| Benchmark numbers | **None on the homepage or How it works.** EC-Bench numbers appear only on the EC-Bench page, in a results ledger, after the owner reconciles conflicting figures (§1.7). |
| Blocked on the owner | Reconcile the benchmark numbers, correct the paper, capture a real `ec_query` specimen, decide repository and licence timing, confirm the domain and hosting, and share the visual references (§20). |

---

## 1. Product understanding

### 1.1 What Reverie is

Reverie gives the coding agent a developer already uses a persistent, local memory of **engineering conclusions**. These are not chat history and not a list of facts: they are irreducible conclusions such as *"cache invalidation must follow token refresh; clearing the cache first serves stale tokens."* Each conclusion carries a confidence, a scope, its provenance, references to the code it is about, and typed relationships to other conclusions. (Source: PRODUCT.md §1, §5.)

Physically, it is a Python package (`engineering-cognition` v0.1.0, import name `ec`) made of four parts:

- a local stdio **MCP server** that exposes four tools: `ec_observe`, `ec_query`, `ec_get_summary` and `ec_reconsolidate`;
- a session-lifecycle CLI;
- an installer that configures Claude Code, Cursor, OpenCode and Codex;
- a single SQLite file, `~/.ec/ec.db`, shared by all projects.

An LLM endpoint is used for extraction and classification: hosted by default, or a local model through Ollama. Embeddings and retrieval run locally. (Source: PRODUCT.md §1–3, §15; INSTALLATION.md §2, §5, §8.)

### 1.2 Why it exists

The problem is continuity. Frontier models can reason through hard engineering problems, but the understanding built up in one session (architecture, constraints, root causes, trade-offs) does not survive into the next one. The paper puts it in one line: *"The bottleneck is not intelligence. It is continuity."* Three existing approaches fall short:

- **Bigger context windows** are working memory, not long-term memory.
- **Retrieval-augmented generation (RAG)** retrieves text but cannot decide what is worth keeping.
- **Pinned "sticky-note" memories** don't compound and aren't checked against the code.

The real problem is not storage. It is **extraction** (deciding what deserves to be remembered) and **accumulation** (letting what's kept evolve). (Source: paper §1–2.)

### 1.3 How it works (implementation, not aspiration)

```text
start a session in a git repo (repo + branch)
      │
agent works ──► reaches a conclusion ──► ec_observe(prompt, reasoning)
      │                                      │
      │                          extractor: keep conclusions, reject facts,
      │                          code descriptions, process steps, summaries
      │                          ("zero is a valid output")
      │                                      ▼
      │                          SESSION BRAIN (unreviewed, usable now,
      │                          trust ×0.8; light relationship pass;
      │                          evidence about long-term conclusions is
      │                          recorded as *pending*, never applied)
      │                                      │
end the session ──► REVIEW GATE (terminal): open questions first, then
      │             accept / reject / skip; skipped items carry forward
      │                                      ▼
      │                          CANONICAL BRAIN (reviewed, durable; full
      │                          relationship pass: supports / contradicts /
      │                          supersedes / depends_on; confidence updates;
      │                          supersession; propagation)
      │                                      │
later session ──► agent reads code ──► ec_query(query) ──► relevant conclusions,
                  grouped with supporting / contradicting / dependent /
                  superseding neighbours, plus the framing note "past engineering
                  understanding; verify against current code"
      │
      └── background maintenance (inside the MCP server): open-question parking,
          supersession of weak beliefs, grounding checks against the repo,
          reversal of evidence from retired beliefs
```

(Source: PRODUCT.md §4 pipeline; §6–§14.)

### 1.4 The primitive: the Engineering Cognition Unit (ECU)

An ECU is the smallest irreducible engineering conclusion that can be stored, retrieved, weighted by confidence and associated with others. The extraction prompt tests each candidate against three questions: *So what?* (is this a conclusion, not a fact?), *Future session* (would knowing it change how an engineer approaches a future task?) and *Independence* (is it understandable without the original conversation?). It also enforces one conclusion per unit and runs a self-review pass that rejects anything an engineer could get by reading the code.

| Field | Values |
|---|---|
| Cognition | The conclusion text. Immutable: a change in meaning means a new ECU plus a `supersedes` edge. |
| Type | 8 values: implication, constraint, principle, decision, observation, pattern, invariant, trade-off. |
| Scope | 7 levels (engineering → subsystem), plus a path. |
| Grounding | Files, symbols, and a commit hash stamped at extraction. |
| Confidence | Stored in [0, 1]; all maths happens in log-odds. |
| Status | active, challenged, superseded, deprecated, open_question, archived. |
| Also carried | Provenance, evidence pointers, metadata, and a 384-dimensional embedding computed locally. |

(Source: PRODUCT.md §5–6; paper §3.)

### 1.5 What is genuinely distinctive

This comes after the market research in §3. None of the items below is unique on its own; the **combination**, and the discipline behind it, is Reverie's.

1. **It keeps conclusions, not activity.** It does not keep transcripts, compressed tool logs, preference notes or code descriptions. It applies an explicit rejection test, and "zero is a valid output".
2. **What it keeps behaves like belief.** Confidence moves with evidence, and every update is reversible because its delta is stored on the edge. Relationships are typed. Contradictions are kept and escalated rather than overwritten or deleted, and change happens through supersession, which preserves history.
3. **A structural review boundary.** Nothing *extracted from a session* reaches long-term memory without the developer's review. A separate session tier means the current session benefits immediately anyway.
4. **Grounding with consequences.** Conclusions cite files and symbols, which are checked against the live repository. Scope rules decide what dies with deleted code: principles survive, module-level conclusions don't. Dependent conclusions are then challenged, and the change is reported at the next review.
5. **Pull, not push.** The agent asks for memory, by design *after reading the code*, and receives results framed as "verify before acting". This stance came from a measured failure: proactive injection made the agent worse.
6. **Yours, not your agent's.** The memory is one local file with no Reverie account. Every agent you connect shares it: the installer sets up four, and any other MCP agent can be set up by hand. It works whatever model the agent runs, so switching agents or models keeps what you've built.
7. **Research that publishes its negative results.**

### 1.6 Implemented, research, absent

| Area | State | Source |
|---|---|---|
| Extraction, two brains, review gate, confidence maths, four relationship types, contradiction pipeline, supersession, grounding verification, lazy decay and reinforcement, demand-driven retrieval, reconsolidation, maintenance, installer for four agents, MCP server, Ollama fallback | **Implemented and tested** (506 passed, 6 skipped live tests, verified 2026-10-04) | PRODUCT.md §18–21 |
| Clustering | Implemented but **dormant** at typical sizes | PRODUCT.md §14, §19 |
| Dedicated extraction model (3B, QLoRA), multimodal extraction, memory for non-coding agents | **Research direction only** | paper §14–17 |
| GUI or dashboard, review UI beyond the terminal, editing at review in the interactive CLI, team memory, uninstall, PyPI release, LICENSE, README, Windows support, native slash-command registration | **Absent** | PRODUCT.md §10, §19, §22; INSTALLATION.md §10–12 |

### 1.7 Where the sources disagree (must be resolved before content ships)

**A. Paper vs implementation.** The site describes mechanisms from PRODUCT.md. Before the paper is published on the site, these passages need correcting or annotating:

| # | Paper says | Implementation (PRODUCT.md) |
|---|---|---|
| 1 | The MCP server exposes `ec_query`, `ec_start`, `ec_stop`, `ec_status` (§17) | The MCP tools are `ec_observe`, `ec_query`, `ec_get_summary`, `ec_reconsolidate`. Start, stop and status are CLI commands (§3.2). |
| 2 | Extraction uses GPT-5.5-mini (§2, §15) | The default is `claude-haiku-4-5` via OpenCode Zen (configurable), with Ollama `qwen2.5-coder:14b` as fallback (§6). **The site names no model.** |
| 3 | Retrieval applies maximal marginal relevance (§7) | No MMR. Ranking is four-factor, plus cross-group deduplication (§13). |
| 4 | Ranking uses similarity, confidence, scope match and retrieval frequency (§7) | Ranking is 0.6·similarity + 0.15·effective confidence + 0.10·activation + 0.15·network richness, multiplied by trust and scope proximity (§13). |
| 5 | Retrieving an ECU also gives connected ECUs a confidence bump (§4, §8, §9) | Activation is a separate per-session ranking score. The confidence bump applies only to surfaced canonical ECUs (§13, §3.1). |
| 6 | The extractor creates `depends_on` edges (§9) | The extractor never creates edges; the diffuser does (§6). |
| 7 | Maintenance runs "decay application" and "contradiction detection" (§6) | Decay is lazy and never written. There is no standalone contradiction scan. The tasks are forgetting, grounding, edge pruning and clustering (§14). |
| 8 | Both contradicting ECUs are marked challenged (§6) | The existing (target) ECU is marked challenged. Both sides become open questions only after a scope-dependent persistence limit (§7.2, §14). |
| 9 | If evidence is rejected at review, its delta is subtracted and the edge remains (§9) | Session evidence never writes canonical deltas before review: pending updates are discarded on reject. Edge pruning reverses deltas from retired targets (§7.2, §14). |
| 10 | "Nothing crosses … without human review" (§5) | True for *extracted* conclusions. `ec_reconsolidate` updates already-reviewed conclusions immediately, and its supersede path can create a new canonical ECU (§9, a documented tension). |
| 11 | Decay "half-life of about 693 days / 23 days" (§4, §8) | These are half-lives of the *odds* (ln 2 / λ in log-odds), not of the confidence value. Clarify the wording if it is reproduced. |
| 12 | "303 requirements traced" (§12) | Not verifiable from PRODUCT.md. Keep it off the site. |

**B. Benchmark numbers conflict across sources.**

| Source | System | Comparison | Reported figures | Prompts |
|---|---|---|---|---|
| Technical Report 001 (15 Jul) and Short Report (18 Jul), in `public/EMS-artefacts/` | EMS v1 (memory injected before work) | Stateless baseline | Aggregate **8.35 vs 7.96**; memory ahead on 22 of 30 prompts. Per metric (memory minus baseline): architectural continuity −0.223, repository groundedness −0.480, cognition reuse **+2.214**, engineering quality −0.589, debugging/investigation efficiency −0.057 | 30 |
| "Everything till now" (29 Jul), on the current site | same | same | "7.96 → 8.35, improved on 22 prompts"; concludes the benchmark "validated our original assumption" | 30 |
| Paper (5 Sep) §2, §7, §12 | v1, proactive injection | Baseline without memory | **8.11 vs 8.53** (gap 0.42); says cognition reuse was "artificially inflated" | 30 |
| Paper §12 | v2, demand-driven, headless | OpenCode interactive chat memory | **8.32 vs 8.63** (gap 0.31) | 28 (2 outliers removed) |
| PRODUCT.md §17, run `20260813-141550` | EC v2, headless, fresh context per prompt | Baseline added 15 Aug, interactive with chat memory (mixed protocol) | **8.14 vs 8.52** weighted; baseline ahead on all five metrics | 30 |
| ECU counts | Paper: 122 ECUs in the v2 run | PRODUCT.md: 74 canonical ECUs and 157 edges (154 supports, 3 depends_on, 0 contradicts, 0 supersedes) | | |

**What is consistent:** the direction. In every source, the current design has not beaten its baseline. In the July run, four of five metrics were *lower* with memory; the aggregate gain came from the cognition-reuse metric, which injection inflates.

**What conflicts:** the v1 headline (July says memory was ahead; September says it was behind), and the exact v2 figures and ECU counts.

**Rule for the site:** only reconciled numbers, each with a run identifier, protocol, prompt count, judge and metric weights. The results ledger component (§19.3) enforces this: rows marked `needs-reconciliation` render as text without numbers.

**C. Archaeology corrections.** WEBSITE.md says the four PDFs are 8 pages each. They are 14, 58, 14 and 15 pages (`pdfinfo`).

### 1.8 What must not be claimed

These are claims the website must never make, each with the reason it is not supported:

- *"Reverie makes your agent better / smarter."* No run so far shows a clear advantage (§1.7B).
- *"First"*, *"only"*, *"best"*, or *"unlike other tools…"*. These are false or unverifiable (§3).
- *"Works with any agent."* There are four installers; other agents need manual MCP setup.
- *"Open source."* There is no LICENSE file yet. The extraction prompt alone declares MIT.
- *"`pip install engineering-cognition`"*, *"one-line install"*, *"zero config"*. It is not on PyPI, it needs an LLM key or Ollama, and it needs a git repository. In any case the site shows **no installation commands at this stage**.
- *"Nothing leaves your machine."* Extraction sends the prompt and the agent's reasoning to the configured LLM endpoint unless Ollama is used. **What can be said:** *memory is stored locally*, and *with Ollama, extraction is local too*.
- *"Nothing enters long-term memory without your review"* (unqualified). **What can be said:** *nothing extracted from a session becomes long-term memory until you review it.* Reconsolidation updates are the documented exception.
- *"Installs `/ec-start` commands in your agent."* The templates are written but not registered natively in any harness.
- *"Runs on Windows / Linux."* Only macOS is evidenced.
- *"Works like the human brain."* Biological memory *inspired* the architecture.
- Dashboards, a GUI, teams, cloud sync, analytics, uptime, customer logos, testimonials, star counts, install counts.
- Any paper-only mechanism from §1.7A (MMR, neighbour confidence bumps, extractor-created edges, a contradiction scan).

---

## 2. Positioning

### 2.1 The hypothesis, tested

> *Many memory systems are infrastructure a developer integrates into a product they are building. Reverie is memory for the developer's own coding agent.*

**Verdict: right about the category, wrong as a differentiator.**

- **Right:** Letta's platform, Zep and Graphiti, Mem0's platform, the Supermemory API and Hindsight's core are infrastructure for *building* agents. Their memory is mostly about end users, documents and business data. Reverie is not that.
- **Not a differentiator:** "persistent memory for the coding agent you already use" is now a crowded category.
  - **Built into agents:** Claude Code Auto Memory (on by default since Feb 2026), GitHub Copilot Memory, Windsurf memories, Codex project memory, Augment memories.
  - **Add-ons:** claude-mem, agentmemory, the Supermemory plugin for Claude Code and OpenCode, Mem0's OpenMemory MCP, ByteRover/Cipher, Basic Memory, Hindsight integrations and Mnemoverse.
  - **Replacement agent:** Letta Code goes further, replacing the agent with a memory-first one.

  Claiming to be the first, or the only, memory for a developer's coding agent would be false.

So the category tells a visitor *what Reverie is*. The differentiation has to come from **what it keeps** and **how what it keeps is governed** (§1.5).

### 2.2 Frame of reference for the visitor

The visitor already knows instruction files (`AGENTS.md`, `CLAUDE.md`, rules), transcripts, bigger context windows, and memory features that silently write notes. The site contrasts Reverie against those **approaches**, never against named **products**:

| Approach the visitor knows | What Reverie does instead |
|---|---|
| Transcripts and summaries | Keeps conclusions; rejects the play-by-play. |
| Notes that load into every session | Retrieves only when the agent asks, after reading the code. |
| Memories that write themselves | Nothing extracted becomes long-term memory without your review. |
| Facts that silently go stale | Conclusions cite code; when that code disappears, conclusions about it are retired. |
| Overwrite on conflict | Contradictions stay visible until you resolve them; replacements keep history. |

### 2.3 Positioning statement (internal)

> For developers who work with a coding agent across many sessions on the same codebase, **Reverie** is a local memory that keeps the engineering conclusions those sessions reach, reviewed by the developer, tied to the code, and revised as evidence changes, so later sessions can build on earlier ones instead of starting over. Reverie treats what it remembers as **beliefs**: each has a confidence, a scope, a source, references to code, and relationships to other beliefs, and contradictions remain visible until a person resolves them. The memory belongs to the developer, not to any one agent: it lives in one local file that every MCP agent they use can share, whatever model the agent runs.

### 2.4 Proof points (each traceable)

| Proof point | Source |
|---|---|
| Keeps conclusions; rejects facts, code descriptions, process steps, summaries | PRODUCT.md §6 (extraction prompt: Lifting Test, do-not-extract rules, self-review) |
| Reviewed before durable | PRODUCT.md §9–10 (only writers to the canonical brain) |
| Confidence moves with evidence; updates reversible | PRODUCT.md §11, §21.3 |
| Contradictions surfaced, parked, resolved by you | PRODUCT.md §7.2, §10, §14 |
| Supersession preserves history | PRODUCT.md §5.1, §9, §12 |
| Grounding verified against the repo | PRODUCT.md §14.2, §21.5 |
| Agent asks after reading code | PRODUCT.md §3.2 (tool description); INSTALLATION.md §7.6 |
| One local SQLite file; no cloud database, no vector DB | PRODUCT.md §1, §13, §15 |
| Four agents configured by the installer | INSTALLATION.md §2 |
| Any other MCP client can be set up by hand | INSTALLATION.md §10.5 |
| One memory shared by every connected agent, so switching agents or models keeps it | PRODUCT.md §1, §15 (one file, shared); INSTALLATION.md §7–8 (each agent's MCP entry starts the same server) |
| Ollama option for local extraction | INSTALLATION.md §4–6; PRODUCT.md §2.6 |
| Designed from measured failure | paper §2, §7, §12; Short Report §5.1 |

### 2.5 Language rules

| Say | Don't say |
|---|---|
| "keeps the engineering conclusions your agent reaches" | "remembers everything" / "never forgets" |
| "reviewed by you" / "nothing extracted becomes long-term memory until you review it" | "fully automatic" / "zero effort" |
| "grounded in your repository" | "always correct" / "verified facts" |
| "your agent asks for it when it needs it" | "context injected automatically" |
| "memory stays on your machine" | "nothing leaves your machine" (unless the Ollama case is stated) |
| "works with Claude Code, Cursor, OpenCode and Codex" | "works with any agent" |
| "any MCP agent", only next to the four named agents and on a page that also says the others are set up by hand | "plug and play with any agent", "one-click setup for every tool" |
| "on any model" (the model your agent runs) | "model-agnostic AI", "any LLM" (extraction needs a configured endpoint or Ollama) |
| "your memory, not your agent's" / "stays with you when you switch agents" | "sync across devices", "portable to any tool" (there is no sync) |
| "fades when unused" | "forgets", "deletes stale memories" (nothing is hard-deleted) |
| "built from research; we publish results either way" | "proven", "benchmarked to outperform", "X% better" |
| "inspired by how biological memory consolidates" | "works like the human brain" |

---

## 3. Competitive research (internal; never on the website)

> This section names other products so the positioning can be reasoned about. **None of it appears on the website**: no competitor names, no comparison tables, no "unlike X".
> ⚠ This repository is public, so this section is publicly readable on GitHub.

### 3.1 Method and limits

The research ran on 2026-10-05 in two passes.

- **Pass 1 (web search).** Direct fetches of `letta.com`, `supermemory.ai`, `getzep.com`, `dribbble.com` and `pinterest.com` were blocked by the original environment's network policy, so the first pass used search-result summaries of the vendors' own pages, docs, changelogs and papers.
- **Pass 2 (direct fetches, verified).** A research session in the owner's *Custom* environment fetched the Letta, Supermemory and Zep pages directly. Their rows below are now **verified against the vendors' current pages**. Still blocked in that environment: `docs.letta.com`, `www.framer.com`, and the image CDNs `i.pinimg.com` and `cdn.dribbble.com`. The Dribbble page sits behind a bot challenge.

Treat every cell as *"as described publicly on that date"*. Where evidence was missing, the cell says *not established* rather than "no".

### 3.2 Landscape

```text
A. Infrastructure for BUILDING agents (memory of end users / business data)
   Letta platform · Zep / Graphiti · Mem0 platform · Supermemory API · Hindsight · (Cognee)

B. Add-on memory for the coding agent you ALREADY use          ← Reverie lives here
   claude-mem · agentmemory · Supermemory plugin · OpenMemory (Mem0) · ByteRover / Cipher
   Basic Memory · Hindsight integrations · Mnemoverse · Reverie

C. Memory BUILT INTO coding agents
   Claude Code Auto Memory · GitHub Copilot Memory · Windsurf memories · Codex project memory
   Augment memories (with Memory Review) · (Cursor Memories, removed in v2.1, Nov 2025)

D. Memory-first coding agents (replace your agent)
   Letta Code

E. Research systems close to Reverie's ideas
   MOOSEDev (ontology-grounded project memory: decisions, rationale, supersession)
   PROJECTMEM (local-first, event-sourced memory and judgment layer) · ByteRover paper
```

### 3.3 Comparison (internal)

| Product | Who it serves | Integration | Where memory lives | What is remembered | Conflicts and updates | Review before durable? | Checked against code? | When memory enters the agent |
|---|---|---|---|---|---|---|---|---|
| **Letta** (verified) | Positions itself as "an AI research lab … building machines that learn". Offers Letta Agent ("stateful agents for your team"), Letta Code, and an Agent SDK. | Whole agents (CLI, desktop), SDK; brings your own model | "Run locally or on the cloud"; context git-tracked through MemFS | Memory files, skills, prompts | The agent edits its own memory (every change versioned in git); background "memory reflection" and "defragmentation"; sleep-time compute | None stated (git history gives after-the-fact audit) | Not stated (the codebase is explored at initialisation) | Varies by product |
| **Letta Code** (verified) | Developers (a coding agent: "a memory-first agent that can take actions on your local computer") | *Is* the agent (`npm i -g @letta-ai/letta-code`) | Git-backed memory repository, cloned to the local filesystem and kept in sync | Memory files with frontmatter, skills; initialised by exploring the codebase and past conversations | Agent rewrites files; git conflict resolution for concurrent subagents | None stated | Not stated | The file tree is always in the system prompt; a `system/` directory is fully loaded; other files are read on demand |
| **Zep / Graphiti** (verified) | Enterprise developers ("the unified context layer for enterprise data"); a Memory MCP server (Aug 2026) | API/SDK; MCP; open-source Graphiti | Zep Cloud, bring-your-own-cloud, or self-hosted Graphiti | Context graphs per user, account or domain: entities, relationships, dated facts linked to sources | "As facts change, Graphiti invalidates the old ones"; validity windows; history kept | None (governance means access policy and audit, not approval) | No (facts are traced to data sources, not code) | Retrieved per request |
| **Mem0** (platform) | Developers building AI apps | API/SDK | Cloud, or open-source self-hosted | Extracted facts and preferences | LLM chooses ADD/UPDATE/DELETE/NOOP; graph variant marks relations obsolete | No | No | Search on request |
| **OpenMemory** (Mem0) | Individuals using AI tools, including coding | MCP | Local (vector DB + dashboard) | Typed memories (preference, implementation…) | As Mem0 | Dashboard to view and edit | No | MCP search |
| **Supermemory** (verified) | App builders ("the default engine for memory and continual learning for agents") **and** coding-agent users, through Claude Code and OpenCode plugins | API/SDK, hook-based plugins, hosted MCP | Hosted by default; self-hosted or local mode available | Files, chats, URLs; user profiles (static and dynamic); conversations and important tool use from coding sessions; shared project knowledge | "Updates, merges, infers and forgets"; facts "updated when facts change, and forgotten when they expire" (the word "contradiction" was not found) | None (automatic, or triggered by phrases like "remember this") | No | Claude Code plugin: "before each turn, Claude decides whether recalling memory would help". OpenCode plugin: injected at session start. MCP: search on request |
| **Claude Code Auto Memory** | Claude Code users | Native | Local `MEMORY.md` per project | Notes the agent writes about the project | "Auto Dream" merges and deletes contradicted notes | No (files are editable) | No | Loaded at session start |
| **GitHub Copilot Memory** | Copilot users | Native (agent, review, CLI) | GitHub (hosted) | Repository facts with citations; user preferences | Stores a corrected version if code contradicts | After the fact: owners can review and delete | **Yes**: citations checked against the current branch before use; 28-day expiry unless revalidated | Used when relevant |
| **Windsurf** | Windsurf users | Native | Local, per workspace | Auto-generated memories | Not established | No | No | When the agent deems relevant |
| **Augment Code** | Augment users | Native | Not established | Memories plus code context engine | Not established | **Yes**: Memory Review approval workflow (Sep 2025) | Indexes code (not stated as memory verification) | Not established |
| **claude-mem** | Claude Code (plus other agents) users | Lifecycle hooks | Local SQLite | Compressed observations of tool use, summaries | Not established | No (automatic) | No | Injected at session start, plus search |
| **agentmemory** | Users of many coding agents | Hooks plus MCP | Local, one process | Observations → structured facts | Not established | No | No | Injected next session, plus hybrid search |
| **ByteRover / Cipher** | Coding-agent users and teams | MCP, CLI | Local markdown "context tree", optional cloud sync | Entries with relations, provenance, lifecycle (importance, maturity, recency decay) | Agent-curated | Agent curates; humans can | No | Tiered retrieval |
| **Basic Memory** | Individuals | MCP | Local markdown plus SQLite index | Human-editable notes and relations | Human or agent edits | Human-editable by design | No | Search |
| **Hindsight** | Builders; coding-agent users via integrations | API, MCP, hooks | Self-hosted or cloud | World facts, experiences, *opinions with confidence*, observations | Adjusts confidence instead of overwriting | No | No | Auto-recall before prompts (in integrations) |
| **Mnemoverse** | Coding-agent users | MCP | Hosted | Decisions, preferences, lessons | Feedback re-ranks recall | No | No | Recall |
| **MOOSEDev** (research) | Coding agents | MCP | Proprietary engine | Decisions, lessons, constraints, rationales, anti-patterns | Lifecycle status, supersession links | Not established | Ontology-grounded vocabulary (not code verification) | Symbolic queries |
| **Reverie** | Developers using Claude Code, Cursor, OpenCode, Codex | MCP (stdio) plus CLI lifecycle | **One local SQLite file** | **Conclusions** that pass a rejection test | **Reversible Bayesian confidence; typed edges; contradictions kept and escalated; supersession with history** | **Yes, structurally, before durable** | **Yes, scheduled, scope-aware, with dependents challenged** | **Only when the agent asks, after reading code** |

### 3.4 What the landscape means for the site

1. **The category is table stakes.** "Memory for your coding agent" says what Reverie is, not why to choose it, so the hero must reach *conclusions, reviewed, grounded* within its first sentence.
2. **Every individual mechanism has an analogue somewhere.** Copilot checks citations, Hindsight keeps opinions with confidence, Zep invalidates facts, Augment reviews memories, and ByteRover has lifecycles. Reverie's defensible ground is the **combination** plus the **unit of memory**. The site states what Reverie does concretely and never makes comparative or "first" claims.
3. **Most tools push memory into the session** (at start or before every prompt), but not all: Supermemory's Claude Code plugin lets the model decide before each turn whether to recall. So "the agent decides" alone isn't unique. Reverie's distinctive version is narrower and more explainable:
   - the agent asks **after reading the code**;
   - results come framed as **"verify against current code"**;
   - the stance comes from a **measured anchoring failure**.

   It deserves an explicit FAQ answer and a place in Fig. 1.
4. **Review has a cost.** Cursor *removed* its approve-before-save memories. Reverie should present review as a choice with a reason, and note that the current session benefits before review happens.
5. **The category markets with benchmark wins.** Verified on the current homepages and research pages:
   - Zep: LoCoMo 94.7%, LongMemEval 90.2%;
   - Letta: LoCoMo 74.0%;
   - Supermemory: SWE-ContextBench figures and "64% cheaper".

   Reverie's honest ledger is unusual. It should be framed as rigour, never apologised for, and never placed on the homepage as numbers.
6. **Hosted vs local splits the segment.** "One SQLite file on your machine, no account" is a real trust attribute, as long as the LLM-extraction data flow is stated just as plainly.

### 3.5 Sources (accessed 2026-10-05)

Fetched directly in pass 2: <https://www.letta.com>, <https://www.letta.com/agent/>, <https://www.letta.com/research/>, <https://supermemory.ai>, <https://supermemory.ai/docs/integrations/claude-code>, <https://supermemory.ai/mcp/>, <https://www.getzep.com>, <https://www.getzep.com/platform/graphiti/>
Letta Code and context repositories: <https://www.letta.com/blog/context-repositories/>, <https://www.letta.com/agent/>
Letta platform: <https://moge.ai/product/letta>, <https://sudoall.com/letta-stateful-agents-nodejs/>
Supermemory plugin and MCP: <https://supermemory.ai/docs/integrations/claude-code>, <https://github.com/supermemoryai/claude-supermemory>, <https://supermemory.ai/mcp/>
Supermemory API: <https://github.com/supermemoryai/supermemory>, <https://supermemory.ai/docs/concepts/user-profiles>
Zep / Graphiti: <https://www.getzep.com/platform/graphiti/>, <https://help.getzep.com/graphiti/getting-started/overview>
Mem0: <https://arxiv.org/pdf/2504.19413>, <https://mem0.ai/openmemory>, <https://mem0.ai/blog/introducing-openmemory-mcp>
GitHub Copilot Memory: <https://github.blog/changelog/2026-01-15-agentic-memory-for-github-copilot-is-in-public-preview/>, <https://github.blog/changelog/2026-03-04-copilot-memory-now-on-by-default-for-pro-and-pro-users-in-public-preview/>, <https://docs.github.com/en/copilot/concepts/agents/copilot-memory>
Claude Code Auto Memory: <https://claudefa.st/blog/guide/mechanics/auto-memory>, <https://decodethefuture.org/en/claude-code-auto-dream-explained/>
Cursor Memories removal: <https://forum.cursor.com/t/rules-vs-memories-and-global-vs-project/137149>, <https://localskills.sh/blog/cursor-memories-guide>
Windsurf: <https://docs.windsurf.com/windsurf/cascade/memories>
Codex: <https://mem0.ai/blog/how-memory-works-in-codex-cli>, <https://hindsight.vectorize.io/blog/2026/04/08/adding-memory-to-codex-with-hindsight>
Augment Memory Review: <https://www.augmentcode.com/guides/agent-memory-vs-context-engineering>
claude-mem: <https://www.augmentcode.com/learn/claude-mem-persistent-memory-claude-code>, <https://www.datacamp.com/tutorial/claude-mem-guide>
agentmemory: <https://www.agent-memory.dev/>, <https://github.com/rohitg00/agentmemory>
ByteRover / Cipher: <https://arxiv.org/abs/2604.01599>, <https://docs.byterover.dev/cipher/overview>
Basic Memory: <https://github.com/basicmachines-co/basic-memory>
Hindsight: <https://arxiv.org/pdf/2512.12818>, <https://vectorize.io/blog/introducing-hindsight-agent-memory-that-works-like-human-memory>
Mnemoverse: <https://mnemoverse.com/docs/library/mcp-memory-servers-claude-code-and-cursor>
MOOSEDev: <https://arxiv.org/abs/2608.13662>
PROJECTMEM: <https://arxiv.org/html/2606.12329>

---

## 4. Website goals

### 4.1 Objective

A developer who has never heard of Reverie should, within one scroll of the homepage:

1. understand what it is;
2. find the problem worth caring about;
3. understand how the mechanism works;
4. believe the work is technically serious;
5. want to inspect the implementation.

Everything else (depth, research, the people behind it) is one click away.

### 4.2 Audiences

| Audience | Who | What they need | Where it's served |
|---|---|---|---|
| **Primary** | Developers who use Claude Code, Cursor, OpenCode or Codex daily, across many sessions on non-trivial codebases. Skeptical of AI hype; value local tools and control. | A fast, truthful answer to "what is it, how does it work, can I trust it, where's the code?" | Home, How it works |
| **Secondary** | Researchers and builders working on agent memory | Method, evidence, honest results, lineage | Research, paper, EC-Bench |
| **Secondary** | Potential collaborators and investors | Seriousness, honesty, who is behind it | About, Research |
| **Tertiary** | Agents reading the site on a developer's behalf | A plain-text summary | Optional `/llms.txt` (§19.6) |

### 4.3 The visitor's path, matched to the five thoughts

| Thought | Where it's earned | How |
|---|---|---|
| "I understand what this is." | Hero | Category sentence, plus a real specimen of a remembered conclusion |
| "That's an interesting problem." | Problem section | The continuity story in four sentences, plus "the hard part is deciding what deserves to be remembered" |
| "I understand how it works." | Fig. 1 and three steps | Extract → review → retrieve, drawn across a session boundary |
| "This is technically serious." | Fig. 2, the hero specimen, How it works | Belief dynamics with real update rules, the concrete local footprint, named MCP tools (on How it works), grounding notes that cite implementing modules |
| "I want to inspect it." | Research section, closing call to action, GitHub in the nav | Repository link (once public), honest research, the paper |

### 4.4 The comprehension goals, mapped

Goals 1–10 come from the brief. Goal 11 was added at the owner's request in revision 2.

| # | Goal | Primary place | Reinforced at |
|---|---|---|---|
| 1 | Memory for coding agents | Hero headline and first sentence | Metadata, nav |
| 2 | Agents lose understanding between sessions | Problem section (P1) | Fig. 1 session lines |
| 3 | Conclusions, not conversations | Hero specimen, hero sentence | Fig. 1 station 1; How it works §1 |
| 4 | Conclusions persist, relate and evolve | Fig. 2 (memory map and lifecycle) | Hero neighbours; How it works §3 (Fig. 5) |
| 5 | Grounded in the actual repository | Hero sentence, specimen grounding row | Fig. 1 station 3; Fig. 2 footnote; How it works §4 |
| 6 | The developer controls what becomes durable | Hero sentence, Fig. 1 station 2 | Fig. 3 facts; How it works §2 |
| 7 | Works with agents developers already use | Hero agents line | Fig. 3; How it works §6 |
| 8 | Real and technically serious | Hero specimen, Fig. 2 | How it works throughout |
| 9 | Research behind it | Research section | Research index, paper, EC-Bench |
| 10 | A real implementation to inspect | Closing call to action, nav | How it works grounding notes |
| 11 | The memory is the developer's, not the agent's: it works with any MCP agent, on any model | S5 and Fig. 3 | Hero agents line; How it works §6 |

### 4.5 Conversion strategy

The repository is not yet public-ready: no LICENSE, no README, not on PyPI (PRODUCT.md §2.1). The site is therefore built with **two configuration states**, so going public needs no redesign:

| | **State A: before release** (now) | **State B: repository public** |
|---|---|---|
| Nav call to action | `Contact` (mailto with subject "Reverie") | `GitHub ↗` |
| Hero calls to action | **How it works** (primary) · Read the research (secondary) | **How it works** (primary) · View on GitHub ↗ (secondary) |
| Closing section | "The repository opens soon." plus `Get in touch` | "Read the code." plus `View the repository ↗` |
| Installation | "Setup instructions will live in the repository." | "Setup instructions live in the repository's README." (link) |

The switch is one setting, `site.config.ts → repository.url`. There are no install commands in either state.

**Interest capture before release:** a mailto with a prefilled subject (zero infrastructure, honest). A newsletter service is optional and an open question (§20). Once public, GitHub "Watch" and stars do this job.

### 4.6 Success signals (qualitative first)

- Five-second test with five developers: "What is this?" Pass means they say *memory for coding agents* plus *conclusions* or *review*.
- After the homepage: "How is it different from your agent's built-in memory?" Pass means they mention review, grounding, conclusions, or the agent asking.
- Vercel Analytics events: clicks on How it works, Research and the repository call to action. Measure; don't optimise copy for clicks at the expense of truth.

---

## 5. Information architecture

### 5.1 Principles

1. **Product first, research underneath.** Every research page links back to the product mechanism it explains or tests, under the heading "What this changed in Reverie".
2. **One canonical explanation per concept.** The homepage gives the one-line version, How it works the full version, the paper the deep version. Other pages link instead of re-explaining. The current site restates its thesis about five times; this design fixes that.
3. **Few pages, each with one job.** No page exists to hold a single paragraph.
4. **Stable, descriptive URLs** under two namespaces: `/how-it-works` and `/research/*`.
5. **History is kept, not deleted.** Superseded documents remain reachable, labelled and linked to what replaced them, the same way Reverie treats conclusions.

### 5.2 Site map

```text
Reverie
├── /                                        Home
├── /how-it-works                            How Reverie works (product depth)
├── /research                                Research index
│   ├── /research/biological-memory-architecture   Paper (web-native, + PDF)
│   ├── /research/ec-bench                   EC-Bench: method + results ledger
│   ├── /research/continuity-experiment      With/without experiment (reserved; gated)
│   ├── /research/notes/[slug]               Notebook entries
│   └── /research/archive/*.pdf              Earlier reports (files)
├── /about                                   Who builds Reverie, how we work, contact
└── 404                                      Not found (mentions the EMS → Reverie rename)
```

### 5.3 Navigation

| Element | Desktop (≥ 768 px) | Mobile (< 768 px) |
|---|---|---|
| Wordmark | `Reverie` (links home) | same |
| Links | How it works · Research · About | In a full-width sheet opened by a `Menu` button |
| Call to action | `GitHub ↗` (State B) or `Contact` (State A), as a small secondary button | Kept visible in the header bar next to `Menu` |
| Active state | Ink colour plus a 1 px underline; `aria-current="page"` | same |
| Behaviour | Sticky, paper background, hairline bottom rule appears after scrolling 8 px; no blur | Sheet: paper background, links in display size, focus trapped, Esc closes |

**Footer** (all pages), three short columns plus a baseline:

```text
Reverie                         Product            Research              Project
Memory for coding agents.       How it works       Paper                 About
                                Supported agents   EC-Bench              GitHub ↗ (State B)
                                Questions          Notebook              Contact
                                                   Archive
──────────────────────────────────────────────────────────────────────────────────────
Reverie is a research project by Mudit Sarda (Engineering Cognition).   © 2026
```

"Supported agents" and "Questions" are anchors on `/how-it-works`. There is no Careers, Customers or Enterprise column, because there are no such things (DESIGN-REFERENCES §7.10).

### 5.4 Terminology map

Each page uses vocabulary appropriate to its depth, and each term is introduced once:

| Concept | Home | How it works | Research |
|---|---|---|---|
| ECU | "conclusion" | "conclusion" (introduced once as *Engineering Cognition Unit, ECU*) | "Engineering Cognition Unit (ECU)" |
| Session Brain | "session memory" | "session brain" (glossed: *unreviewed, for this repo and branch*) | "session brain (hippocampal analogue)" |
| Canonical Brain | "long-term memory" | "canonical brain" (glossed: *reviewed, long-term*) | "canonical brain (neocortical analogue)" |
| Review gate | "you review" | "review gate" | "review gate / consolidation" |
| Diffusion | (omit) | "relating new conclusions to existing ones (diffusion)" | "diffusion" |
| Reconsolidation | (omit) | "updating a retrieved conclusion with new evidence" | "reconsolidation" |
| Grounding | "grounded in your repository" | "grounding" | "grounding" |
| Demand-driven retrieval | "your agent asks" | "retrieval on request" | "demand-driven retrieval" |
| Engineering Cognition | footer only | Naming note: the code's `ec` prefix stands for it | The research program |
| Engineering Brain | (omit) | (omit) | As used in the paper |

### 5.5 Cross-linking

- Home → How it works (from three places), Research (one), repository (two, in State B).
- How it works → paper (biology aside), EC-Bench (in the "why the agent asks" answer and the FAQ), repository (grounding notes, closing call to action).
- Every research page ends with *"What this changed in Reverie"*, linking back into How it works.
- Notebook and archive documents link forward to whatever superseded them.

---

## 6. Complete route map

| Route | Page | Purpose | Status | Notes |
|---|---|---|---|---|
| `/` | Home | Understand Reverie in one scroll | **Rewritten** | §7 |
| `/how-it-works` | How Reverie works | Mechanism in depth; trust | **New** (replaces `/ems`) | §8.1 |
| `/research` | Research | Research index, lineage, reading path | **Rewritten** | §8.2 |
| `/research/biological-memory-architecture` | Paper | Flagship paper, web-native, plus PDF | **New** | §8.3; blocked on paper corrections (§1.7A) |
| `/research/ec-bench` | EC-Bench | Method and honest results ledger | **Moved and rewritten** (from `/ec-bench`) | §8.4; numbers blocked on §1.7B |
| `/research/continuity-experiment` | Continuity experiment | The with/without comparison | **New, gated** | §8.5 and §13; hidden or "in design" until the owner decides |
| `/research/notes/[slug]` | Notebook entry | Research log entries | **Moved** (from `/notes/[slug]`) | §8.6 |
| `/about` | About | Who, how we work, contact | **New** (absorbs the useful parts of `/ethos`) | §8.7 |
| `404` | Not found | Recovery | **New** (custom) | §8.8 |
| `/ems` | — | — | **Removed** | Redirects to `/how-it-works` |
| `/ethos` | — | — | **Removed** | Redirects to `/about` |
| `/ec-bench` | — | — | **Removed** | Redirects to `/research/ec-bench` |
| `/notes` | — | — | **Removed** | Redirects to `/research#notebook` |
| `/notes/:slug` | — | — | **Removed** | Redirects to `/research/notes/:slug` |
| `/EMS-artefacts/:file` | — | — | **Removed** | Redirects to `/research/archive/:file` |
| `/articles/everything-till-now.md` | — | Raw markdown served publicly by accident | **Removed** | Content moves out of `public/` |
| `app/lab/` | — | Empty directory, no route | **Deleted** | — |

**Static files generated at build:** `sitemap.xml`, `robots.txt`, Open Graph images, favicon set. `llms.txt` is optional.

---

## 7. Homepage specification

**Reference rendering.** [`design/homepage-preview/`](./design/homepage-preview/) contains a static HTML rendering of this section (version 2), with screenshots at 1440 px and 390 px and a storyboard of the memory-map animation. It is the visual target for implementation. Port tokens, measurements, SVG geometry and keyframes from it. Where wording differs between the preview and this plan, the preview is newer.

**Revision 2 (owner review, 2026-10-05).** The first preview carried too much text for a developer deciding quickly. This version follows four owner decisions:

1. **Prefer a diagram wherever it explains better than text.** The problem story, the steps under Fig. 1 and the four lines under Fig. 2 are now carried by figures.
2. **Show belief change as a living structure.** An animated memory map shows conclusions being added, strengthened, challenged, superseded and fading.
3. **Say whose memory it is.** It belongs to the developer, not the agent, so it works with any MCP agent, on any model.
4. **No tool names on the homepage.** They belong on How it works.

**Shape.**
- Eight sections: S1–S7 plus S3b, the place reserved for the comparison video.
- About **340 words** of copy (down from about 480), counting the hero specimen and the captions, plus short figure labels.
- **Six visuals across five sections**: V1, P1, F1, Fig. 2 (M1 above F2) and O1, plus the video slot. The homepage is exempt from the three-visual cap by owner decision (§9).
- **No numbers.** Left-aligned editorial layout throughout.

**One story through one conclusion.** An agent finds out why users are being logged out at random: the cache is cleared before the token refresh finishes. That thread appears as:

- the reviewed conclusion in the hero, with its neighbours;
- the conclusion worked out again every day in P1;
- the conclusions that strengthen, challenge and replace each other in the memory map;
- the conclusion whose life the lower panel of Fig. 2 follows.

All copy below is a **draft for owner approval**.

---

### S1. Hero: *What is this?*

| | |
|---|---|
| **Purpose** | Category, value and control in one look, with the remembered unit and its links visible. |
| **Headline** | **Your coding agent shouldn't start every session as a stranger.** |
| **Supporting copy** | Reverie is memory for coding agents. It keeps the conclusions your agent reaches — reviewed by you, grounded in your code — so the next session builds on them. |
| **Agents line** | Works with Claude Code, Cursor, OpenCode, Codex — any MCP agent, on any model. (Claims C1, C27 and C28. "Any MCP agent" is the owner's position, and INSTALLATION.md §10.5 documents manual setup. It is verified before launch, §20 question 20, and controlled by `claims.anyMcpAgent`.) |
| **Visual** | **V1, the hero graph.** It sits in columns 7–12 on desktop and below the copy on mobile. See `DIAGRAM-PLAN.md` V1. <br>• **The specimen:** a compact record of one reviewed conclusion. The header reads `conclusion` · `reviewed`. The conclusion is in serif; type, scope, a confidence bar and grounding are in mono. The foot reads *"Verify against current code before acting."* <br>• **The neighbours:** three **hazy neighbours** to its right, at reduced contrast. Each has its relationship in mono: `supports`, `depends on` (dashed), `replaced` (struck through). <br>• **The second ring:** two out-of-focus records hint that the memory goes further. <br>• **Caption:** *"One reviewed conclusion and its links."* plus an `Example` tag. <br>• **Mobile:** the neighbours become an indented list under the specimen. |
| **Calls to action** | **How it works** (primary) · *View on GitHub ↗* (State B) or *Read the research* (State A) |
| **Why it exists** | It meets goals 1, 3, 4, 5, 6, 7 and 11 before any scrolling. The specimen shows the unit of memory; the neighbours show that memories are connected, not a list. |
| **Deliberately leaves out** | Install commands; benchmark claims; tool names; the words *ECU*, *canonical*, *Engineering Cognition*; logos; fake app window chrome (no traffic-light dots). |

Alternative headlines, for owner choice:

- (a) "What your coding agent works out shouldn't end with the session."
- (b) "Keep what your coding agent figures out."
- (c) "Memory for coding agents that keeps conclusions, not conversations."

The recommended headline is the paper's own image ("the agent is a stranger"). Because it is phrased as *shouldn't*, it states a value rather than an arguable claim about every agent.

---

### S2. The problem: *Why does this exist?*

| | |
|---|---|
| **Purpose** | Make the continuity problem felt at a glance, then name the hard part. |
| **Headline** | **The bottleneck isn't intelligence. It's continuity.** |
| **Pull line** (under the headline) | The hard part isn't storing more. It's knowing what's worth remembering. |
| **Visual** | **P1, "Every session starts from zero"** (columns 7–12). Three rows, Monday to Wednesday. In each one, the agent's reasoning (grey bars) arrives at the same dashed conclusion, *why users get logged out*, and stops at a dashed "session ends" line. Caption: *"Each new session works it out again, from zero."* See `DIAGRAM-PLAN.md` P1. |
| **Call to action** | None. Scrolling continues into the mechanism. |
| **Why it exists** | Goal 2, shown rather than told: the repetition does the work the paragraph used to do. |
| **Deliberately leaves out** | The problem paragraph (P1 replaces it); criticism of other approaches; the H.M. case study (it belongs to the paper); any chart of "understanding over time". The old sawtooth chart is retired (`DIAGRAM-PLAN.md` §5). |

---

### S3. How it works: *How does the solution work?*

| | |
|---|---|
| **Purpose** | The mechanism, understood in about ten seconds. |
| **Headline** | **How it works**, with an aside in the right column: "From one session to the next — and you decide what's kept." |
| **Visual** | **Fig. 1, "From one session to the next"** (full width). Four drawn stations, with a dashed "session ends" line after the first and a dashed "next session" line before the last. See `DIAGRAM-PLAN.md` F1. Each station has a numbered title and one line: <br>**1 Your agent works.** Conclusions are extracted as it goes. <br>**2 You review.** Keep what's right. Drop the rest. <br>**3 Memory builds up.** Grounded in your code. <br>**4 Your agent asks.** After reading the code, not before. <br>Caption: *"Fig. 1 Dashed: not yet reviewed. Solid, with a blue edge: reviewed by you."* The caption teaches the visual grammar the rest of the page uses. |
| **Call to action** | *The full mechanism →* (`/how-it-works`) |
| **Why it exists** | Goals 3 and 6, plus the "after reading the code" stance. Review at the session boundary and the request after reading the code make the two governance ideas visible. |
| **Deliberately leaves out** | The separate steps block (its content is now inside the figure); tool names; confidence maths; relationship types; maintenance; scope levels; model names; hover highlighting (nothing left to link to). |

### S3b. Side by side: *Can I see it work?*

The place for the comparison video. Per the owner's decision on 2026-10-05, it is **visible now**, before the recording exists.

| | |
|---|---|
| **Purpose** | Hold the side-by-side recording: the same agent, on the same repository and tasks, across the same sessions, once without Reverie and once with it. Until the recording exists, the section reserves the place honestly. |
| **Headline** | **The same agent, with and without Reverie.**, with an aside in the right column: "Same repository, same tasks, same sessions — side by side." |
| **Before the recording** (now) | **The frame:** a dashed frame, 1200 × 260. Dashed means "not yet", as everywhere on the site. <br>**The halves:** it splits into *Without Reverie* and *With Reverie*. Each half has one italic line naming its condition: *No memory between sessions* and *Reviewed conclusions between sessions*. <br>**Underneath:** an `In design` tag (or `In progress` while recording) and *"The recording will appear here, whatever it shows."* In the `design` and `running` states, *How we'll run it →* is added. <br>**Never shown:** no player, play button or thumbnail, and nothing that predicts a result. |
| **After the recording** (`published`) | The frame becomes the video module (V2): <br>• the condition labels above the two halves, in the same two-column grid; <br>• a 16:9 poster frame with a native player (click to play, no autoplay, captions); <br>• under it, one line of metadata: date · agent and model · sessions · "Sped up N×", then *Protocol, recordings and results →*. <br>The format follows the owner's reference: one composited side-by-side recording of the same task, with the setup disclosed. |
| **Placement** | After How it works, so the mechanism comes first and the evidence follows; before Memory. |
| **Mobile** | Before the recording, the two halves stack. After it, the composited highlight plays as produced (§13). |
| **Why it exists** | Goals 8 and 9. Once the recording exists, it is direct evidence of continuity. Until then, it is a visible commitment to publish the result either way. |
| **Deliberately leaves out** | Fake footage, mock terminals, an empty player, outcome language ("Reverie wins"), and any number before the results are published. |

When the video is published, **the lower panel of Fig. 2 (F2) leaves the homepage**, so the page doesn't grow. F5 on How it works already covers it.

---

### S4. How memory evolves: *Why isn't this just a notes file?*

| | |
|---|---|
| **Purpose** | Show memory as a living structure governed like belief. Conclusions are added, strengthened, challenged, replaced with their history kept, and fade when unused. |
| **Headline** | **Memory that can change its mind.**, with an aside in the right column: "Conclusions behave like beliefs: evidence strengthens them, contradictions challenge them, and disuse lets them fade." |
| **Visual** | **Fig. 2**, one figure in two panels. See `DIAGRAM-PLAN.md` M1 and F2. <br>**Top: M1, the memory map** (animated). About thirteen short conclusions with links between them, on a 16-second loop: <br>• a new conclusion slides in dashed (*new · awaiting review*), turns solid (*added after review*) and strengthens the conclusion it supports (*strengthened*); <br>• a newer conclusion drops in and contradicts an older one (amber, *challenged*), then replaces it, which is struck through and dimmed (*superseded · kept*); <br>• an unused conclusion fades (*fading · unused*). <br>A legend sits under the map and a pause button above it. <br>**Bottom: F2, "One conclusion, up close."** One conclusion through six states, with confidence bars computed by Reverie's rules (no numerals) and a footnote about deleted code. <br>Caption: *"Fig. 2 Example values, computed with Reverie's update rules."* |
| **Motion** | The only animation on the site (§16). It has a pause control, stops when off screen, and is static and fully annotated under reduced motion. |
| **Call to action** | *How conclusions change →* (`/how-it-works#change`) |
| **Why it exists** | Goals 4 and 5: the most distinctive behaviour, and the hardest to convey in text alone. The owner asked for strengthening and forgetting to be visible. |
| **Deliberately leaves out** | The four supporting lines (the aside, the map's labels and the lifecycle now carry them); log-odds, thresholds, priors and numerals; the word "forget", because conclusions fade and nothing is hard-deleted. |

Alternative headline: "Kept as beliefs, not facts."

---

### S5. Your memory, not your agent's: *Whose memory is it, and where does it live?*

| | |
|---|---|
| **Purpose** | Ownership and portability: the memory belongs to the developer, not to any one agent or model, and it lives on their machine. |
| **Headline** | **Your memory, not your agent's.**, with an aside in the right column: "Switch agents or models — what you've built up stays with you, on your machine." |
| **Visual** | **O1, Fig. 3, the ownership hub.** See `DIAGRAM-PLAN.md` O1. <br>• **Centre:** *Your memory* (`~/.ec/ec.db`, *on your machine · reviewed by you*). <br>• **Around it:** Claude Code and Cursor on the left, OpenCode and Codex on the right, all solid (set up by the installer). *Any MCP agent* is dashed (set up by hand). Thin connectors are labelled `MCP`. <br>• **Caption:** *"Fig. 3 Solid: set up for you. Dashed: set up by hand."* <br>• **Mobile:** the hub, then the agents in a two-column grid. |
| **Facts** (three short columns) | **Stored on your machine.** One SQLite file. No Reverie account. <br>**You approve what's kept.** Every extracted conclusion passes your review. <br>**Your choice of model.** Extraction runs hosted, or locally with Ollama. |
| **Call to action** | *Data, setup and limits →* (`/how-it-works#install`) |
| **Why it exists** | Goals 7, 8, 10 and 11. It answers "will this lock me in?" and "where does my data go?" without a single command. |
| **Deliberately leaves out** | Commands; MCP tool names; dependency lists; test counts; version numbers; OS claims; "nothing leaves your machine" (hosted extraction sends text to the configured endpoint, §1.8). |

---

### S6. Research: *Is there serious thinking behind this?*

| | |
|---|---|
| **Purpose** | Show the research foundation and the honesty that defines it, then route researchers onward. |
| **Headline** | **Built by measuring what didn't work.** |
| **Supporting copy** | Our first version loaded memory into the agent before it started. On our benchmark, that made it worse — it trusted memory over the code. So Reverie keeps reviewed conclusions, and lets the agent ask. <br><br> We publish results either way. |
| **List** (typographic, each row a link) | **Paper:** *Reverie: A Biological Memory Architecture for AI Agents* · September 2026 <br> **Benchmark:** *EC-Bench: what we measure, and what we've found* · Method, results and limits <br> A third row, **Next:** *The same agent, with and without Reverie* · `In design`, appears only while S3b is hidden. |
| **Call to action** | *All research →* (`/research`) |
| **Why it exists** | Goal 9. It also states the value "research before claims" by *doing* it rather than declaring a principle. |
| **Deliberately leaves out** | Every number; the biology story (one click away in the paper); the list of archived PDFs. |
| **Gate** | The sentence "made it worse" is consistent across the paper and the July per-metric table. The owner signs off on it after the §1.7B reconciliation. |

---

### S7. Closing: *Where can I see it?*

| | State A (before release) | State B (repository public) |
|---|---|---|
| **Headline** | **The repository opens soon.** | **Read the code.** |
| **Copy** | Want to know when it's out, or talk about the research? | The source, the extraction prompt, the benchmark harness and setup instructions are in the repository. |
| **Calls to action** | **Get in touch** (mailto, subject "Reverie") · *How it works* | **View the repository ↗** · *How it works* |
| **Why it exists** | Goal 10: a single clear next action. | |
| **Leaves out** | Newsletter forms, star counts, testimonials. | |

---

## 8. Other page specifications

### 8.1 How it works: `/how-it-works`

| | |
|---|---|
| **Purpose** | The full mechanism for a developer deciding whether to trust Reverie: what it keeps, who decides, how memory changes, how it comes back, what runs where, what doesn't work yet. |
| **Primary audience** | Primary developers after the homepage; skeptical evaluators. |
| **Primary question** | "How exactly does this work, and can I trust it with my workflow?" |
| **Length** | At most 2,200 words. Sticky table of contents on desktop; collapsible "On this page" on mobile. |
| **Visuals** | **Fig. 3** Anatomy of a conclusion · **Fig. 4** Two brains and a review gate · **Fig. 5** The life of a conclusion, step by step (interactive). Three in total. |
| **Research sources** | PRODUCT.md §3–§16, §19–§22; INSTALLATION.md §2, §5–§8, §11; paper §3–§10 (concepts only, corrected per §1.7A). |

**Header.** H1 "How Reverie works". Lede: *"What Reverie keeps, who decides, how memory changes, and how your agent gets it back, in that order."* Contents follow.

**Grounding notes.** Each section ends with a one-line mono note naming the modules that implement it, for example `implemented in: ec/review_gate.py · ec/diffuser.py`. In State B the paths link to the source at a pinned tag; in State A they are hidden. This is the site practising what the product preaches: its claims cite their grounding.

| § | Section (H2) | Key message | Content (draft outline) | Visual |
|---|---|---|---|---|
| 1 | **What gets remembered** (`#remembered`) | A conclusion, not a fact. | Definition (the smallest self-contained engineering conclusion that could change a future decision). Information vs conclusion, using the paper's pair: *"`TokenManager.refresh()` is called before `cache.clear()`"* is information; *"cache invalidation must follow token refresh…"* is a conclusion. The three-question test. One conclusion per record. "Zero is a valid output." The 8 types and 7 scope levels shown as compact inline lists. Introduce "Engineering Cognition Unit (ECU)" once. | **Fig. 3** |
| 2 | **Who decides what's kept** (`#review`) | Two brains and a review gate. | **Session brain:** per repo and branch, immediate, unreviewed, ranked slightly lower. **Canonical brain:** reviewed, long-term, shared across projects. The hard boundary: evidence about long-term conclusions waits as *pending* until its source is accepted. **Review:** open questions first, then accept, reject or skip per group or item; skipped items carry into the next session. **The one exception, stated plainly:** when your agent finds verified evidence about a conclusion it has just retrieved, it can update that conclusion straight away (reconsolidation), and the update is recorded on the conclusion. **Aside (two sentences):** the split came from a practical problem (one store either fills with noise or blocks in-session use) and later turned out to mirror a well-known account of biological memory: fast encoding, slow consolidation. → *Read the paper*. | **Fig. 4** |
| 3 | **How a conclusion changes** (`#change`) | Beliefs, with evidence and history. | **Confidence:** a starting prior from how the conclusion was reached and its scope; supporting or contradicting conclusions move it in log-odds, weighted by similarity and the other conclusion's confidence; every update is stored and reversible; unused conclusions fade at a rate set by scope; retrieval reinforces. **Relationships:** supports, contradicts, supersedes, depends on. **Contradictions:** a computable pre-check, then adjudication; the existing conclusion is marked *challenged* (never hidden); after a scope-dependent time it becomes an *open question*, and you choose: investigate, prefer one, mark both valid in different contexts, or archive. **Supersession:** accepted wording never changes; a new conclusion replaces the old, which is frozen, kept and linked. Dependents of a weakened conclusion are challenged. | **Fig. 5** (interactive stepper with computed values) |
| 4 | **Grounded in your repository** (`#grounding`) | The code has the last word. | What's recorded: files, symbols and the commit at extraction. How it's checked: periodically, in the background. What happens: a small table of scope → *retired when* (engineering/domain: never · organization/project: when all cited files are gone · repo/module/subsystem: when any cited file or symbol is gone). Dependents are challenged; you're told at your next review; being far behind HEAD is flagged but never retires anything. | Table (not counted as a diagram) |
| 5 | **How your agent gets it back** (`#retrieval`) | It asks, after reading the code. | Why not load memory at session start: the anchoring finding, in two sentences, linked to EC-Bench. What happens on a request: a task mode is inferred (debugging, implementation, investigation, planning, architecture); both brains are searched; results are filtered by status, scope and relevance; ranking weighs similarity, confidence (after decay), session activity and how connected a conclusion is; each result comes grouped with the conclusions that support, contradict or depend on it, or replace it; everything fits a budget that depends on the mode. What the agent receives (→ Fig. 3) and the framing note. Honest limit: agents don't always ask when they should. | — (refers to Fig. 3) |
| 6 | **What you're installing** (`#install`) | Local, inspectable, explicit about data. | **Storage:** one SQLite file at `~/.ec/ec.db`, shared by your projects. **Server:** spawned by your agent over stdio; runs maintenance in the background. **Tools table** (MCP): name · what it does · when the agent calls it · needs an active session? **Agents table:** agent · what the installer configures (MCP entry and instructions file). **Across agents and models:** every agent you connect shares the same file, so switching agents, or the model an agent runs, keeps your memory; agents beyond the four are set up by hand (steps in the repository). **Models and data:** what is sent to the configured LLM (the prompt, the agent's reasoning, candidate pairs for classification), what never leaves the machine (the database, embeddings, retrieval), and the Ollama option. **Naming note:** *in the code, Reverie's package, commands and tools use the prefix `ec`, for Engineering Cognition, the research program behind it.* Setup instructions: in the repository. | Two tables (not counted) |
| 7 | **Limits, today** (`#limits`) | What doesn't work yet. | Developed and tested on macOS; other platforms aren't verified. Review happens in the terminal only. You start and end sessions yourself; the agent never does. Extraction depends on an LLM and makes a single attempt per observation. There is no interface for editing or deleting long-term memory yet beyond review decisions. Our benchmark hasn't shown a clear advantage yet (→ EC-Bench). A *Last reviewed* date is shown. | — |
| 8 | **Questions** (`#faq`) | Straight answers. | Native `<details>` items: <br>1. *Doesn't my agent already have memory?* Instruction files and built-in memories store notes that load into sessions; Reverie stores reviewed conclusions with confidence, scope, code references and relationships, retrieved on request; it works alongside instruction files. <br>2. *Does my code leave my machine?* Precise data-flow answer (as in §6). <br>3. *What do I have to do?* Start a session, work, review at the end. <br>4. *Why doesn't it load memory automatically?* The anchoring answer. <br>5. *Does Reverie make my agent better?* That's what the research is testing; the honest current answer, with a link. <br>6. *Which agents are supported?* Four, plus manual MCP setup. <br>7. *Is it open source?* State-driven answer; no claim until a LICENSE exists. | — |
| 9 | Next | — | "Read the research →" · State B: "View the repository ↗" | — |

### 8.2 Research index: `/research`

| | |
|---|---|
| **Purpose** | Present the research program behind the product, give a reading path, and show what's current versus superseded. |
| **Primary audience** | Researchers and builders; developers who want depth. |
| **Primary question** | "What has been studied, what was found, and where do I start?" |
| **Visuals** | **None.** The lineage is a typographic dated list, not a diagram. |
| **Calls to action** | Read the paper; see EC-Bench; contact for collaboration. |
| **Research sources** | The paper, the four PDFs, "Everything till now", PRODUCT.md §17. |

**Sections**

1. **Header.** H1 "Research". Lede: *"Reverie comes out of Engineering Cognition, a research program that asks whether the understanding built during engineering work can be extracted, kept and revised by a system. We publish what we find, including when it doesn't work."*
2. **The story so far** (`#lineage`). A dated typographic list; every date must be verified by the owner.
   - **Jun 2026: The question.** Working paper *Engineering Cognition* (30 Jun).
   - **Jul 2026: First system, first benchmark.** Repository memory loaded into each session; EC-Bench Technical Report 001 (15 Jul) and Short Report (18 Jul). The finding that mattered: loaded memory anchored the agent.
   - **Jul 2026: What deserves to become memory?** Notebook: *Everything till now* (29 Jul).
   - **Aug 2026: Second architecture.** Conclusions as units, two brains, review, confidence, contradictions, grounding, retrieval on request. Benchmark run (13–15 Aug): the gap narrowed; the baseline is still ahead.
   - **Sep 2026: The paper.** *Reverie: A Biological Memory Architecture for AI Agents* (5 Sep).
   - **Next.** The continuity experiment, a dedicated extraction model, a larger benchmark.
3. **Start here.** The flagship paper entry: title, date, a two-line summary, reading time, `Read` and `PDF`.
4. **Evaluation.** EC-Bench (`Ongoing`) and the continuity experiment (`In design`, linked only if the owner publishes the protocol, §13).
5. **Notebook** (`#notebook`). Dated entries; "Everything till now" carries a `Historical` tag.
6. **Archive** (`#archive`). The four July/June PDFs, each with a status (`Superseded` or `Working draft`) and a one-line note on what changed and where. For example, on the technical report: *"First benchmark run. Its aggregate gain came from the cognition-reuse metric; four of five metrics were lower with memory. See EC-Bench."* The old "EMS" name is explained once here: *"Earlier documents call the first version the Engineering Memory System (EMS)."*
7. **Collaborate.** One line with an email link for researchers.

### 8.3 Paper: `/research/biological-memory-architecture`

| | |
|---|---|
| **Purpose** | The flagship paper in a readable, linkable, accessible web form, with the PDF. |
| **Primary audience** | Researchers; developers who want the full reasoning, including the biology. |
| **Primary question** | "Why was Reverie designed this way, and what's the evidence?" |
| **Visuals** | Reuses **Fig. 4** (in §5, two brains) and the static variant of **Fig. 5** (in §6/§8). Two in total. |
| **Calls to action** | PDF; Cite (BibTeX copy); *What this changed in Reverie* → How it works. |
| **Source** | The paper, **after the §1.7A corrections**. |

**Structure.**

- **Header:** title, author, date, version (for example "v1.1, revised Oct 2026"), reading time, `PDF`, `Cite`.
- **Abstract:** the paper has none; the owner writes about 120 words.
- **Table of contents:** sticky on desktop.
- **Body:** 17 sections, with the paper's citations as linked references.
- **Changelog box** at the end, listing corrections made since 5 Sep.

Long-form typography (serif, 19 px, 66-character measure). The §14–§16 vision material (multimodal extraction, other domains) stays in the paper and is framed by the paper itself as speculative; the product pages never repeat it.

**Fallback** if a correction pass can't happen before launch: publish an abstract page (summary, key sections, PDF) with an errata box listing the §1.7A items. Never publish the uncorrected text as an HTML article.

### 8.4 EC-Bench: `/research/ec-bench`

| | |
|---|---|
| **Purpose** | Explain what EC-Bench measures and present every run honestly as a ledger. |
| **Primary audience** | Researchers; developers who clicked "Does it make my agent better?" |
| **Primary question** | "Does accumulated understanding change what a coding agent does later, and what have you actually found?" |
| **Visuals** | **Fig. 6**, how an EC-Bench run works. One in total; tables are not counted. |
| **Calls to action** | Reports (PDF); the harness in the repository (State B); collaboration email. |
| **Research sources** | PRODUCT.md §17; the paper §11–§12; Technical Report 001; the Short Report; run `20260813-141550`. |

**Sections**

1. **Header.** H1 "EC-Bench". Lede: *"Does what a coding agent worked out in earlier sessions change what it does in later ones? EC-Bench is our attempt to measure that."*
2. **Why a new benchmark.** Two paragraphs, condensed from the current `/ec-bench` philosophy: existing benchmarks evaluate single episodes; continuity needs sequences of sessions.
3. **How a run works.** **Fig. 6**, plus text: a FastAPI repository; 30 prompts across three sequential sessions (14 investigation and architecture, 13 implementation and debugging, 3 planning); an isolated memory per condition; fresh context per prompt in the Reverie condition; review between sessions set to auto-accept in the harness; one LLM judge (GLM-5.2) scoring full transcripts on five weighted metrics (architectural continuity 0.30, cognition reuse 0.30, repository groundedness 0.15, engineering quality 0.15, debugging/investigation efficiency 0.10).
4. **Results so far** (`#results`). Intro (draft): *"So far, no run shows a clear advantage for Reverie. The first run's aggregate favoured memory, but the gain came from one metric that loading memory inflates; on the other four, the agent did worse. The second architecture narrowed the gap under a protocol that favoured the baseline. A controlled comparison is next."* Then the **results ledger** (§19.3): one row per run with date, system and version, protocol, prompt count, judge, outcome, caveats and source document. Rows render numbers **only when reconciled**.
5. **What we learned.** Retrieval timing matters as much as retrieval quality; accumulated knowledge expands scope; tasks need different modes; where memory helped and where it hurt. (Source: Short Report §5.)
6. **What these runs did not test.** Human review (the harness auto-accepts). Contradiction and supersession: the stored run produced 0 `contradicts` and 0 `supersedes` edges. More than one repository or agent.
7. **Threats to validity.** Small sample; one repository; one agent type; an LLM judge; outlier removal (in the paper's v2 figures); a mixed protocol in the stored run.
8. **What's next.** A controlled rerun with the same protocol in both arms; the continuity experiment (link); more repositories; a human judge alongside the LLM.
9. **What this changed in Reverie.** Retrieval on request → How it works §5.

### 8.5 Continuity experiment: `/research/continuity-experiment` (reserved)

Full specification in §13. The page has two states:

- **`design`**: question, protocol, what will be published. No video placeholder.
- **`published`**: recordings, ledger row, key moments, artifacts, caveats.

In state `design` there are no visuals; in state `published`, V2 (the video module) and, optionally, a variant of Fig. 6, for two in total.

### 8.6 Notebook entry: `/research/notes/[slug]`

| | |
|---|---|
| **Purpose** | Research log entries, readable as long-form. |
| **Visuals** | None. |
| **Template** | Back link ("← Research"), date, title, optional **editor's note** box, body (react-markdown, long-form typography), "Superseded by / see also" footer. |
| **"Everything till now" migration** | The content is kept verbatim (it's a historical record), with this editor's note (draft): *"Editor's note, October 2026. This entry describes Reverie's first version, then called EMS. Its benchmark section reports an aggregate improvement that later analysis revisited: the gain came from the cognition-reuse metric, while groundedness and quality were lower with memory. See EC-Bench for the current picture."* |

### 8.7 About: `/about`

| | |
|---|---|
| **Purpose** | Who builds Reverie, how the work is done, how to get in touch. |
| **Primary question** | "Who is behind this, and can I trust them?" |
| **Visuals** | None. An optional real portrait if the owner wants one. Never illustration or AI art. |
| **Length** | At most 350 words. |

**Sections**

1. **"Reverie is built by Mudit Sarda."** A short bio and links. The owner supplies these; whether to use "I" or "we" is §20.
2. **"How we work."** Three short prose paragraphs, deliberately not a principle-card grid:
   - **Understanding over information:** why Reverie keeps conclusions.
   - **Measure, then believe:** we benchmark our own ideas, and the first one failed.
   - **Memory you can inspect:** local, reviewable, grounded, with superseded documents kept and labelled.
3. **"Names."** Reverie is the product; Engineering Cognition is the research program; `ec` is the code's prefix; EMS was the first version.
4. **Contact.** Email.

The one surviving line from `/ethos`, *"Negative results matter"*, is rewritten into paragraph 2.

### 8.8 404

H1 *"This page doesn't exist."* One line: *"If you followed an old link to EMS: Reverie is its current name."* Links to Home, How it works and Research. No visuals.

### 8.9 Global chrome and metadata

| Item | Specification |
|---|---|
| `<title>` | Default "Reverie — memory for coding agents"; template "%s · Reverie" |
| Description | "Reverie keeps the engineering conclusions your coding agent reaches, reviewed by you, grounded in your repository, and revised as evidence changes. Works with Claude Code, Cursor, OpenCode and Codex." |
| Open Graph / Twitter | Per-page typographic images (title in serif, wordmark, paper background); `summary_large_image` |
| JSON-LD | Replace the current block: remove the unverified `url: https://ems.dev` and `sameAs: https://github.com`. Use `ResearchProject` + `Person` now; add `SoftwareSourceCode` with `codeRepository` in State B; add `ScholarlyArticle` on the paper page. |
| Skip link | Keep (current implementation is good) |
| Analytics | Keep Vercel Analytics (cookieless). A short privacy note in the footer is an open question. |

---

## 9. Diagram and visual plan (summary)

The full specification (purpose, question answered, content, exclusions, composition, interaction, mobile behaviour and sources for every visual) is in **[`DIAGRAM-PLAN.md`](./DIAGRAM-PLAN.md)**. It is meant to be reviewed and approved before any diagram is drawn.

| ID | Visual | Page(s) | Type | Interaction |
|---|---|---|---|---|
| V1 | Hero graph: a reviewed conclusion and its hazy neighbours (the specimen is reused in F3) | Home | Typeset artifact plus SVG | None |
| P1 | Every session starts from zero | Home | Repetition strip | None |
| F1 | From one session to the next | Home | Process diagram (four stations) | None |
| M1 | The memory map | Home (Fig. 2, top panel) | Animated network | 16 s loop with a pause button; stops off screen; static under reduced motion |
| F2 | One conclusion, up close (summary lifecycle) | Home (Fig. 2, bottom panel) | State timeline | None |
| O1 | Your memory, not your agent's | Home (Fig. 3) | Hub diagram | None |
| F3 | Anatomy of a conclusion | How it works | Annotated specimen | None |
| F4 | Two brains and a review gate | How it works; Paper | Architecture diagram | None |
| F5 | The life of a conclusion, step by step | How it works; Paper (static) | Interactive state timeline with computed confidence | Stepper (buttons, keyboard, aria-live) |
| F6 | How an EC-Bench run works | EC-Bench (variant on Experiment) | Protocol diagram | None |
| V2 | Side-by-side recording | Experiment; Home S3b (a reserved, dashed frame until published) | Video module | Player, chapters, condition toggle on mobile |

**Per-page count:**

| Page | Visuals | Count |
|---|---|---|
| Home | V1, P1, F1, M1 with F2, O1, plus the S3b video slot (a reserved frame now; V2 when published, and F2 then leaves) | 6 plus the slot, by owner decision |
| How it works | F3, F4, F5 | 3 |
| Paper | F4, F5 static | 2 |
| EC-Bench | F6 | 1 |
| Experiment | none (design state) / V2 plus an optional F6 variant (published) | 0 / ≤ 2 |
| Research index, Notebook, About, 404 | — | 0 |

**The cap.** Every page except the homepage keeps the limit of three visuals. The homepage is visual-led by owner decision (2026-10-05): a diagram replaces text wherever it explains better. Each homepage figure still replaces copy rather than decorating it.

**Pages where no diagram is necessary:** Research index, Notebook entries, About, 404, and the continuity experiment in its design state.

**All eight existing SVG components are retired.** Reasons per component are in `DIAGRAM-PLAN.md` §5.

---

## 10. Visual design system

### 10.1 Point of view: "two voices"

Reverie is *a product built from a research program*, so the site speaks with exactly two voices:

- **The serif speaks for ideas:** headlines, prose, captions, and the text of a remembered conclusion itself.
- **The monospace speaks for the system:** anything that literally exists in the implementation, such as tool names, field names, values, statuses, paths and identifiers.

A reader can always tell an *explanation* from an *artifact*. The rule also makes the design self-enforcing: if something is set in mono, it must exist in Reverie.

Around the two voices: warm paper, ink, one ink-blue accent, and a small set of **status marks** borrowed from the product's own lifecycle. Structure comes from hairline rules and whitespace rather than boxes. It should feel *authored*, like a well-made technical report about a tool you can install, and not like a template.

### 10.2 Typography

| Role | Family | Weights | Notes |
|---|---|---|---|
| Ideas (display, headings, body, captions, nav, buttons) | **Newsreader** (variable, optical sizes 6–72; Google Fonts, OFL) | 400, 500 (600 rarely); italic 400 for captions | The optical-size axis keeps small text sturdy and display text refined. Alternative if the owner finds it too editorial: **Source Serif 4**. |
| System (artifacts, labels, data) | **IBM Plex Mono** (Google Fonts, OFL) | 400, 500 | Warm enough to sit beside Newsreader. Alternative: JetBrains Mono. |

Fonts load through `next/font/google`: Latin subset, `display: swap`, metric-matched fallbacks (Georgia, `ui-serif`; `ui-monospace`). **Inter is retired:** it's the default face of AI-generated sites, and two voices are enough. Fallback option if the owner wants a more tool-like feel: Inter Tight for UI and headings with Plex Mono, keeping the serif only for research long-form.

| Token | Desktop | Mobile | Family and weight | Line-height | Tracking |
|---|---|---|---|---|---|
| `display` (hero H1) | 72 px | 40 px | Newsreader 400, opsz 72 | 1.04 | −0.02em |
| `h1` (page) | 56 | 36 | Newsreader 400 | 1.08 | −0.02em |
| `h2` | 40 | 28 | Newsreader 400 | 1.15 | −0.015em |
| `h3` | 22 | 20 | Newsreader 500 | 1.35 | −0.005em |
| `lead` | 22 | 19 | Newsreader 400 | 1.55 | 0 |
| `body` | 18 | 17 | Newsreader 400 | 1.6 | 0 |
| `body-long` (research) | 19 | 18 | Newsreader 400 | 1.65 | 0 |
| `caption` | 15 | 15 | Newsreader italic 400 | 1.5 | 0 |
| `ui` (nav, buttons) | 16 | 16 | Newsreader 500 | 1.5 | 0.005em |
| `mono` (specimen body) | 14 | 13 | Plex Mono 400 | 1.6 | 0 |
| `mono-label` | 13 | 12.5 | Plex Mono 500, uppercase | 1.3 | 0.08em |

Sizes use fluid `clamp()` between the two columns. Prose measure: 62 characters (product pages) and 66 characters (long-form). Tabular numerals in mono everywhere.

### 10.3 Colour

**Light theme (default).**

| Token | Value | Use | Contrast on paper |
|---|---|---|---|
| `--paper` | `#FAFAF7` | Page background | — |
| `--paper-sunken` | `#F2F1EC` | Diagram bands; code-inline background | — |
| `--surface` | `#FFFFFF` | Specimens | — |
| `--ink` | `#17171B` | Text, strokes, primary button | ≈ 17:1 |
| `--ink-2` | `#55555D` | Secondary text | ≈ 6.9:1 |
| `--ink-3` | `#6E6E76` | Meta text, superseded items | ≈ 4.8:1 |
| `--rule` | `rgba(23,23,27,.12)` | Hairlines | — |
| `--rule-strong` | `rgba(23,23,27,.24)` | Secondary button borders, axes | — |
| `--accent` | `#2C4A7E` (ink blue) | Links, focus ring, the "reviewed" mark | ≈ 8.4:1 |
| `--accent-wash` | `#2C4A7E` at 8% | Current-step highlight in Fig. 5 | — |
| `--challenged` | `#9A5F0E` (amber) | The challenged or contradicts mark *only* | ≈ 4.9:1 |

**Dark theme** (follows `prefers-color-scheme`; same tokens): paper `#111114`, surface `#18181C`, ink `#ECEBE6`, ink-2 `#B4B3AD`, ink-3 `#8E8D88`, rule `rgba(236,235,230,.14)`, accent `#8FA9D8`, challenged `#E0A84F`. No theme toggle; the system preference decides.

**Rules.** No gradients, glows, blur or glass. The one exception is the slight blur on the hero graph's out-of-focus records, which the owner asked for (hazy neighbours). The accent is never used for decoration. Amber appears only where something is genuinely challenged or contradicted. Colour never carries meaning alone; every status also has a glyph and a label.

The palette keeps the current site's warm-paper identity, which is a real differentiator against white-and-purple AI pages, but deepens the blue to ink for contrast and seriousness.

### 10.4 Status language (shared by the specimen and every diagram)

| Product state | Mark | Label (mono) |
|---|---|---|
| Session (unreviewed) | Hollow record, dashed 1 px outline | `session · unreviewed` |
| Canonical (reviewed, active) | Solid outline plus a 3 px ink bar on the left edge | `canonical · reviewed` |
| Challenged | Amber left bar | `challenged` |
| Open question | Dashed outline plus `?` glyph, confidence shown frozen | `open question` |
| Superseded | Text in ink-3 with a strike-through, arrow to the replacement | `superseded` |
| Deprecated | Text in ink-3 with a strike-through, plus "code removed" | `deprecated` |
| Archived | Text in ink-3 | `archived` |

| Relationship | Line |
|---|---|
| supports | Solid 1 px line with a filled arrowhead |
| contradicts | Solid line with an amber perpendicular tick at the target |
| supersedes | Solid line with an arrowhead and the label `replaces` |
| depends on | Dashed line with an arrowhead |

The rule that ties it together: **hollow means unreviewed; solid means reviewed.** Applied everywhere, it makes the review boundary visible at a glance.

**Short labels on the homepage.** The homepage uses `reviewed` and `unreviewed`, without `canonical` or `session`. The full labels appear on How it works and in the paper. Explanatory event labels such as *strengthened*, *superseded · kept* and *fading · unused* are serif italic, because they explain rather than name a status.

### 10.5 Spacing and grid

- **Base unit 4 px.** Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160.
- **Grid:** 12 columns; content maximum 1200 px; gutters 24 px (20 px mobile); page margins 20, 32 and 48 px at mobile, tablet and desktop.
- **Section rhythm:** 160 px between homepage sections on desktop, 96 px on mobile. Heading to body: 24 px. Figure to caption: 16 px.
- **Layout patterns**, used deliberately rather than uniformly:

| Pattern | Columns | Used for |
|---|---|---|
| Split | Text in 1–6, artifact or figure in 7–12 | Hero, Problem |
| Figure | Full width, caption in columns 1–6 | Figs 1, 2 and 3 |
| Facts row | Three columns of four, each under a 1 px ink rule | Your memory, not your agent's |
| Spec list | Label in 1–3, value in 4–10 | How it works tables |
| Prose | 66 characters, offset to column 3 | Research |

Everything is left-aligned. There are no centred hero stacks, which avoids the template look.

### 10.6 Borders, radius, elevation

- **Hairlines:** 1 px everywhere.
- **Radius:** 2 px for specimens, buttons and inputs; 0 for diagram bands. **No pills, no `rounded-3xl`.**
- **Elevation:** none. No shadows except the focus ring.

### 10.7 Buttons and links

| Kind | Style | Hover |
|---|---|---|
| Primary | Ink fill, paper text, 1 px ink border, 44 px tall, 0 18 px padding, `ui` type | Fill changes to `--accent` |
| Secondary | Transparent, ink text, 1 px `--rule-strong` | Border changes to ink |
| Text link | Ink, 1 px underline at 3 px offset in `--rule-strong` | Underline changes to accent |
| Arrow link | "Read the full mechanism →" | The arrow moves 2 px (instant under reduced motion) |
| External | Adds ↗ | — |

Focus: 2 px `--accent` outline at 2 px offset, on everything.

### 10.8 Cards: a deliberate policy

**There are no card grids.** Grouping uses rules and whitespace, like a document. The only bordered containers are **specimens** (real artifacts) and the **editor's note** box. This removes the "icon + heading + one-liner" pattern at the source.

### 10.9 Technical artifacts ("specimens")

- **Container:** surface background, 1 px rule, 2 px radius, 20–24 px padding.
- **Header strip:** a mono label on the left (`conclusion` on the homepage; `ec_query · group 1` on How it works), the status mark and label on the right. **No fake window chrome**: no title-bar dots and no prompt decoration.
- **Body:** the conclusion text in Newsreader 20 px (it's an idea); fields as a two-column mono list (label in ink-2, value in ink); the confidence value with a thin 1 px bar; grounding paths in mono that wrap at `/`.
- **Content rule:** every specimen is **captured from real output** (`ec_query` formatted or JSON payload). If example values are used, the specimen is labelled `Example`.
- **Inline code:** Plex Mono on `--paper-sunken`, 2 px radius. Block code is avoided on product pages; long-form articles use a simple sunken block.

### 10.10 Diagram language (summary; full grammar in `DIAGRAM-PLAN.md` §2)

- Line-based: ink on paper, 1 px strokes (1.5 px for primary flow).
- Rectangular records with 2 px radius, not circles. The old site's circle language is retired, and rectangles echo "records".
- Bands (`--paper-sunken`) for things that persist across time (the repository, long-term memory).
- Labels: serif for concepts, mono for artifacts. Figure number and caption below in serif italic.
- Built as HTML/CSS grid plus inline SVG connectors, so text is real, selectable, translatable and reflowable.
- Dedicated mobile compositions, never a scaled-down desktop SVG.
- No ambient animation and no flowing dots. The single exception is M1, an explanatory loop with a pause control (§16).

### 10.11 Image treatment

No stock photography, no AI-generated imagery, no illustrations of brains or neurons, no textures or grain. The only images allowed are real ones: recordings of real sessions (V2), an optional real portrait (About), and Open Graph images, which are typographic.

### 10.12 Iconography

Effectively none. Typographic glyphs (→ ↗ ? ×) and the status marks in §10.4 cover every need. Lucide is not added.

### 10.13 Wordmark and favicon

- **Wordmark:** "Reverie" set in Newsreader 500 at display optical size, −0.01em, ink. No logo exists today.
- **Favicon proposal:** a monogram "R" in Newsreader on paper. Alternatively, a two-glyph mark (hollow ring above a solid dot) meaning *unreviewed → reviewed*.
- The owner decides (§20). A designed logo is out of scope.

### 10.14 What the taste references contributed

**The four reference images still haven't been seen.** Even in the owner's Custom environment, the image CDNs (`i.pinimg.com`, `cdn.dribbble.com`) were blocked, and the Dribbble page is behind a bot challenge. The Pinterest pages' **text metadata** was readable, though:

| Reference | What its metadata says | Dominant colour (from Pinterest) |
|---|---|---|
| Verity (Dribbble) | Unreadable. A same-named Framer template (Kadir Calik, June 2026) is described as a "dark, cinematic design featuring interactive product dashboards". Probably related, unverified. | — |
| Pin 139893132164917102 | "The Secret Project — Aristide Benoist … Vertical list design, Minimalist design website, Minimal swiss design"; "a focus on typography and a clean design"; a large numeral as a left-hand section index | `#eae8eb` |
| Pin 696932111131213029 | "Infographic about problem design … Comparison graph, Information visualization design": a three-part problem analysis, each part led by a plain statistic with a cited source | `#f8f8f8` |
| Pin 890235051349985849 | "Newsletter article layout, Article page ui design, White minimalist design": a featured article above a grid of smaller article entries | `#f0f0f0` |

**Common traits** (moderate confidence, since they come from metadata):

- light neutral backgrounds;
- typography-led, Swiss-minimal layouts;
- editorial, document-like structure (numbered lists, category labels above titles, article indexes);
- evidence shown plainly, with sources;
- restraint;
- practical copy.

These match the direction above. One device was borrowed directly: **large light index numerals** for the homepage's three steps. The Research index (§8.2) can follow the featured-entry-plus-list pattern of the fourth reference.

The decisions above also rest on the qualities named in the brief (composition, spacing, hierarchy, restraint, typography, balance of copy and visuals, product presentation, pacing):

| Taken | Rejected for Reverie |
|---|---|
| One dominant visual per screen, with large confident type beside it (the hero split) | Dashboard-led product presentation (Reverie has no GUI) |
| Generous negative space and cinematic pacing: one idea per section | Dark cinematic surfaces, gradients and glows |
| Product shown as an artifact rather than described | Feature grids and stat counters |

If the owner's references favour a dark default, the token system flips the default theme without any structural change (§20).

---

## 11. Content strategy

### 11.1 Voice

- **Precise, calm, plain.** Short sentences. Concrete nouns ("conclusion", "file", "review") before coined terms.
- **First person plural** ("we publish") only in research and about contexts. Product copy addresses "you" and "your agent".
- **No hype adjectives** ("revolutionary", "powerful", "seamless", "supercharge").
- **Honest qualifiers where they're true** ("so far", "in our tests"), never as hedging filler.
- **Technical names after plain names.** "Conclusion" comes first; ECU is introduced once, on How it works.

### 11.2 Claim discipline

Every factual sentence on the site maps to a row in a **claims ledger**, kept in the website repository as `docs/claims-ledger.md` during implementation: claim → source (product file or document section) → last verified date. The initial ledger:

| # | Site claim (paraphrased) | Page | Source |
|---|---|---|---|
| C1 | Memory for coding agents; works with Claude Code, Cursor, OpenCode, Codex | Home, How it works | INSTALLATION.md §2 (`install.py:698`); end-to-end check for all four is pending (§20) |
| C2 | Keeps conclusions; rejects facts, code descriptions, play-by-play | Home, How it works | PRODUCT.md §6; paper §3 |
| C3 | Conclusions are usable in the same session before review | Home | PRODUCT.md §8, §13 (session trust weight 0.8) |
| C4 | You accept, reject or skip at session end, in the terminal; skipped items carry forward | Home, How it works | PRODUCT.md §10, §8 |
| C5 | Only accepted (extracted) conclusions become long-term memory | Home, How it works | PRODUCT.md §9 (writers), §10; exception for reconsolidation stated on How it works |
| C6 | The agent asks after reading the code | Home, How it works | PRODUCT.md §3.2 (tool description); INSTALLATION.md §7.6 (AGENTS.md); an instruction, not technically enforced |
| C7 | Results carry confidence, scope and files, framed as "verify against current code" | Home, How it works | PRODUCT.md §13 |
| C8 | Evidence raises or lowers confidence; unused conclusions fade; retrieval reinforces | Home, How it works | PRODUCT.md §11 |
| C9 | Contradictions are kept; persistent conflicts become open questions you resolve | Home, How it works | PRODUCT.md §7.2, §10, §14 |
| C10 | Accepted wording never changes; supersession keeps history | Home, How it works | PRODUCT.md §5.1, §9 |
| C11 | Deleted code retires conclusions about it; principles survive | Home, How it works | PRODUCT.md §14.2 |
| C12 | One SQLite file, shared across projects; no Reverie account, no cloud database, no vector DB (hosted extraction still needs an LLM key; see C15) | Home, How it works | PRODUCT.md §1, §2.5, §13, §15 |
| C13 | Local MCP server started by your agent; four named tools | Home, How it works | PRODUCT.md §3; INSTALLATION.md §7–8 |
| C14 | Other MCP clients can be set up by hand | Home, How it works | INSTALLATION.md §10.5 |
| C15 | Extraction uses the configured LLM; Ollama for local; embeddings and retrieval local | Home, How it works | PRODUCT.md §1, §2.6, §21.8; INSTALLATION.md §6 |
| C16 | What is sent to the LLM (prompt, reasoning, classification pairs) | How it works | PRODUCT.md §4, §6–7 |
| C17 | The first version loaded relevant memory into the agent's context before it started work; on our benchmark that made the agent worse | Home, Research | paper §2, §7 ("injected it into the agent's context before it began work"), §12; Short Report §4.2 per-metric table, §5.1 |
| C18 | No run shows a clear advantage yet | How it works, EC-Bench | PRODUCT.md §17; paper §12; Short Report table |
| C19 | Tested on macOS only | How it works | INSTALLATION.md §6, §11 |
| C20 | Review is terminal-only; no editing interface beyond review decisions | How it works | PRODUCT.md §10, §22.4, §22.7 |
| C21 | Sessions are started and ended by you | How it works | PRODUCT.md §3.1, §22.18 |
| C22 | Single-shot extraction | How it works | PRODUCT.md §6, §22.2 |
| C23 | Two-brain split arrived at practically, later found to mirror complementary learning systems theory | How it works, Paper | paper §5, §13 |
| C24 | Research dates | Research | PDF title pages; the paper; article frontmatter |
| C25 | EC-Bench design (repository, prompts, sessions, judge, weights) | EC-Bench | PRODUCT.md §17 |
| C26 | The stored run produced no `contradicts` or `supersedes` edges | EC-Bench | PRODUCT.md §17, §22.1 |
| C27 | Works with any MCP agent; agents other than the four are set up by hand | Home (hero, Fig. 3), How it works | INSTALLATION.md §10.5; a check with one client the installer doesn't configure is pending (§20, question 20) |
| C28 | Works on any model your agent runs; Reverie doesn't depend on the agent's model | Home | PRODUCT.md §3 (a local MCP server that the agent calls as tools) |
| C29 | Every connected agent uses the same memory, so switching agents or models keeps it | Home (S5) | PRODUCT.md §1, §15; INSTALLATION.md §7–8 |
| C30 | A new conclusion affects long-term conclusions only after you review it | Home (Fig. 2 map) | PRODUCT.md §7.2, §8 (pending updates applied at review) |
| C31 | Unused conclusions fade; nothing is hard-deleted | Home (Fig. 2 map, S4 aside) | PRODUCT.md §11 (lazy decay, never written), §14; paper §8 |
| C32 | Related conclusions come linked: supports, depends on, replaces | Home (V1) | PRODUCT.md §12 (relationship types), §13 (grouped results) |

### 11.3 Numbers ledger

The test applied to every number is the one from the brief: *"where did this exact number come from?"* Only numbers that help understanding appear.

| Number | Use? | Where | Source |
|---|---|---|---|
| 4 agents | Names only, not the count | Home, How it works | INSTALLATION.md §2 |
| 4 MCP tools | Names shown; the count is implied | Home, How it works | PRODUCT.md §3.2 |
| 1 SQLite file | **Yes** (aids understanding) | Home, How it works | PRODUCT.md §15 |
| 8 types, 7 scope levels, 4 relationship types, 6 statuses | **Yes** (the taxonomy) | How it works | PRODUCT.md §5.1, §9, §12 |
| 5 retrieval modes | Yes, named | How it works | PRODUCT.md §13 |
| Confidence values in Fig. 5 | **Yes**, computed with real rules and labelled "example" | How it works, Paper | PRODUCT.md §11; worked maths in `DIAGRAM-PLAN.md` §6 |
| Session trust 0.8 | No (detail) | — | PRODUCT.md §8 |
| 506 tests passed | **No** on product pages (goes stale; doesn't aid understanding). Optional in About or README. | — | PRODUCT.md §18 |
| v0.1.0 | Optional, config-driven, on How it works ("early release") | How it works | PRODUCT.md §2.1 |
| 613-line prompt, 384 dimensions, 11 tables, 72 h throttle, 50-commit staleness | No (vanity or detail) | Paper only where already present | PRODUCT.md |
| 303 requirements | **No** (not verifiable) | — | paper §12 |
| EC-Bench scores | **Only on the EC-Bench ledger after reconciliation**, each with a run ID | EC-Bench | §1.7B |
| 30 prompts, 3 sessions (14/13/3), metric weights | Yes | EC-Bench | PRODUCT.md §17 |
| Decay half-lives | Only in the paper, with the odds clarification | Paper | paper §4, §8 |

### 11.4 Length budgets

**Principle (owner rule, 2026-10-05):** prefer a diagram wherever it explains better than text. A figure label is at most eight words.

| Page | Budget |
|---|---|
| Home | ≤ 350 words of copy, counting the specimen and captions (revision 2 is about 340) |
| How it works | ≤ 2,200 |
| Research index | ≤ 400, plus entries |
| EC-Bench | ≤ 1,500 |
| About | ≤ 350 |
| 404 | ≤ 30 |

### 11.5 Naming bridge

The rename from EMS to Reverie, and the `ec` code prefix, are explained in exactly three places: How it works §6 (the naming note), the Research archive and the About "Names" paragraph. The 404 page mentions EMS for people following old links.

### 11.6 Maintenance

- Research pages show dates and a version.
- "Limits, today" shows a *Last reviewed* date.
- The claims ledger is re-verified whenever the product repository changes behaviour.

---

## 12. Research presentation strategy

1. **Web-native first, PDF as the archival format.** The current flagship (the paper) and the benchmark are HTML pages. PDFs are download links.
2. **Dated and status-labelled.** Every entry carries a date and a status: `Published`, `Ongoing`, `In design`, `Historical` or `Superseded`.
3. **Lineage over a list.** The research index opens with the dated story (§8.2), so the papers read as one investigation that changed its mind for reasons.
4. **Superseded, not deleted.** Earlier documents stay available with a note on what changed and a link to what replaced them, which mirrors how Reverie treats conclusions. The July reports' headline result is annotated, not hidden.
5. **Every research page connects back to the product** under the heading "What this changed in Reverie".
6. **Numbers come only from the reconciled ledger** (§1.7B; §19.3).
7. **Corrections are visible.** Each document has a changelog; the paper's v1.1 lists its corrections.
8. **The biology lives here.** The complementary-learning-systems, reconsolidation, forgetting-curve and synaptic-homeostasis parallels are presented in the paper as *inspiration and convergence*, with citations. The product pages mention the parallel once, in an aside.
9. **Citable.** BibTeX on the paper; stable URLs; author and date metadata (`ScholarlyArticle` JSON-LD).

---

## 13. Comparison-video placement

**Where it lives:** its own research page, `/research/continuity-experiment`. An experiment needs its protocol, artifacts and caveats next to the recording, and a homepage section can't carry that honestly. The homepage holds the recording itself in S3b. That section is visible now as a reserved frame (owner decision, 2026-10-05) and shows the video once it is published.

**The owner's reference format:** one composited video with two labelled halves, both systems running the same task in a recorded run, with the comparison setup disclosed. The highlight cut below follows it.

**Lifecycle**, controlled by a single setting, `site.config.ts → experiment.status`:

| Status | Experiment page | Research index | Homepage |
|---|---|---|---|
| `hidden` | Not generated | Row: "Continuity experiment · In design" (no link) | S3b shows the reserved frame, with no link. With `homepageSlot: false`, S3b is hidden and S6 shows a "Next" line instead. |
| `design` (**recommended**) | **Live**: question, hypothesis stated neutrally, protocol, what will be published, last-updated date. *No empty video frame.* The copy says: "Recordings and results will be published here when the runs are complete, whatever they show." | Linked, `In design` | S3b reserved frame, plus *How we'll run it →* |
| `running` | As `design`, plus a run log (dates) | `Running` | Same, with the tag `In progress` |
| `published` | Full page (below) | `Published` | **S3b opens**: poster frame, player, one-line neutral description, date, "Protocol, recordings and results →". The lower panel of Fig. 2 (F2) leaves the homepage (§7 S3b). |

Publishing the protocol before the results (status `design`) makes the "placeholder" a preregistration rather than an unfinished section, which fits the project's honesty.

**Published-page structure**

1. H1 "The continuity experiment". Lede: *"The same coding agent, on the same repository, across the same sessions: once without persistent memory, once with Reverie."*
2. **Metadata block** (always beside or above the video):
   - date;
   - Reverie version or commit;
   - agent and model;
   - repository and commit;
   - number of sessions and prompts;
   - the session-boundary definition (fresh context);
   - what the baseline had (nothing, or built-in memory);
   - review policy (human, auto-accept, or which decisions were made);
   - judge, if any;
   - **speed-up factor** (shown on screen too);
   - links to transcripts, the ECUs created and the review decisions.
3. **The recording (V2).** A short side-by-side highlight (≤ 90 s), produced for legibility with zoomed crops and large terminal type. Then full per-condition recordings with chapters (Session 1, 2, 3…) and key-moment timestamps (for example: "the baseline re-derives X", "the Reverie agent queries and retrieves Y, then verifies it"). Captions (WebVTT) and a text transcript.
4. **Results:** the ledger row, described in neutral language, plus per-session notes.
5. **What this shows, and what it doesn't** (limits, threats to validity).
6. **Reproduce:** harness and artifacts (State B).
7. **What this changed in Reverie.**

**Responsive behaviour**

| Width | Highlight recording | Full recordings |
|---|---|---|
| ≥ 1024 px | Side-by-side (one composited file) | Two players with synchronised play/seek, or two chaptered players |
| < 1024 px | Composited highlight still shown, since it was produced for legibility | One player with a `Without · With Reverie` segmented toggle that keeps the current timestamp when switching. Never a shrunken split screen of terminal text. |

Hosting: self-hosted MP4/WebM with a poster versus a privacy-respecting embed is an open question (§20).

**Copy rules.** Describe what each agent did; never "Reverie wins". If the result is mixed or negative, the page says so in the first paragraph, just as EC-Bench does.

**Optional suggestions for the experiment design** (it is being designed separately, so these are not requirements):

- (a) Include a mid-sequence change that invalidates an earlier conclusion, such as a refactor or migration, so contradiction, grounding and supersession become observable. The stored benchmark run never exercised them.
- (b) Run human review in at least one arm rather than auto-accept, since review is a core product behaviour.
- (c) Use the same protocol in both arms, avoiding the stored run's mixed headless versus interactive setup.
- (d) Consider a small public demo repository built around the throughline scenario (token refresh and cache invalidation). It could also supply the real captured specimens for V1, F3 and F5.

---

## 14. Responsive strategy

| Breakpoint | Name | Layout |
|---|---|---|
| < 640 px | Mobile | Single column; 20 px margins; hero copy then specimen; nav sheet |
| 640–1023 px | Tablet | Single column with wider measure; diagrams keep their vertical compositions until 768 px |
| ≥ 1024 px | Desktop | Twelve-column asymmetric layouts; sticky table of contents on long pages |
| ≥ 1280 px | Wide | Content capped at 1200 px; margins grow |

- **Type:** fluid `clamp()` between the mobile and desktop columns of §10.2. Body never drops below 17 px.
- **Diagrams:** each has a **dedicated vertical composition below 768 px**: the same content re-laid top to bottom, never scaled down. Minimum text size inside diagrams is 13 px. No horizontal scrolling. Details per figure are in `DIAGRAM-PLAN.md`.
- **Specimens:** full width on mobile; mono at 13 px; long paths wrap at `/` and `::`; no horizontal scroll.
- **Tables:** below 640 px, the MCP-tools, agents and results-ledger tables become stacked definition lists (one block per row). Wide tables never scroll sideways on the homepage.
- **Navigation:** sheet below 768 px; the call to action stays visible in the bar.
- **Touch targets:** at least 44 × 44 px; the stepper controls in Fig. 5 are 44 px buttons.
- **Video:** see §13.
- **Testing widths:** 360, 390, 768, 1024, 1280 and 1440 px.

---

## 15. Accessibility principles

1. **WCAG 2.2 AA** as the floor. All text tokens meet at least 4.5:1 (§10.3).
2. **Semantic structure:** one `h1` per page; ordered headings; landmarks (`header`, `nav`, `main`, `footer`); skip link (kept).
3. **Figures:** every diagram is a `<figure>` with a `<figcaption>` (number, title, one-sentence takeaway) **and** a structured text equivalent (an ordered list of the steps or states, visually hidden, linked with `aria-describedby`). Diagram text is real HTML text wherever possible.
4. **Colour is never the only signal:** statuses have glyphs and labels; contradiction edges carry a tick mark as well as amber.
5. **Keyboard:** everything operable. The Fig. 5 stepper uses real buttons, supports ←/→ when focused, and announces each step and its confidence value through `aria-live="polite"`. Focus is always visible (2 px accent ring).
6. **Motion:** honour `prefers-reduced-motion`. The only motion that starts without user action is the M1 memory map. It has a visible pause button, stops when it leaves the viewport, and is replaced by a static, fully annotated map under reduced motion (WCAG 2.2.2, Pause, Stop, Hide). Its structured text equivalent lists the five events in order.
7. **Video:** captions, transcript, no autoplay with sound, a pause control, and a speed-up disclosure in text.
8. **Language and reading:** plain-language summaries before technical detail; the FAQ uses native `<details>`.
9. **Content robustness:** no content hidden behind JavaScript. The current `AnimateSections`, which starts every section at opacity 0, is removed.
10. **Testing:** axe on every page, keyboard-only pass, VoiceOver (macOS and iOS) spot-checks, 200% zoom, a forced-colours check.

---

## 16. Animation principles

**Rule:** *motion only explains, and only when the visitor asks for it.* There is one exception, approved by the owner in revision 2: the homepage memory map (M1), because belief change is about time and a still image can't show it.

| Allowed | Where | Spec |
|---|---|---|
| Explanatory loop | Home, Fig. 2 top panel (M1) | A 16 s CSS keyframe cycle of five events: added, strengthened, challenged, superseded, fading. New conclusions slide in by at most 28 px. It starts only when in view, pauses off screen (IntersectionObserver), has a visible pause/play button, and under reduced motion is replaced by the static annotated map. |
| State transition | Fig. 5 stepper | Confidence bar width and status mark change, 200 ms ease-out; under reduced motion, instant |
| UI feedback | Buttons, links, nav sheet | Colour 150 ms; sheet opacity 150 ms (no slide under reduced motion) |
| Video | V2 | User-initiated playback only |

**Not allowed:**

- scroll-triggered reveals of any kind (`FadeIn` and `AnimateSections` are removed);
- page-load fades;
- looping or ambient animation, including SMIL flow dots (M1 is the single, explanatory exception);
- parallax;
- typing effects;
- counters;
- cursor effects;
- hover lifts on containers.

**Removed:** the `framer-motion` dependency (its only use was `ConceptualEvolution`, which is retired). CSS transitions and keyframes cover every allowed case.

---

## 17. Existing component disposition

| Component | File | Disposition | Reason |
|---|---|---|---|
| Root layout | `app/layout.tsx` | **Modify** | New fonts, metadata, JSON-LD fix; remove `AnimateSections` and `animate-fade-in` |
| Global styles | `app/globals.css` | **Rewrite** | New tokens (light and dark), type scale, prose styles; drop dead keyframes (`drawLine`, `gentlePulse`, `gentleFloat`), `section-animate` and the editorial pill and card classes |
| Navigation | `components/navigation.tsx` | **Modify** | Keep the accessible toggle logic; new links, wordmark, config-driven call to action, sheet; remove `backdrop-blur` |
| Footer | `components/footer.tsx` | **Rewrite** | Wrong taxonomy (Ethos under "Benchmarks"), placeholder GitHub link, duplicate EC-Bench link |
| FadeIn | `components/fade-in.tsx` | **Delete** | Scroll reveal is out of policy (§16) |
| AnimateSections | `components/animate-sections.tsx` | **Delete** | Double animation; hides content without JavaScript |
| PdfActions | `components/pdf-actions.tsx` | **Delete** | Runtime HEAD request on a static site; replaced by plain links with build-time existence |
| PaperCard, ResearchArtefactCard, ComparisonBlock | `components/*.tsx` | **Delete** | Dead code (never imported) |
| ProblemDiagram, EmsPipeline, EcBenchDiagram, ResearchGraph, ConceptualEvolution, ResearchNotebook, EngineeringBrain, ResearchDesk | `components/svg/*.tsx` | **Delete all** | See `DIAGRAM-PLAN.md` §5 for per-file reasons |
| Papers data | `lib/papers.ts` | **Replace** | `content/research.ts` with typed entries (kind, status, dates, supersededBy, PDF) |
| Articles loader | `lib/articles.ts` | **Modify** | Single parser (remove the duplicate in `app/notes/[slug]/page.tsx`); support the `editorsNote` frontmatter; read from `content/notes/` |
| Note page | `app/notes/[slug]/page.tsx` | **Move and modify** | To `app/research/notes/[slug]/page.tsx`; use `next/link`; new template |
| Notes index | `app/notes/page.tsx` | **Delete** | Redirect to `/research#notebook` |
| EMS, Ethos, EC-Bench pages | `app/ems`, `app/ethos`, `app/ec-bench` | **Delete** | Redirects (§18); EC-Bench content condensed into the new page |
| Research page | `app/research/page.tsx` | **Rewrite** | §8.2 |
| Home | `app/page.tsx` | **Rewrite** | §7 |
| Favicon | `app/favicon.ico` | **Replace** | New mark (§10.13) |
| Dependencies | `package.json` | **Modify** | Remove `framer-motion`. Keep `gray-matter`, `react-markdown`, `remark-gfm`, `@vercel/analytics`. Add `@next/mdx` only if MDX is chosen for the paper (§19.1). |

---

## 18. Existing route disposition and content migration

### 18.1 Redirects

These go in `vercel.json`, because Next's `redirects()` does not work with `output: "export"`.

| From | To | Type |
|---|---|---|
| `/ems` | `/how-it-works` | 308 |
| `/ethos` | `/about` | 308 |
| `/ec-bench` | `/research/ec-bench` | 308 |
| `/notes` | `/research#notebook` | 308 |
| `/notes/:slug` | `/research/notes/:slug` | 308 |
| `/EMS-artefacts/:file` | `/research/archive/:file` | 308 |

If hosting isn't Vercel, use static meta-refresh pages instead (§20).

### 18.2 Content migration

| Current content | Disposition |
|---|---|
| "Yet every new session effectively begins with amnesia." / the paper's "stranger" | **Rewritten** into the hero headline (in its "stranger" form) |
| "Preserving information is not the same as accumulating understanding." (Ethos) | **Rewritten** into the problem section's last line ("deciding what deserves to be remembered") |
| "Understanding appears only when reasoning requires it. Never before." (Home card) | **Rewritten** as retrieval on request (Home step 3, How it works §5) |
| EC-Bench philosophy (four principles, "why difficult") | **Condensed** into EC-Bench §2 (two paragraphs) |
| "Negative results matter" (Ethos) | **Rewritten** into About, "How we work" |
| "Engineering Cognition at a Glance" (six cards) | **Removed.** Concepts without a product basis ("Engineering Modes" as a headline concept, "Repository-first Reasoning") are replaced by real mechanisms. |
| "The Shift" (Memory → Understanding → Cognition; "Cognition compounds.") | **Removed.** Typographic poem with no information, and "compounds" implies a result not yet shown. |
| "Research Before Systems: We do not build products to prove ideas…" | **Removed.** It contradicts the product-first positioning; the value it held is shown on EC-Bench instead. |
| `/ems` research-direction prose (Extraction, Diffusion, Continuous maintenance, Demand-driven retrieval) | **Replaced** by How it works, describing implemented mechanisms |
| "Request access" and "Discuss EC-Bench" mailtos | **Replaced** by the State A contact call to action and the EC-Bench collaboration line |
| "Everything till now" | **Kept verbatim** with an editor's note (§8.6); moved to `content/notes/` |
| The four PDFs | **Kept** in the archive with status labels and notes (§8.2) |
| The new paper (PDF) | **Added**: web-native page plus PDF, after corrections |

---

## 19. Implementation architecture

### 19.1 Stack decisions

| Area | Decision |
|---|---|
| Framework | Keep Next.js 16 (App Router), React 19, TypeScript strict, static export (`output: "export"`). |
| Styling | Keep Tailwind CSS v4, with all design tokens as CSS variables in `@theme` (light) plus a `prefers-color-scheme: dark` override. |
| Content | Markdown in `content/` (gray-matter plus react-markdown/remark-gfm, as today). For the paper, **MDX** (`@next/mdx`) so Figs 4 and 5 can be embedded inline. Alternative: a TSX page assembling markdown sections. |
| Diagrams | React **server components** (zero client JavaScript), except the M1 controls and the Fig. 5 stepper (small client islands). |
| Client JavaScript budget | Nav toggle, M1 pause button and off-screen observer, Fig. 5 stepper; V2 player later. Nothing else. |
| Fonts | `next/font/google`: Newsreader (variable, opsz and weight axes, normal and italic) and IBM Plex Mono (400, 500). Preload display and body only. |

### 19.2 Proposed file structure

```text
app/
  layout.tsx · page.tsx · not-found.tsx · sitemap.ts · robots.ts · opengraph-image.tsx
  how-it-works/page.tsx
  about/page.tsx
  research/page.tsx
  research/biological-memory-architecture/page.mdx   (or page.tsx)
  research/ec-bench/page.tsx
  research/continuity-experiment/page.tsx           (rendered only if experiment.status ≠ hidden)
  research/notes/[slug]/page.tsx
components/
  site/        Wordmark · SiteNav · SiteFooter · RepoCta
  ui/          ButtonLink · ArrowLink · StatusTag · Prose · Toc · Figure · Faq · SpecList · EditorsNote · GroundingNote
  specimen/    ConclusionRecord (V1 card, used again inside F3)
  diagrams/    HeroGraph (V1) · SessionsStrip (P1) · SessionBoundary (F1) · MemoryMap (M1, client island) · ConclusionLifecycle (F2/F5) · OwnershipHub (O1) · ConclusionAnatomy (F3) · TwoBrains (F4) · BenchProtocol (F6)
  research/    ResearchList · Lineage · ResultsLedger · Citation
  video/       ComparisonVideo (V2; built when the experiment ships)
content/
  site.config.ts          name, tagline, domain, contactEmail, repository {url|null, ref}, experiment {status, homepageSlot}, claims {anyMcpAgent}, version, supportedAgents
  research.ts             research entries (index, lineage, archive)
  bench-runs.ts           results ledger rows (with sources and reconciliation status)
  specimens/*.json        captured ec_query outputs (V1/F3)
  lifecycle-scenario.ts   inputs for F2/F5 (computed via lib/confidence.ts)
  notes/*.md              notebook entries
lib/
  confidence.ts           TypeScript port of the ec/confidence.py update rules used by F2/F5 (constants copied from DEFAULT_CONFIG)
  markdown.ts             one frontmatter/markdown parser
public/
  research/archive/*.pdf  research/*.pdf  icons/*
docs/
  claims-ledger.md
vercel.json               redirects (§18.1)
```

### 19.3 Data models and honesty guards

```ts
// content/bench-runs.ts
type BenchRun = {
  id: string;                       // e.g. "20260813-141550"
  date: string;                     // ISO
  system: string;                   // "EMS v1 (injected)" | "Reverie v2 (on request)"
  baseline: string;                 // what the comparison arm had
  protocol: string;                 // e.g. "headless, fresh context per prompt vs interactive chat memory"
  prompts: number;
  judge: string;                    // "GLM-5.2 (LLM), full transcript"
  status: "reconciled" | "needs-reconciliation";
  figures?: { metric: string; withReverie: number; baseline: number }[];   // rendered ONLY if reconciled
  outcome: string;                  // neutral sentence, always rendered
  caveats: string[];
  sources: { label: string; href: string }[];
};
```

- `ResultsLedger` renders `figures` **only** when `status === "reconciled"`. Otherwise it shows `outcome`, `caveats` and the note "figures under reconciliation". This enforces §1.7B in code.
- `lib/confidence.ts` ships with unit tests whose expected values come from the Python implementation (owner supplies them, or they are computed once from `ec/confidence.py`), so the diagrams can never drift from the product's maths.
- Specimen JSON files carry a `captured: { date, reverieVersion, source }` field; the component prints `Example` when `source === "illustrative"`.

### 19.4 Configuration states

`site.config.ts` holds four switches:

- `repository.url: string | null`, which controls the CTA states (§4.5) and the grounding-note links;
- `experiment.status: "hidden" | "design" | "running" | "published"`, which controls §13;
- `experiment.homepageSlot: boolean` (default `true`, owner decision), which shows S3b's reserved frame before publication;
- `claims.anyMcpAgent: boolean`, which controls the "any MCP agent" wording in the hero and the dashed record in Fig. 3 (§20, question 20).

No other conditional logic is needed.

### 19.5 Hosting and redirects

Vercel is assumed, since Vercel Analytics is installed. Redirects go in `vercel.json`. To be confirmed (§20); on another host, use meta-refresh redirect pages generated at build.

### 19.6 SEO and metadata

| Item | Plan |
|---|---|
| `sitemap.ts`, `robots.ts` | Static generation at build |
| Open Graph images | Static `opengraph-image.tsx` per route, rendered at build. **Verify support under static export in Next 16.** Fallback: pre-rendered PNGs in `public/`. |
| JSON-LD | §8.9 |
| `llms.txt` (optional) | A plain-text product summary for agents, generated from `site.config.ts` and the claims ledger. No install commands. |

### 19.7 Quality gates (before each merge)

- `npm run lint`, `tsc --noEmit` and `next build` all pass.
- Lighthouse at least 95 for accessibility, best practices and SEO; at least 90 for performance on mobile.
- LCP under 2.0 s on simulated 4G; CLS under 0.05; JavaScript under 60 KB gzipped on content pages.
- axe: zero violations.
- Keyboard-only walkthrough.
- Reduced-motion check.
- Visual check at the widths in §14, in both themes.
- Claims ledger: every new sentence with a factual claim has a row.

### 19.8 Implementation order

| Phase | Work | Depends on |
|---|---|---|
| **0. Content prerequisites (owner)** | Reconcile benchmark figures (§1.7B); correct the paper (§1.7A); capture a real `ec_query` output for V1/F3; confirm the four-agent claim end to end; test one MCP client the installer doesn't configure; decide repository/licence timing and contact method; confirm domain and hosting; approve fonts; About copy; experiment status; share visual references | — |
| **1. Foundation** | Tokens (light and dark), fonts, `site.config.ts`, layout, nav, footer, 404, `vercel.json` redirects, deletion of dead components and animation layers, removal of `framer-motion` | Approval of this plan |
| **2. Diagram groundwork** | `lib/confidence.ts` plus tests; shared diagram primitives (record, band, edge, status mark) per `DIAGRAM-PLAN.md` §2 | `DIAGRAM-PLAN.md` approval |
| **3. Homepage** | S1–S7, V1, P1, F1, M1 with F2, O1 | Phase 0 specimen (or a labelled example) |
| **4. How it works** | §8.1 content, F3, F4, F5 stepper, tables, FAQ, limits | Phase 2 |
| **5. Research** | Index (lineage, entries, archive), notebook migration with editor's note, PDF moves | Phase 1 |
| **6. EC-Bench** | Page, F6, `ResultsLedger` with guards | Phase 0 reconciliation for figures; can ship without figures |
| **7. Paper** | MDX page with F4/F5, citation, changelog | Phase 0 paper corrections |
| **8. About and SEO** | About, metadata, JSON-LD, sitemap, robots, Open Graph images, optional `llms.txt` | Phase 0 domain |
| **9. QA** | §19.7 gates across all pages | — |
| **10. Continuity experiment** | `design`-state page, then the `published` page with V2 and slot S3b | Owner's experiment timeline |

---

## 20. Open questions

| # | Question | Why it matters | Proposed default |
|---|---|---|---|
| 1 | **Benchmark reconciliation.** Which figures are authoritative for v1 (8.35/7.96 vs 8.11/8.53) and v2 (8.14/8.52 on 30 prompts vs 8.32/8.63 on 28), and why do the ECU counts differ (74 vs 122)? | No benchmark number can ship until this is resolved (§1.7B) | EC-Bench ships text-only until reconciled |
| 2 | **Paper corrections** (§1.7A, 12 items): revise to v1.1 before web publication? | The paper would otherwise contradict the product pages | Revise; fall back to an abstract page plus errata |
| 3 | **Repository timing:** when public, under what licence, at what URL? | Drives CTA state, grounding links, the "open source" answer | State A until a LICENSE exists |
| 4 | **Pre-release contact:** mailto only, or a newsletter or form service? Offer "early access"? | A static site has no form backend | Mailto; no "early access" promise |
| 5 | **Continuity experiment:** publish the protocol before results (`design` state)? Video hosting: self-hosted or embed? | Placeholder strategy; privacy | Yes, preregister; self-host. The homepage slot already shows (owner decision, 2026-10-05) |
| 6 | **Visual references:** please paste screenshots of the four references into a session, or into `design/references/`. The image hosts stay blocked even in the Custom environment, and Dribbble serves a bot challenge. Do they imply a dark default? | Taste alignment before implementation; the metadata already points to light, Swiss-minimal and editorial (§10.14) | Light default plus system dark mode |
| 7 | **Typefaces:** approve Newsreader and IBM Plex Mono (or Source Serif 4 / JetBrains Mono)? | Identity | Newsreader + Plex Mono |
| 8 | **About:** name the individual and use "I", or keep "we"? Bio, links, portrait? | Honesty about scale vs voice | Name the author; "we" for the research voice |
| 9 | **Domain:** is `ems.dev` owned and used? New domain for Reverie? | Metadata, Open Graph, JSON-LD | Remove `ems.dev` until confirmed |
| 10 | **Hosting:** confirm Vercel? | The redirect mechanism | Vercel plus `vercel.json` |
| 11 | **Supported agents:** verified end to end on all four (only OpenCode is live-verified in the docs)? | Claim C1 | Verify before launch |
| 12 | **Platform statement:** say "tested on macOS" explicitly? | Honesty vs friction | Yes, in "Limits, today" |
| 13 | **Archive:** keep the July PDFs public (they contain the superseded headline) with notes? | History vs confusion | Keep, annotated |
| 14 | **Wordmark and favicon:** "R" monogram or the hollow-to-solid two-dot mark? | Identity | "R" monogram |
| 15 | **Package naming:** will `engineering-cognition`/`ec` be renamed to Reverie? | The naming bridge copy | Keep the bridge note |
| 16 | **Analytics and privacy note** in the footer? | Compliance and trust | Add one line |
| 17 | **`llms.txt`:** include? | Agent-readable summary | Optional, phase 8 |
| 18 | **Homepage research claim** ("made the agent worse"): sign-off after #1? | Public negative claim | Keep, after sign-off |
| 19 | **Competitor section visibility:** this repository is public; keep §3 here or move it to a private location? | Section 3 names products | Your call |
| 20 | **"Any MCP agent":** run Reverie end to end in at least one MCP client the installer doesn't configure (for example Windsurf, Zed or Cline) before launch? | Claim C27 in the hero | Ship it (`claims.anyMcpAgent: true`). If the check fails, set it to `false`: the hero then says "Works with Claude Code, Cursor, OpenCode and Codex", and Fig. 3 drops the dashed record |
| 21 | **Memory-map animation:** approve the single exception to the no-ambient-motion rule? | §16; accessibility | Keep it, with pause, off-screen stop and a reduced-motion static state |

**Environment note.**

- The *Default* environment denied `www.letta.com`, `supermemory.ai`, `www.getzep.com`, `dribbble.com` and `in.pinterest.com`. They were then fetched from the owner's *Custom* environment.
- Still denied there: `i.pinimg.com`, `s.pinimg.com`, `cdn.dribbble.com`, `docs.letta.com`, `www.framer.com`.
- To allow more hosts, edit the environment's **Network access** setting: cloud environment menu → Edit → Custom → add the domains.
- A running session keeps the environment it started with, so changes apply to sessions started afterwards.

---

## 21. Explicit non-goals

1. **No installation commands or setup flow** on the website, and no docs site. Setup lives in the repository README.
2. **No product UI that doesn't exist:** no dashboards, brain viewers, app windows, team views, cloud diagrams, analytics panels or usage statistics.
3. **No competitor names or comparison tables** on the website.
4. **No benchmark win claims; no numbers on the homepage;** no unreconciled numbers anywhere.
5. **No "first", "only", "best", "X% better"**; no testimonials, logos, star or install counts.
6. **No neuroscience imagery** (brains, neurons, synapses), and no claim that Reverie works like a brain.
7. **No decorative motion:** no scroll reveals, loops, parallax, typing effects, glows, gradients or glass.
8. **No card grids or icon-feature grids.**
9. **No pricing, signup, accounts, waitlist backend or CMS.**
10. **No changes to the product repository**, and no website implementation until this plan and `DIAGRAM-PLAN.md` are approved.

---

### Appendix A: documents consulted

| Document | Notes |
|---|---|
| `PRODUCT.md` | Reverie Product & Technical Archaeology, 2026-10-04, commit `4e0d312` |
| `INSTALLATION.md` | Installation & Harness Integration Audit, 2026-10-04 |
| `WEBSITE.md` | Reverie Website Archaeology (repo commit `271fc9f`) |
| `DESIGN-REFERENCES.md` | Design Reconnaissance & Reference Study, 2026-10-04 |
| *Reverie: A Biological Memory Architecture for AI Agents* | M. Sarda, 5 Sep 2026; 26 pages |
| `public/EMS-artefacts/engineering-cognition-paper.pdf` | 30 Jun 2026, 14 pages |
| `public/EMS-artefacts/engineering-memory-system-paper.pdf` | Undated, 15 pages |
| `public/EMS-artefacts/ec-bench-technical-report.pdf` | Technical Report 001, 15 Jul 2026, 58 pages |
| `public/EMS-artefacts/ec-bench-short-report.pdf` | 18 Jul 2026, 14 pages |
| `public/articles/everything-till-now.md` | 29 Jul 2026 |
| This repository's code | Read-only pass over `app/`, `components/`, `lib/`, `public/` |
