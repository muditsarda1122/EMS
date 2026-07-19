import { papers } from "@/lib/papers";
import PdfActions from "@/components/pdf-actions";
import FadeIn from "@/components/fade-in";

export const metadata = {
  title: "Research",
  description:
    "Engineering Cognition is an ongoing research program. Papers, technical reports and benchmarks.",
};

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 lg:py-24 lg:px-8">
      <FadeIn>
        <header className="mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-primary">
            Research
          </h1>
          <p className="mt-6 text-lg text-secondary leading-relaxed max-w-2xl text-editorial">
            Engineering Cognition is an ongoing research program investigating how software engineering systems develop persistent engineering cognition.
          </p>
        </header>
      </FadeIn>

      <div className="space-y-10">
        {papers.map((paper, index) => (
          <FadeIn key={paper.id} delay={index * 100}>
            <article className="card-editorial">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-secondary">
                  {paper.status}
                </span>
              </div>
              <h2 className="text-xl font-medium text-primary">{paper.title}</h2>
              <p className="mt-1 text-sm text-secondary">{paper.authors}</p>
              <p className="mt-4 text-base text-secondary leading-relaxed text-editorial">
                {paper.abstract}
              </p>
              <PdfActions filename={paper.filename} github={paper.github} />
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
