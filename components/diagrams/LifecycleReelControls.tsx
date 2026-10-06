"use client";

import { useEffect, useState } from "react";

/** "auto" plays the reel, "hold" pauses it where it is, a number shows that stage until play is pressed. */
type Mode = "auto" | "hold" | number;

/**
 * F2 controls: the six progress segments are buttons that show their stage, plus a pause/play toggle.
 * The cards are server-rendered; this toggles `lc-manual` / `lc-hold` on #lc-reel and `is-sel` on the chosen card.
 */
export default function LifecycleReelControls({ labels, step }: { labels: string[]; step: number }) {
  const [mode, setMode] = useState<Mode>("auto");
  const sel = typeof mode === "number" ? mode : null;

  useEffect(() => {
    const reel = document.getElementById("lc-reel");
    if (!reel) return;
    reel.classList.toggle("lc-manual", sel !== null);
    reel.classList.toggle("lc-hold", mode === "hold");
    reel.querySelectorAll(".lc-card").forEach((card, i) => card.classList.toggle("is-sel", i === sel));
  }, [mode, sel]);

  const state = sel !== null ? " lc-manual" : mode === "hold" ? " lc-hold" : "";
  return (
    <div className={`lc-dots${state}`} role="group" aria-label="Stages of the conclusion">
      {labels.map((label, i) => (
        <button
          key={i}
          type="button"
          className={`lc-seg${i === sel ? " is-sel" : ""}`}
          style={{ animationDelay: `${i * step}s` }}
          title={label}
          aria-label={`Stage ${i + 1} of ${labels.length}: ${label}`}
          aria-pressed={i === sel}
          onClick={() => setMode(i)}
        />
      ))}
      <button
        type="button"
        className="lc-toggle"
        aria-label={mode === "auto" ? "Pause stages" : "Play stages"}
        onClick={() => setMode(mode === "auto" ? "hold" : "auto")}
      >
        {mode === "auto" ? "❚❚ pause" : "▶ play"}
      </button>
    </div>
  );
}
