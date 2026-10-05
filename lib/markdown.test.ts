import test from "node:test";
import assert from "node:assert/strict";
import { getAllNotes, getNote } from "./markdown.ts";
import { notebook } from "../content/research.ts";

test("every note has a notebook entry in content/research.ts", () => {
  for (const note of getAllNotes()) {
    const entry = notebook.find((e) => e.id === note.slug);
    assert.ok(entry, `missing research entry for ${note.slug}`);
    assert.equal(entry.date, note.date);
  }
});

test("everything-till-now carries its editor's note and is Historical", () => {
  const note = getNote("everything-till-now");
  assert.ok(note);
  assert.match(note.editorsNote ?? "", /^Editor's note, October 2026\./);
  assert.equal(note.status, "Historical");
});
