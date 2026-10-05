// TypeScript port of Reverie's confidence rules (DIAGRAM-PLAN.md §6; PRODUCT.md §11).
// Pure functions, no imports. Constants the plan does not state are `null`
// until the owner supplies them (P5), and the functions that need them return `null`.

export type SourceType = "debugging" | "implementation" | (string & {});
export type Scope = "engineering" | "subsystem" | "module" | "repo" | "project" | "organization" | "domain";

/** Starting confidence by how the conclusion was obtained. */
export const SOURCE_BASE: Record<string, number | null> = {
  debugging: 0.7,
  implementation: 0.65,
  // TODO(fact): other source types (PRODUCT.md §11)
};

/** Scope multiplier on the base. */
export const SCOPE_MULTIPLIER: Record<string, number | null> = {
  module: 0.8,
  // TODO(fact): other scopes (PRODUCT.md §11)
};

/** Decay per day in log-odds. Only engineering and subsystem are stated in PRODUCT.md. */
export const DECAY_LAMBDA: Record<Scope, number | null> = {
  engineering: 0.001,
  subsystem: 0.03,
  module: null, // TODO(fact): DEFAULT_CONFIG (P5)
  repo: null, // TODO(fact): DEFAULT_CONFIG (P5)
  project: null, // TODO(fact): DEFAULT_CONFIG (P5)
  organization: null, // TODO(fact): DEFAULT_CONFIG (P5)
  domain: null, // TODO(fact): DEFAULT_CONFIG (P5)
};

export const CORROBORATION_STEP = 0.05;
export const CORROBORATION_CAP = 0.15;
export const PRIOR_MIN = 0.05;
export const PRIOR_MAX = 0.95;
export const REINFORCE_DELTA = 0.05;

/** Below this with a replacement available, a conclusion is superseded. */
export const SUPERSEDE_THRESHOLD = 0.3;
/** Below this, dependents are re-evaluated. */
export const PROPAGATE_THRESHOLD = 0.4;
/** Both sides above this make a conflict high-stakes. */
export const HIGH_STAKES_THRESHOLD = 0.7;

export const logit = (c: number): number => Math.log(c / (1 - c));
export const sigmoid = (x: number): number => 1 / (1 + Math.exp(-x));

/** prior = base[source] × multiplier[scope] + min((n−1)·0.05, 0.15), clamped to [0.05, 0.95]. */
export function prior(sourceType: SourceType, scope: Scope | string, nSources: number): number | null {
  const base = SOURCE_BASE[sourceType];
  const mult = SCOPE_MULTIPLIER[scope];
  if (base == null || mult == null) return null;
  const bonus = Math.min(Math.max(nSources - 1, 0) * CORROBORATION_STEP, CORROBORATION_CAP);
  return Math.min(PRIOR_MAX, Math.max(PRIOR_MIN, base * mult + bonus));
}

/** Support: L′ = L + r·c_source. Returns the new log-odds. */
export const support = (L: number, r: number, cSource: number): number => L + r * cSource;
/** Contradiction: L′ = L − r·c_source. Returns the new log-odds. */
export const contradict = (L: number, r: number, cSource: number): number => L - r * cSource;
/** Reinforcement on retrieval: L′ = L + 0.05. */
export const reinforce = (L: number): number => L + REINFORCE_DELTA;

/** Effective confidence after decay (never written): σ(L − λ·days). `null` while λ is unknown. */
export function effective(L: number, scope: Scope, days: number): number | null {
  const lambda = DECAY_LAMBDA[scope];
  if (lambda == null) return null;
  return sigmoid(L - lambda * days);
}
