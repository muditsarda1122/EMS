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
