import type { Metadata } from "next";
import "./bench.css";
import ArrowLink from "@/components/ui/ArrowLink";
import ButtonLink from "@/components/ui/ButtonLink";
import Figure from "@/components/ui/Figure";
import BenchProtocol from "@/components/diagrams/BenchProtocol";
import ResultsLedger from "@/components/research/ResultsLedger";
import { benchRuns } from "@/content/bench-runs";
import { siteConfig, isRepoPublic, isExperimentVisible } from "@/content/site.config";

export const metadata: Metadata = {
  title: "EC-Bench",
  description:
    "EC-Bench asks whether what a coding agent worked out in earlier sessions changes what it does in later ones. The method, every run so far, and the limits.",
};

const METRICS: [string, string][] = [
  ["architectural continuity", "0.30"],
  ["cognition reuse", "0.30"],
  ["repository groundedness", "0.15"],
  ["engineering quality", "0.15"],
  ["debugging/investigation efficiency", "0.10"],
];

function Todo({ children = "TODO(fact)" }: { children?: string }) {
  return <span className="todo">{children}</span>;
}

export default function EcBenchPage() {
  const repoUrl = siteConfig.repository.url;
  return (
    <div className="eb">
      {/* 1 */}
      <header className="wrap eb-head">
        <h1 className="t-h1">EC-Bench</h1>
        <p className="lead">
          Does what a coding agent worked out in earlier sessions change what it does in later ones? EC-Bench is our
          attempt to measure that.
        </p>
        <p style={{ marginTop: 20 }}>
          <ArrowLink href="#results">Results so far</ArrowLink>
        </p>
      </header>

      <div className="wrap">
        {/* 2 */}
        <section id="why" className="eb-sec" aria-labelledby="why-h">
          <h2 id="why-h">Why a new benchmark</h2>
          <div className="prose-col">
            <p>
              Most coding benchmarks evaluate what an agent can accomplish inside a single episode: write the code, reason
              through the problem, plan the change. When the episode ends, so does the evaluation, and the next one starts
              from the same place as the last.
            </p>
            <p>
              That leaves a question unmeasured: does the work an agent has already done change what it does later? Answering
              it takes sequences of sessions, not single ones.
            </p>
          </div>
        </section>

        {/* 3 */}
        <section id="how-a-run-works" className="eb-sec" aria-labelledby="how-h">
          <h2 id="how-h">How a run works</h2>
          <div className="prose-col">
            <p>
              Each run uses a FastAPI repository and 30 prompts, in three sequential sessions: 14 on investigation and
              architecture, 13 on implementation and debugging, and 3 on planning. Each arm gets its own copy of the
              repository and its own isolated memory. In the Reverie arm, every prompt starts with a fresh context, so
              anything the agent knows from earlier work has to come from memory. Between sessions, the harness accepts every
              review automatically.
            </p>
            <p>
              One LLM judge reads the full transcripts and scores them on five weighted metrics. The judge is named in the
              ledger below.
            </p>
          </div>
          <ul className="metrics" aria-label="Metric weights" style={{ marginTop: 24 }}>
            {METRICS.map(([name, w]) => (
              <li key={name}>
                <span>{name}</span>
                <span className="w">{w}</span>
              </li>
            ))}
          </ul>
          <Figure
            number={6}
            captionId="f6cap"
            className="eb-fig"
            caption={
              <>
                How an EC-Bench run works. Two arms see the same repository and the same prompts, in the same three sessions;
                only access to Reverie differs. The figure shows the design, not a result.
              </>
            }
          >
            <BenchProtocol />
          </Figure>
          <div className="prose-col" style={{ marginTop: 28 }}>
            <p>Where a run departed from this design, the departure is noted in its row of the ledger.</p>
            {/* TODO(fact): the owner confirms Fig. 6 matches the protocol of the runs in the ledger (DIAGRAM-PLAN F6, "Before launch"). */}
          </div>
        </section>

        {/* 4 */}
        <section id="results" className="eb-sec" aria-labelledby="results-h">
          <h2 id="results-h">Results so far</h2>
          <div className="prose-col">
            <p>
              So far, no run shows a clear advantage for Reverie. The first run’s aggregate favoured memory, but the gain came
              from one metric that loading memory inflates; on the other four, the agent did worse. The second architecture
              narrowed the gap under a protocol that favoured the baseline. A controlled comparison is next.
            </p>
            <p>
              Our own write-ups disagree on some exact figures. Until the sources agree, each row below says what happened
              and why we aren’t printing numbers, and a run’s figures appear only once it has been reconciled.
            </p>
          </div>
          <ResultsLedger runs={benchRuns} />
        </section>

        {/* 5 */}
        <section id="learned" className="eb-sec" aria-labelledby="learned-h">
          <h2 id="learned-h">What we learned</h2>
          <ul className="rows">
            <li>
              <b>Retrieval timing matters as much as retrieval quality.</b>
              <p>
                Our first version loaded memory before the agent began work, and on this benchmark the agent trusted memory
                over the code and did worse.
              </p>
            </li>
            <li>
              <b>Accumulated knowledge expands scope.</b> <Todo>TODO(copy)</Todo>
            </li>
            <li>
              <b>Tasks need different modes.</b>
              <p>
                That is why Reverie infers a task mode when your agent asks.{" "}
                <ArrowLink href="/how-it-works#retrieval">How retrieval works</ArrowLink>
              </p>
            </li>
            <li>
              <b>Where memory helped and where it hurt.</b>
              <p>
                In the first run, memory helped on cognition reuse, the metric that loading memory inflates, and hurt on the
                other four.
              </p>
            </li>
          </ul>
        </section>

        {/* 6 */}
        <section id="not-tested" className="eb-sec" aria-labelledby="not-tested-h">
          <h2 id="not-tested-h">What these runs did not test</h2>
          <ul className="rows">
            <li><b>Human review.</b> The harness accepts every review automatically.</li>
            <li>
              <b>Contradiction and supersession.</b> The stored run produced no <code>contradicts</code> and no{" "}
              <code>supersedes</code> relationships.
            </li>
            <li><b>More than one repository, or more than one agent.</b></li>
          </ul>
        </section>

        {/* 7 */}
        <section id="validity" className="eb-sec" aria-labelledby="validity-h">
          <h2 id="validity-h">Threats to validity</h2>
          <ul className="rows">
            <li>A small sample.</li>
            <li>One repository.</li>
            <li>One type of agent.</li>
            <li>An LLM judge, not a human one.</li>
            <li>Outlier removal, in the paper’s figures for the second architecture.</li>
            <li>A mixed protocol in the stored run.</li>
          </ul>
        </section>

        {/* 8 */}
        <section id="next" className="eb-sec" aria-labelledby="next-h">
          <h2 id="next-h">What’s next</h2>
          <ul className="rows">
            <li>A controlled rerun with the same protocol in both arms.</li>
            <li>
              {isExperimentVisible() ? (
                <ArrowLink href="/research/continuity-experiment">The continuity experiment</ArrowLink>
              ) : (
                "The continuity experiment: the same agent, with and without Reverie."
              )}
            </li>
            <li>More repositories.</li>
            <li>A human judge alongside the LLM.</li>
          </ul>
        </section>

        {/* 9 */}
        <section id="changed" className="eb-sec" aria-labelledby="changed-h">
          <h2 id="changed-h">What this changed in Reverie</h2>
          <div className="prose-col">
            <p>
              The first run’s finding changed the design. Reverie no longer loads memory when a session starts. Your agent
              asks for it, after reading the code.{" "}
              <ArrowLink href="/how-it-works#retrieval">How your agent gets it back</ArrowLink>
            </p>
          </div>
        </section>

        <section className="eb-sec eb-next" aria-label="Reports and contact">
          <div className="ctas">
            <a className="btn btn-primary" href="/research/archive/ec-bench-technical-report.pdf">
              Technical Report 001 <span aria-hidden="true">↓</span>
              <span className="sr-only"> (PDF)</span>
            </a>
            <a className="btn btn-secondary" href="/research/archive/ec-bench-short-report.pdf">
              Short Report <span aria-hidden="true">↓</span>
              <span className="sr-only"> (PDF)</span>
            </a>
            {isRepoPublic() && repoUrl ? (
              <ButtonLink href={repoUrl} variant="secondary" external>
                View the harness ↗
              </ButtonLink>
            ) : null}
            <ButtonLink href={`mailto:${siteConfig.contactEmail}?subject=EC-Bench`} variant="secondary">
              Write to us
            </ButtonLink>
          </div>
          {/* TODO(fact): path of the harness inside the repository (State B only); the link goes to the repository root. */}
        </section>
      </div>
    </div>
  );
}
