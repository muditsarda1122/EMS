// EC-Bench results ledger data (plan §1.7B, §8.4, §19.3). Plain data: no fs access, safe to import anywhere.
//
// Honesty guard: every run is `needs-reconciliation` or `planned`, so no figure is stored or rendered.
// `ResultsLedger` shows `figures` only when `status === "reconciled"` (see `visibleFigures` in lib/bench.ts).
// Never add figures to a row until the owner reconciles the sources (P1).

export type BenchStatus = "reconciled" | "needs-reconciliation" | "planned";

export type BenchRun = {
  id: string;
  /** ISO date or year-month (YYYY-MM-DD, YYYY-MM). Null when not yet run. */
  date: string | null;
  system: string;
  /** What the comparison arm had. */
  baseline: string;
  protocol: string;
  /** Null: the plan does not state it (planned row). */
  prompts: number | null;
  /** Null: not stated in the plan; rendered as TODO(fact). */
  judge: string | null;
  status: BenchStatus;
  /** Rendered ONLY when status === "reconciled". */
  figures?: { metric: string; withReverie: number; baseline: number }[];
  /** A neutral sentence, always rendered. No numbers. */
  outcome: string;
  caveats: string[];
  /** `href` is omitted for source documents that are not published on this site. */
  sources: { label: string; href?: string }[];
};

export const benchRuns: BenchRun[] = [
  {
    id: "2026-07-ems-v1",
    // TODO(fact): the plan dates this run only as July 2026 (reports of 15 and 18 July).
    date: "2026-07",
    system: "EMS v1 (memory injected before work)",
    baseline: "Stateless baseline",
    protocol: "Relevant memory loaded into the agent’s context before it began work, compared with no memory.",
    prompts: 30,
    // TODO(fact): the judge for this run is not stated in the plan.
    judge: null,
    status: "needs-reconciliation",
    outcome:
      "The aggregate favoured memory, but the gain came from one metric, cognition reuse, which loading memory inflates. On the other four metrics the agent did worse with memory.",
    caveats: [
      "A later write-up of this version reports the baseline ahead in aggregate. The two accounts have not been reconciled.",
    ],
    sources: [
      { label: "EC-Bench Technical Report 001", href: "/research/archive/ec-bench-technical-report.pdf" },
      { label: "EC-Bench Short Report", href: "/research/archive/ec-bench-short-report.pdf" },
    ],
  },
  {
    id: "20260813-141550",
    date: "2026-08-13",
    system: "Reverie v2 (on request)",
    baseline: "Interactive chat memory (baseline arm added 15 August)",
    protocol: "Headless, fresh context per prompt, compared with an interactive agent with chat memory. A mixed protocol.",
    prompts: 30,
    judge: "GLM-5.2 (LLM), full transcript",
    status: "needs-reconciliation",
    outcome:
      "The baseline scored ahead on all five metrics.",
    caveats: [
      "The two arms ran under different protocols: headless with fresh context per prompt, against interactive with chat memory.",
      "The paper reports different figures for this architecture, with outliers removed, and a different count of stored conclusions. These have not been reconciled.",
      "The harness accepted every review automatically, so human review was not tested.",
    ],
    sources: [
      { label: "The paper, section on results", href: "/research/biological-memory-architecture" },
      { label: "Run 20260813-141550 (product documentation, section on the benchmark)" },
    ],
  },
  {
    id: "controlled-comparison",
    date: null,
    system: "Reverie v2 (on request)",
    baseline: "Same protocol in both arms",
    // TODO(fact): the exact protocol, prompt count and judge are not yet decided in the plan.
    protocol: "A controlled rerun with the same protocol in both arms.",
    prompts: null,
    judge: null,
    status: "planned",
    outcome: "Not yet run.",
    caveats: [],
    sources: [{ label: "Research index: how we test it", href: "/research#evaluation" }],
  },
];
