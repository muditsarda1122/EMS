// /llms.txt (llmstxt.org): a plain-Markdown summary of the site for AI agents and the tools they use to search.
// Every statement mirrors a page on the site; update it with the claims ledger (docs/claims-ledger.md).
import { siteConfig, readyAgents, comingSoon, listText, isRepoPublic } from "@/content/site.config";

export const dynamic = "force-static";

export function GET() {
  const base = siteConfig.domain ? `https://${siteConfig.domain}` : "";
  const link = (path: string) => `${base}${path}`;
  const ready = readyAgents();
  const soon = comingSoon();
  const repo = siteConfig.repository.url;

  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.name} is memory for coding agents. It keeps the engineering conclusions your coding agent reaches, reviewed by you, grounded in your repository, and revised as evidence changes. A research project by ${siteConfig.author}.`,
    "",
    `Works with ${listText(ready)} today.${soon.length ? ` ${listText(soon)} ${soon.length > 1 ? "are" : "is"} coming soon.` : ""}`,
    isRepoPublic() && repo
      ? `The code is open source: ${repo}`
      : "Reverie will be open source; the repository opens soon.",
    "",
    "## What it does",
    "",
    "- Keeps conclusions, not transcripts. Each one is the smallest self-contained piece of engineering understanding that could change a future decision, with a type, a scope, a confidence value and the files it is grounded in.",
    "- You decide what is kept. Extracted conclusions reach long-term memory only through a review step, where you accept, reject or skip them.",
    "- Two stores: a session brain per repository and branch, and a reviewed canonical brain shared across projects.",
    "- Conclusions behave like beliefs: evidence strengthens them, contradictions challenge them, and disuse lets them fade.",
    "- Your agent reaches memory through MCP tools (ec_observe, ec_query, ec_get_summary, ec_reconsolidate). It queries after reading the code, and results come framed as past understanding to verify against the current code.",
    "- Local by design: one SQLite file at ~/.ec/ec.db, shared by your projects, and no Reverie account. Extraction and classification use an LLM endpoint, hosted by default or a local model through Ollama.",
    "",
    "## Honest status",
    "",
    "- Our benchmark, EC-Bench, has not shown a clear advantage yet. Our first version loaded memory before the agent began work, and on the benchmark the agent did worse. Results are published either way.",
    "- Developed and tested on macOS. Review happens in the terminal. You start and end sessions yourself.",
    ...(siteConfig.video
      ? ["- The homepage has a recorded demonstration of the same agent with and without Reverie. It is a demonstration, not a benchmark result."]
      : []),
    "",
    "## Pages",
    "",
    `- [How it works](${link("/how-it-works")}): what gets remembered, who decides, how a conclusion changes, retrieval, what you install, limits and questions.`,
    `- [Research](${link("/research")}): the paper, the notebook and the archive.`,
    `- [EC-Bench](${link("/research/ec-bench")}): the benchmark protocol and results ledger.`,
    `- [Reverie: A Biological Memory Architecture for AI Agents](${link("/research/biological-memory-architecture")}): the paper.`,
    `- [About](${link("/about")}): who builds Reverie and why.`,
    "",
    "## Names",
    "",
    "- Reverie is the product. Engineering Cognition is the research program; the code uses the prefix `ec`. EMS was the first version.",
    "",
    "## Contact",
    "",
    `- Email: ${siteConfig.contactEmail}`,
    `- LinkedIn: ${siteConfig.links.linkedin}`,
    "",
  ];

  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
