// F4: two brains and a review gate (DIAGRAM-PLAN F4). One set of labels drives an SVG (wide containers)
// and a vertical HTML composition (narrow). The ec_reconsolidate arrow bypasses the gate on purpose.
import { readyAgents, comingSoon, listText } from "@/content/site.config";

const SESSION_NOTES = ["per repo and branch", "unreviewed, usable now", "relates new conclusions:", "supports / contradicts", "no decay"];
const CANON_NOTES = [
  "shared across projects",
  "reviewed, long-term",
  "relates fully:",
  "supports / contradicts / supersedes / depends on",
  "confidence fades by scope",
  "weak conclusions can be superseded",
];
const GATE_OUTCOMES = ["open questions first", "accept →", "reject → discarded", "skip → next session"];
const MAINTENANCE = ["grounding checks · open-question parking ·", "supersession · reversal of evidence from", "retired conclusions"];
const RECON = ["updates a conclusion it", "just retrieved, with verified", "evidence; recorded"];

export default function TwoBrains() {
  const soon = comingSoon();
  const agents = [...readyAgents(), ...(soon.length ? [`${listText(soon)}: coming soon`] : [])].join(" · ");
  return (
    <div className="f4">
      <svg className="desk" viewBox="0 0 1000 480" role="img" aria-labelledby="f4cap">
        <desc>
          Your agent writes conclusions into the session brain with ec_observe and reads both brains with ec_query.
          Extracted conclusions reach the canonical brain only through the review gate, where you accept, reject or skip.
          Evidence about long-term conclusions waits as pending until review. The one exception is ec_reconsolidate, which
          updates a conclusion the agent has just retrieved, with verified evidence, and records the update.
        </desc>
        {/* agent */}
        <rect x="80" y="0" width="860" height="52" rx="2" className="rec-strong" />
        <text x="100" y="23" className="t-title">Your agent</text>
        <text x="100" y="43" className="t-line">{agents}</text>

        {/* tool arrows */}
        <line x1="130" y1="54" x2="130" y2="138" className="flow" markerEnd="url(#ah)" />
        <text x="140" y="100" className="t-mono-sm">ec_observe</text>
        <line x1="250" y1="138" x2="250" y2="55" className="flow" markerEnd="url(#ah)" />
        <text x="260" y="100" className="t-mono-sm">ec_query</text>
        <text x="260" y="121" className="t-note">reads both brains</text>
        <line x1="610" y1="138" x2="610" y2="55" className="flow" markerEnd="url(#ah)" />
        <text x="620" y="100" className="t-mono-sm">ec_query</text>
        <line x1="950" y1="54" x2="950" y2="138" className="flow sw-bold" markerEnd="url(#ah)" />
        <text x="938" y="78" textAnchor="end" className="t-mono-sm">ec_reconsolidate</text>
        {RECON.map((l, i) => (
          <text key={l} x="938" y={98 + i * 17} textAnchor="end" className="t-note">{l}</text>
        ))}

        {/* session brain */}
        <rect x="0" y="140" width="300" height="200" rx="2" className="rec-session" />
        <text x="16" y="166" className="t-title">Session brain</text>
        {SESSION_NOTES.map((l, i) => (
          <text key={l} x="16" y={192 + i * 20} className="t-line">{l}</text>
        ))}
        <text x="16" y="312" className="t-note">evidence about long-term</text>
        <text x="16" y="330" className="t-note">conclusions waits as pending</text>
        <line x1="212" y1="322" x2="354" y2="322" className="dash" markerEnd="url(#ah)" />
        <line x1="360" y1="312" x2="360" y2="332" className="s-ink" strokeWidth="2.2" />

        {/* review gate */}
        <rect x="360" y="140" width="170" height="200" rx="2" className="box" />
        <text x="445" y="166" textAnchor="middle" className="t-gate">Review</text>
        {GATE_OUTCOMES.map((l, i) => (
          <text key={l} x="445" y={200 + i * 26} textAnchor="middle" className="t-note f-ink2">{l}</text>
        ))}
        <line x1="302" y1="206" x2="357" y2="206" className="flow" markerEnd="url(#ah)" />
        <line x1="532" y1="222" x2="587" y2="222" className="flow" markerEnd="url(#ah)" />

        {/* canonical brain */}
        <rect x="590" y="140" width="410" height="200" rx="2" className="rec-strong" />
        <rect x="590" y="140" width="3" height="200" className="bar-accent" />
        <text x="608" y="166" className="t-title">Canonical brain</text>
        {CANON_NOTES.map((l, i) => (
          <text key={l} x="608" y={192 + i * 20} className="t-line">{l}</text>
        ))}

        {/* maintenance */}
        <rect x="590" y="372" width="410" height="100" className="band" />
        <text x="608" y="394" className="t-note">maintenance, in the background</text>
        {MAINTENANCE.map((l, i) => (
          <text key={l} x="608" y={420 + i * 20} className="t-line">{l}</text>
        ))}
        <line x1="900" y1="342" x2="900" y2="370" className="flow" markerEnd="url(#ah)" />
        <line x1="940" y1="370" x2="940" y2="343" className="flow" markerEnd="url(#ah)" />
      </svg>

      <ol className="f4-m">
        <li className="blk agent">
          <b>Your agent</b>
          <span>{agents}</span>
        </li>
        <li className="blk session">
          <b>Session brain</b>
          <ul>{SESSION_NOTES.slice(0, 2).concat(["relates new conclusions: supports / contradicts", "no decay"]).map((l) => <li key={l}>{l}</li>)}</ul>
          <p className="tool"><code>ec_observe</code> writes here. <code>ec_query</code> reads here.</p>
          <p className="pend">Evidence about long-term conclusions waits here as pending.</p>
        </li>
        <li className="blk gate">
          <b>Review</b>
          <ul>{GATE_OUTCOMES.map((l) => <li key={l}>{l}</li>)}</ul>
        </li>
        <li className="blk canon">
          <b>Canonical brain</b>
          <ul>{CANON_NOTES.filter((l) => l !== "relates fully:").map((l) => <li key={l}>{l === "supports / contradicts / supersedes / depends on" ? "relates fully: supports / contradicts / supersedes / depends on" : l}</li>)}</ul>
          <p className="tool"><code>ec_query</code> reads here.</p>
          <p className="tool exc">
            <code>ec_reconsolidate</code> writes here directly, <i>without review</i>: it updates a conclusion the agent just
            retrieved, with verified evidence, and the update is recorded.
          </p>
        </li>
        <li className="blk maint">
          <b>Maintenance, in the background</b>
          <span>{MAINTENANCE.join(" ")}</span>
        </li>
      </ol>
    </div>
  );
}
