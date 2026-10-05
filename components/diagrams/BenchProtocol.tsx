// F6: how an EC-Bench run works (DIAGRAM-PLAN F6). Protocol only: no results, scores, run IDs or model names.
// One data definition drives the SVG (wide containers) and the stacked HTML composition (narrow).

const SESSIONS = [
  { n: 1, what: "investigation and architecture", prompts: 14 },
  { n: 2, what: "implementation and debugging", prompts: 13 },
  { n: 3, what: "planning", prompts: 3 },
];

const METRICS = [
  { name: ["architectural", "continuity"], weight: "0.30" },
  { name: ["cognition", "reuse"], weight: "0.30" },
  { name: ["repository", "groundedness"], weight: "0.15" },
  { name: ["engineering", "quality"], weight: "0.15" },
  { name: ["debugging /", "investigation", "efficiency"], weight: "0.10" },
];

const ARM_A = "Arm A: with Reverie";
const ARM_B = "Arm B: baseline";
const REPO = "Identical copy of the repository (FastAPI) for each arm";
const GATE = "review: auto-accept (harness setting)";
const FRESH = "fresh context per prompt";
const JUDGE = "LLM judge (same for both arms, full transcript)";
const HELD = "held constant: repository, prompts, agent harness, model, judge";
const DIFFERS = "differs: access to Reverie";

const COL_X = [40, 376, 712];
const COL_W = 280;
const GATE_X = [348, 684];

export default function BenchProtocol() {
  return (
    <div className="f6">
      <svg className="desk" viewBox="0 0 1040 744" role="img" aria-labelledby="f6cap">
        <desc>
          {REPO}. Two lanes, {ARM_A} and {ARM_B}, each run three sequential sessions: investigation and architecture
          (14 prompts), implementation and debugging (13) and planning (3). In Arm A there is a review gate between
          sessions, set to auto-accept in the harness, and each prompt starts with a fresh context. Both lanes’ transcripts
          go to the same LLM judge, which scores them on five weighted metrics. Held constant: repository, prompts, agent
          harness, model and judge. What differs: access to Reverie. The figure shows no results.
        </desc>
        {/* repository */}
        <rect x="0" y="0" width="1040" height="42" rx="2" className="box" />
        <text x="520" y="27" textAnchor="middle" className="t-line">{REPO}</text>
        <line x1="10" y1="42" x2="10" y2="349" className="dash" />
        <line x1="10" y1="163" x2="22" y2="163" className="flow" markerEnd="url(#ah)" />
        <line x1="10" y1="349" x2="22" y2="349" className="flow" markerEnd="url(#ah)" />

        {/* Arm A */}
        <rect x="24" y="68" width="976" height="190" className="band" />
        <text x="40" y="92" className="t-title">{ARM_A}</text>
        {SESSIONS.map((s, i) => (
          <g key={s.n}>
            <rect x={COL_X[i]} y="106" width={COL_W} height="100" rx="2" className="box" />
            <text x={COL_X[i] + 16} y="130" className="t-title">Session {s.n}</text>
            <text x={COL_X[i] + 16} y="152" className="t-line">{s.what}</text>
            <text x={COL_X[i] + 16} y="174" className="t-mono-sm">{s.prompts} prompts</text>
            <text x={COL_X[i] + 16} y="194" className="t-note">{FRESH}</text>
          </g>
        ))}
        {GATE_X.map((x, i) => (
          <g key={x}>
            <line x1={COL_X[i] + COL_W + 2} y1="156" x2={COL_X[i + 1] - 4} y2="156" className="flow" markerEnd="url(#ah)" />
            <line x1={x} y1="118" x2={x} y2="194" className="s-ink" strokeWidth="2.2" />
            <text x={x} y="230" textAnchor="middle" className="t-note">review: auto-accept</text>
            <text x={x} y="247" textAnchor="middle" className="t-note">(harness setting)</text>
          </g>
        ))}

        {/* Arm B */}
        <rect x="24" y="282" width="976" height="134" className="band" />
        <text x="40" y="306" className="t-title">{ARM_B}</text>
        {SESSIONS.map((s, i) => (
          <g key={s.n}>
            <rect x={COL_X[i]} y="322" width={COL_W} height="80" rx="2" className="box" />
            <text x={COL_X[i] + 16} y="346" className="t-title">Session {s.n}</text>
            <text x={COL_X[i] + 16} y="368" className="t-line">{s.what}</text>
            <text x={COL_X[i] + 16} y="390" className="t-mono-sm">{s.prompts} prompts</text>
          </g>
        ))}

        {/* transcripts to the judge */}
        <path d="M1000,163 H1020 V486 H838" className="flow" markerEnd="url(#ah)" fill="none" />
        <line x1="1000" y1="349" x2="1020" y2="349" className="s-ink" strokeWidth="1.4" />
        <text x="1010" y="440" textAnchor="end" className="t-note">transcripts</text>
        <rect x="190" y="450" width="648" height="72" rx="2" className="box" />
        <text x="514" y="480" textAnchor="middle" className="t-title">LLM judge</text>
        <text x="514" y="504" textAnchor="middle" className="t-line">same for both arms · full transcript</text>
        <line x1="514" y1="522" x2="514" y2="568" className="flow" markerEnd="url(#ah)" />
        <text x="526" y="550" className="t-note">five weighted metrics</text>

        {/* metrics strip */}
        {METRICS.map((m, i) => {
          const w = 976 / 5;
          const x = 24 + i * w;
          return (
            <g key={m.weight + m.name[0]}>
              <rect x={x} y="574" width={w} height="104" className="box" />
              <text x={x + 14} y="600" className="t-mono-sm">{m.weight}</text>
              {m.name.map((l, j) => (
                <text key={l} x={x + 14} y={622 + j * 18} className="t-line">{l}</text>
              ))}
            </g>
          );
        })}

        {/* legend */}
        <text x="24" y="710" className="t-mono-sm">{HELD}</text>
        <text x="24" y="732" className="t-mono-sm">{DIFFERS}</text>
      </svg>

      <div className="f6-m">
        <p className="f6-repo">{REPO}</p>
        <div className="f6-arms" aria-hidden="true">
          <span>{ARM_A}</span>
          <span>{ARM_B}</span>
        </div>
        <ol className="f6-sessions">
          {SESSIONS.map((s, i) => (
            <li key={s.n}>
              {i > 0 ? <p className="f6-gate">Arm A only: {GATE}</p> : null}
              <div className="f6-sess">
                <b>Session {s.n}</b>
                <span>{s.what}</span>
                <span className="f6-pr">{s.prompts} prompts</span>
              </div>
              <div className="f6-cells">
                <div className="f6-cell">
                  <span className="f6-who">Arm A</span>
                  with Reverie
                  <i>{FRESH}</i>
                </div>
                <div className="f6-cell">
                  <span className="f6-who">Arm B</span>
                  baseline
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div className="f6-judge">
          <p className="f6-flow">Both arms’ transcripts go to one judge.</p>
          <b>{JUDGE}</b>
          <p className="f6-flow">Five weighted metrics:</p>
          <ul>
            {METRICS.map((m) => (
              <li key={m.weight + m.name[0]}>
                <span>{m.name.join(" ")}</span>
                <span className="f6-w">{m.weight}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="f6-legend">{HELD}</p>
        <p className="f6-legend">{DIFFERS}</p>
      </div>
    </div>
  );
}
