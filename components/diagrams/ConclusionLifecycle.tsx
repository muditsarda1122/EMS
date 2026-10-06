// F2 (summary variant): the life of one conclusion. Bars come from lib/confidence.ts via the lifecycle scenario,
// so they follow Reverie's update rules; no numerals are printed.
import { lifecycleSteps, scenario } from "@/content/lifecycle-scenario";
import { DECAY_LAMBDA, SCOPE_MULTIPLIER, SOURCE_BASE, effective, prior } from "@/lib/confidence";
import LifecycleStepper from "./LifecycleStepper";
import LifecycleReelControls from "./LifecycleReelControls";
import { StepPanel, type StepView } from "./lifecycle-panel";

type Stage = { status: string; event: string; mobileEvent: string; stepIndex: number; tone: "ink" | "amber" | "grey" };

const STAGES: Stage[] = [
  { status: "unreviewed", event: "Extracted", mobileEvent: "Extracted in a session.", stepIndex: 0, tone: "ink" },
  { status: "reviewed", event: "You accept it", mobileEvent: "You accept it.", stepIndex: 1, tone: "ink" },
  { status: "reviewed", event: "Supported and used", mobileEvent: "Supported and used.", stepIndex: 3, tone: "ink" },
  { status: "challenged", event: "A new one disagrees", mobileEvent: "A new conclusion disagrees.", stepIndex: 5, tone: "amber" },
  { status: "open question", event: "Conflict persists", mobileEvent: "The conflict persists.", stepIndex: 6, tone: "grey" },
  { status: "superseded", event: "You prefer the newer", mobileEvent: "You prefer the newer one. This one is kept.", stepIndex: 7, tone: "grey" },
];

const BG = { ink: "var(--ink)", amber: "var(--challenged)", grey: "var(--ink-4)" } as const;
/** How each stage's record is drawn (classes in app/home.css), in STAGES order. */
const KIND = ["unreviewed", "reviewed", "used", "challenged", "open", "superseded"] as const;
const CONCLUSION = "cache invalidation follows token refresh";
/** Seconds each stage stays on screen; the cycle is STAGES.length × STEP (18 s). */
const STEP = 3;

// TODO(fact): "weeks" is not quantified in the plan. This many days is used only once P5 supplies the module decay rate.
const EXAMPLE_DAYS = 28;

const f2 = (n: number) => n.toFixed(2);

/** The eight steps and the branch, with every value computed by lib/confidence.ts (DIAGRAM-PLAN §6). */
function detailedSteps(): StepView[] {
  const s = lifecycleSteps();
  const { A, B, C } = scenario;
  const base = SOURCE_BASE[A.source]!;
  const mult = SCOPE_MULTIPLIER[A.scope]!;
  const cB = prior(B.source, B.scope, B.evidenceSources)!;
  const cC = prior(C.source, C.scope, C.evidenceSources)!;
  const aStored = (k: number) => s[k].stored;
  const lambda = DECAY_LAMBDA.module;
  const eff = effective(s[4].logit, "module", EXAMPLE_DAYS);
  const bar = (who: "A" | "C", value: number, status: string, extra: Partial<StepView["bars"][number]> = {}) => ({
    who,
    value,
    status,
    mode: "solid" as const,
    ...extra,
  });
  const announce = (n: number, what: string, value: number, status: string) =>
    `Step ${n} of 8: ${what}. Confidence ${f2(value)}. Status: ${status}.`;

  return [
    {
      n: 1, title: "Extracted", glyph: "session",
      event: "A is extracted in a debugging session.",
      rule: `prior = base[source] × multiplier[scope] = ${f2(base)} × ${f2(mult)}`,
      bars: [bar("A", aStored(0), "session · unreviewed")],
      announce: announce(1, "extracted in a debugging session", aStored(0), "session · unreviewed"),
    },
    {
      n: 2, title: "Accepted", glyph: "canon",
      event: "You accept A at review. The full relating pass runs.",
      rule: "promoted with the same confidence",
      bars: [bar("A", aStored(1), "canonical · reviewed")],
      announce: announce(2, "accepted at review", aStored(1), "canonical · reviewed"),
    },
    {
      n: 3, title: "Supported", glyph: "canon",
      event: "B is accepted later and classified as supporting A.",
      rule: `L′ = L + r × c_source · r = ${f2(B.similarityToA)} (example), c_source = ${f2(cB)}`,
      note: "The delta is stored on the edge, so the update can be reversed.",
      bars: [bar("A", aStored(2), "active")],
      announce: announce(3, "supported by a later conclusion", aStored(2), "active"),
    },
    {
      n: 4, title: "Retrieved", glyph: "canon",
      event: "A is retrieved by a query.",
      rule: "L′ = L + 0.05",
      note: "The decay clock resets.",
      bars: [bar("A", aStored(3), "active")],
      announce: announce(4, "retrieved by a query", aStored(3), "active"),
    },
    {
      n: 5, title: "Unused", glyph: "faded",
      event: "Weeks pass and A goes unused.",
      rule: "effective L = L − λ × days (computed, never written)",
      note: "The stored value stays. Only the value used for ranking falls, at the module rate.",
      bars: [bar("A", aStored(4), "active")],
      ghost:
        lambda !== null && eff !== null
          ? { value: eff, text: `Effective confidence after decay (dashed): ${f2(eff)}` }
          : { value: null, text: "Effective confidence after decay: computed from config" },
      announce: "Step 5 of 8: weeks pass unused. Stored confidence " + f2(aStored(4)) + ". Effective confidence is computed from config. Status: active.",
    },
    {
      n: 6, title: "Contradicted", glyph: "challenged",
      event: "C is accepted and classified as contradicting A. A two-stage check judges the conflict genuine.",
      rule: `L′ = L − r × c_source · r = ${f2(C.similarityToA)} (example), c_source = ${f2(cC)}`,
      bars: [bar("A", aStored(5), "challenged"), bar("C", cC, "active")],
      announce: announce(6, "contradicted by a newer conclusion", aStored(5), "challenged"),
    },
    {
      n: 7, title: "Open question", glyph: "open",
      event: "The conflict outlasts the module’s time limit. Maintenance parks both A and C.",
      rule: "confidence frozen · retrieved at half weight",
      bars: [bar("A", aStored(6), "open question", { mode: "frozen" }), bar("C", cC, "open question", { mode: "frozen" })],
      announce: announce(7, "the conflict outlasts its time limit", aStored(6), "open question"),
    },
    {
      n: 8, title: "You decide", glyph: "superseded",
      event: "At review you choose to prefer C. A is kept and linked.",
      rule: "C: L′ = L + 0.05 · A is superseded by C",
      bars: [bar("C", s[7].storedC!, "active"), bar("A", aStored(7), "superseded", { mode: "frozen", struck: true })],
      announce: announce(8, "resolved at review in favour of C", aStored(7), "superseded"),
    },
    {
      n: 9, title: "If code is deleted", glyph: "deprecated",
      event: "Instead of steps 6 to 8: auth/cache.rs is deleted. At the next grounding check, A is deprecated, because at module scope any cited file gone retires it. Conclusions that depend on A are challenged.",
      rule: "scope module · retired when any cited file or symbol is gone",
      bars: [bar("A", aStored(3), "deprecated", { mode: "frozen", struck: true })],
      announce: `Branch: if auth/cache.rs is deleted. A is deprecated; conclusions that depend on it are challenged.`,
    },
  ];
}

export default function ConclusionLifecycle({ variant = "summary" }: { variant?: "summary" | "detailed" }) {
  if (variant === "detailed") return <DetailedLifecycle />;
  const steps = lifecycleSteps();
  const stages = STAGES.map((s) => ({ ...s, value: steps[s.stepIndex].stored }));

  // One card at a time: each stage holds for STEP seconds, then fades into the next (keyframes in app/home.css,
  // which assume six stages). The segments under it are buttons that jump to a stage (LifecycleReelControls).
  // Reduced motion shows all six at once.
  return (
    <>
      <p className="mono-label panel-label">One conclusion, up close</p>
      <ol className="lc-cards" id="lc-reel" aria-label="The life of one conclusion">
        {stages.map((s, i) => (
          <li key={i} className={`lc-card k-${KIND[i]}`} style={{ animationDelay: `${i * STEP}s` }}>
            <span className="sr-only">Step {i + 1} of {stages.length}. </span>
            <div className="lc-rec">{CONCLUSION}</div>
            <div className="lc-meta">
              <span className="lc-status">{s.status}</span>
              <span className="lc-bar" aria-hidden="true">
                <i style={{ width: `${(s.value * 100).toFixed(1)}%`, background: BG[s.tone] }} />
              </span>
            </div>
            <p className="lc-event">{s.mobileEvent}</p>
          </li>
        ))}
      </ol>
      <LifecycleReelControls labels={stages.map((s) => `${s.event} (${s.status})`)} step={STEP} />
      <p className="lc-foot">If the code it cites is deleted, a conclusion like this is retired automatically.</p>
    </>
  );
}

function DetailedLifecycle() {
  const steps = detailedSteps();
  const { A, B, C } = scenario;
  return (
    <div className="lc-wrap">
      <dl className="lc-cast">
        {([["A", A.text], ["B", B.text], ["C", C.text]] as const).map(([k, t]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{t}</dd>
          </div>
        ))}
      </dl>
      <div className="lc-desk">
        <LifecycleStepper steps={steps} />
      </div>
      <ol className="lc-m">
        {steps.map((st) => (
          <li key={st.n}>
            <details open={st.n === 1}>
              <summary>
                <span className="lc-m-n">{st.n > 8 ? "Branch" : `Step ${st.n}`}</span>
                {st.title}
              </summary>
              <StepPanel step={st} />
            </details>
          </li>
        ))}
      </ol>
    </div>
  );
}
