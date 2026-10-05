import Link from "next/link";
import { siteConfig, isRepoPublic } from "@/content/site.config";

export default function SiteFooter() {
  const repoUrl = siteConfig.repository.url;
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <span className="wordmark">{siteConfig.name}</span>
            <p>{siteConfig.tagline}</p>
          </div>

          <nav className="foot-col first" aria-label="Product">
            <h2>Product</h2>
            <ul>
              <li><Link href="/how-it-works">How it works</Link></li>
              <li><Link href="/how-it-works#supported-agents">Supported agents</Link></li>
              <li><Link href="/how-it-works#questions">Questions</Link></li>
            </ul>
          </nav>

          <nav className="foot-col" aria-label="Research">
            <h2>Research</h2>
            <ul>
              <li><Link href="/research/biological-memory-architecture">Paper</Link></li>
              <li><Link href="/research/ec-bench">EC-Bench</Link></li>
              <li><Link href="/research#notebook">Notebook</Link></li>
              <li><Link href="/research#archive">Archive</Link></li>
            </ul>
          </nav>

          <nav className="foot-col" aria-label="Project">
            <h2>Project</h2>
            <ul>
              <li><Link href="/about">About</Link></li>
              {isRepoPublic() && repoUrl ? (
                <li>
                  <a href={repoUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                </li>
              ) : null}
              <li>
                <a href={`mailto:${siteConfig.contactEmail}?subject=Reverie`}>Contact</a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="foot-baseline">
          <p>
            Reverie is a research project by {siteConfig.author} (Engineering Cognition).
          </p>
          <p>© 2026</p>
        </div>
      </div>
    </footer>
  );
}
