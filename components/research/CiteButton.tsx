"use client";
// Small client island: copies the BibTeX to the clipboard. Without JavaScript the entry stays readable on the page.
import { useState } from "react";

export default function CiteButton({ text }: { text: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2400);
  }

  return (
    <>
      <button type="button" className="btn btn-secondary btn-sm" onClick={copy}>
        Copy BibTeX
      </button>
      <span role="status" className="cite-status">
        {state === "copied" ? "Copied." : state === "failed" ? "Copy failed. Select the text above instead." : ""}
      </span>
    </>
  );
}
