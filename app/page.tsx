import Link from "next/link";
import ProblemDiagram from "@/components/svg/problem-diagram";
import EngineeringBrain from "@/components/svg/engineering-brain";
import FadeIn from "@/components/fade-in";
import { papers } from "@/lib/papers";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 py-16 lg:py-24 lg:px-8 text-center">
        <FadeIn>
          <div className="mb-12">
            <EngineeringBrain />
          </div>
        </FadeIn>
        
        <FadeIn delay={100}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-primary leading-tight">
            Engineering
            <br />
            Cognition
          </h1>
        </FadeIn>
        
        <FadeIn delay={200}>
          <p className="mt-8 text-lg sm:text-xl text-secondary leading-relaxed max-w-xl mx-auto">
            Building systems that accumulate engineering understanding.
          </p>
        </FadeIn>
        
        <FadeIn delay={300}>
          <p className="mt-6 text-base text-secondary leading-relaxed max-w-2xl mx-auto text-editorial">
            Software engineering is not a sequence of prompts.
            It is the continuous accumulation of understanding.
            Engineering Memory System (EMS) is our attempt to investigate how engineering understanding can become a computational object that evolves over time.
          </p>
        </FadeIn>
        
        <FadeIn delay={400}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/research"
              className="btn-editorial btn-editorial-primary"
            >
              Read the Papers
            </Link>
            <Link
              href="/research"
              className="btn-editorial"
            >
              Explore Research
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Section — The Problem */}
      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-primary">
            Why current coding agents repeatedly reconstruct understanding.
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="mt-8 space-y-4 text-base text-secondary leading-relaxed text-editorial">
            <p>Modern coding agents write excellent code.</p>
            <p>Yet every new session begins almost from scratch.</p>
            <p>Architectural decisions are rediscovered.</p>
            <p>Debugging discoveries disappear.</p>
            <p>Implementation rationale fades.</p>
            <p>
              Engineering understanding is repeatedly reconstructed instead of
              accumulated.
            </p>
            <p>We believe the bottleneck is no longer code generation.</p>
            <p className="text-primary font-medium">
              It is engineering understanding.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="mt-12">
            <ProblemDiagram />
          </div>
        </FadeIn>
      </section>

      {/* Section — The Shift */}
      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8 text-center">
        <FadeIn>
          <div className="space-y-8">
            <p className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-primary">
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
            <p className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-primary">
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
            <p className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-primary">
              Engineering Cognition
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <p className="mt-16 text-lg text-secondary leading-relaxed">
            Information can be stored.
          </p>
          <p className="text-lg text-primary font-medium leading-relaxed">
            Understanding must evolve.
          </p>
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

      {/* Section — Research Artefacts */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-primary text-center mb-12">
            Research Artefacts
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="card-editorial">
              <h3 className="text-lg font-medium text-primary">
                Engineering Cognition
              </h3>
              <p className="mt-3 text-sm text-secondary leading-relaxed">
                Investigating whether engineering understanding can become a
                computational object.
              </p>
              <Link
                href="/research"
                className="mt-6 btn-editorial"
              >
                Read Paper
              </Link>
            </div>

            <div className="card-editorial">
              <h3 className="text-lg font-medium text-primary">
                Engineering Memory System
              </h3>
              <p className="mt-3 text-sm text-secondary leading-relaxed">
                A cognition pipeline for constructing and maintaining engineering
                understanding.
              </p>
              <Link
                href="/research"
                className="mt-6 btn-editorial"
              >
                Read Paper
              </Link>
            </div>

            <div className="card-editorial">
              <h3 className="text-lg font-medium text-primary">EC-Bench</h3>
              <p className="mt-3 text-sm text-secondary leading-relaxed">
                A benchmark measuring whether accumulated engineering
                understanding changes engineering behaviour.
              </p>
              <div className="mt-6 flex items-center gap-3">
                <Link
                  href="/research"
                  className="btn-editorial"
                >
                  Read Paper
                </Link>
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
      </section>

      {/* Section — Research Philosophy */}
      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8 text-center">
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-primary">
            Research before systems.
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="mt-8 space-y-4 text-base text-secondary leading-relaxed text-editorial">
            <p>Experiments exist to invalidate hypotheses.</p>
            <p>Negative results matter.</p>
            <p>Understanding evolves.</p>
            <p>Research before products.</p>
          </div>
        </FadeIn>
      </section>

      {/* Section — Latest Publications */}
      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-primary text-center mb-12">
            Latest Publications
          </h2>
        </FadeIn>
        <div className="space-y-8">
          {papers.slice(0, 3).map((paper, index) => (
            <FadeIn key={paper.id} delay={index * 100}>
              <article className="card-editorial">
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-secondary">
                    {paper.status}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-primary">{paper.title}</h3>
                <p className="mt-1 text-sm text-secondary">{paper.authors}</p>
                <p className="mt-3 text-sm text-secondary leading-relaxed text-editorial">
                  {paper.abstract}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href={`/EMS-artefacts/${paper.filename}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-editorial"
                  >
                    Read Paper
                  </a>
                  {paper.github && (
                    <a
                      href={paper.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent hover:text-accent-hover transition-colors duration-300"
                    >
                      GitHub &rarr;
                    </a>
                  )}
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
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
