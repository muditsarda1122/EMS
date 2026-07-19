import FadeIn from "@/components/fade-in";
import ComparisonBlock from "@/components/comparison-block";
import ConceptualEvolution from "@/components/svg/conceptual-evolution";

export const metadata = {
  title: "Ethos",
  description:
    "What is Engineering Cognition? Our research philosophy, memory versus cognition, and the accumulative nature of software engineering.",
};

export default function EthosPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-24 lg:px-8">
      <FadeIn>
        <div className="mb-12">
          <ConceptualEvolution />
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <header className="mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-primary">
            What is Engineering Cognition?
          </h1>
          <p className="mt-6 text-lg text-secondary leading-relaxed text-editorial">
            We believe software engineering is fundamentally an accumulative
            process.
          </p>
          <p className="mt-4 text-base text-secondary leading-relaxed text-editorial">
            Human engineers become better not because they remember more
            conversations, but because they accumulate better engineering
            understanding.
          </p>
          <p className="mt-6 text-lg text-primary font-medium">
            The question we ask is simple: Can language-model systems do the same?
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={100}>
        <ComparisonBlock
          title="Memory vs Cognition"
          leftLabel="Memory"
          rightLabel="Cognition"
          rows={[
            ["Stores information", "Accumulates understanding"],
            ["Retrieves documents", "Evolves engineering beliefs"],
            ["Static", "Continuously changing"],
            ["Information", "Engineering judgement"],
          ]}
        />
      </FadeIn>

      <FadeIn delay={100}>
        <section className="mb-16">
          <h2 className="text-xl font-medium text-primary mb-4">
            Observation vs Belief
          </h2>
          <div className="space-y-3 text-base text-secondary leading-relaxed text-editorial">
            <p>Observations describe what happened.</p>
            <p>Beliefs describe what engineers now understand.</p>
            <p className="text-primary">
              Engineering Cognition emerges when observations evolve into reusable
              engineering beliefs.
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={100}>
        <section className="mb-16">
          <h2 className="text-xl font-medium text-primary mb-4">
            Information vs Understanding
          </h2>
          <p className="text-base text-secondary leading-relaxed text-editorial">
            Storing conversations is insufficient. Information can be preserved,
            but understanding must evolve. A transcript of a debugging session
            is not the same as the insight that prevents the bug from recurring.
          </p>
        </section>
      </FadeIn>

      <FadeIn delay={100}>
        <section className="mb-16">
          <h2 className="text-xl font-medium text-primary mb-4">
            Repository vs Engineering Brain
          </h2>
          <div className="space-y-3 text-base text-secondary leading-relaxed text-editorial">
            <p>Repository contains implementation.</p>
            <p>Engineering Brain contains accumulated understanding.</p>
            <p>Repository changes.</p>
            <p>Engineering Brain evolves.</p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={100}>
        <section>
          <h2 className="text-xl font-medium text-primary mb-4">Our Philosophy</h2>
          <div className="space-y-2 text-lg text-primary font-medium">
            <p>Research first.</p>
            <p>Systems second.</p>
            <p>Products last.</p>
          </div>
        </section>
      </FadeIn>
    </div>
  );
}
