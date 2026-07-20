import FadeIn from "@/components/fade-in";
import ResearchNotebook from "@/components/svg/research-notebook";

export const metadata = {
  title: "Notes",
  description:
    "Working notes, research observations, and engineering essays from the Engineering Cognition Lab.",
};

/*
 * Future structure:
 *
 * const notes = [
 *   {
 *     date: "2026-08-14",
 *     title: "...",
 *     excerpt: "...",
 *     slug: "...",
 *   }
 * ]
 */

const notes: {
  date: string;
  title: string;
  excerpt: string;
  slug: string;
}[] = [];

export default function NotesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">

      <FadeIn>
        <div className="mb-12">
          <ResearchNotebook />
        </div>
      </FadeIn>

      <FadeIn delay={100}>
        <header className="mb-20">

          <h1 className="text-5xl sm:text-6xl lg:text-7xl tracking-tight font-normal text-primary">
            Notes
          </h1>

          <p className="mt-8 max-w-3xl text-lg text-secondary leading-relaxed text-editorial">
            This notebook documents the evolution of our thinking.
            Rather than publishing polished conclusions alone, we intend to
            publish observations, failed hypotheses, design decisions, and
            technical essays as our understanding of Engineering Cognition
            develops.
          </p>

        </header>
      </FadeIn>

      {notes.length === 0 ? (

        <FadeIn delay={200}>

          <section className="border border-border rounded-2xl px-10 py-16">

            <p className="text-sm uppercase tracking-[0.2em] text-secondary">
              Research Notebook
            </p>

            <h2 className="mt-4 text-3xl font-medium tracking-tight text-primary">
              No public notes yet.
            </h2>

            <div className="mt-8 space-y-6 max-w-2xl">

              <p className="text-lg text-secondary leading-relaxed text-editorial">
                Engineering Cognition is still an active research project.
                We prefer publishing ideas only after they have survived
                experimentation, discussion, and repeated revision.
              </p>

              <p className="text-lg text-secondary leading-relaxed text-editorial">
                This page will gradually become a chronological notebook of
                research questions, engineering observations, architectural
                experiments, benchmark design, and lessons learned while
                building EMS and EC-Bench.
              </p>

            </div>

            <div className="mt-12 border-t border-border pt-8">

              <p className="text-base text-primary italic">
                "The absence of notes does not imply the absence of research.
                It only means the work has not yet reached a form worth sharing."
              </p>

            </div>

          </section>

        </FadeIn>

      ) : (

        <div className="space-y-10">

          {notes.map((note, index) => (

            <FadeIn key={note.slug} delay={index * 80}>

              <article className="group border-b border-border pb-10">

                <p className="text-sm text-secondary tabular-nums">
                  {note.date}
                </p>

                <h2 className="mt-3 text-2xl font-medium text-primary group-hover:text-accent transition-colors">
                  {note.title}
                </h2>

                <p className="mt-4 text-base text-secondary leading-relaxed text-editorial max-w-2xl">
                  {note.excerpt}
                </p>

                <a
                  href={`/notes/${note.slug}`}
                  className="inline-flex mt-6 btn-editorial"
                >
                  Read Note
                </a>

              </article>

            </FadeIn>

          ))}

        </div>

      )}

    </div>
  );
}