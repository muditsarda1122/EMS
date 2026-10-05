import Link from "next/link";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./how.css";
import ArrowLink from "@/components/ui/ArrowLink";
import ButtonLink from "@/components/ui/ButtonLink";
import Figure from "@/components/ui/Figure";
import ConclusionAnatomy from "@/components/diagrams/ConclusionAnatomy";
import TwoBrains from "@/components/diagrams/TwoBrains";
import ConclusionLifecycle from "@/components/diagrams/ConclusionLifecycle";
import { siteConfig, isRepoPublic } from "@/content/site.config";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "What Reverie keeps, who decides, how memory changes, and how your agent gets it back: the full mechanism, and what doesn’t work yet.",
};

// Date the "Limits, today" list was last checked against the product.
// TODO(fact): the owner confirms this date; it is the plan date, not a fresh check against the product.
const LIMITS_REVIEWED = "2026-10-05";
const LIMITS_REVIEWED_TEXT = "5 October 2026";

const TOC = [
  ["remembered", "What gets remembered"],
  ["review", "Who decides what’s kept"],
  ["change", "How a conclusion changes"],
  ["grounding", "Grounded in your repository"],
  ["retrieval", "How your agent gets it back"],
  ["install", "What you’re installing"],
  ["limits", "Limits, today"],
  ["faq", "Questions"],
] as const;

const TYPES = ["implication", "constraint", "principle", "decision", "observation", "pattern", "invariant", "trade-off"];
// TODO(fact): the plan names the seven levels only as "engineering → subsystem". The middle order follows the retirement
// groups in plan §8.1 (engineering/domain · organization/project · repo/module/subsystem).
const SCOPES = ["engineering", "domain", "organization", "project", "repo", "module", "subsystem"];
const STATUSES = ["active", "challenged", "superseded", "deprecated", "open_question", "archived"];

// Source modules named in plan §8.1 as an example. Every other section needs the owner's module list.
// TODO(fact): modules that implement each section (PRODUCT.md). Shown only in State B.
const GROUNDING: Record<string, string[] | null> = {
  remembered: null,
  review: ["ec/review_gate.py", "ec/diffuser.py"],
  change: null,
  grounding: null,
  retrieval: null,
  install: null,
};

function Todo({ children = "TODO(fact)" }: { children?: ReactNode }) {
  return <span className="todo">{children}</span>;
}

function ModuleNote({ id }: { id: string }) {
  if (!isRepoPublic()) return null;
  const { url, ref } = siteConfig.repository;
  const paths = GROUNDING[id];
  return (
    <p className="grounding">
      implemented in:{" "}
      {paths
        ? paths.map((p, i) => (
            <span key={p}>
              {i > 0 ? " · " : null}
              {url && ref ? (
                <a href={`${url}/blob/${ref}/${p}`} target="_blank" rel="noopener noreferrer">
                  {p}
                </a>
              ) : (
                p
              )}
            </span>
          ))
        : "TODO(fact)"}
    </p>
  );
}

function InlineList({ items }: { items: string[] }) {
  return (
    <>
      {items.map((t, i) => (
        <span key={t}>
          <code>{t}</code>
          {i < items.length - 2 ? ", " : i === items.length - 2 ? " and " : null}
        </span>
      ))}
    </>
  );
}

export default function HowItWorksPage() {
  const stateB = isRepoPublic() && siteConfig.repository.url !== null;
  const repoUrl = siteConfig.repository.url;
  const agents = siteConfig.supportedAgents;
  const any = siteConfig.claims.anyMcpAgent;

  const toc = (
    <ol>
      {TOC.map(([id, label]) => (
        <li key={id}>
          <a href={`#${id}`}>{label}</a>
        </li>
      ))}
    </ol>
  );

  return (
    <div className="hiw">
      <header className="wrap hiw-head">
        <h1 className="t-h1">How Reverie works</h1>
        <p className="lead">
          What Reverie keeps, who decides, how memory changes, and how your agent gets it back, in that order.
        </p>
      </header>

      <div className="wrap hiw-body">
        <aside className="hiw-toc">
          <nav className="toc-desk" aria-label="On this page">
            <h2 className="mono-label">On this page</h2>
            {toc}
          </nav>
          <details className="toc-mob">
            <summary>On this page</summary>
            <nav aria-label="On this page (list)">{toc}</nav>
          </details>
        </aside>

        <div className="hiw-main">
          {/* 1 */}
          <section id="remembered" className="hiw-sec" aria-labelledby="remembered-h">
            <h2 id="remembered-h">What gets remembered</h2>
            <div className="prose-col">
              <p>
                Reverie keeps conclusions, not facts. A conclusion is the smallest self-contained engineering conclusion that could
                change a future decision.
              </p>
              <p>
                That <code>TokenManager.refresh()</code> is called before <code>cache.clear()</code> is information. That cache
                invalidation must follow token refresh, because clearing the cache first serves stale tokens, is a conclusion.
              </p>
              <p>
                Every candidate faces three questions. <em>So what?</em> Is it a conclusion, not a fact? <em>Future session.</em>{" "}
                Would knowing it change how an engineer approaches a future task? <em>Independence.</em> Is it understandable
                without the original conversation? Each record holds one conclusion, and a self-review pass rejects anything an
                engineer could get by reading the code. The extractor keeps conclusions and rejects facts, code descriptions,
                process steps and summaries. Zero is a valid output.
              </p>
              <p>
                A kept conclusion is an <b>Engineering Cognition Unit</b> (ECU). It has one of eight types:{" "}
                <InlineList items={TYPES} />. It has one of seven scope levels, from engineering to subsystem, plus a path:{" "}
                <InlineList items={SCOPES} />. And it has one of six statuses: <InlineList items={STATUSES} />.
              </p>
            </div>
            <Figure
              number={3}
              className="hiw-fig"
              caption={
                <>
                  Anatomy of a conclusion. Each part of a stored record, and what it does. Example record; this is also what
                  your agent receives from a query.
                </>
              }
            >
              <ConclusionAnatomy />
            </Figure>
            <ModuleNote id="remembered" />
          </section>

          {/* 2 */}
          <section id="review" className="hiw-sec" aria-labelledby="review-h">
            <h2 id="review-h">Who decides what’s kept</h2>
            <div className="prose-col">
              <p>
                Reverie keeps two stores, called brains. The <b>session brain</b> is per repo and branch. What your agent
                concludes goes in at once, unreviewed, and ranks slightly lower than reviewed conclusions, so the current session
                benefits immediately. The <b>canonical brain</b> is reviewed, long-term and shared across projects.
              </p>
              <p>
                The boundary is hard. Evidence about long-term conclusions waits as <i>pending</i> until its source is accepted.
              </p>
              <p>
                When the session ends, you review in the terminal: open questions first, then accept, reject or skip, per group
                or per item. Skipped items carry into the next session.
              </p>
              <p className="exception">
                <b>The one exception.</b> When your agent finds verified evidence about a conclusion it has just retrieved, it
                can update that conclusion straight away. This is reconsolidation, and the update is recorded on the conclusion.
                So: nothing <em>extracted from a session</em> becomes long-term memory until you review it, and reconsolidation is
                the documented exception.
              </p>
              <p className="aside-p">
                The split came from a practical problem: one store either fills with noise or blocks in-session use. It later
                turned out to mirror a well-known account of biological memory, fast encoding and slow consolidation.{" "}
                <ArrowLink href="/research/biological-memory-architecture">Read the paper</ArrowLink>
              </p>
            </div>
            <Figure
              number={4}
              className="hiw-fig"
              caption={
                <>
                  Two brains and a review gate. Extracted conclusions reach long-term memory only through review; the bold
                  arrow, reconsolidation, is the one labelled exception.
                </>
              }
            >
              <TwoBrains />
            </Figure>
            <ModuleNote id="review" />
          </section>

          {/* 3 */}
          <section id="change" className="hiw-sec" aria-labelledby="change-h">
            <h2 id="change-h">How a conclusion changes</h2>
            <div className="prose-col">
              <p>
                <b>Confidence.</b> A conclusion starts from a prior set by how it was reached and by its scope. Supporting
                conclusions raise it and contradicting ones lower it, in log-odds, weighted by similarity and by the other
                conclusion’s confidence. Every update is stored and can be reversed. Unused conclusions fade at a rate set by
                scope, and retrieval reinforces them.
              </p>
              <p>
                <b>Relationships.</b> Conclusions relate in four ways: <code>supports</code>, <code>contradicts</code>,{" "}
                <code>supersedes</code> and <code>depends_on</code>.
              </p>
              <p>
                <b>Contradictions.</b> A computable pre-check comes first, then adjudication. The existing conclusion is marked{" "}
                <code>challenged</code>, never hidden. After a scope-dependent time it becomes an <code>open_question</code>, and
                you choose: investigate, prefer one, mark both valid in different contexts, or archive.
              </p>
              <p>
                <b>Supersession.</b> Accepted wording never changes. A new conclusion replaces the old one, which is frozen,
                kept and linked. Dependents of a weakened conclusion are challenged.
              </p>
              <p>Step through one example below. A is the conclusion we follow; B supports it and C later contradicts it.</p>
            </div>
            <Figure
              number={5}
              className="hiw-fig"
              caption={<>The life of a conclusion, step by step. Example values, computed with Reverie’s update rules.</>}
            >
              <ConclusionLifecycle variant="detailed" />
            </Figure>
            <ModuleNote id="change" />
          </section>

          {/* 4 */}
          <section id="grounding" className="hiw-sec" aria-labelledby="grounding-h">
            <h2 id="grounding-h">Grounded in your repository</h2>
            <div className="prose-col">
              <p>
                The code has the last word. Each conclusion records the files, symbols and commit at extraction. In the
                background, Reverie checks them against your repository from time to time. Scope decides what a deletion
                retires, so principles survive and module-level conclusions don’t:
              </p>
            </div>
            <table className="hiw-table">
              <thead>
                <tr>
                  <th scope="col">Scope</th>
                  <th scope="col">Retired when</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" data-label="Scope"><code>engineering</code>, <code>domain</code></th>
                  <td data-label="Retired when">Never</td>
                </tr>
                <tr>
                  <th scope="row" data-label="Scope"><code>organization</code>, <code>project</code></th>
                  <td data-label="Retired when">All cited files are gone</td>
                </tr>
                <tr>
                  <th scope="row" data-label="Scope"><code>repo</code>, <code>module</code>, <code>subsystem</code></th>
                  <td data-label="Retired when">Any cited file or symbol is gone</td>
                </tr>
              </tbody>
            </table>
            <div className="prose-col">
              <p>
                Conclusions that depend on a retired one are challenged, and you’re told at your next review. Being far behind
                HEAD is flagged, but it never retires anything.
              </p>
            </div>
            <ModuleNote id="grounding" />
          </section>

          {/* 5 */}
          <section id="retrieval" className="hiw-sec" aria-labelledby="retrieval-h">
            <h2 id="retrieval-h">How your agent gets it back</h2>
            <div className="prose-col">
              <p>
                Your agent asks, after reading the code. Reverie doesn’t load memory at the start of a session. Our first
                version did, and on our benchmark the agent trusted memory over the code and did worse.{" "}
                <ArrowLink href="/research/ec-bench">EC-Bench</ArrowLink>
              </p>
              <p>When your agent asks, in order:</p>
              <ol className="steps">
                <li>Reverie infers a task mode: debugging, implementation, investigation, planning or architecture.</li>
                <li>It searches both brains.</li>
                <li>It filters results by status, scope and relevance.</li>
                <li>
                  It ranks them by similarity, confidence after decay, session activity and how connected a conclusion is.
                </li>
                <li>
                  It groups each result with the conclusions that support, contradict or depend on it, or replace it, and fits
                  everything into a budget that depends on the mode.
                </li>
              </ol>
              <p>
                The agent receives the record in Fig. 3, with a framing note: past engineering understanding, verify against
                current code. One honest limit: agents don’t always ask when they should. Asking is an instruction in the
                agent’s instructions file, not something Reverie can enforce.
              </p>
            </div>
            <ModuleNote id="retrieval" />
          </section>

          {/* 6 */}
          <section id="install" className="hiw-sec" aria-labelledby="install-h">
            <h2 id="install-h">What you’re installing</h2>
            <div className="prose-col">
              <p>
                <b>Storage.</b> One SQLite file at <code>~/.ec/ec.db</code>, shared by your projects. There is no Reverie account.
              </p>
              <p>
                <b>Server.</b> A local MCP server, spawned by your agent over stdio. It runs maintenance in the background.
                {siteConfig.version ? ` Version ${siteConfig.version}, an early release.` : null}
              </p>
            </div>
            <h3 className="t-h3 tbl-h">MCP tools</h3>
            <table className="hiw-table tools">
              <thead>
                <tr>
                  <th scope="col">Tool</th>
                  <th scope="col">What it does</th>
                  <th scope="col">When your agent calls it</th>
                  <th scope="col">Needs an active session?</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" data-label="Tool"><code>ec_observe</code></th>
                  <td data-label="What it does">Passes the prompt and the agent’s reasoning to the extractor, which keeps the conclusions.</td>
                  <td data-label="When your agent calls it">When it reaches a conclusion.</td>
                  <td data-label="Needs an active session?"><Todo /></td>
                </tr>
                <tr>
                  <th scope="row" data-label="Tool"><code>ec_query</code></th>
                  <td data-label="What it does">Returns relevant conclusions from both brains, grouped with their neighbours and framed.</td>
                  <td data-label="When your agent calls it">After it has read the code.</td>
                  <td data-label="Needs an active session?"><Todo /></td>
                </tr>
                <tr>
                  <th scope="row" data-label="Tool"><code>ec_get_summary</code></th>
                  <td data-label="What it does"><Todo /></td>
                  <td data-label="When your agent calls it"><Todo /></td>
                  <td data-label="Needs an active session?"><Todo /></td>
                </tr>
                <tr>
                  <th scope="row" data-label="Tool"><code>ec_reconsolidate</code></th>
                  <td data-label="What it does">Updates a conclusion it just retrieved, with verified evidence, and records the update.</td>
                  <td data-label="When your agent calls it">When it finds verified evidence about a conclusion it has just retrieved.</td>
                  <td data-label="Needs an active session?"><Todo /></td>
                </tr>
              </tbody>
            </table>

            <h3 className="t-h3 tbl-h" id="supported-agents">Supported agents</h3>
            <table className="hiw-table agents">
              <thead>
                <tr>
                  <th scope="col">Agent</th>
                  <th scope="col">What the installer configures</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((a) => (
                  <tr key={a}>
                    <th scope="row" data-label="Agent">{a}</th>
                    <td data-label="What the installer configures">An MCP entry and an instructions file</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* TODO(fact): which instructions file each agent gets (INSTALLATION.md §7–8). */}
            <p className="tbl-note"><Todo>TODO(fact)</Todo> The instructions file for each agent.</p>

            <div className="prose-col">
              <p>
                <b>Across agents and models.</b> Every agent you connect shares the same file, so switching agents, or the model
                an agent runs, keeps your memory.
                {any ? " Other MCP agents can be set up by hand." : null}{" "}
                {stateB && repoUrl ? (
                  <>
                    Setup instructions are in <a className="text-link" href={repoUrl} target="_blank" rel="noopener noreferrer">the repository ↗</a>.
                  </>
                ) : (
                  "Setup instructions will be in the repository, which opens soon."
                )}
              </p>
              <p>
                <b>Models and data.</b> Reverie stores memory locally. Extraction and classification use an LLM endpoint: hosted
                by default, or a local model through Ollama. What it sends there is the prompt, the agent’s reasoning and
                candidate pairs of conclusions for classification. The database, the embeddings and retrieval never leave your
                machine.
              </p>
              <p className="naming">
                <i>
                  In the code, Reverie’s package, commands and tools use the prefix <code>ec</code>, for Engineering Cognition,
                  the research program behind it.
                </i>
              </p>
            </div>
            <ModuleNote id="install" />
          </section>

          {/* 7 */}
          <section id="limits" className="hiw-sec" aria-labelledby="limits-h">
            <h2 id="limits-h">Limits, today</h2>
            <ul className="limits">
              <li>Developed and tested on macOS. Other platforms aren’t verified.</li>
              <li>Review happens in the terminal only.</li>
              <li>You start and end sessions yourself. The agent never does.</li>
              <li>Extraction depends on an LLM and makes a single attempt per observation.</li>
              <li>There is no interface for editing or deleting long-term memory beyond your review decisions.</li>
              <li>
                Our benchmark hasn’t shown a clear advantage yet. <ArrowLink href="/research/ec-bench">EC-Bench</ArrowLink>
              </li>
            </ul>
            <p className="reviewed">
              Last reviewed <time dateTime={LIMITS_REVIEWED}>{LIMITS_REVIEWED_TEXT}</time>
            </p>
          </section>

          {/* 8 */}
          <section id="faq" className="hiw-sec" aria-labelledby="faq-h">
            <h2 id="faq-h">Questions</h2>
            <div className="faq">
              <details>
                <summary>Doesn’t my agent already have memory?</summary>
                <p>
                  Instruction files and built-in memories store notes that load into sessions. Reverie stores reviewed
                  conclusions with confidence, scope, code references and relationships, and returns them on request. It works
                  alongside instruction files.
                </p>
              </details>
              <details>
                <summary>Does my code leave my machine?</summary>
                <p>
                  Parts of your sessions can. Extraction sends the prompt and the agent’s reasoning to the configured LLM
                  endpoint, and classification sends candidate pairs of conclusions. That endpoint is hosted by default, or a
                  local model if you use Ollama. The database, the embeddings and retrieval never leave your machine.
                </p>
              </details>
              <details>
                <summary>What do I have to do?</summary>
                <p>Start a session, work, and review at the end. You start and end sessions yourself.</p>
              </details>
              <details>
                <summary>Why doesn’t it load memory automatically?</summary>
                <p>
                  Our first version did, and on our benchmark the agent trusted memory over the code and did worse. So the
                  agent asks, after reading the code, and gets results framed as “verify before acting”.
                </p>
              </details>
              <details>
                <summary>Does Reverie make my agent better?</summary>
                <p>
                  That’s what the research is testing. No run has shown a clear advantage yet, and we publish results either
                  way. <Link className="text-link" href="/research/ec-bench">See EC-Bench</Link>.
                </p>
              </details>
              <details>
                <summary>Which agents are supported?</summary>
                <p>
                  {agents.slice(0, -1).join(", ")} and {agents[agents.length - 1]} have installers.
                  {any ? " Other MCP agents can be set up by hand." : null}{" "}
                  <a className="text-link" href="#supported-agents">See the table</a>.
                </p>
              </details>
              <details>
                <summary>Is it open source?</summary>
                <p>
                  {stateB && repoUrl ? (
                    <>
                      The code is in <a className="text-link" href={repoUrl} target="_blank" rel="noopener noreferrer">the repository ↗</a>.{" "}
                      <Todo>TODO(fact)</Todo> The licence.
                    </>
                  ) : (
                    "Not yet. The repository isn’t public, and we haven’t published a licence."
                  )}
                </p>
              </details>
            </div>
          </section>

          {/* 9 */}
          <section className="hiw-sec hiw-next" aria-label="Next">
            <div className="ctas">
              <ButtonLink href="/research">Read the research →</ButtonLink>
              {stateB && repoUrl ? (
                <ButtonLink href={repoUrl} variant="secondary" external>View the repository ↗</ButtonLink>
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
