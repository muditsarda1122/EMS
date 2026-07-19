import Link from "next/link";
import ProblemDiagram from "@/components/svg/problem-diagram";
import EngineeringBrain from "@/components/svg/engineering-brain";
import FadeIn from "@/components/fade-in";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 py-24 lg:py-32 lg:px-8 text-center">
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

      {/* Section — Engineering Brain */}
      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-primary">
              Engineering Brain
            </h2>
            <p className="mt-4 text-base text-secondary leading-relaxed max-w-xl mx-auto text-editorial">
              A living semantic structure. Nodes strengthen. Connections appear.
              Beliefs merge. Some fade. Confidence changes.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={100}>
          <EngineeringBrain />
        </FadeIn>
      </section>

      {/* Section — Research Directions */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <FadeIn>
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-primary text-center mb-12">
            Research Directions
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
                className="mt-6 inline-flex items-center text-sm text-accent hover:text-accent-hover transition-colors duration-300"
              >
                Read Paper &rarr;
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
                className="mt-6 inline-flex items-center text-sm text-accent hover:text-accent-hover transition-colors duration-300"
              >
                Read Paper &rarr;
              </Link>
            </div>

            <div className="card-editorial">
              <h3 className="text-lg font-medium text-primary">EC-Bench</h3>
              <p className="mt-3 text-sm text-secondary leading-relaxed">
                A benchmark measuring whether accumulated engineering
                understanding changes engineering behaviour.
              </p>
              <div className="mt-6 flex items-center gap-4">
                <Link
                  href="/research"
                  className="text-sm text-accent hover:text-accent-hover transition-colors duration-300"
                >
                  Read Paper &rarr;
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
