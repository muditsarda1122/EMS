"use client";

import { useEffect, useState } from "react";

/** Pause button and off-screen pause for the memory map (M1), toggling `.paused` on #mm. The button also pauses F2 below it. */
export default function MemoryMapControls() {
  const [userPaused, setUserPaused] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const mm = document.getElementById("mm");
    if (!mm || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setVisible(e.intersectionRatio >= 0.3), { threshold: [0, 0.3, 1] });
    io.observe(mm);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const mm = document.getElementById("mm");
    if (!mm) return;
    mm.classList.toggle("paused", userPaused || !visible);
    mm.closest("figure")?.classList.toggle("lc-paused", userPaused);
  }, [userPaused, visible]);

  return (
    <button
      type="button"
      className="mm-toggle"
      aria-label={userPaused ? "Play animations" : "Pause animations"}
      onClick={() => setUserPaused((p) => !p)}
    >
      {userPaused ? "▶ play" : "❚❚ pause"}
    </button>
  );
}
