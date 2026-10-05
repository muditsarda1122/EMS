// The record annotated in Fig. 3. Same conclusion as the homepage specimen, with the supporting
// conclusion B expanded (DIAGRAM-PLAN F3). Illustrative until a real ec_query capture exists (P3).
import base from "./token-refresh.json";
import type { ConclusionSpecimen } from "@/components/specimen/ConclusionRecord";

export const anatomySpecimen: ConclusionSpecimen = {
  ...(base as ConclusionSpecimen),
  label: "ec_query · group 1",
  source: "debugging",
  lifecycleStatus: "active",
  framingNote: "Past engineering understanding; verify against current code.",
  related: [{ relation: "supports", text: "Token refresh must complete before any cache read in the auth middleware." }],
};
