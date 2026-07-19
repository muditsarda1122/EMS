import Link from "next/link";
import ProblemDiagram from "@/components/svg/problem-diagram";
import EngineeringBrain from "@/components/svg/engineering-brain";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto max-w-3xl px-6 py-24 lg:py-32 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-primary">
          Engineering Cognition
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-secondary leading-relaxed">
          Building systems that accumulate engineering understanding.
        </p>
        <p className="mt-8 text-base text-secondary leading-relaxed max-w-2xl mx-auto">
          Engineering Cognition investigates how software engineering agents can
          continuously construct, maintain and reuse engineering understanding
          across long-running development workflows.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/research"
            className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-colors duration-300"
          >
            Read Research
          </Link>
          <Link
            href="/ems"
            className="inline-flex items-center justify-center rounded-md border border-border bg-card px-6 py-3 text-sm font-medium text-primary hover:bg-background transition-colors duration-300"
          >
            View EMS
          </Link>
        </div>
      </section>

      {/* Section — The Problem */}
      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-primary">
          Software engineering does not happen in one session.
        </h2>
        <div className="mt-8 space-y-4 text-base text-secondary leading-relaxed">
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
        <div className="mt-12">
          <ProblemDiagram />
        </div>
      </section>

      {/* Section — The Shift */}
      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8 text-center">
        <div className="space-y-6">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-primary">
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
          <p className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-primary">
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
          <p className="text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-accent">
            Engineering Cognition
          </p>
        </div>
        <p className="mt-12 text-lg text-secondary leading-relaxed">
          Information can be stored.
        </p>
        <p className="text-lg text-primary font-medium leading-relaxed">
          Understanding must evolve.
        </p>
      </section>

      {/* Section — Engineering Brain */}
      <section className="mx-auto max-w-4xl px-6 py-20 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-primary">
            Engineering Brain
          </h2>
          <p className="mt-4 text-base text-secondary leading-relaxed max-w-xl mx-auto">
            A living semantic structure. Nodes strengthen. Connections appear.
            Beliefs merge. Some fade. Confidence changes.
          </p>
        </div>
        <EngineeringBrain />
      </section>

      {/* Section — Research */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-primary text-center mb-12">
          Research
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-8">
            <h3 className="text-lg font-medium text-primary">
              Engineering Cognition
            </h3>
            <p className="mt-3 text-sm text-secondary leading-relaxed">
              Investigating whether engineering understanding can become a
              computational object.
            </p>
            <Link
              href="/research"
              className="mt-6 inline-flex items-center text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-300"
            >
              Read Paper &rarr;
            </Link>
          </div>

          <div className="rounded-lg border border-border bg-card p-8">
            <h3 className="text-lg font-medium text-primary">
              Engineering Memory System
            </h3>
            <p className="mt-3 text-sm text-secondary leading-relaxed">
              A cognition pipeline for constructing and maintaining engineering
              understanding.
            </p>
            <Link
              href="/research"
              className="mt-6 inline-flex items-center text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-300"
            >
              Read Paper &rarr;
            </Link>
          </div>

          <div className="rounded-lg border border-border bg-card p-8">
            <h3 className="text-lg font-medium text-primary">EC-Bench</h3>
            <p className="mt-3 text-sm text-secondary leading-relaxed">
              A benchmark measuring whether accumulated engineering
              understanding changes engineering behaviour.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <Link
                href="/research"
                className="inline-flex items-center text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-300"
              >
                Read Paper &rarr;
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-accent hover:text-accent-hover transition-colors duration-300"
              >
                GitHub &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Section — Research Philosophy */}
      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-primary">
          We build experiments before products.
        </h2>
        <div className="mt-8 space-y-4 text-base text-secondary leading-relaxed">
          <p>Every idea begins as a hypothesis.</p>
          <p>Every hypothesis is challenged through experiments.</p>
          <p>Every experiment exists to invalidate our assumptions.</p>
          <p>If an experiment proves us wrong, the research has succeeded.</p>
          <p>Our objective is not to defend our ideas.</p>
          <p className="text-primary font-medium">
            It is to understand the problem more accurately after every
            iteration than before.
          </p>
        </div>
      </section>

      {/* Section — Contact */}
      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-primary">
          Let&apos;s talk.
        </h2>
        <p className="mt-4 text-base text-secondary leading-relaxed max-w-xl mx-auto">
          Whether you&apos;re a researcher, founder, engineer or investor,
          we&apos;d love to discuss Engineering Cognition.
        </p>
        <a
          href="mailto:muditsarda23@gmail.com"
          className="mt-8 inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-white hover:bg-accent-hover transition-colors duration-300"
        >
          Email Us
        </a>
      </section>
    </div>
  );
}
