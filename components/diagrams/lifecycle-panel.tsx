// Fig. 5 step data and the step panel, shared by the desktop stepper (client) and the mobile list (server).
// Values are computed on the server from lib/confidence.ts; nothing here does maths.

export type BarMode = "solid" | "frozen";

export type StepBar = {
  who: "A" | "C";
  /** Stored confidence. */
  value: number;
  status: string;
  mode: BarMode;
  /** Draw the status struck through (superseded, deprecated). */
  struck?: boolean;
};

export type StepView = {
  /** 1–8 for the steps; 9 for the branch. */
  n: number;
  /** Rail label. */
  title: string;
  /** What happens (serif). */
  event: string;
  /** The rule applied (mono, one line). */
  rule: string;
  note?: string;
  bars: StepBar[];
  /** Step 5: effective confidence after decay. `null` with `ghostText` while the decay rate is not configured. */
  ghost?: { value: number | null; text: string };
  /** Screen-reader announcement. */
  announce: string;
  glyph: "session" | "canon" | "faded" | "challenged" | "open" | "superseded" | "deprecated";
};

export function StepPanel({ step }: { step: StepView }) {
  return (
    <div className="lc-panel">
      <p className="lc-event">{step.event}</p>
      <p className="lc-rule">{step.rule}</p>
      {step.note ? <p className="lc-note">{step.note}</p> : null}
      <div className="lc-bars">
        {step.bars.map((b) => (
          <div className="lc-bar" key={b.who}>
            <span className="lc-who">{b.who}</span>
            <span className="lc-track" role="img" aria-label={`${Math.round(b.value * 100)} percent`}>
              <i className={b.mode === "frozen" ? "frozen" : undefined} style={{ width: `${(b.value * 100).toFixed(1)}%` }} />
              {step.ghost && step.ghost.value !== null && b.who === "A" ? (
                <b style={{ width: `${(step.ghost.value * 100).toFixed(1)}%` }} />
              ) : null}
            </span>
            <span className="lc-val">{b.value.toFixed(2)}</span>
            <span className={`lc-status${b.struck ? " struck" : ""}${b.status === "challenged" ? " amber" : ""}`}>{b.status}</span>
          </div>
        ))}
      </div>
      {step.ghost ? <p className="lc-ghost">{step.ghost.text}</p> : null}
    </div>
  );
}
