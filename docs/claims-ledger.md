# Claims ledger

Every factual sentence on the site maps to a row here: claim → source → last verified date.
Seeded from `WEBSITE-DESIGN-PLAN.md` §11.2. "Last verified" is the date the source was checked
against the claim; `pending` means it has not been checked against the product yet.

| # | Site claim (paraphrased) | Page | Source | Last verified |
|---|---|---|---|---|
| C1 | Memory for coding agents; works with Claude Code, Cursor, OpenCode, Codex | Home, How it works | INSTALLATION.md §2 (`install.py:698`); end-to-end check for all four is pending (plan §20, P11) | pending |
| C2 | Keeps conclusions; rejects facts, code descriptions, play-by-play | Home, How it works | PRODUCT.md §6; paper §3 | pending |
| C3 | Conclusions are usable in the same session before review | Home | PRODUCT.md §8, §13 (session trust weight 0.8) | pending |
| C4 | You accept, reject or skip at session end, in the terminal; skipped items carry forward | Home, How it works | PRODUCT.md §10, §8 | pending |
| C5 | Only accepted (extracted) conclusions become long-term memory | Home, How it works | PRODUCT.md §9 (writers), §10; exception for reconsolidation stated on How it works | pending |
| C6 | The agent asks after reading the code | Home, How it works | PRODUCT.md §3.2 (tool description); INSTALLATION.md §7.6 (AGENTS.md); an instruction, not technically enforced | pending |
| C7 | Results carry confidence, scope and files, framed as "verify against current code" | Home, How it works | PRODUCT.md §13 | pending |
| C8 | Evidence raises or lowers confidence; unused conclusions fade; retrieval reinforces | Home, How it works | PRODUCT.md §11 | pending |
| C9 | Contradictions are kept; persistent conflicts become open questions you resolve | Home, How it works | PRODUCT.md §7.2, §10, §14 | pending |
| C10 | Accepted wording never changes; supersession keeps history | Home, How it works | PRODUCT.md §5.1, §9 | pending |
| C11 | Deleted code retires conclusions about it; principles survive | Home, How it works | PRODUCT.md §14.2 | pending |
| C12 | One SQLite file, shared across projects; no Reverie account, no cloud database, no vector DB (hosted extraction still needs an LLM key; see C15) | Home, How it works | PRODUCT.md §1, §2.5, §13, §15 | pending |
| C13 | Local MCP server started by your agent; four named tools | Home, How it works | PRODUCT.md §3; INSTALLATION.md §7–8 | pending |
| C14 | Other MCP clients can be set up by hand | Home, How it works | INSTALLATION.md §10.5 | pending |
| C15 | Extraction uses the configured LLM; Ollama for local; embeddings and retrieval local | Home, How it works | PRODUCT.md §1, §2.6, §21.8; INSTALLATION.md §6 | pending |
| C16 | What is sent to the LLM (prompt, reasoning, classification pairs) | How it works | PRODUCT.md §4, §6–7 | pending |
| C17 | The first version loaded relevant memory into the agent's context before it started work; on our benchmark that made the agent worse | Home, Research | paper §2, §7, §12; Short Report §4.2 per-metric table, §5.1 | pending |
| C18 | No run shows a clear advantage yet | How it works, EC-Bench | PRODUCT.md §17; paper §12; Short Report table | pending |
| C19 | Tested on macOS only | How it works | INSTALLATION.md §6, §11 | pending |
| C20 | Review is terminal-only; no editing interface beyond review decisions | How it works | PRODUCT.md §10, §22.4, §22.7 | pending |
| C21 | Sessions are started and ended by you | How it works | PRODUCT.md §3.1, §22.18 | pending |
| C22 | Single-shot extraction | How it works | PRODUCT.md §6, §22.2 | pending |
| C23 | Two-brain split arrived at practically, later found to mirror complementary learning systems theory | How it works, Paper | paper §5, §13 | pending |
| C24 | Research dates | Research | PDF title pages; the paper; article frontmatter | pending |
| C25 | EC-Bench design (repository, prompts, sessions, judge, weights) | EC-Bench | PRODUCT.md §17 | pending |
| C26 | The stored run produced no `contradicts` or `supersedes` edges | EC-Bench | PRODUCT.md §17, §22.1 | pending |
| C27 | Works with any MCP agent; agents other than the four are set up by hand | Home (hero, Fig. 3), How it works | INSTALLATION.md §10.5; a check with one client the installer doesn't configure is pending (plan §20 q20, P13); `claims.anyMcpAgent` in `content/site.config.ts` | pending |
| C28 | Works on any model your agent runs; Reverie doesn't depend on the agent's model | Home | PRODUCT.md §3 | pending |
| C29 | Every connected agent uses the same memory, so switching agents or models keeps it | Home (S5) | PRODUCT.md §1, §15; INSTALLATION.md §7–8 | pending |
| C30 | A new conclusion affects long-term conclusions only after you review it | Home (Fig. 2 map) | PRODUCT.md §7.2, §8 | pending |
| C31 | Unused conclusions fade; nothing is hard-deleted | Home (Fig. 2 map, S4 aside) | PRODUCT.md §11, §14; paper §8 | pending |
| C32 | Related conclusions come linked: supports, depends on, replaces | Home (V1) | PRODUCT.md §12, §13 | pending |

## Chrome copy added in T1

| # | Claim | Where | Source | Last verified |
|---|---|---|---|---|
| T1-1 | "Reverie is a research project by Mudit Sarda (Engineering Cognition)." | Footer | Plan §5.3 | 2026-10-05 |
| T1-2 | "Memory for coding agents." | Footer, metadata | Plan §5.3, §8.9 | 2026-10-05 |
| T1-3 | Site description (works with Claude Code, Cursor, OpenCode and Codex) | Metadata | Plan §8.9; see C1 | pending (C1) |
| T1-4 | "If you followed an old link to EMS: Reverie is its current name." | 404 | Plan §8.8 | 2026-10-05 |

## Homepage copy added in T4a

| # | Claim | Where | Source | Last verified |
|---|---|---|---|---|
| T4a-1 | Hero and agents line: memory for coding agents; works with the four agents, any MCP agent, any model | Home S1 | C1, C27, C28; `claims.anyMcpAgent` | pending |
| T4a-2 | Hero graph: a reviewed conclusion links to what it supports, depends on and replaced (illustrative, tagged Example) | Home S1 | C32; `content/specimens/token-refresh.json` | pending |
| T4a-3 | Fig. 1: conclusions are extracted as the agent works, you review and keep or drop, memory builds up grounded in code, the agent asks after reading the code | Home S3 | C2, C4, C5, C6 | pending |
| T4a-4 | Fig. 2 map and lifecycle: evidence strengthens, contradictions challenge, disuse fades, superseded kept, retired when cited code is deleted; bars computed by `lib/confidence.ts` | Home S4 | C8, C9, C10, C11, C30, C31 | pending |
| T4a-5 | Fig. 3 and facts: one SQLite file, no account, every extracted conclusion passes review, hosted or Ollama extraction | Home S5 | C12, C15, C29 | pending |
| T4a-6 | Research: first version loaded memory before the agent started and made it worse on our benchmark | Home S6 | C17 (owner sign-off pending after reconciliation) | pending |
| T4a-7 | Paper date "September 2026" | Home S6 | C24 | pending |

## Research index and notebook copy added in T6

| # | Claim | Where | Source | Last verified |
|---|---|---|---|---|
| T6-1 | Lede: Reverie comes out of Engineering Cognition; we publish what we find, including when it doesn't work | Research | Plan §8.2 | 2026-10-05 |
| T6-2 | Lineage entries and dates (30 Jun, 15 Jul, 18 Jul, 29 Jul, 13–15 Aug, 5 Sep); `verified: false` in `content/research.ts` until the owner checks each | Research | Plan §8.2; see C24 | pending (owner) |
| T6-3 | Paper summary line restating the second architecture (conclusions as units, two brains, review, confidence, contradictions, grounding, retrieval on request) | Research, Start here | Plan §8.2 (Aug 2026); `TODO(copy)` | pending (owner) |
| T6-4 | EC-Bench "Ongoing"; continuity experiment "In design", "A controlled comparison. Not yet run." | Research, Evaluation | Plan §8.2; IMPLEMENTATION-TASKS T7 (planned controlled comparison) | pending |
| T6-5 | Technical Report note: aggregate gain came from the cognition-reuse metric; four of five metrics lower with memory | Research, Archive | Plan §8.2 (verbatim example); see C17 | pending |
| T6-6 | Archive notes for Engineering Cognition, Engineering Memory System and Short Report (first version loaded repository memory into each session; superseded) | Research, Archive | Plan §8.2 lineage; `TODO(copy)` | pending (owner) |
| T6-7 | "Earlier documents call the first version the Engineering Memory System (EMS)." | Research, Archive | Plan §8.2 | 2026-10-05 |
| T6-8 | Editor's note on "Everything till now" | Notebook entry | Plan §8.6 (draft text, verbatim) | 2026-10-05 |

## T5: How it works (`/how-it-works`)

Every factual sentence on the page, grouped by section. Sources are plan sections (the owner's source documents were not available; P12). `pending` = not yet checked against the product.

| # | Site claim (paraphrased) | Page | Source | Last verified |
|---|---|---|---|---|
| H1 | Each conclusion is the smallest self-contained piece of engineering understanding that could change a future decision (reworded in T7 to remove a circular definition); the paper's information-versus-conclusion pair | How it works §1 | plan §1.4, §8.1 | pending |
| H2 | Three-question test, one conclusion per record, self-review rejects what the code shows, "zero is a valid output" | §1 | plan §1.3, §1.4 | pending |
| H3 | The extractor rejects facts, code descriptions, process steps and summaries | §1 | plan §1.3 (C2) | pending |
| H4 | ECU: eight types, seven scope levels plus a path, six statuses (scope order beyond "engineering → subsystem" is TODO(fact)) | §1 | plan §1.4 | pending |
| H5 | Fig. 3 annotations ①–⑨ (one conclusion per record; scope sets fade, ranking, retirement; log-odds; ranking uses decayed value; retrievable statuses; source sets prior; grounding checked; related returned together; framing note) | §1 | DIAGRAM-PLAN F3 | pending |
| H6 | Session brain: per repo and branch, immediate, unreviewed, ranked slightly lower; canonical brain: reviewed, long-term, shared across projects | §2 | plan §8.1, §1.3 (C3) | pending |
| H7 | Evidence about long-term conclusions waits as pending until its source is accepted | §2 | plan §8.1, §1.3 (C30) | pending |
| H8 | Review at session end in the terminal: open questions first, accept/reject/skip per group or item; skipped carry forward | §2 | plan §8.1 (C4) | pending |
| H9 | Reconsolidation updates a just-retrieved conclusion immediately with verified evidence, recorded; the documented exception to review (C5) | §2, Fig. 4 | plan §1.8, §8.1 | pending |
| H10 | The two-brain split came from a practical problem and later mirrored fast encoding / slow consolidation | §2 | plan §8.1 (C23) | pending |
| H11 | Fig. 4 contents: tool arrows, brain notes, gate outcomes, maintenance tasks | §2 | DIAGRAM-PLAN F4 | pending |
| H12 | Confidence: prior from source and scope; log-odds updates weighted by similarity and the other's confidence; stored and reversible; fades by scope; retrieval reinforces | §3 | plan §8.1 (C8) | pending |
| H13 | Four relationship types; contradiction pre-check then adjudication; challenged, never hidden; open question after a scope-dependent time with four choices | §3 | plan §8.1 (C9) | pending |
| H14 | Accepted wording never changes; supersession keeps history; dependents of a weakened conclusion are challenged | §3 | plan §8.1 (C10) | pending |
| H15 | Fig. 5 step values (0.56, 0.66, 0.67, 0.55, 0.61, 0.62; r = 0.78, 0.84 as example inputs; priors 0.52, 0.61) computed by `lib/confidence.ts`; step 5 decay "computed from config" until P5 | §3 | DIAGRAM-PLAN §6, F5 | pending |
| H16 | Files, symbols and commit recorded at extraction; periodic background check; scope → retired-when table; dependents challenged and reported at next review; far behind HEAD flagged, never retires | §4 | plan §8.1 (C11) | pending |
| H17 | Memory is not loaded at session start; our first version did and the agent did worse on our benchmark | §5, FAQ | plan §8.1 (C17) | pending |
| H18 | Retrieval: task mode (five), both brains searched, filtered by status/scope/relevance, ranking factors, grouping, mode-dependent budget | §5 | plan §8.1 | pending |
| H19 | Framing note; agents don't always ask; asking is an instruction, not enforced | §5 | plan §1.3, §8.1 (C6) | pending |
| H20 | One SQLite file at `~/.ec/ec.db` shared by projects; no Reverie account | §6 | plan §1.1 (C12) | pending |
| H21 | Local stdio MCP server spawned by the agent; maintenance in the background | §6 | plan §1.1 (C13) | pending |
| H22 | Tool rows: what ec_observe, ec_query, ec_reconsolidate do and when called (ec_get_summary and the session column are TODO(fact)) | §6 | plan §1.3, §8.1, DIAGRAM-PLAN F4 | pending |
| H23 | Installer configures an MCP entry and an instructions file for each of four agents (C1; P11 pending) | §6 | plan §8.1 | pending |
| H24 | Every connected agent shares the file; switching agents or model keeps memory; other MCP agents set up by hand (gated by `claims.anyMcpAgent`) | §6, FAQ | plan §1.5 (C14, C27, C29) | pending |
| H25 | LLM endpoint hosted by default or Ollama; sent: prompt, reasoning, candidate pairs; never leaves: database, embeddings, retrieval | §6, FAQ | plan §1.1, §8.1 (C15, C16) | pending |
| H26 | Naming note: `ec` prefix stands for Engineering Cognition | §6 | plan §8.1, §11.5 | pending |
| H27 | Limits: macOS only; terminal review; you start/end sessions; single-attempt LLM extraction; no edit/delete interface; no clear benchmark advantage | §7 | plan §8.1 (C18–C22) | pending |
| H28 | "Last reviewed 5 October 2026" | §7 | plan date; owner to confirm | pending |
| H29 | FAQ: instruction files vs Reverie; data flow; what you do; why not automatic; does it make agents better; which agents; open source (no licence claim) | §8 | plan §8.1, §1.8 | pending |

## T7: EC-Bench (`/research/ec-bench`)

| # | Site claim (paraphrased) | Section | Source | Last verified |
|---|---|---|---|---|
| E1 | EC-Bench asks whether what an agent worked out earlier changes what it does later (lede) | Header | plan §8.4 | pending |
| E2 | Most coding benchmarks evaluate single episodes; continuity needs sequences of sessions | Why a new benchmark | plan §8.4 (condensed from the old `/ec-bench` page) | pending |
| E3 | A run: FastAPI repository, 30 prompts, three sequential sessions of 14, 13 and 3 (investigation and architecture; implementation and debugging; planning) | How a run works, Fig. 6 | PRODUCT.md §17 via plan §8.4, DIAGRAM-PLAN F6 | pending |
| E4 | Each arm has its own repository copy and isolated memory; fresh context per prompt in the Reverie arm; the harness auto-accepts review between sessions | How a run works, Fig. 6 | PRODUCT.md §17 runner behaviour via plan §8.4, DIAGRAM-PLAN F6 | pending |
| E5 | One LLM judge reads full transcripts; five metrics with weights 0.30, 0.30, 0.15, 0.15, 0.10 | How a run works, Fig. 6 | PRODUCT.md §17 via plan §8.4, §11.3 | pending |
| E6 | Held constant: repository, prompts, agent harness, model, judge. Differs: access to Reverie | Fig. 6 | DIAGRAM-PLAN F6; owner to confirm it matches the ledger runs (open) | pending |
| E7 | So far no run shows a clear advantage; first run's aggregate favoured memory but the gain came from the cognition-reuse metric; second architecture narrowed the gap under a protocol that favoured the baseline (draft copy) | Results so far | plan §8.4, §1.7B (C18) | pending |
| E8 | The write-ups disagree on some exact figures; figures are shown only when reconciled | Results so far | plan §1.7B | pending |
| E9 | July 2026 row: first version (memory injected before work) vs stateless baseline, 30 prompts; four of five metrics lower with memory; a later write-up reports the baseline ahead in aggregate. Judge not stated (TODO(fact)) | Ledger | plan §1.7B; Technical Report 001, Short Report | pending |
| E10 | Run `20260813-141550` row: v2, headless, fresh context per prompt vs interactive chat memory (baseline added 15 August, mixed protocol), 30 prompts, baseline ahead on all five metrics, judge GLM-5.2 (LLM, full transcript); paper reports different figures, with outliers removed, and a different ECU count | Ledger | plan §1.7B, §19.3 (judge field), §8.4 | pending |
| E11 | Controlled comparison row: planned, same protocol in both arms, not yet run | Ledger, What's next | plan §8.4 | pending |
| E12 | Learned: retrieval timing matters as much as retrieval quality; accumulated knowledge expands scope (elaboration is TODO(copy)); tasks need different modes; memory helped on cognition reuse and hurt on the other four in the first run | What we learned | plan §8.4 (Short Report §5), §1.7B, C17 | pending |
| E13 | Not tested: human review (auto-accept); contradiction and supersession (stored run produced no `contradicts` or `supersedes` edges); more than one repository or agent | What these runs did not test | plan §8.4, C26 | pending |
| E14 | Threats: small sample, one repository, one agent type, LLM judge, outlier removal in the paper's figures, mixed protocol in the stored run | Threats to validity | plan §8.4 | pending |
| E15 | Next: controlled rerun with the same protocol in both arms, continuity experiment, more repositories, a human judge alongside the LLM | What's next | plan §8.4 | pending |
| E16 | The first run's finding changed the design: Reverie no longer loads memory at session start; the agent asks after reading the code | What this changed | plan §8.4, C17 | pending |
