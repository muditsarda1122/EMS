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
              <li><Link href="/how-it-works#faq">Questions</Link></li>
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
          <p className="foot-credit">
            Reverie is a research project by {siteConfig.author}
            <a
              className="foot-social"
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${siteConfig.author} on LinkedIn (opens in a new tab)`}
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="currentColor"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </p>
          <p>© 2026</p>
        </div>
      </div>
    </footer>
  );
}
