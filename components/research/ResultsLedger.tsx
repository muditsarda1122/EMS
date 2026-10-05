// The EC-Bench results ledger (plan §8.4, §19.3). One row per run. `figures` render ONLY when the run is
// reconciled; otherwise the row shows its outcome, caveats and "figures under reconciliation".
import Tag from "@/components/ui/Tag";
import { formatDate } from "@/content/research";
import type { BenchRun, BenchStatus } from "@/content/bench-runs";
import { visibleFigures } from "@/lib/bench";

const STATUS_LABEL: Record<BenchStatus, string> = {
  reconciled: "Reconciled",
  "needs-reconciliation": "Needs reconciliation",
  planned: "Planned",
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function runDate(date: string | null): string {
  if (!date) return "Not yet run";
  const parts = date.split("-");
  if (parts.length === 2) return `${MONTHS[Number(parts[1]) - 1]} ${parts[0]}`;
  return formatDate(date);
}

function Todo({ what = "TODO(fact)" }: { what?: string }) {
  return <span className="todo">{what}</span>;
}

function Row({ run }: { run: BenchRun }) {
  const figures = visibleFigures(run);
  const id = `run-${run.id}`;
  return (
    <li className={`ledger-row${run.status === "planned" ? " planned" : ""}`}>
      <article aria-labelledby={id}>
        <header className="ledger-head">
          <h3 id={id}>{runDate(run.date)}</h3>
          <Tag dashed={run.status !== "reconciled"}>{STATUS_LABEL[run.status]}</Tag>
          {/^\d{8}-\d{6}$/.test(run.id) ? <code>{run.id}</code> : null}
        </header>
        <div className="ledger-cols">
          <dl className="ledger-meta">
            <div><dt>System</dt><dd>{run.system}</dd></div>
            <div><dt>Compared with</dt><dd>{run.baseline}</dd></div>
            <div><dt>Protocol</dt><dd>{run.protocol}</dd></div>
            <div><dt>Prompts</dt><dd>{run.prompts !== null ? run.prompts : <Todo />}</dd></div>
            <div><dt>Judge</dt><dd>{run.judge ?? <Todo />}</dd></div>
          </dl>
          <div className="ledger-result">
            <p className="ledger-outcome">{run.outcome}</p>
            {run.caveats.length > 0 ? (
              <>
                <h4>Caveats</h4>
                <ul>
                  {run.caveats.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </>
            ) : null}
            {figures ? (
              <table className="ledger-figures">
                <caption className="sr-only">Figures for run {run.id}, per metric</caption>
                <thead>
                  <tr><th scope="col">Metric</th><th scope="col">With Reverie</th><th scope="col">Baseline</th></tr>
                </thead>
                <tbody>
                  {figures.map((f) => (
                    <tr key={f.metric}>
                      <th scope="row">{f.metric}</th>
                      <td>{f.withReverie}</td>
                      <td>{f.baseline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : run.status === "needs-reconciliation" ? (
              <p className="ledger-hold">Figures under reconciliation.</p>
            ) : null}
            <p className="ledger-src">
              <span className="mono-label">Sources</span>{" "}
              {run.sources.map((s, i) => (
                <span key={s.label}>
                  {i > 0 ? " · " : ""}
                  {s.href ? (
                    <a className="text-link" href={s.href}>{s.label}</a>
                  ) : (
                    s.label
                  )}
                </span>
              ))}
            </p>
          </div>
        </div>
      </article>
    </li>
  );
}

export default function ResultsLedger({ runs }: { runs: BenchRun[] }) {
  return (
    <ol className="ledger">
      {runs.map((r) => (
        <Row key={r.id} run={r} />
      ))}
    </ol>
  );
}
