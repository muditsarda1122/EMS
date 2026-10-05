// The worked scenario behind V1, F2 and F5 (DIAGRAM-PLAN.md §6).
// Similarity values are example inputs, not measurements.
import { contradict, logit, prior, reinforce, sigmoid, support } from "../lib/confidence.ts";

export const scenario = {
  A: {
    text: "Cache invalidation must follow token refresh; clearing the cache first serves stale authentication tokens.",
    type: "invariant",
    scope: "module",
    source: "debugging",
    evidenceSources: 1,
  },
  B: {
    text: "Token refresh must complete before any cache read in the auth middleware.",
    type: "constraint",
    scope: "module",
    source: "implementation",
    evidenceSources: 1,
    /** Example input. */
    similarityToA: 0.78,
  },
  C: {
    text: "Since the session-store migration, token refresh no longer reads the cache; the ordering constraint no longer applies.",
    type: "implication",
    scope: "module",
    source: "debugging",
    evidenceSources: 2,
    /** Example input. */
    similarityToA: 0.84,
  },
} as const;

export type Status =
  | "session · unreviewed"
  | "canonical · active"
  | "active"
  | "challenged"
  | "open question";

export type LifecycleStep = {
  step: number;
  event: string;
  rule: string;
  /** Confidence as stored (what the product writes). */
  stored: number;
  /** Stored confidence of C where it differs from A's. */
  storedC?: number;
  status: string;
  statusC?: string;
  /** Log-odds after this step, for A. */
  logit: number;
};

/** Returns the step sequence for steps 1–8. Throws if a prior is unknown (cannot happen for this scenario). */
export function lifecycleSteps(): LifecycleStep[] {
  const { A, B, C } = scenario;
  const pA = prior(A.source, A.scope, A.evidenceSources)!;
  const pB = prior(B.source, B.scope, B.evidenceSources)!;
  const pC = prior(C.source, C.scope, C.evidenceSources)!;

  const L2 = logit(pA);
  const L3 = support(L2, B.similarityToA, pB);
  const L4 = reinforce(L3);
  const L6 = contradict(L4, C.similarityToA, pC);
  const LC = reinforce(logit(pC));

  return [
    { step: 1, event: "A extracted in session 1", rule: "prior = base[source] × multiplier[scope]", stored: pA, status: "session · unreviewed", logit: L2 },
    { step: 2, event: "A accepted at review", rule: "promoted with the same confidence", stored: pA, status: "canonical · active", logit: L2 },
    { step: 3, event: "B accepted and classified supports A", rule: "L′ = L + r · c_source", stored: sigmoid(L3), status: "active", logit: L3 },
    { step: 4, event: "A retrieved", rule: "L′ = L + 0.05", stored: sigmoid(L4), status: "active", logit: L4 },
    { step: 5, event: "Weeks pass unused", rule: "effective L = L − λ · days (never written)", stored: sigmoid(L4), status: "active", logit: L4 },
    { step: 6, event: "C accepted and classified contradicts A", rule: "L′ = L − r · c_source", stored: sigmoid(L6), storedC: pC, status: "challenged", logit: L6 },
    { step: 7, event: "Conflict outlasts the persistence limit", rule: "maintenance parks both", stored: sigmoid(L6), storedC: pC, status: "open question", logit: L6 },
    { step: 8, event: "Review: prefer C", rule: "L′ = L + 0.05 for C; A is superseded", stored: sigmoid(L6), storedC: sigmoid(LC), status: "superseded", statusC: "active", logit: L6 },
  ];
}
