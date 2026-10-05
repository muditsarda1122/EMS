import type { Metadata } from "next";
import "./paper.css";
import ArrowLink from "@/components/ui/ArrowLink";
import CiteButton from "@/components/research/CiteButton";
import JsonLd from "@/components/site/JsonLd";
import { paper, formatDate } from "@/content/research";
import { errata, keySections } from "@/content/paper";
import { siteConfig } from "@/content/site.config";
import { absoluteUrl, buildBibtex } from "@/lib/cite";

const PATH = "/research/biological-memory-architecture";

export const metadata: Metadata = {
  title: paper.title,
  description:
    "The paper behind Reverie's second architecture: two brains, a review gate, confidence and decay, with the corrections that apply where it differs from the implementation.",
};

// Tool and field names are things that literally exist in Reverie, so they take the mono voice.
function Mono({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\bec_\w+|\bdepends_on\b)/).map((part, i) =>
        i % 2 ? <code key={i}>{part}</code> : part,
      )}
    </>
  );
}

function Todo({ children = "TODO(copy)" }: { children?: string }) {
  return <span className="todo">{children}</span>;
}

export default function PaperPage() {
  const url = absoluteUrl(siteConfig.domain, PATH);
  const bibtex = buildBibtex({ title: paper.title, author: "Sarda, M.", date: paper.date as string, url });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: paper.title,
    author: { "@type": "Person", name: "M. Sarda" },
    datePublished: paper.date,
    ...(url ? { url } : {}),
  };

  return (
    <div className="pp">
      <JsonLd data={jsonLd} />

      <header className="wrap pp-head">
        <p className="mono-label" style={{ marginBottom: 16 }}>Paper</p>
        <h1 className="t-h1">{paper.title}</h1>
        <p className="pp-byline">
          <span>M. Sarda</span>
          <span>{formatDate(paper.date as string)}</span>
          <span>
            Version <Todo>TODO(fact)</Todo>
          </span>
        </p>
        <p className="lead">
          This page is the abstract, the corrections and the citation. The full text will appear here once the paper’s
          corrections are made.
        </p>
        <div className="actions">
          {paper.pdf ? (
            <a className="btn btn-primary" href={paper.pdf}>
              PDF <span aria-hidden="true">↓</span>
              <span className="sr-only"> (download)</span>
            </a>
          ) : null}
          <a className="btn btn-secondary" href="#cite">
            Cite
          </a>
        </div>
      </header>

      <div className="wrap">
        <section id="abstract" className="pp-sec" aria-labelledby="abstract-h">
          <h2 id="abstract-h">Abstract</h2>
          <div className="prose-col">
            <p>
              <Todo>TODO(copy)</Todo> The paper has no abstract; the owner writes about 120 words.
            </p>
          </div>
        </section>

        <section id="sections" className="pp-sec" aria-labelledby="sections-h">
          <h2 id="sections-h">What the paper covers</h2>
          <div className="prose-col" style={{ marginBottom: 24 }}>
            <p>
              The paper has 17 sections. Its biology (complementary learning systems, reconsolidation, the forgetting
              curve and synaptic homeostasis) is presented as inspiration and convergence, with citations.
            </p>
          </div>
          <ul className="rows" aria-label="Topics by paper section">
            {keySections.map((s) => (
              <li key={s.where}>
                <span className="where">{s.where}</span>
                <span>{s.what}</span>
              </li>
            ))}
          </ul>
          <div className="prose-col" style={{ marginTop: 16 }}>
            <p>
              Sections not listed: <Todo>TODO(fact)</Todo> The plan does not state their contents or the section titles.
            </p>
          </div>
        </section>

        <section id="errata" className="pp-sec" aria-labelledby="errata-h">
          <h2 id="errata-h">Where the paper and Reverie differ</h2>
          <div className="pp-errata">
            <p>
              The paper was written on 5 September 2026 and has not yet been corrected. Twelve passages describe something
              Reverie does not do, or do it differently. Where they differ, the right-hand column is what Reverie does.
            </p>
            <ol aria-label="Errata">
              {errata.map((e) => (
                <li key={e.n}>
                  <h3>
                    <span className="n">{String(e.n).padStart(2, "0")}</span>
                    {e.topic}
                  </h3>
                  <dl>
                    <div>
                      <dt>The paper says</dt>
                      <dd><Mono text={e.says} /></dd>
                    </div>
                    <div>
                      <dt>Reverie does</dt>
                      <dd><Mono text={e.does} /></dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="cite" className="pp-sec pp-cite" aria-labelledby="cite-h">
          <h2 id="cite-h">Cite</h2>
          <pre tabIndex={0} aria-label="BibTeX entry">{bibtex}</pre>
          <CiteButton text={bibtex} />
          {url ? null : (
            <p className="t-caption" style={{ marginTop: 14 }}>
              The entry has no URL field yet. <Todo>TODO(fact)</Todo> Waiting on the domain (P7).
            </p>
          )}
        </section>

        <section id="changed" className="pp-sec pp-next" aria-labelledby="changed-h">
          <h2 id="changed-h">What this changed in Reverie</h2>
          <div className="prose-col">
            <p>How it works describes what Reverie does today, including the points above where it differs from the paper.</p>
            <p>
              <ArrowLink href="/how-it-works">What this changed in Reverie</ArrowLink>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
