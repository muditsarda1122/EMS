import type { Metadata } from "next";
import "./about.css";
import ArrowLink from "@/components/ui/ArrowLink";
import JsonLd from "@/components/site/JsonLd";
import { siteConfig } from "@/content/site.config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Who builds Reverie, how the work is done, what the names mean, and how to get in touch.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: { "@type": "Person", name: siteConfig.author, email: siteConfig.contactEmail },
};

function Todo({ children = "TODO(copy)" }: { children?: string }) {
  return <span className="todo">{children}</span>;
}

export default function AboutPage() {
  return (
    <div className="ab">
      <JsonLd data={jsonLd} />
      <header className="wrap ab-head">
        <h1 className="t-h1">Reverie is built by {siteConfig.author}.</h1>
        <p className="lead">
          <Todo>TODO(copy)</Todo> Short bio and links, supplied by the owner (P8).
        </p>
      </header>

      <div className="wrap">
        <section className="ab-sec" aria-labelledby="work-h">
          <h2 id="work-h">How we work</h2>
          <div className="prose-col">
            <p>
              <b>Understanding over information.</b> Reverie keeps the conclusions an agent reaches, not a record of
              everything it did, because understanding is what carries over from one session to the next.
            </p>
            <p>
              <b>Measure, then believe.</b> We benchmark our own ideas, and the first one failed: our first version loaded
              memory before the agent began work, and on our benchmark the agent did worse. Negative results matter, so the
              runs are on the <ArrowLink href="/research/ec-bench">EC-Bench page</ArrowLink>.
            </p>
            <p>
              <b>Memory you can inspect.</b> Memory is stored locally, you review what is kept, and conclusions are grounded
              in your repository. Superseded documents stay available, labelled with what replaced them.
            </p>
          </div>
        </section>

        <section className="ab-sec" aria-labelledby="names-h">
          <h2 id="names-h">Names</h2>
          <div className="prose-col">
            <p>
              Reverie is the product. Engineering Cognition is the research program. The code uses the prefix <code>ec</code>.
              EMS was the first version.
            </p>
          </div>
        </section>

        <section className="ab-sec" aria-labelledby="contact-h">
          <h2 id="contact-h">Contact</h2>
          <div className="prose-col">
            <p>
              <a className="text-link" href={`mailto:${siteConfig.contactEmail}?subject=Reverie`}>
                {siteConfig.contactEmail}
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
