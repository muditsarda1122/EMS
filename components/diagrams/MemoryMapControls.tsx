"use client";

import { useEffect, useState } from "react";

/** Pause button and off-screen pause for the memory map (M1). Toggles `.paused` on #mm. */
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
  }, [userPaused, visible]);

  return (
    <button
      type="button"
      className="mm-toggle"
      aria-label={userPaused ? "Play animation" : "Pause animation"}
      onClick={() => setUserPaused((p) => !p)}
    >
      {userPaused ? "▶ play" : "❚❚ pause"}
    </button>
  );
}
