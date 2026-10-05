import "./home.css";
import ArrowLink from "@/components/ui/ArrowLink";
import ButtonLink from "@/components/ui/ButtonLink";
import Tag from "@/components/ui/Tag";
import HeroGraph from "@/components/diagrams/HeroGraph";
import SessionsStrip from "@/components/diagrams/SessionsStrip";
import SessionBoundary from "@/components/diagrams/SessionBoundary";
import MemoryMap from "@/components/diagrams/MemoryMap";
import ConclusionLifecycle from "@/components/diagrams/ConclusionLifecycle";
import OwnershipHub from "@/components/diagrams/OwnershipHub";
import VideoSlot, { videoSlotMode } from "@/components/video/VideoSlot";
import { siteConfig, isRepoPublic } from "@/content/site.config";
import specimen from "@/content/specimens/token-refresh.json";
import type { ConclusionSpecimen } from "@/components/specimen/ConclusionRecord";

export default function HomePage() {
  const repoUrl = siteConfig.repository.url;
  const stateB = isRepoPublic() && repoUrl !== null;
  const slotShown = videoSlotMode() !== "none";
  const videoPublished = siteConfig.experiment.status === "published";
  const agents = siteConfig.supportedAgents.join(", ");
  const any = siteConfig.claims.anyMcpAgent;

  return (
    <div className="home">
      {/* S1 Hero */}
      <section className="hero wrap grid-12">
        <div className="hero-copy">
          <h1 className="display">Your coding agent shouldn’t start every session as a stranger.</h1>
          <p className="lead">
            Reverie is memory for coding agents. It keeps the conclusions your agent reaches — reviewed by you, grounded in
            your code — so the next session builds on them.
          </p>
          <p className="agents">
            Works with {agents}
            {any ? " — any MCP agent, on any model." : "."}
          </p>
          <div className="ctas">
            <ButtonLink href="/how-it-works">How it works</ButtonLink>
            {stateB ? (
              <ButtonLink href={repoUrl} variant="secondary" external>View on GitHub ↗</ButtonLink>
            ) : (
              <ButtonLink href="/research" variant="secondary">Read the research</ButtonLink>
            )}
          </div>
        </div>
        <HeroGraph data={specimen as ConclusionSpecimen} />
      </section>

      {/* S2 Problem */}
      <section className="section wrap grid-12 s2">
        <div className="s2-left">
          <h2>The bottleneck isn’t intelligence. It’s continuity.</h2>
          <p className="pull">The hard part isn’t storing more. It’s knowing what’s worth remembering.</p>
        </div>
        <SessionsStrip />
      </section>

      {/* S3 How it works (F1) */}
      <section className="section wrap">
        <div className="grid-12 s-head">
          <h2>How it works</h2>
          <p className="aside">From one session to the next — and you decide what’s kept.</p>
        </div>
        <SessionBoundary />
      </section>

      {/* S3b Side by side (reserved video slot) */}
      <VideoSlot />

      {/* S4 Memory that can change its mind (M1 + F2) */}
      <section className="section wrap">
        <div className="grid-12 s-head">
          <h2>Memory that can change its mind.</h2>
          <p className="aside">
            Conclusions behave like beliefs: evidence strengthens them, contradictions challenge them, and disuse lets them fade.
          </p>
        </div>
        <figure className="fig fig-mm">
          {/* T4b: <MemoryMapControls /> goes into the `controls` slot */}
          <MemoryMap />
          {videoPublished ? null : <ConclusionLifecycle variant="summary" />}
          <figcaption className="caption" id="f2cap">
            <span className="fig-n">Fig. 2</span>Example values, computed with Reverie’s update rules.
          </figcaption>
        </figure>
        <p className="more">
          <ArrowLink href="/how-it-works#lifecycle">How conclusions change</ArrowLink>
        </p>
      </section>

      {/* S5 Your memory, not your agent's (O1) */}
      <section className="section wrap">
        <div className="grid-12 s-head">
          <h2>Your memory, not your agent’s.</h2>
          <p className="aside">Switch agents or models — what you’ve built up stays with you, on your machine.</p>
        </div>
        <OwnershipHub />
        <ul className="facts3 grid-12">
          <li><b>Stored on your machine.</b><span>One SQLite file. No Reverie account.</span></li>
          <li><b>You approve what’s kept.</b><span>Every extracted conclusion passes your review.</span></li>
          <li><b>Your choice of model.</b><span>Extraction runs hosted, or locally with Ollama.</span></li>
        </ul>
        <p className="more">
          <ArrowLink href="/how-it-works#data">Data, setup and limits</ArrowLink>
        </p>
      </section>

      {/* S6 Research */}
      <section className="section wrap grid-12 s6">
        <div className="left">
          <h2>Built by measuring what didn’t work.</h2>
          <p>
            Our first version loaded memory into the agent before it started. On our benchmark, that made it worse — it trusted
            memory over the code. So Reverie keeps reviewed conclusions, and lets the agent ask.
          </p>
          <p className="second">We publish results either way.</p>
        </div>
        <ul className="rlist">
          <li>
            <a href="/research/biological-memory-architecture">
              <span className="mono-label kind">Paper</span>
              <div>
                <div className="title">Reverie: A Biological Memory Architecture for AI Agents</div>
                <div className="meta">September 2026</div>
              </div>
            </a>
          </li>
          <li>
            <a href="/research/ec-bench">
              <span className="mono-label kind">Benchmark</span>
              <div>
                <div className="title">EC-Bench: what we measure, and what we’ve found</div>
                <div className="meta">Method, results and limits</div>
              </div>
            </a>
          </li>
          {slotShown ? null : (
            <li className="next">
              <div>
                <span className="mono-label kind">Next</span>
                <div>
                  <div className="title">The same agent, with and without Reverie</div>
                  <div className="meta"><Tag dashed>In design</Tag></div>
                </div>
              </div>
            </li>
          )}
        </ul>
        <p className="more">
          <ArrowLink href="/research">All research</ArrowLink>
        </p>
      </section>

      {/* S7 Closing */}
      <section className="s7 wrap">
        <div className="inner grid-12">
          {stateB ? (
            <>
              <h2>Read the code.</h2>
              <div className="right">
                <p>The source, the extraction prompt, the benchmark harness and setup instructions are in the repository.</p>
                <div className="ctas">
                  <ButtonLink href={repoUrl} external>View the repository ↗</ButtonLink>
                  <ButtonLink href="/how-it-works" variant="secondary">How it works</ButtonLink>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2>The repository opens soon.</h2>
              <div className="right">
                <p>Want to know when it’s out, or talk about the research?</p>
                <div className="ctas">
                  <ButtonLink href={`mailto:${siteConfig.contactEmail}?subject=Reverie`}>Get in touch</ButtonLink>
                  <ButtonLink href="/how-it-works" variant="secondary">How it works</ButtonLink>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
