import EmsPipeline from "@/components/svg/ems-pipeline";

export const metadata = {
  title: "EMS",
  description:
    "Engineering Memory System. A cognition pipeline for constructing and maintaining engineering understanding.",
};

export default function EmsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-24 lg:px-8">
      <header className="mb-16">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-primary">
          Engineering Memory System
        </h1>
        <p className="mt-4 text-lg text-secondary leading-relaxed">
          A cognition pipeline rather than a memory system.
        </p>
      </header>

      {/* Pipeline */}
      <section className="mb-16 rounded-lg border border-border bg-card p-10">
        <EmsPipeline />
      </section>

      {/* Explanations */}
      <section className="space-y-12">
        <div>
          <h2 className="text-lg font-medium text-primary">Working Memory</h2>
          <p className="mt-2 text-base text-secondary leading-relaxed">
            Short-lived engineering understanding.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium text-primary">Canonical Memory</h2>
          <p className="mt-2 text-base text-secondary leading-relaxed">
            Reviewed engineering beliefs.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium text-primary">Historical Memory</h2>
          <p className="mt-2 text-base text-secondary leading-relaxed">
            Engineering evolution.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium text-primary">Engineering Beliefs</h2>
          <p className="mt-2 text-base text-secondary leading-relaxed">
            The primary computational object.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-medium text-primary">
            Demand-driven Retrieval
          </h2>
          <p className="mt-2 text-base text-secondary leading-relaxed">
            Understanding should appear only when reasoning requires it. Never
            before.
          </p>
        </div>
      </section>

      {/* Closing statement */}
      <section className="mt-16 pt-10 border-t border-border">
        <p className="text-lg text-primary font-medium leading-relaxed">
          EMS is not a memory layer.
        </p>
        <p className="text-lg text-primary font-medium leading-relaxed">
          EMS is an engineering cognition pipeline.
        </p>
      </section>
    </div>
  );
}
