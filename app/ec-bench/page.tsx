import FadeIn from "@/components/fade-in";
import EcBenchDiagram from "@/components/svg/ec-bench-diagram";

export const metadata = {
  title: "EC-Bench",
  description:
    "Engineering Cognition Benchmark. A research benchmark for measuring accumulated engineering understanding rather than isolated task completion.",
};

export default function EcBenchPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">

      <FadeIn>
        <div className="mb-12">
          <EcBenchDiagram />
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <header className="mb-24">

          <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-tight font-normal text-primary">
            EC-Bench
          </h1>

          <p className="mt-8 text-xl text-primary font-medium max-w-2xl leading-relaxed">
            Every scientific discipline advances through better measurement. If Engineering Cognition is real, it must be measurable. EC-Bench exists to investigate exactly that question.
          </p>

          <div className="mt-10 space-y-6 text-lg text-secondary leading-relaxed text-editorial max-w-3xl">
            <p>
              Current coding benchmarks largely evaluate what a model can accomplish inside
              a single interaction. They measure code generation, reasoning, planning, and
              retrieval. They rarely measure whether the model becomes a better engineer
              after performing engineering work.
            </p>
            <p>
              Engineering Cognition introduces a different question.
            </p>
            <p>
              If engineering understanding genuinely accumulates over time, then our
              evaluation methods must also become longitudinal rather than session-based.
            </p>
            <p className="text-primary font-medium">
              EC-Bench is our attempt to build such a benchmark.
            </p>
          </div>

        </header>
      </FadeIn>

      {/* ------------------------------------------------ */}

      <FadeIn delay={150}>
        <section className="mb-24">

          <h2 className="text-3xl font-medium tracking-tight text-primary mb-8">
            Existing benchmarks.
          </h2>

          <div className="space-y-6 text-lg text-secondary leading-relaxed text-editorial">

            <p>
              Modern benchmarks primarily evaluate coding ability, reasoning, retrieval,
              and planning. Systems like SWE-Bench and similar frameworks have pushed
              the state of the art in autonomous software engineering.
            </p>

            <p>
              Nearly every existing benchmark evaluates intelligence within isolated engineering episodes.
              Once evaluation ends, accumulated understanding disappears.
              The next session begins from the same baseline as the last.
            </p>

            <p className="text-primary font-medium">
              Current benchmarks therefore measure capability rather than accumulation.
            </p>

          </div>

        </section>
      </FadeIn>

      {/* ------------------------------------------------ */}

      <FadeIn delay={200}>
        <section className="mb-24">

          <h2 className="text-3xl font-medium tracking-tight text-primary mb-8">
            What should be measured?
          </h2>

          <div className="space-y-6 text-lg text-secondary leading-relaxed text-editorial">

            <p>
              Traditional software engineering benchmarks evaluate whether an agent
              can solve an engineering problem.
            </p>

            <p>
              EC-Bench asks a fundamentally different question.
            </p>

            <p className="text-primary font-medium">
              Does solving engineering problems change the engineer itself?
            </p>

            <p>
              If engineering understanding genuinely accumulates, then every completed
              engineering task should alter future engineering behaviour. Evaluation
              therefore becomes a question of change rather than completion.
            </p>

            <p>
              Can architectural discoveries influence reasoning weeks later?
            </p>

            <p>
              Does debugging reshape future engineering decisions?
            </p>

            <p>
              Do implementation experiences produce better judgement on subsequent
              tasks?
            </p>

            <p>
              Does accumulated understanding improve long-horizon engineering
              performance?
            </p>

            <p className="text-primary font-medium">
              These questions shift evaluation from measuring isolated capability to
              measuring accumulated engineering cognition.
            </p>

          </div>

        </section>
      </FadeIn>

      {/* ------------------------------------------------ */}

      <FadeIn delay={250}>
        <section className="mb-24">

          <h2 className="text-3xl font-medium tracking-tight text-primary mb-8">
            Benchmark philosophy.
          </h2>

          <div className="space-y-10">

            <div>
              <h3 className="text-xl font-medium text-primary mb-3">
                Longitudinal evaluation
              </h3>
              <p className="text-lg text-secondary leading-relaxed text-editorial">
                The benchmark spans multiple engineering sessions rather than isolated
                prompts. Evaluation must observe how understanding changes over time,
                not merely whether a single task is completed successfully.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-primary mb-3">
                Engineering continuity
              </h3>
              <p className="text-lg text-secondary leading-relaxed text-editorial">
                The benchmark rewards systems that improve because of previous
                engineering work. Progress should emerge from accumulated experience,
                not from independent restarts with fresh context.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-primary mb-3">
                Belief evolution
              </h3>
              <p className="text-lg text-secondary leading-relaxed text-editorial">
                Evaluation should measure whether engineering understanding changes as evidence accumulates. A system that holds the same beliefs across
                all sessions is not necessarily a system that has accumulated understanding.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium text-primary mb-3">
                Engineering judgement
              </h3>
              <p className="text-lg text-secondary leading-relaxed text-editorial">
                The benchmark should ultimately measure engineering judgement rather
                than engineering recall. Engineering judgement is the ability to make better decisions because of previous engineering experience.
              </p>
            </div>

          </div>

        </section>
      </FadeIn>

      {/* ------------------------------------------------ */}

      <FadeIn delay={275}>
        <section className="mb-24">

          <h2 className="text-3xl font-medium tracking-tight text-primary mb-8">
            Why is this difficult?
          </h2>

          <div className="space-y-6 text-lg text-secondary leading-relaxed text-editorial">

            <p>
              Measuring accumulated understanding is fundamentally different from
              measuring task completion. Engineering Cognition is not directly
              observable—it must be inferred through changes in engineering behaviour.
            </p>

            <p>
              A benchmark therefore cannot simply ask whether an answer is correct. It
              must determine whether previous engineering work genuinely improved
              future engineering decisions.
            </p>

            <p>
              This introduces questions that traditional evaluation has never needed
              to answer: what constitutes engineering understanding, how it evolves,
              when it should be considered stable, and how its influence on future
              reasoning can be measured objectively.
            </p>

            <p className="text-primary font-medium">
              Building EC-Bench is therefore as much a scientific problem as it is an
              engineering one.
            </p>

          </div>

        </section>
      </FadeIn>

      {/* ------------------------------------------------ */}

      <FadeIn delay={300}>
        <section className="mb-24">

          <h2 className="text-3xl font-medium tracking-tight text-primary mb-8">
            Current research.
          </h2>

          <div className="space-y-6 text-lg text-secondary leading-relaxed text-editorial">

            <p>
              Current work focuses on identifying measurable properties of Engineering
              Cognition itself rather than constructing benchmark tasks alone.
            </p>

            <p>
              This includes defining cognition metrics, designing longitudinal
              engineering tasks, measuring engineering continuity, evaluating belief
              evolution, and investigating whether accumulated understanding can be
              distinguished from larger context windows or improved retrieval.
            </p>

            <p>
              As our understanding of Engineering Cognition evolves, EC-Bench evolves
              alongside it. The benchmark should therefore be viewed as an experimental
              research instrument rather than a fixed evaluation suite.
            </p>

          </div>

        </section>
      </FadeIn>

      {/* ------------------------------------------------ */}

      <FadeIn delay={325}>
        <section className="mb-24">

          <h2 className="text-3xl font-medium tracking-tight text-primary mb-8">
            The benchmark is itself an experiment.
          </h2>

          <div className="space-y-6 text-lg text-secondary leading-relaxed text-editorial">

            <p>
              EC-Bench does not assume that Engineering Cognition already exists as a
              measurable computational phenomenon.
            </p>

            <p>
              The benchmark exists to investigate that hypothesis. If accumulated
              engineering understanding cannot be measured reliably, the benchmark
              should expose that limitation rather than hide it.
            </p>

            <p>
              We therefore expect EC-Bench itself to evolve through repeated
              experiments, failed assumptions, revised metrics, and improved models of
              engineering understanding.
            </p>

            <p className="text-primary font-medium">
              Measuring Engineering Cognition is one of the research problems of
              Engineering Cognition.
            </p>

          </div>

        </section>
      </FadeIn>

      {/* ------------------------------------------------ */}

      <FadeIn delay={350}>
        <section className="border-t border-border pt-20 mb-24 text-center">

          <h2 className="text-4xl sm:text-5xl font-normal tracking-tight text-primary max-w-3xl mx-auto leading-tight">
            Every scientific discipline advances by improving what it can measure.

            Engineering Cognition should be no different.
          </h2>

          <p className="mt-8 text-lg text-secondary leading-relaxed text-editorial max-w-2xl mx-auto">
            EC-Bench exists because we believe accumulated engineering understanding
            deserves its own methods of measurement.
          </p>

        </section>
      </FadeIn>

      {/* ------------------------------------------------ */}

      <FadeIn delay={400}>
        <section className="border-t border-border pt-20 text-center">

          <h2 className="text-3xl font-medium tracking-tight text-primary">
            Collaborate
          </h2>

          <p className="mt-6 text-lg text-secondary leading-relaxed text-editorial max-w-2xl mx-auto">
            We&apos;re actively developing EC-Bench and are interested in collaborating
            with researchers working on long-horizon software engineering agents,
            evaluation, cognition, and AI systems.
          </p>

          <a
            href="mailto:muditsarda23@gmail.com?subject=Discussion%20about%20EC-Bench"
            className="btn-editorial mt-10 inline-flex"
          >
            Discuss EC-Bench
          </a>

        </section>
      </FadeIn>

    </div>
  );
}
