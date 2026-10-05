import Link from "next/link";
import type { Metadata } from "next";
import Tag from "@/components/ui/Tag";
import { siteConfig, isExperimentVisible } from "@/content/site.config";
import {
  paper,
  evaluation,
  notebook,
  archive,
  archiveNameNote,
  lineage,
  formatDate,
  type ResearchEntry,
} from "@/content/research";
import "./research.css";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Engineering Cognition, the research program behind Reverie: the paper, the benchmark, the notebook and the archive.",
};

function Meta({ entry }: { entry: ResearchEntry }) {
  return (
    <div className="tags">
      <Tag dashed={entry.status === "In design"}>{entry.status}</Tag>
      {entry.date ? (
        <span className="t-caption" style={{ fontStyle: "normal" }}>
          {formatDate(entry.date)}
        </span>
      ) : null}
    </div>
  );
}

function Row({ entry }: { entry: ResearchEntry }) {
  const inDesign = entry.status === "In design";
  // The continuity experiment is linked only once the owner publishes the protocol (plan §8.2, §13).
  const linked = entry.href && (entry.id !== "continuity-experiment" || isExperimentVisible());
  return (
    <li className={`rs-row${inDesign ? " dashed" : ""}`}>
      <span className="mono-label when">{entry.kind}</span>
      <div>
        <div className="title">
          {linked ? <Link href={entry.href as string}>{entry.title}</Link> : entry.title}
        </div>
        <p className="body">{entry.note}</p>
        <Meta entry={entry} />
        {entry.pdf || entry.supersededBy ? (
          <div className="meta">
            {entry.pdf ? (
              <a className="act" href={entry.pdf}>
                PDF <span aria-hidden="true">↓</span>
              </a>
            ) : null}
            {entry.supersededBy ? (
              <span>
                {entry.status === "Superseded" ? "Superseded by " : "See "}
                <Link className="text-link" href={entry.supersededBy.href}>
                  {entry.supersededBy.label}
                </Link>
              </span>
            ) : null}
          </div>
        ) : null}
      </div>
    </li>
  );
}

export default function ResearchPage() {
  return (
    <div className="rs">
      <header className="wrap grid-12 rs-head">
        <h1 className="t-h1">Research</h1>
        <p className="lead">
          Reverie comes out of Engineering Cognition, a research program that asks whether the understanding built
          during engineering work can be extracted, kept and revised by a system. We publish what we find, including
          when it doesn’t work.
        </p>
      </header>

      <section id="lineage" className="wrap grid-12 rs-sec" aria-labelledby="lineage-h">
        <div className="rs-title">
          <span className="mono-label">Lineage</span>
          <h2 id="lineage-h">The story so far</h2>
        </div>
        <ol className="rs-body rs-list">
          {lineage.map((item) => (
            <li
              key={`${item.when}-${item.title}`}
              className="rs-row"
              // TODO(owner): dates are unverified until `verified` is true in content/research.ts.
              data-verify={item.verified ? undefined : "owner"}
            >
              <span className="mono-label when">{item.when}</span>
              <div>
                <div className="title">{item.title}</div>
                <p className="body">{item.body}</p>
                {item.links ? (
                  <div className="meta">
                    {item.links.map((l) => (
                      <a key={l.href} className="act" href={l.href}>
                        {l.label} <span aria-hidden="true">→</span>
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="start" className="wrap grid-12 rs-sec" aria-labelledby="start-h">
        <div className="rs-title">
          <span className="mono-label">Featured</span>
          <h2 id="start-h">Start here</h2>
        </div>
        <article className="rs-body rs-feature">
          <div className="top">
            <span className="mono-label">{paper.kind}</span>
            <Tag>{paper.status}</Tag>
            {paper.date ? <span className="t-caption" style={{ fontStyle: "normal" }}>{formatDate(paper.date)}</span> : null}
            {paper.readingMinutes ? <span className="t-caption" style={{ fontStyle: "normal" }}>{paper.readingMinutes} min read</span> : null}
          </div>
          <h3>{paper.title}</h3>
          <p>{paper.note}</p>
          <div className="actions">
            <Link className="btn btn-primary" href={paper.href as string}>
              Read
            </Link>
            {paper.pdf ? (
              <a className="btn btn-secondary" href={paper.pdf}>
                PDF
              </a>
            ) : null}
          </div>
        </article>
      </section>

      <section id="evaluation" className="wrap grid-12 rs-sec" aria-labelledby="evaluation-h">
        <div className="rs-title">
          <span className="mono-label">Evaluation</span>
          <h2 id="evaluation-h">How we test it</h2>
        </div>
        <ul className="rs-body rs-list">
          {evaluation.map((e) => (
            <Row key={e.id} entry={e} />
          ))}
        </ul>
      </section>

      <section id="notebook" className="wrap grid-12 rs-sec" aria-labelledby="notebook-h">
        <div className="rs-title">
          <span className="mono-label">Notebook</span>
          <h2 id="notebook-h">Research log</h2>
        </div>
        <ul className="rs-body rs-list">
          {notebook.map((e) => (
            <Row key={e.id} entry={e} />
          ))}
        </ul>
      </section>

      <section id="archive" className="wrap grid-12 rs-sec" aria-labelledby="archive-h">
        <div className="rs-title">
          <span className="mono-label">Archive</span>
          <h2 id="archive-h">Earlier documents</h2>
        </div>
        <div className="rs-body plain">
          <p className="rs-name" style={{ marginTop: 0, marginBottom: 20 }}>
            {archiveNameNote}
          </p>
          <ul className="rs-list">
            {archive.map((e) => (
              <Row key={e.id} entry={e} />
            ))}
          </ul>
        </div>
      </section>

      <section id="collaborate" className="wrap grid-12 rs-sec" aria-labelledby="collab-h">
        <div className="rs-title">
          <span className="mono-label">Collaborate</span>
          <h2 id="collab-h">Get in touch</h2>
        </div>
        <p className="rs-body rs-collab">
          {/* TODO(copy): the plan specifies only “one line with an email link for researchers”. */}
          Researching something related, or want to compare notes?{" "}
          <a href={`mailto:${siteConfig.contactEmail}?subject=Research`}>Write to us</a>.
        </p>
      </section>

    </div>
  );
}
