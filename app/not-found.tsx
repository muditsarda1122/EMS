import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page doesn’t exist. Reverie is the current name of EMS.",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="wrap" style={{ paddingTop: 88 }}>
      <h1 className="t-h1" style={{ maxWidth: "14em" }}>
        This page doesn&rsquo;t exist.
      </h1>
      <p className="t-lead" style={{ marginTop: 24, maxWidth: "32em" }}>
        If you followed an old link to EMS: Reverie is its current name.
      </p>
      <ul
        style={{
          listStyle: "none",
          margin: "32px 0 0",
          padding: 0,
          display: "flex",
          flexWrap: "wrap",
          gap: "12px 28px",
        }}
      >
        <li><Link href="/" className="arrow-link">Home</Link></li>
        <li><Link href="/how-it-works" className="arrow-link">How it works</Link></li>
        <li><Link href="/research" className="arrow-link">Research</Link></li>
      </ul>
    </div>
  );
}
