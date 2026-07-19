export interface Paper {
  id: string;
  title: string;
  authors: string;
  status: "Published" | "Technical Report" | "Working Draft" | "Future work";
  abstract: string;
  filename: string;
  github?: string;
}

export const papers: Paper[] = [
  {
    id: "engineering-cognition",
    title: "Engineering Cognition",
    authors: "Mudit Sarda",
    status: "Working Draft",
    abstract:
      "Investigating whether engineering understanding can become a computational object. We explore how software engineering agents can continuously construct, maintain and reuse engineering understanding across long-running development workflows.",
    filename: "engineering-cognition.pdf",
  },
  {
    id: "engineering-memory-system",
    title: "Engineering Memory System",
    authors: "Mudit Sarda",
    status: "Technical Report",
    abstract:
      "A cognition pipeline for constructing and maintaining engineering understanding. EMS is not a memory layer—it is an engineering cognition pipeline that transforms repository changes into accumulated understanding.",
    filename: "engineering-memory-system.pdf",
  },
  {
    id: "ec-bench-technical",
    title: "EC-Bench Technical Report",
    authors: "Mudit Sarda",
    status: "Technical Report",
    abstract:
      "A benchmark measuring whether accumulated engineering understanding changes engineering behaviour. EC-Bench evaluates whether systems that accumulate understanding produce measurably different engineering decisions.",
    filename: "ec-bench-technical-report.pdf",
    github: "https://github.com",
  },
  {
    id: "ec-bench-short",
    title: "EC-Bench Short Report",
    authors: "Mudit Sarda",
    status: "Working Draft",
    abstract:
      "A condensed overview of the EC-Bench methodology and preliminary findings. This short report introduces the benchmark and early results from evaluating engineering cognition systems.",
    filename: "ec-bench-short-report.pdf",
  },
];

export function getPaperById(id: string): Paper | undefined {
  return papers.find((p) => p.id === id);
}

export function getPaperPdfPath(filename: string): string {
  return `/EMS-artefacts/${filename}`;
}
