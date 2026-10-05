import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SiteNav from "@/components/site/SiteNav";
import SiteFooter from "@/components/site/SiteFooter";
import { DiagramDefs } from "@/components/diagrams/primitives";
import { siteConfig, getCta } from "@/content/site.config";

const serif = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  fallback: ["Georgia", "ui-serif", "serif"],
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  fallback: ["ui-monospace", "Menlo", "monospace"],
});

export const metadata: Metadata = {
  // TODO(fact): P7. No domain yet, so no metadataBase; set `domain` in site.config.ts to switch on absolute URLs.
  ...(siteConfig.domain ? { metadataBase: new URL(`https://${siteConfig.domain}`) } : {}),
  title: {
    default: "Reverie — memory for coding agents",
    template: "%s · Reverie",
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.author }],
  openGraph: {
    title: "Reverie — memory for coding agents",
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Reverie — memory for coding agents",
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ResearchProject",
      name: "Reverie",
      description:
        "Memory for coding agents, built from a research program on engineering cognition.",
      founder: { "@id": "#author" },
    },
    {
      "@type": "Person",
      "@id": "#author",
      name: siteConfig.author,
      email: siteConfig.contactEmail,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <a
          href="#main-content"
          className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <DiagramDefs />
        <SiteNav items={siteConfig.nav} cta={getCta()} />
        <main id="main-content" tabIndex={-1} style={{ outline: "none" }} className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
