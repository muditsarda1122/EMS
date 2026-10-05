// The paper page (plan §8.3, §1.7A). Plain data. Fallback build: an abstract page, not the full text,
// because the corrected paper (P2) is not available. Every row below restates §1.7A of the plan.

export type ErratumRow = { n: number; topic: string; says: string; does: string };

export const errata: ErratumRow[] = [
  {
    n: 1,
    topic: "The agent’s tools",
    says: "The MCP server exposes ec_query, ec_start, ec_stop and ec_status.",
    does: "The four tools are ec_observe, ec_query, ec_get_summary and ec_reconsolidate. Starting, stopping and checking status are commands you run in a terminal.",
  },
  {
    n: 2,
    topic: "The extraction model",
    says: "Extraction uses a specific named model.",
    does: "Extraction uses whichever model is configured, hosted by default or Ollama for local use. This site names no model.",
  },
  {
    n: 3,
    topic: "Retrieval diversity",
    says: "Retrieval applies maximal marginal relevance.",
    does: "It does not. Results are ranked with a four-factor score, and duplicates across groups are removed.",
  },
  {
    n: 4,
    topic: "Ranking factors",
    says: "Ranking uses similarity, confidence, scope match and retrieval frequency.",
    does: "The score combines similarity, effective confidence, activation and network richness, then is multiplied by trust and by scope proximity.",
  },
  {
    n: 5,
    topic: "Confidence bumps",
    says: "Retrieving a conclusion also raises the confidence of the conclusions connected to it.",
    does: "Activation is a separate ranking score, kept per session. The confidence bump applies only to the reviewed conclusions that are actually surfaced.",
  },
  {
    n: 6,
    topic: "Who creates edges",
    says: "The extractor creates depends_on edges.",
    does: "The extractor never creates edges. A separate step that relates new conclusions to existing ones does.",
  },
  {
    n: 7,
    topic: "Maintenance tasks",
    says: "Maintenance applies decay and detects contradictions.",
    does: "Decay is computed when a conclusion is read and is never written back. There is no standalone contradiction scan. Maintenance does forgetting, grounding checks, edge pruning and clustering.",
  },
  {
    n: 8,
    topic: "Contradictions",
    says: "Both contradicting conclusions are marked challenged.",
    does: "The existing conclusion is marked challenged. Both sides become open questions only after a persistence limit that depends on scope.",
  },
  {
    n: 9,
    topic: "Rejected evidence",
    says: "If evidence is rejected at review, its effect is subtracted and the edge remains.",
    does: "Evidence from a session never changes a reviewed conclusion before review, so rejected evidence is discarded. Edge pruning later reverses the effects of evidence from conclusions that have been retired.",
  },
  {
    n: 10,
    topic: "“Nothing crosses without review”",
    says: "Nothing crosses from session memory to long-term memory without human review.",
    does: "True for conclusions extracted from sessions. Updating an already reviewed conclusion through ec_reconsolidate takes effect immediately, and its supersede path can create a new long-term conclusion. This is a documented tension.",
  },
  {
    n: 11,
    topic: "Half-lives",
    says: "Decay has a half-life of a given number of days.",
    does: "Those figures are half-lives of the odds (the log-odds), not of the confidence value. Read them that way if they are reproduced.",
  },
  {
    n: 12,
    topic: "A traced-requirements count",
    says: "The paper states a count of requirements traced.",
    does: "We cannot verify the count against the implementation, so this site does not repeat it.",
  },
];

/** What the plan states about the paper's content (§1.7A, §8.3, §12). Section numbers are the plan's own citations. */
export const keySections: { where: string; what: string }[] = [
  { where: "§2, §15", what: "Extraction of conclusions." },
  { where: "§3", what: "What is kept: conclusions, not facts or code descriptions." },
  { where: "§4, §8", what: "Confidence and decay." },
  { where: "§5", what: "Two brains and the review gate (Fig. 4)." },
  { where: "§6", what: "Maintenance and contradictions." },
  { where: "§7", what: "Retrieval and ranking." },
  { where: "§9", what: "Evidence and the edges between conclusions." },
  { where: "§12", what: "Benchmark runs, with figures that do not agree with our other write-ups (see EC-Bench)." },
  { where: "§14–§16", what: "Vision material, which the paper itself frames as speculative." },
  { where: "§17", what: "The MCP interface." },
];
