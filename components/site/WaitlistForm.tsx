"use client";

import Script from "next/script";
import { siteConfig } from "@/content/site.config";

declare global {
  interface Window {
    Tally?: { loadEmbeds?: () => void };
  }
}

/** Tally's embed: name and work email, configured in Tally. Until the form id is set, show the email instead. */
export default function WaitlistForm() {
  const formId = siteConfig.waitlist.tallyFormId;

  if (!formId) {
    return (
      <p>
        The waitlist opens soon. Until then, email{" "}
        <a className="text-link" href={`mailto:${siteConfig.contactEmail}?subject=Reverie waitlist`}>
          {siteConfig.contactEmail}
        </a>
        .
      </p>
    );
  }

  return (
    <>
      <iframe
        data-tally-src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`}
        loading="lazy"
        width="100%"
        height="320"
        style={{ border: 0 }}
        title="Join the Reverie waitlist"
      />
      <Script
        src="https://tally.so/widgets/embed.js"
        strategy="afterInteractive"
        onLoad={() => window.Tally?.loadEmbeds?.()}
      />
    </>
  );
}
