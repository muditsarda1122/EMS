// Honesty guard for the EC-Bench ledger (plan §1.7B, §19.3): figures are visible only for reconciled runs.
import type { BenchRun } from "../content/bench-runs.ts";

export function visibleFigures(run: BenchRun): NonNullable<BenchRun["figures"]> | null {
  if (run.status !== "reconciled") return null;
  return run.figures && run.figures.length > 0 ? run.figures : null;
}
