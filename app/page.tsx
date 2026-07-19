import Link from "next/link";
import ProblemDiagram from "@/components/svg/problem-diagram";
import FadeIn from "@/components/fade-in";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-16 lg:py-24 lg:px-8 text-center">
        <FadeIn>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-primary leading-tight">
            Engineering
            <br />
            Cognition
          </h1>
        </FadeIn>

        <FadeIn delay={100}>
          <p className="mt-8 text-lg sm:text-xl text-secondary leading-relaxed max-w-xl mx-auto">
            Building systems that accumulate engineering understanding.
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <p className="mt-6 text-base text-secondary leading-relaxed max-w-2xl mx-auto text-editorial">
            Software engineering is not a sequence of prompts.
            It is the continuous accumulation of understanding.
            Engineering Memory System (EMS) is our attempt to investigate how engineering understanding can become a computational object that evolves over time.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/research"
              className="btn-editorial btn-editorial-primary"
            >
              Read the Papers
            </Link>
            <Link
              href="/ems"
              className="btn-editorial"
            >
              Explore EMS
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Section — Two Editorial Columns */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:px-8">
        <div className="grid gap-16 lg:gap-24 md:grid-cols-2">
          <FadeIn>
            <div className="max-w-[550px]">
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-primary mb-6">
                What is Engineering Cognition?
              </h2>

              <p className="text-base text-secondary leading-relaxed text-editorial">
                <span className="bg-accent/10 text-primary px-1.5 py-0.5 rounded-sm font-medium">
                  Engineering Cognition is the continuously evolving understanding that software engineers accumulate while building systems over time.
                </span>{" "}
                It is more than memory. It includes architectural intuition,
                implementation rationale, debugging discoveries, engineering beliefs,
                and the relationships between them.
              </p>

              <p className="mt-6 text-base text-secondary leading-relaxed text-editorial">
                A senior engineer does not become effective simply because they remember
                more files or write better code. They become effective because every
                project leaves behind understanding that shapes every future engineering
                decision. We believe this accumulated understanding can itself become a
                computational object that evolves rather than a collection of documents
                that merely persists.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="max-w-[550px]">
              <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-primary mb-6">
                Why does it matter?
              </h2>

              <p className="text-base text-secondary leading-relaxed text-editorial">
                AI coding agents have become remarkably good at generating code.
                <span className="bg-accent/10 text-primary px-1.5 py-0.5 rounded-sm font-medium">
                  {" "}Yet every new session effectively begins with amnesia.
                </span>
              </p>

              <p className="mt-6 text-base text-secondary leading-relaxed text-editorial">
                Architectural decisions are rediscovered. Debugging insights are
                relearned. Implementation trade-offs are reconstructed. The same
                engineering reasoning is performed repeatedly because the underlying
                understanding never accumulates.
              </p>

              <p className="mt-6 text-base text-secondary leading-relaxed text-editorial">
                <span className="bg-accent/10 text-primary px-1.5 py-0.5 rounded-sm font-medium">
                  We believe the next frontier of AI software engineering is not better
                  code generation, but systems that continuously construct and evolve
                  engineering understanding.
                </span>{" "}
                Engineering Memory System (EMS) is our research platform for investigating
                that hypothesis.
              </p>
            </div>
          </FadeIn>
        </div>

        {/* Thesis */}
        <FadeIn delay={200}>
          <div className="mt-24 max-w-4xl mx-auto border-t border-border pt-12">
            <p className="text-center text-xl sm:text-2xl leading-relaxed font-medium text-primary text-balance">
              Software engineering is fundamentally a process of accumulating
              understanding. If AI systems are to become long-term engineering
              collaborators rather than short-term coding assistants, they must learn
              to accumulate understanding in the same way.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Section — Understanding Collapses Diagram */}
      {/* <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <FadeIn>
          <div className="mt-12">
            <ProblemDiagram />
          </div>
        </FadeIn>
      </section> */}
      <section className="py-20">
        <FadeIn>
          <div className="mx-auto mt-12 max-w-[1700px] px-6">
            <ProblemDiagram />
          </div>
        </FadeIn>
      </section>

      {/* Section — The Shift */}
      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-8 text-center">
        <FadeIn>
          <div className="space-y-10">
            <p className="text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-primary">
              Memory
            </p>

            <svg
              className="w-6 h-6 mx-auto text-secondary"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>

            <p className="text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-primary">
              Understanding
            </p>

            <svg
              className="w-6 h-6 mx-auto text-secondary"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
              />
            </svg>

            <p className="text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-primary">
              Cognition
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-20 max-w-2xl mx-auto">
            <div className="space-y-5">
              <p className="text-xl text-secondary leading-relaxed">
                Memory stores.
              </p>

              <p className="text-xl text-secondary leading-relaxed">
                Understanding evolves.
              </p>

              <p className="text-2xl font-medium text-primary leading-relaxed">
                Cognition compounds.
              </p>
            </div>

            <div className="mt-14 pt-10 border-t border-border">
              <p className="text-3xl sm:text-4xl leading-tight tracking-tight text-primary font-light">
                The next generation of engineering systems will not be defined by what they
                remember -
              </p>

              <p className="mt-4 text-3xl sm:text-4xl leading-tight tracking-tight text-primary font-medium">
                but by what they continuously come to understand.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Section — Engineering Cognition at a Glance */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-primary text-center mb-4">
            Engineering Cognition at a Glance
          </h2>
          <p className="text-center text-sm text-secondary mb-12 max-w-md mx-auto">
            Six research artefacts investigating how engineering understanding accumulates.
          </p>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card-editorial text-center">
              <div className="mb-3 text-secondary">
                <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-primary">Engineering Memory System</h3>
              <p className="mt-2 text-sm text-secondary leading-relaxed">
                A cognition pipeline for constructing and maintaining engineering understanding.
              </p>
            </div>

            <div className="card-editorial text-center">
              <div className="mb-3 text-secondary">
                <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-primary">Engineering Brain</h3>
              <p className="mt-2 text-sm text-secondary leading-relaxed">
                A living semantic structure where beliefs merge, fade, and strengthen.
              </p>
            </div>

            <div className="card-editorial text-center">
              <div className="mb-3 text-secondary">
                <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-primary">Demand-driven Retrieval</h3>
              <p className="mt-2 text-sm text-secondary leading-relaxed">
                Understanding appears only when reasoning requires it. Never before.
              </p>
            </div>

            <div className="card-editorial text-center">
              <div className="mb-3 text-secondary">
                <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-primary">Engineering Beliefs</h3>
              <p className="mt-2 text-sm text-secondary leading-relaxed">
                The primary computational object. Reusable understanding extracted from observations.
              </p>
            </div>

            <div className="card-editorial text-center">
              <div className="mb-3 text-secondary">
                <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-primary">Repository-first Reasoning</h3>
              <p className="mt-2 text-sm text-secondary leading-relaxed">
                All understanding originates from and is grounded in the repository.
              </p>
            </div>

            <div className="card-editorial text-center">
              <div className="mb-3 text-secondary">
                <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-primary">Engineering Modes</h3>
              <p className="mt-2 text-sm text-secondary leading-relaxed">
                Different modes of reasoning for different engineering contexts.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Section — Research Artefacts
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-primary text-center mb-12">
            Research Artefacts
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card-editorial flex flex-col">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-primary">
                  Engineering Cognition
                </h3>
                <p className="mt-3 text-sm text-secondary leading-relaxed">
                  Investigating whether engineering understanding can become a
                  computational object.
                </p>
              </div>
              <a
                href="/EMS-artefacts/engineering-cognition.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 btn-editorial self-start"
              >
                Read Paper
              </a>
            </div>

            <div className="card-editorial flex flex-col">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-primary">
                  Engineering Memory System
                </h3>
                <p className="mt-3 text-sm text-secondary leading-relaxed">
                  A cognition pipeline for constructing and maintaining engineering
                  understanding.
                </p>
              </div>
              <a
                href="/EMS-artefacts/engineering-memory-system.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 btn-editorial self-start"
              >
                Read Paper
              </a>
            </div>

            <div className="card-editorial flex flex-col">
              <div className="flex-1">
                <h3 className="text-lg font-medium text-primary">EC-Bench</h3>
                <p className="mt-3 text-sm text-secondary leading-relaxed">
                  A benchmark measuring whether accumulated engineering
                  understanding changes engineering behaviour.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <a
                  href="/EMS-artefacts/ec-bench-technical-report.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-editorial"
                >
                  Read Paper
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-accent hover:text-accent-hover transition-colors duration-300"
                >
                  GitHub &rarr;
                </a>
              </div>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="mt-12 text-center">
            <Link
              href="/research"
              className="btn-editorial"
            >
              View All Research
            </Link>
          </div>
        </FadeIn>
      </section> */}
      {/* Section — Our Research */}
      <section className="mx-auto max-w-5xl px-6 py-24 lg:px-8">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-primary">
              Our Research
            </h2>

            <p className="mt-6 text-lg text-secondary leading-relaxed text-editorial">
              These publications document our current understanding of Engineering
              Cognition. Rather than describing finished products, they capture an
              evolving research programme—from foundational theory to system design and
              empirical evaluation.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-20 space-y-10">

            {/* Paper 1 */}
            <article className="border-t border-border pt-10">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">

                <div className="max-w-2xl">

                  <p className="text-xs uppercase tracking-[0.18em] text-secondary mb-3">
                    Research Paper
                  </p>

                  <h3 className="text-2xl font-medium tracking-tight text-primary">
                    Engineering Cognition
                  </h3>

                  <p className="mt-5 text-base text-secondary leading-relaxed text-editorial">
                    A conceptual framework proposing that engineering understanding,
                    rather than engineering memory, should become a first-class
                    computational capability for long-horizon software engineering
                    agents.
                  </p>

                </div>

                <div className="flex flex-col items-start lg:items-end gap-5 shrink-0">

                  <span className="text-sm text-secondary">
                    Published
                  </span>

                  <a
                    href="/EMS-artefacts/engineering-cognition.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent transition-colors duration-300"
                  >
                    Read Paper →
                  </a>

                </div>

              </div>
            </article>

            {/* Paper 2 */}
            <article className="border-t border-border pt-10">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">

                <div className="max-w-2xl">

                  <p className="text-xs uppercase tracking-[0.18em] text-secondary mb-3">
                    Technical Report
                  </p>

                  <h3 className="text-2xl font-medium tracking-tight text-primary">
                    Engineering Memory System
                  </h3>

                  <p className="mt-5 text-base text-secondary leading-relaxed text-editorial">
                    The first implementation of Engineering Cognition—a cognition
                    pipeline for constructing, maintaining and retrieving accumulated
                    engineering understanding.
                  </p>

                </div>

                <div className="flex flex-col items-start lg:items-end gap-5 shrink-0">

                  <span className="text-sm text-secondary">
                    Research Platform
                  </span>

                  <a
                    href="/EMS-artefacts/engineering-memory-system.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent transition-colors duration-300"
                  >
                    Read Paper →
                  </a>

                </div>

              </div>
            </article>

            {/* Paper 3 */}
            <article className="border-t border-b border-border py-10">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">

                <div className="max-w-2xl">

                  <p className="text-xs uppercase tracking-[0.18em] text-secondary mb-3">
                    Benchmark
                  </p>

                  <h3 className="text-2xl font-medium tracking-tight text-primary">
                    EC-Bench
                  </h3>

                  <p className="mt-5 text-base text-secondary leading-relaxed text-editorial">
                    A benchmark for evaluating whether accumulated engineering
                    understanding measurably changes software engineering behaviour
                    across long-horizon development tasks.
                  </p>

                </div>

                <div className="flex flex-col items-start lg:items-end gap-5 shrink-0">

                  <span className="text-sm text-secondary">
                    Open Source
                  </span>

                  <a
                    href="/EMS-artefacts/ec-bench-technical-report.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-accent transition-colors duration-300"
                  >
                    Read Paper →
                  </a>

                  <a
                    href="https://github.com/your-org/ec-bench"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-primary transition-colors duration-300"
                  >
                    View Repository →
                  </a>

                </div>

              </div>
            </article>

          </div>
        </FadeIn>

        <FadeIn delay={220}>
          <div className="mt-16 text-center">
            <Link
              href="/research"
              className="btn-editorial"
            >
              Browse All Research
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Section — Research Philosophy */}
      <section className="mx-auto max-w-4xl px-6 py-24 lg:px-8">
        <FadeIn>
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.18em] text-secondary mb-6">
              Research Before Systems
            </p>

            <h2 className="text-4xl sm:text-5xl leading-tight tracking-tight font-normal text-primary">
              We do not build products to prove ideas.
            </h2>

            <h2 className="mt-2 text-4xl sm:text-5xl leading-tight tracking-tight font-medium text-primary">
              We build systems to challenge them.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="mt-14 max-w-3xl space-y-7 text-lg text-secondary leading-relaxed text-editorial">
            <p>
              Engineering Memory System exists because we believe software engineering
              is fundamentally a process of accumulating understanding. Whether that
              belief is correct is not something we assume - it is something we
              continuously test.
            </p>

            <p>
              Every artefact we publish, every benchmark we design, and every system
              we build exists to investigate that question. Positive results refine
              our thinking. Negative results often change it entirely.
            </p>

            <p className="text-primary font-medium">
              The objective of this lab is not to defend a technology. It is to
              understand the nature of engineering cognition itself.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Section — Contact */}
      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-primary">
            Let&apos;s talk.
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <p className="mt-4 text-base text-secondary leading-relaxed max-w-xl mx-auto text-editorial">
            Whether you&apos;re a researcher, founder, engineer or investor,
            we&apos;d love to discuss Engineering Cognition.
          </p>
        </FadeIn>
        <FadeIn delay={200}>
          <a
            href="mailto:muditsarda23@gmail.com"
            className="mt-8 btn-editorial btn-editorial-primary"
          >
            Email Us
          </a>
        </FadeIn>
      </section>
    </div>
  );
}
