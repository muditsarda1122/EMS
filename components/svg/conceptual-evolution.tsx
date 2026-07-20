"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ConceptualEvolution() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [20, 0]);

  return (
    <div ref={containerRef}>
      <motion.div style={{ opacity, y }}>
        <svg
          viewBox="0 0 500 570"
          className="w-full h-auto max-w-lg mx-auto"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="How Engineering Cognition emerges: from Memory through Understanding and Engineering Beliefs"
        >
          <title>Conceptual Evolution</title>
          <desc>
            A visual showing how Engineering Cognition emerges from Memory through
            Understanding and Engineering Beliefs.
          </desc>

          <rect width="500" height="570" fill="none" />

          <defs>
            <marker
              id="arrow-down"
              markerWidth="8"
              markerHeight="6"
              refX="8"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 8 3, 0 6" fill="#8A9AAF" opacity="0.4" />
            </marker>
          </defs>

          {/* ═══════════════════════════════════════════════════════════════
             CIRCLE 1 — Memory (smallest)
             ═══════════════════════════════════════════════════════════════ */}
          <g>
            <circle cx="250" cy="49" r="44" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.8" />
            <text x="250" y="42" textAnchor="middle" fontSize="14" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
              Memory
            </text>
            <text x="250" y="60" textAnchor="middle" fontSize="10" fill="#6B6B6B">
              Stores observations
            </text>
          </g>

          {/* Arrow 1 — Memory → Understanding */}
          <line
            x1="250"
            y1="93"
            x2="250"
            y2="103"
            stroke="#8A9AAF"
            strokeWidth="0.8"
            opacity="0.4"
            markerEnd="url(#arrow-down)"
          />

          {/* ═══════════════════════════════════════════════════════════════
             CIRCLE 2 — Understanding (medium)
             ═══════════════════════════════════════════════════════════════ */}
          <g>
            <circle cx="250" cy="167" r="64" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.8" />
            <text x="250" y="160" textAnchor="middle" fontSize="14" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
              Understanding
            </text>
            <text x="250" y="178" textAnchor="middle" fontSize="10" fill="#6B6B6B">
              Connects observations
            </text>
          </g>

          {/* Arrow 2 — Understanding → Engineering Beliefs */}
          <line
            x1="250"
            y1="231"
            x2="250"
            y2="241"
            stroke="#8A9AAF"
            strokeWidth="0.8"
            opacity="0.4"
            markerEnd="url(#arrow-down)"
          />

          {/* ═══════════════════════════════════════════════════════════════
             CIRCLE 3 — Engineering Beliefs (slightly larger)
             ═══════════════════════════════════════════════════════════════ */}
          <g>
            <circle cx="250" cy="315" r="74" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.8" />
            <text x="250" y="308" textAnchor="middle" fontSize="14" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
              Engineering Beliefs
            </text>
            <text x="250" y="326" textAnchor="middle" fontSize="10" fill="#6B6B6B">
              Reusable understanding
            </text>
          </g>

          {/* Arrow 3 — Engineering Beliefs → Engineering Cognition */}
          <line
            x1="250"
            y1="389"
            x2="250"
            y2="399"
            stroke="#8A9AAF"
            strokeWidth="0.8"
            opacity="0.4"
            markerEnd="url(#arrow-down)"
          />

          {/* ═══════════════════════════════════════════════════════════════
             CIRCLE 4 — Engineering Cognition (largest, destination)
             ═══════════════════════════════════════════════════════════════ */}
          <g>
            <circle cx="250" cy="481" r="82" fill="#FAFAFA" stroke="#1A1A1A" strokeWidth="1.2" />
            <text x="250" y="474" textAnchor="middle" fontSize="14" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
              Engineering Cognition
            </text>
            <text x="250" y="492" textAnchor="middle" fontSize="10" fill="#6B6B6B">
              Continuously evolving understanding
            </text>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
