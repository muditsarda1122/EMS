import Link from "next/link";

export const metadata = {
  title: "Lab",
  description:
    "Engineering Cognition is currently being explored as an independent research effort.",
};

const researchAreas = [
  "Engineering Cognition",
  "Engineering Memory Systems",
  "Long-horizon Coding Agents",
  "Software Engineering Intelligence",
  "Benchmarks",
  "Engineering Belief Systems",
];

export default function LabPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-24 lg:px-8">
      <header className="mb-16">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-primary">
          Lab
        </h1>
        <p className="mt-6 text-lg text-secondary leading-relaxed">
          Engineering Cognition is currently being explored as an independent
          research effort.
        </p>
        <p className="mt-4 text-base text-secondary leading-relaxed">
          The laboratory exists to investigate long-horizon engineering
          intelligence.
        </p>
      </header>

      {/* Research Areas */}
      <section className="mb-16">
        <h2 className="text-xl font-medium text-primary mb-6">Research Areas</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {researchAreas.map((area) => (
            <div
              key={area}
              className="rounded-lg border border-border bg-card p-5 text-sm font-medium text-primary"
            >
              {area}
            </div>
          ))}
        </div>
      </section>

      {/* Current Researcher */}
      <section>
        <h2 className="text-xl font-medium text-primary mb-6">
          Current Researcher
        </h2>
        <div className="rounded-lg border border-border bg-card p-8">
          <h3 className="text-lg font-medium text-primary">Mudit Sarda</h3>
          <div className="mt-2 space-y-1 text-sm text-secondary">
            <p>Software Engineer</p>
            <p>Independent Researcher</p>
            <p>Distributed Systems</p>
            <p>Developer Infrastructure</p>
            <p>AI Engineering</p>
          </div>
          <div className="mt-6 flex items-center gap-6 text-sm">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover transition-colors duration-300"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-hover transition-colors duration-300"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
