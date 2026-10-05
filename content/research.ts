// Research index data (plan §8.2, §12). Plain data: no fs access, safe to import anywhere.

export type ResearchStatus =
  | "Published"
  | "Ongoing"
  | "In design"
  | "Historical"
  | "Superseded"
  | "Working draft";

export type ResearchKind = "Paper" | "Benchmark" | "Experiment" | "Notebook" | "Archive";

export type ResearchEntry = {
  id: string;
  kind: ResearchKind;
  title: string;
  /** ISO date (YYYY-MM-DD) or null when the source does not state one. */
  date: string | null;
  status: ResearchStatus;
  /** One-line note: what it is, what changed, where to look now. */
  note: string;
  /** Page on this site. Null when there is no page (yet). */
  href: string | null;
  /** Archived PDF, served from /research/archive/. */
  pdf: string | null;
  /** What replaced it, for Superseded entries. */
  supersededBy?: { label: string; href: string };
  /** Reading time in minutes. */
  readingMinutes?: number | null;
};

export const ARCHIVE_PATH = "/research/archive";

export const paper: ResearchEntry = {
  id: "biological-memory-architecture",
  kind: "Paper",
  title: "Reverie: A Biological Memory Architecture for AI Agents",
  date: "2026-09-05",
  status: "Published",
  // TODO(copy): two-line summary is not written in the plan. This line restates the plan's
  // description of the second architecture (§8.2, "Aug 2026"); the owner should replace it.
  note: "The second architecture, written up: conclusions as units, two brains, review, confidence, contradictions, grounding, and retrieval on request.",
  href: "/research/biological-memory-architecture",
  // TODO(fact): the paper's PDF and reading time are not available until T8 / owner (P2).
  pdf: null,
  readingMinutes: null,
};

export const evaluation: ResearchEntry[] = [
  {
    id: "ec-bench",
    kind: "Benchmark",
    title: "EC-Bench: what we measure, and what we’ve found",
    date: null,
    status: "Ongoing",
    note: "Method, results and limits.",
    href: "/research/ec-bench",
    pdf: null,
  },
  {
    id: "continuity-experiment",
    kind: "Experiment",
    title: "The same agent, with and without Reverie",
    date: null,
    status: "In design",
    // Linked only if the owner publishes the protocol (plan §8.2, §13): see isExperimentVisible().
    note: "A controlled comparison. Not yet run.",
    href: "/research/continuity-experiment",
    pdf: null,
  },
];

export const notebook: ResearchEntry[] = [
  {
    id: "everything-till-now",
    kind: "Notebook",
    title: "Everything till now",
    date: "2026-07-29",
    status: "Historical",
    note: "A research log of the thinking behind the first version. Kept as written, with an editor’s note.",
    href: "/research/notes/everything-till-now",
    pdf: null,
    supersededBy: { label: "EC-Bench", href: "/research/ec-bench" },
  },
];

const paperLink = { label: "The paper", href: paper.href as string };

export const archive: ResearchEntry[] = [
  {
    id: "engineering-cognition",
    kind: "Archive",
    title: "Engineering Cognition",
    date: "2026-06-30",
    status: "Working draft",
    // TODO(copy): one-line note on what changed and where is not in the plan for this document.
    note: "The working paper that posed the question. See the paper for where the research went.",
    href: null,
    pdf: `${ARCHIVE_PATH}/engineering-cognition-paper.pdf`,
    supersededBy: paperLink,
  },
  {
    id: "engineering-memory-system",
    kind: "Archive",
    title: "Engineering Memory System",
    // TODO(fact): the plan gives no date for this PDF.
    date: null,
    status: "Superseded",
    // TODO(copy): the plan does not describe this document individually; this restates §8.2 (Jul 2026).
    note: "Describes the first version, which loaded repository memory into each session. Superseded by the second architecture.",
    href: null,
    pdf: `${ARCHIVE_PATH}/engineering-memory-system-paper.pdf`,
    supersededBy: paperLink,
  },
  {
    id: "ec-bench-technical-report",
    kind: "Archive",
    title: "EC-Bench Technical Report 001",
    date: "2026-07-15",
    status: "Superseded",
    note: "First benchmark run. Its aggregate gain came from the cognition-reuse metric; four of five metrics were lower with memory. See EC-Bench.",
    href: null,
    pdf: `${ARCHIVE_PATH}/ec-bench-technical-report.pdf`,
    supersededBy: { label: "EC-Bench", href: "/research/ec-bench" },
  },
  {
    id: "ec-bench-short-report",
    kind: "Archive",
    title: "EC-Bench Short Report",
    date: "2026-07-18",
    status: "Superseded",
    // TODO(copy): the plan gives no note for the short report; this points to EC-Bench like its sibling.
    note: "A short report on the first benchmark run. See EC-Bench for the current picture.",
    href: null,
    pdf: `${ARCHIVE_PATH}/ec-bench-short-report.pdf`,
    supersededBy: { label: "EC-Bench", href: "/research/ec-bench" },
  },
];

export const archiveNameNote =
  "Earlier documents call the first version the Engineering Memory System (EMS).";

export type LineageItem = {
  /** Label shown in the date column. */
  when: string;
  title: string;
  body: string;
  links?: { label: string; href: string }[];
  /**
   * TODO(owner): every lineage date must be verified by the owner (plan §8.2).
   * Flip to true once checked; the page renders a `data-verify` attribute while false.
   */
  verified: boolean;
};

export const lineage: LineageItem[] = [
  {
    when: "Jun 2026",
    title: "The question.",
    body: "Working paper Engineering Cognition (30 Jun).",
    links: [{ label: "Working paper", href: `${ARCHIVE_PATH}/engineering-cognition-paper.pdf` }],
    verified: false,
  },
  {
    when: "Jul 2026",
    title: "First system, first benchmark.",
    body: "Repository memory loaded into each session; EC-Bench Technical Report 001 (15 Jul) and Short Report (18 Jul). The finding that mattered: loaded memory anchored the agent.",
    links: [{ label: "Archive", href: "#archive" }],
    verified: false,
  },
  {
    when: "Jul 2026",
    title: "What deserves to become memory?",
    body: "Notebook: Everything till now (29 Jul).",
    links: [{ label: "Notebook", href: "/research/notes/everything-till-now" }],
    verified: false,
  },
  {
    when: "Aug 2026",
    title: "Second architecture.",
    body: "Conclusions as units, two brains, review, confidence, contradictions, grounding, retrieval on request. Benchmark run (13–15 Aug): the gap narrowed; the baseline is still ahead.",
    links: [{ label: "EC-Bench", href: "/research/ec-bench" }],
    verified: false,
  },
  {
    when: "Sep 2026",
    title: "The paper.",
    body: "Reverie: A Biological Memory Architecture for AI Agents (5 Sep).",
    links: [{ label: "The paper", href: "/research/biological-memory-architecture" }],
    verified: false,
  },
  {
    when: "Next",
    title: "What comes next.",
    body: "The continuity experiment, a dedicated extraction model, a larger benchmark.",
    verified: true, // no date to verify
  },
];

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-09-05" -> "5 September 2026". Pure string maths: no timezone surprises. */
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}
