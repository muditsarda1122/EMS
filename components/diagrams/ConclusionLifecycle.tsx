// F2 (summary variant): the life of one conclusion. Bars come from lib/confidence.ts via the lifecycle scenario,
// so they follow Reverie's update rules; no numerals are printed.
import { lifecycleSteps } from "@/content/lifecycle-scenario";

type Stage = { status: string; event: string; mobileEvent: string; stepIndex: number; tone: "ink" | "amber" | "grey" };

const STAGES: Stage[] = [
  { status: "unreviewed", event: "Extracted", mobileEvent: "Extracted in a session.", stepIndex: 0, tone: "ink" },
  { status: "reviewed", event: "You accept it", mobileEvent: "You accept it.", stepIndex: 1, tone: "ink" },
  { status: "reviewed", event: "Supported and used", mobileEvent: "Supported and used.", stepIndex: 3, tone: "ink" },
  { status: "challenged", event: "A new one disagrees", mobileEvent: "A new conclusion disagrees.", stepIndex: 5, tone: "amber" },
  { status: "open question", event: "Conflict persists", mobileEvent: "The conflict persists.", stepIndex: 6, tone: "grey" },
  { status: "superseded", event: "You prefer the newer", mobileEvent: "You prefer the newer one. This one is kept.", stepIndex: 7, tone: "grey" },
];

const FILL = { ink: "f-ink", amber: "f-amber", grey: "f-ink4" } as const;
const BG = { ink: "var(--ink)", amber: "var(--challenged)", grey: "var(--ink-4)" } as const;
const STATUS_FILL = { ink: "f-ink", amber: "f-amber", grey: "f-ink" } as const;

const TEXT = ["cache invalidation", "follows token refresh"];

export default function ConclusionLifecycle({ variant = "summary" }: { variant?: "summary" }) {
  void variant;
  const steps = lifecycleSteps();
  const stages = STAGES.map((s) => ({ ...s, value: steps[s.stepIndex].stored }));
  const text = (x: number, cls = "t-rec") =>
    TEXT.map((t, i) => (
      <text key={t} x={x} y={86 + i * 18} className={cls}>{t}</text>
    ));

  return (
    <>
      <p className="mono-label panel-label">One conclusion, up close</p>
      <svg className="desk" viewBox="0 0 1200 250" role="img" aria-label="The life of one conclusion">
        <rect x="1018" y="0" width="164" height="34" rx="2" className="rec-strong" />
        <rect x="1018" y="0" width="3" height="34" className="bar-accent" />
        <text x="1032" y="22" className="t-rec">newer conclusion</text>
        <line x1="1100" y1="36" x2="1100" y2="62" className="flow" markerEnd="url(#ah)" />
        <text x="1110" y="54" className="t-mono-sm">replaces</text>

        <rect x="18" y="66" width="164" height="48" rx="2" className="rec-session" />{text(32)}
        <line x1="186" y1="90" x2="214" y2="90" className="flow" markerEnd="url(#ah)" />
        <rect x="218" y="66" width="164" height="48" rx="2" className="rec-strong" />
        <rect x="218" y="66" width="3" height="48" className="bar-accent" />{text(232)}
        <line x1="386" y1="90" x2="414" y2="90" className="flow" markerEnd="url(#ah)" />
        <rect x="418" y="66" width="164" height="48" rx="2" className="rec-strong sw-22" />
        <rect x="418" y="66" width="3" height="48" className="bar-accent" />{text(432)}
        <line x1="586" y1="90" x2="614" y2="90" className="flow" markerEnd="url(#ah)" />
        <rect x="618" y="66" width="164" height="48" rx="2" className="rec-strong" />
        <rect x="618" y="66" width="3" height="48" className="bar-amber" />{text(632)}
        <line x1="786" y1="90" x2="814" y2="90" className="flow" markerEnd="url(#ah)" />
        <rect x="818" y="66" width="164" height="48" rx="2" className="rec-session" />{text(832)}
        <text x="970" y="87" textAnchor="middle" className="t-title" style={{ fontSize: 16 }}>?</text>
        <line x1="986" y1="90" x2="1014" y2="90" className="flow" markerEnd="url(#ah)" />
        <rect x="1018" y="66" width="164" height="48" rx="2" className="rec-canon" />{text(1032, "t-rec f-ink3")}
        <line x1="1031" y1="82" x2="1145" y2="82" className="s-ink3" />
        <line x1="1031" y1="100" x2="1161" y2="100" className="s-ink3" />

        <g className="t-mono-sm" textAnchor="middle">
          {stages.map((s, i) => (
            <text key={i} x={100 + i * 200} y="140" className={i === 5 ? "f-ink3" : STATUS_FILL[s.tone]}>{s.status}</text>
          ))}
        </g>
        {stages.map((s, i) => (
          <g key={i}>
            <rect x={40 + i * 200} y="152" width="120" height="5" className="track" />
            <rect x={40 + i * 200} y="152" width={120 * s.value} height="5" className={FILL[s.tone]} />
          </g>
        ))}
        <g className="t-line" textAnchor="middle" style={{ fontSize: 14.5 }}>
          {stages.map((s, i) => (
            <text key={i} x={100 + i * 200} y="186">{s.event}</text>
          ))}
        </g>
        <text x="0" y="234" className="t-note f-ink2" style={{ fontSize: 15 }}>
          If the code it cites is deleted, a conclusion like this is retired automatically.
        </text>
      </svg>
      <div className="f2-mobile">
        <ol className="m-life">
          {stages.map((s, i) => (
            <li key={i}>
              <span className="st2" style={s.tone === "amber" ? { color: "var(--challenged)" } : i === 5 ? { color: "var(--ink-3)" } : undefined}>{s.status}</span>
              <div className="ev">{s.mobileEvent}</div>
              <span className="cb"><i style={{ width: `${(s.value * 100).toFixed(1)}%`, background: BG[s.tone] }} /></span>
            </li>
          ))}
        </ol>
        <p className="m-foot">If the code it cites is deleted, a conclusion like this is retired automatically.</p>
      </div>
    </>
  );
}
