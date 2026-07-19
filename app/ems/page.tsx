import EmsPipeline from "@/components/svg/ems-pipeline";
import FadeIn from "@/components/fade-in";

export const metadata = {
  title: "EMS",
  description:
    "Engineering Memory System. A cognition pipeline for constructing and maintaining engineering understanding.",
};

export default function EmsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-24 lg:px-8">
      <FadeIn>
        <div className="mb-12">
          <EmsPipeline />
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <header className="mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-primary">
            Engineering
            <br />
            Memory
            <br />
            System
          </h1>
          <p className="mt-6 text-lg text-secondary leading-relaxed text-editorial">
            A cognition pipeline rather than a memory system.
          </p>
        </header>
      </FadeIn>

      <FadeIn delay={100}>
        <section className="space-y-12">
          <div>
            <h2 className="text-lg font-medium text-primary">Working Memory</h2>
            <p className="mt-2 text-base text-secondary leading-relaxed text-editorial">
              Short-lived engineering understanding.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-primary">Canonical Memory</h2>
            <p className="mt-2 text-base text-secondary leading-relaxed text-editorial">
              Reviewed engineering beliefs.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-primary">Historical Memory</h2>
            <p className="mt-2 text-base text-secondary leading-relaxed text-editorial">
              Engineering evolution.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-primary">Engineering Beliefs</h2>
            <p className="mt-2 text-base text-secondary leading-relaxed text-editorial">
              The primary computational object.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-primary">
              Demand-driven Retrieval
            </h2>
            <p className="mt-2 text-base text-secondary leading-relaxed text-editorial">
              Understanding should appear only when reasoning requires it. Never
              before.
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn delay={100}>
        <section className="mt-16 pt-10 border-t border-border">
          <p className="text-lg text-primary font-medium leading-relaxed">
            EMS is not a memory layer.
          </p>
          <p className="text-lg text-primary font-medium leading-relaxed">
            EMS is an engineering cognition pipeline.
          </p>
        </section>
      </FadeIn>
    </div>
  );
}
