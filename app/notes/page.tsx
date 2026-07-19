import FadeIn from "@/components/fade-in";

export const metadata = {
  title: "Notes",
  description:
    "Chronological technical writing from the Engineering Cognition research laboratory.",
};

const notes = [
  {
    date: "2026-01-15",
    title: "On the nature of engineering beliefs",
    tags: ["beliefs", "philosophy"],
    slug: "nature-of-engineering-beliefs",
  },
  {
    date: "2025-12-03",
    title: "Why memory is not enough for long-horizon agents",
    tags: ["memory", "agents"],
    slug: "memory-not-enough",
  },
  {
    date: "2025-10-20",
    title: "Designing EC-Bench: measuring understanding, not recall",
    tags: ["benchmarks", "ec-bench"],
    slug: "designing-ec-bench",
  },
];

export default function NotesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:py-24 lg:px-8">
      <FadeIn>
        <header className="mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-primary">
            Notes
          </h1>
          <p className="mt-6 text-lg text-secondary leading-relaxed text-editorial">
            Chronological technical writing.
          </p>
        </header>
      </FadeIn>

      <div className="space-y-8">
        {notes.map((note, index) => (
          <FadeIn key={note.slug} delay={index * 100}>
            <article className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 group cursor-pointer">
              <time className="text-sm text-secondary tabular-nums shrink-0 w-28">
                {note.date}
              </time>
              <div className="flex-1">
                <h2 className="text-base font-medium text-primary group-hover:text-accent transition-colors duration-300">
                  {note.title}
                </h2>
                <div className="mt-1 flex items-center gap-2">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-secondary"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-sm text-accent hover:text-accent-hover transition-colors duration-300 shrink-0">
                Read &rarr;
              </span>
            </article>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
