import test from "node:test";
import assert from "node:assert/strict";
import { buildBibtex, absoluteUrl, bibtexKey } from "./cite.ts";

const base = { title: "A Title", author: "Sarda, M.", date: "2026-09-05" };

test("bibtexKey uses family name and year", () => {
  assert.equal(bibtexKey("Sarda, M.", 2026), "sarda2026reverie");
});

test("buildBibtex omits url when null", () => {
  const out = buildBibtex({ ...base, url: null });
  assert.ok(!out.includes("url"));
  assert.ok(out.includes("year = {2026}"));
  assert.ok(out.includes("month = sep"));
});

test("buildBibtex includes url when given", () => {
  assert.ok(buildBibtex({ ...base, url: "https://example.org/p" }).includes("url = {https://example.org/p}"));
});

test("absoluteUrl is null without a domain", () => {
  assert.equal(absoluteUrl(null, "/x"), null);
  assert.equal(absoluteUrl("example.org", "/x"), "https://example.org/x");
});
