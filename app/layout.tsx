import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import AnimateSections from "@/components/animate-sections";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EMS — Engineering Cognition",
    template: "%s | EMS",
  },
  description:
    "Engineering Cognition investigates how software engineering agents can continuously construct, maintain and reuse engineering understanding across long-running development workflows.",
  keywords: [
    "engineering cognition",
    "software engineering",
    "LLM agents",
    "engineering memory",
    "EC-Bench",
  ],
  authors: [{ name: "Mudit Sarda" }],
  openGraph: {
    title: "EMS — Engineering Cognition",
    description:
      "Building systems that accumulate engineering understanding.",
    type: "website",
    locale: "en_US",
    siteName: "EMS",
  },
  twitter: {
    card: "summary_large_image",
    title: "EMS — Engineering Cognition",
    description:
      "Building systems that accumulate engineering understanding.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  name: "EMS Research",
                  description:
                    "Engineering Cognition research laboratory investigating how software engineering agents accumulate understanding.",
                  url: "https://ems.dev",
                  sameAs: ["https://github.com"],
                  founder: {
                    "@type": "Person",
                    name: "Mudit Sarda",
                  },
                },
                {
                  "@type": "ResearchProject",
                  name: "Engineering Cognition",
                  description:
                    "A research program investigating whether engineering understanding can become a computational object.",
                  url: "https://ems.dev",
                  sponsor: {
                    "@type": "Organization",
                    name: "EMS Research",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-primary focus:rounded-md focus:shadow-sm"
        >
          Skip to content
        </a>
        <Navigation />
        <AnimateSections />
        <main id="main-content" className="flex-1 animate-fade-in">
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
