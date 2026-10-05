import test from "node:test";
import assert from "node:assert/strict";
import { visibleFigures } from "./bench.ts";
import { benchRuns } from "../content/bench-runs.ts";
import type { BenchRun } from "../content/bench-runs.ts";

const base: BenchRun = {
  id: "x",
  date: null,
  system: "s",
  baseline: "b",
  protocol: "p",
  prompts: null,
  judge: null,
  status: "needs-reconciliation",
  figures: [{ metric: "m", withReverie: 1, baseline: 2 }],
  outcome: "o",
  caveats: [],
  sources: [],
};

test("figures are hidden unless the run is reconciled", () => {
  assert.equal(visibleFigures(base), null);
  assert.equal(visibleFigures({ ...base, status: "planned" }), null);
  assert.equal(visibleFigures({ ...base, status: "reconciled" })?.length, 1);
  assert.equal(visibleFigures({ ...base, status: "reconciled", figures: undefined }), null);
});

test("no shipped run carries figures, and each row has a source", () => {
  for (const run of benchRuns) {
    assert.notEqual(run.status, "reconciled");
    assert.equal(run.figures, undefined);
    assert.ok(run.sources.length > 0);
    assert.ok(!/\d\.\d\d/.test(run.outcome));
  }
});
