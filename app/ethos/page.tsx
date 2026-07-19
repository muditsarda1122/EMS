export const metadata = {
  title: "Ethos",
  description:
    "What is Engineering Cognition? Our research philosophy, memory versus cognition, and the accumulative nature of software engineering.",
};

export default function EthosPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-24 lg:px-8">
      <header className="mb-16">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-primary">
          What is Engineering Cognition?
        </h1>
        <p className="mt-6 text-lg text-secondary leading-relaxed">
          We believe software engineering is fundamentally an accumulative
          process.
        </p>
        <p className="mt-4 text-base text-secondary leading-relaxed">
          Human engineers become better not because they remember more
          conversations, but because they accumulate better engineering
          understanding.
        </p>
        <p className="mt-6 text-lg text-primary font-medium">
          The question we ask is simple: Can AI systems do the same?
        </p>
      </header>

      {/* Memory vs Cognition */}
      <section className="mb-16">
        <h2 className="text-xl font-medium text-primary mb-6">Memory vs Cognition</h2>
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="px-6 py-4 text-sm font-medium text-primary bg-background/50">
              Memory
            </div>
            <div className="px-6 py-4 text-sm font-medium text-primary bg-background/50">
              Cognition
            </div>
          </div>
          <div className="divide-y divide-border">
            {[
              ["Stores information", "Accumulates understanding"],
              ["Retrieves documents", "Evolves engineering beliefs"],
              ["Static", "Continuously changing"],
              ["Information", "Engineering judgement"],
            ].map(([memory, cognition], i) => (
              <div key={i} className="grid grid-cols-2 divide-x divide-border">
                <div className="px-6 py-4 text-sm text-secondary">{memory}</div>
                <div className="px-6 py-4 text-sm text-secondary">{cognition}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Observation vs Belief */}
      <section className="mb-16">
        <h2 className="text-xl font-medium text-primary mb-4">
          Observation vs Belief
        </h2>
        <div className="space-y-3 text-base text-secondary leading-relaxed">
          <p>Observations describe what happened.</p>
          <p>Beliefs describe what engineers now understand.</p>
          <p className="text-primary">
            Engineering Cognition emerges when observations evolve into reusable
            engineering beliefs.
          </p>
        </div>
      </section>

      {/* Information vs Understanding */}
      <section className="mb-16">
        <h2 className="text-xl font-medium text-primary mb-4">
          Information vs Understanding
        </h2>
        <p className="text-base text-secondary leading-relaxed">
          Storing conversations is insufficient. Information can be preserved,
          but understanding must evolve. A transcript of a debugging session
          is not the same as the insight that prevents the bug from recurring.
        </p>
      </section>

      {/* Repository vs Engineering Brain */}
      <section className="mb-16">
        <h2 className="text-xl font-medium text-primary mb-4">
          Repository vs Engineering Brain
        </h2>
        <div className="space-y-3 text-base text-secondary leading-relaxed">
          <p>Repository contains implementation.</p>
          <p>Engineering Brain contains accumulated understanding.</p>
          <p>Repository changes.</p>
          <p>Engineering Brain evolves.</p>
        </div>
      </section>

      {/* Our Philosophy */}
      <section>
        <h2 className="text-xl font-medium text-primary mb-4">Our Philosophy</h2>
        <div className="space-y-2 text-lg text-primary font-medium">
          <p>Research first.</p>
          <p>Systems second.</p>
          <p>Products last.</p>
        </div>
      </section>
    </div>
  );
}
