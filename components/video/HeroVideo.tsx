"use client";

import { useEffect, useId, useRef, useState } from "react";

// The hero product video: silent, muted, looping. It autoplays unless the reader has asked for reduced motion; then it
// shows the poster and waits for play. The pause control is always there (WCAG 2.2.2).
export default function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const summaryId = useId();
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    v.muted = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Autoplay may already have loaded a frame before this runs; resetting the element shows the poster again and
      // waits for play.
      v.removeAttribute("autoplay");
      v.preload = "none";
      v.load();
    }
  }, []);

  function toggle() {
    const v = video.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }

  return (
    <figure className="hero-video">
      <video
        ref={video}
        className="hero-video-player"
        width={1920}
        height={1080}
        src="/homepage/brag.mp4"
        poster="/homepage/brag.jpg"
        muted
        autoPlay
        loop
        playsInline
        aria-label="Short silent animation: how Reverie keeps conclusions you approve."
        aria-describedby={summaryId}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEmptied={() => setPlaying(false)}
      />
      <p id={summaryId} className="sr-only">
        Silent, 68-second animation that loops. It opens with the headline, then shows that most people solve this with
        instruction files, which don’t record what worked, or pasted notes, which get trusted over the code. A conclusion joins memory only after you accept
        it. When new evidence contradicts a conclusion, you choose between the old one and the new one, and the one you
        replace stays on record as superseded. Last month’s conclusion comes back when it is relevant, grounded in the code.
        It ends with the GitHub link and a note that Reverie is early and some conclusions will be wrong.
      </p>
      <figcaption className="hero-video-bar">
        <span className="mono-label">Silent · 68 seconds</span>
        <button
          type="button"
          className="hero-video-toggle"
          aria-label={playing ? "Pause video" : "Play video"}
          onClick={toggle}
        >
          {playing ? "❚❚ pause" : "▶ play"}
        </button>
      </figcaption>
    </figure>
  );
}
