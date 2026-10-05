"use client";
// Fig. 5 desktop composition: a stepper over the lifecycle steps (DIAGRAM-PLAN F5).
// Before hydration, and without JavaScript, every step renders expanded (the static variant).
import { useState, useSyncExternalStore, type KeyboardEvent } from "react";
import { StepPanel, type StepView } from "./lifecycle-panel";

const MAIN_STEPS = 8;

export default function LifecycleStepper({ steps }: { steps: StepView[] }) {
  // false on the server and during hydration, true afterwards: until then every step is expanded.
  const live = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [i, setI] = useState(0);
  const [announce, setAnnounce] = useState("");

  const go = (next: number) => {
    const j = Math.max(0, Math.min(steps.length - 1, next));
    if (j === i) return;
    setI(j);
    setAnnounce(steps[j].announce);
  };

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(i + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(i - 1);
    }
  };

  const cur = steps[i];

  return (
    <div className={`lc${live ? " is-live" : ""}`} role="group" aria-label="Step through the life of a conclusion" onKeyDown={onKey}>
      <ol className="lc-rail">
        {steps.map((s, k) => (
          <li key={s.n} className={s.n > MAIN_STEPS ? "branch" : undefined}>
            <button
              type="button"
              className="lc-stop"
              aria-current={live && k === i ? "step" : undefined}
              onClick={() => go(k)}
              tabIndex={live ? undefined : -1}
            >
              <span className={`lc-glyph g-${s.glyph}`} aria-hidden="true" />
              <span className="lc-num">{s.n > MAIN_STEPS ? "Branch" : s.n}</span>
              <span className="lc-title">{s.title}</span>
            </button>
          </li>
        ))}
      </ol>

      {live ? (
        <>
          <div className="lc-ctl">
            <button type="button" className="lc-btn" aria-disabled={i === 0} onClick={() => go(i - 1)}>
              <span aria-hidden="true">←</span> Previous
            </button>
            <button type="button" className="lc-btn" aria-disabled={i === steps.length - 1} onClick={() => go(i + 1)}>
              Next <span aria-hidden="true">→</span>
            </button>
            <span className="lc-count" aria-hidden="true">
              {cur.n > MAIN_STEPS ? "Branch" : `${cur.n} / ${MAIN_STEPS}`}
            </span>
          </div>
          <StepPanel step={cur} />
          <p className="sr-only" role="status" aria-live="polite">
            {announce}
          </p>
        </>
      ) : (
        <ol className="lc-all">
          {steps.map((s) => (
            <li key={s.n}>
              <h3 className="lc-h">{s.n > MAIN_STEPS ? `Branch · ${s.title}` : `Step ${s.n} · ${s.title}`}</h3>
              <StepPanel step={s} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
