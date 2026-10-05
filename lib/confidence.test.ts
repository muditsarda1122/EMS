import test from "node:test";
import assert from "node:assert/strict";
import { contradict, effective, logit, prior, reinforce, sigmoid, support } from "./confidence.ts";
import { lifecycleSteps, scenario } from "../content/lifecycle-scenario.ts";

const r4 = (x: number) => Math.round(x * 10000) / 10000;

test("priors", () => {
  assert.equal(r4(prior("debugging", "module", 1)!), 0.56);
  assert.equal(r4(prior("debugging", "module", 2)!), 0.61);
  assert.equal(r4(prior("implementation", "module", 1)!), 0.52);
});

test("prior corroboration is capped and clamped; unknown constants give null", () => {
  assert.equal(r4(prior("debugging", "module", 10)!), 0.71);
  assert.equal(prior("mystery", "module", 1), null);
});

test("worked scenario A/B/C", () => {
  const { A, B, C } = scenario;
  const pA = prior(A.source, A.scope, 1)!;
  const pB = prior(B.source, B.scope, 1)!;
  const pC = prior(C.source, C.scope, C.evidenceSources)!;
  assert.equal(r4(pA), 0.56);
  const L = support(logit(pA), B.similarityToA, pB);
  assert.equal(r4(sigmoid(L)), 0.6563);
  const Lr = reinforce(L);
  assert.equal(r4(sigmoid(Lr)), 0.6675);
  assert.equal(r4(sigmoid(contradict(Lr, C.similarityToA, pC))), 0.546);
  assert.equal(r4(pC), 0.61);
  assert.equal(r4(sigmoid(reinforce(logit(pC)))), 0.6218);
});

test("effective decay", () => {
  assert.equal(effective(0.6968, "module", 30), null);
  assert.ok(effective(0.6968, "subsystem", 10)! < sigmoid(0.6968));
});

test("lifecycle steps", () => {
  const s = lifecycleSteps();
  assert.equal(s.length, 8);
  assert.deepEqual(s.map((x) => r4(x.stored)), [0.56, 0.56, 0.6563, 0.6675, 0.6675, 0.546, 0.546, 0.546]);
  assert.equal(r4(s[7].storedC!), 0.6218);
});
