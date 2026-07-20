import FadeIn from "@/components/fade-in";
import ConceptualEvolution from "@/components/svg/conceptual-evolution";

export const metadata = {
  title: "Ethos",
  description:
    "Engineering Cognition is a research program investigating how engineering understanding accumulates over time.",
};

export default function EthosPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-20 lg:px-8">

      {/* Hero */}

      <FadeIn>
        <div className="mb-20">
          <ConceptualEvolution />

          <h1 className="mt-12 text-5xl sm:text-6xl lg:text-7xl tracking-tight font-normal text-primary">
            Engineering
            <br />
            Cognition
          </h1>

          <p className="mt-8 text-xl text-primary font-medium leading-relaxed max-w-2xl">
            A research program investigating how engineering understanding
            accumulates.
          </p>

          <p className="mt-8 max-w-3xl text-lg text-secondary leading-relaxed text-editorial">
            Software engineering is often described as the process of writing
            software. We believe that description misses the central phenomenon
            entirely. Software engineering is fundamentally a process of
            constructing understanding. Every debugging session, architectural
            discussion, implementation attempt, and design decision changes how
            engineers understand a system. Over months and years this
            understanding compounds into engineering judgement. We call this
            process <span className="text-primary font-medium">Engineering Cognition.</span>
          </p>
        </div>
      </FadeIn>

      {/* Why software engineering is different */}

      <FadeIn delay={100}>
        <section className="mb-20">
          <h2 className="text-3xl font-medium tracking-tight text-primary mb-8">
            Software engineering is different.
          </h2>

          <div className="space-y-6 text-secondary leading-relaxed text-editorial text-lg">
            <p>
              Code is only one artefact produced during software engineering.
              The far more valuable artefact is understanding. Experienced
              engineers accumulate architectural intuition, implementation
              rationale, debugging experience, protocol knowledge, and countless
              small beliefs about how a system behaves. Those beliefs rarely
              exist explicitly inside repositories, yet they influence almost
              every future engineering decision.
            </p>

            <p>
              This accumulated understanding is why senior engineers approach
              familiar systems differently from newcomers. Every project leaves
              behind a richer mental model than the one that existed before it.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* Missing abstraction */}

      <FadeIn delay={150}>
        <section className="mb-20">
          <h2 className="text-3xl font-medium tracking-tight text-primary mb-8">
            The missing abstraction.
          </h2>

          <div className="space-y-6 text-secondary leading-relaxed text-editorial text-lg">
            <p>
              Modern AI systems preserve conversations, documents, embeddings,
              and retrieved information remarkably well. Yet we believe these
              are representations of engineering work rather than engineering
              understanding itself.
            </p>

            <p>
              A transcript of a debugging session is not the understanding that
              prevents the same bug from appearing again. A design document is
              not the architectural intuition that allows an engineer to
              recognise the right solution before implementation begins.
            </p>

            <p className="text-primary font-medium">
              Preserving information is not the same as accumulating
              understanding.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* EMS */}

      <FadeIn delay={200}>
        <section className="mb-20">
          <h2 className="text-3xl font-medium tracking-tight text-primary mb-8">
            Engineering Memory System.
          </h2>

          <div className="space-y-6 text-secondary leading-relaxed text-editorial text-lg">
            <p>
              Engineering Memory System (EMS) originally began as an attempt to
              build persistent memory for AI coding agents. As the research
              progressed, the implementation gradually became less interesting
              than the question it exposed.
            </p>

            <p>
              We no longer view EMS primarily as a memory architecture. We view
              it as an experimental platform through which we investigate
              whether engineering understanding itself can become a
              computational object that evolves over time.
            </p>
          </div>
        </section>
      </FadeIn>

      {/* Philosophy */}

      <FadeIn delay={250}>
        <section className="mb-20">
          <h2 className="text-3xl font-medium tracking-tight text-primary mb-8">
            How we think.
          </h2>

          <div className="space-y-10">

            <div>
              <h3 className="text-xl text-primary font-medium mb-3">
                Research shapes systems.
              </h3>

              <p className="text-secondary leading-relaxed text-editorial text-lg">
                We begin with research questions rather than product ideas.
                Systems exist only to investigate those questions. Products are
                valuable only when repeated experiments reveal something stable
                about the underlying phenomenon.
              </p>
            </div>

            <div>
              <h3 className="text-xl text-primary font-medium mb-3">
                Understanding is cumulative.
              </h3>

              <p className="text-secondary leading-relaxed text-editorial text-lg">
                Every experiment should leave behind a better question than the
                one that started it. Technical reports, papers, prototypes and
                benchmarks are not independent projects—they are successive
                observations within one long-running investigation.
              </p>
            </div>

            <div>
              <h3 className="text-xl text-primary font-medium mb-3">
                Negative results matter.
              </h3>

              <p className="text-secondary leading-relaxed text-editorial text-lg">
                We consider failed experiments valuable because they refine the
                research itself. Progress comes as much from abandoning
                incorrect assumptions as from confirming correct ones.
              </p>
            </div>

          </div>
        </section>
      </FadeIn>

      {/* Closing */}

      <FadeIn delay={300}>
        <section className="border-t border-border pt-16">
          <p className="text-3xl leading-relaxed tracking-tight text-primary max-w-3xl">
            Engineering Cognition is not yet a solved technology.
          </p>

          <p className="mt-6 text-xl text-secondary leading-relaxed max-w-3xl text-editorial">
            We do not yet know whether engineering understanding can be
            constructed computationally, how it should evolve, or whether it
            can fundamentally change long-horizon software engineering. These
            remain open scientific questions.
          </p>

          <p className="mt-10 text-lg font-medium text-primary">
            EMS exists because we believe they are now worth asking.
          </p>
        </section>
      </FadeIn>

    </div>
  );
}