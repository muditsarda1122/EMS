import FadeIn from "@/components/fade-in";
import EmsPipeline from "@/components/svg/ems-pipeline";

export const metadata = {
  title: "Engineering Memory System",
  description:
    "Engineering Memory System (EMS) is the experimental platform through which we investigate Engineering Cognition.",
};

export default function EMSPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">

      <FadeIn>
        <div className="mb-12">
          <EmsPipeline />
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <header className="mb-24">

          <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-tight font-normal text-primary">
            Engineering
            <br />
            Memory
            <br />
            System
          </h1>

          <p className="mt-8 text-xl text-primary font-medium max-w-2xl leading-relaxed">
            The experimental platform through which we investigate
            Engineering Cognition.
          </p>

          <p className="mt-10 text-lg text-secondary leading-relaxed text-editorial max-w-3xl">
            EMS did not begin as a research platform.
            It began as an attempt to solve a practical problem encountered while
            using AI coding agents every day.
            As the system evolved, the implementation gradually became less
            interesting than the research question it exposed.
          </p>

        </header>
      </FadeIn>

      {/* ------------------------------------------------ */}

      <FadeIn delay={150}>
        <section className="mb-24">

          <h2 className="text-3xl font-medium tracking-tight text-primary mb-8">
            The first hypothesis.
          </h2>

          <div className="space-y-6 text-lg text-secondary leading-relaxed text-editorial">

            <p>
              The original assumption behind EMS was straightforward:
              coding agents forget too much.
              Every session discarded architectural reasoning,
              debugging discoveries,
              implementation decisions,
              and repository-specific knowledge.
            </p>

            <p>
              The obvious solution appeared to be memory.
              Build a persistent engineering memory layer that survives across
              sessions, repositories, and branches.
            </p>

            <p className="text-primary font-medium">
              The first versions of EMS were therefore designed as memory systems.
            </p>

          </div>

        </section>
      </FadeIn>

      {/* ------------------------------------------------ */}

      <FadeIn delay={200}>
        <section className="mb-24">

          <h2 className="text-3xl font-medium tracking-tight text-primary mb-8">
            The architecture changed.
          </h2>

          <div className="space-y-6 text-lg text-secondary leading-relaxed text-editorial">

            <p>
              While building EMS we gradually realised that memory itself was
              probably not the missing abstraction.
            </p>

            <p>
              Conversations,
              embeddings,
              summaries,
              and retrieved documents preserve engineering work remarkably well.
              Yet preserving engineering work does not necessarily preserve the
              engineering understanding produced by that work.
            </p>

            <p>
              That observation fundamentally changed the architecture.
              Instead of asking how engineering work should be stored,
              EMS began asking how engineering understanding should be extracted,
              represented,
              maintained,
              and allowed to evolve.
            </p>

          </div>

        </section>
      </FadeIn>

      {/* ------------------------------------------------ */}

      <FadeIn delay={250}>
        <section className="mb-24">

          <h2 className="text-3xl font-medium tracking-tight text-primary mb-8">
            The current research direction.
          </h2>

          <div className="space-y-10">

            <div>

              <h3 className="text-xl font-medium text-primary mb-3">
                Extraction
              </h3>

              <p className="text-lg text-secondary leading-relaxed text-editorial">
                Engineering understanding does not explicitly exist inside
                repositories.
                It must first be inferred from conversations,
                implementation history,
                debugging behaviour,
                architectural decisions,
                code evolution,
                and developer interaction.
                We believe this requires dedicated extraction models rather than
                conventional retrieval pipelines.
              </p>

            </div>

            <div>

              <h3 className="text-xl font-medium text-primary mb-3">
                Diffusion
              </h3>

              <p className="text-lg text-secondary leading-relaxed text-editorial">
                Engineering understanding should not remain isolated inside
                individual observations.
                Newly extracted understanding should continuously reshape
                existing engineering beliefs,
                strengthening,
                refining,
                or replacing them as additional evidence accumulates.
              </p>

            </div>

            <div>

              <h3 className="text-xl font-medium text-primary mb-3">
                Continuous maintenance
              </h3>

              <p className="text-lg text-secondary leading-relaxed text-editorial">
                Human engineers constantly reorganise what they know.
                Old assumptions disappear.
                New abstractions emerge.
                We believe Engineering Cognition requires the same continuous
                maintenance rather than immutable memory.
              </p>

            </div>

            <div>

              <h3 className="text-xl font-medium text-primary mb-3">
                Demand-driven retrieval
              </h3>

              <p className="text-lg text-secondary leading-relaxed text-editorial">
                Engineering understanding should never be loaded simply because
                it exists.
                It should appear only when reasoning genuinely requires it.
                Retrieval therefore becomes a reasoning problem rather than a
                search problem.
              </p>

            </div>

          </div>

        </section>
      </FadeIn>

      {/* ------------------------------------------------ */}

      <FadeIn delay={300}>
        <section className="mb-24">

          <h2 className="text-3xl font-medium tracking-tight text-primary mb-8">
            An evolving system.
          </h2>

          <div className="space-y-6 text-lg text-secondary leading-relaxed text-editorial">

            <p>
              EMS should not be viewed as a finished architecture.
              It is an evolving research system.
              As our understanding of Engineering Cognition changes,
              EMS changes alongside it.
            </p>

            <p>
              The architecture shown above represents our current understanding,
              not our final destination.
            </p>

          </div>

        </section>
      </FadeIn>

      {/* ------------------------------------------------ */}

      <FadeIn delay={350}>
        <section className="border-t border-border pt-20 text-center">

          <h2 className="text-3xl font-medium tracking-tight text-primary">
            Request access
          </h2>

          <p className="mt-6 text-lg text-secondary leading-relaxed text-editorial max-w-2xl mx-auto">
            EMS is currently an active research project.
            If you're interested in discussing the research,
            early experiments,
            or potential collaborations,
            we'd be happy to hear from you.
          </p>

          <a
            href="mailto:muditsarda23@gmail.com?subject=Request%20Access%20to%20Engineering%20Memory%20System"
            className="btn-editorial mt-10 inline-flex"
          >
            Request Access
          </a>

        </section>
      </FadeIn>

    </div>
  );
}