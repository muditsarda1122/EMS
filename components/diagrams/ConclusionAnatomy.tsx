// F3: anatomy of a conclusion. The full specimen with nine numbered annotations (DIAGRAM-PLAN F3).
// Desktop: annotations in the right margin with leader lines (AnatomyFrame). Narrow: a numbered list below.
import ConclusionRecord from "@/components/specimen/ConclusionRecord";
import type { MarkerKey } from "@/components/specimen/ConclusionRecord";
import { anatomySpecimen } from "@/content/specimens/anatomy";
import AnatomyFrame from "./AnatomyFrame";

const MARKERS: Record<MarkerKey, number> = {
  cognition: 1, type: 2, scope: 3, confidence: 4, status: 5, source: 6, grounding: 7, related: 8, framing: 9,
};

const NOTES: { n: number; head: string; body: React.ReactNode }[] = [
  { n: 1, head: "Conclusion", body: "One conclusion per record. Once accepted, its wording is never rewritten." },
  { n: 2, head: "Type", body: "One of eight: implication, constraint, principle, decision, observation, pattern, invariant, trade-off." },
  { n: 3, head: "Scope", body: "One of seven levels, from engineering to subsystem, plus a path. It sets how fast confidence fades, how retrieval ranks the record, and what deleting code retires." },
  { n: 4, head: "Confidence", body: "Moved by evidence, in log-odds. Ranking uses the value after decay." },
  { n: 5, head: "Brain and status", body: <>The header shows the brain: <code>canonical · reviewed</code> here, <code>session · unreviewed</code> otherwise. Only active, challenged and open-question conclusions are retrieved.</> },
  { n: 6, head: "Source", body: "How the conclusion was reached. It sets the starting confidence: debugging starts higher than planning." },
  { n: 7, head: "Grounding", body: "Files, symbols and the commit at extraction, checked against the repository." },
  { n: 8, head: "Related", body: "Conclusions that support, contradict, depend on or replace this one come back with it." },
  { n: 9, head: "Framing note", body: "Always attached: verify before acting." },
];

export default function ConclusionAnatomy() {
  return (
    <AnatomyFrame>
      <div className="anat-spec">
        <ConclusionRecord data={anatomySpecimen} variant="full" markers={MARKERS} showTag />
      </div>
      <ol className="anat-notes">
        {NOTES.map((a) => (
          <li key={a.n} data-n={a.n}>
            <span className="anat-n">{a.n}</span>
            <div>
              <b>{a.head}.</b> {a.body}
            </div>
          </li>
        ))}
      </ol>
    </AnatomyFrame>
  );
}
