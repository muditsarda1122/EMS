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
          viewBox="0 0 1200 360"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="How Engineering Cognition emerges: from Memory through Understanding and Engineering Beliefs"
        >
          <title>Conceptual Evolution</title>
          <desc>
            A visual showing how Engineering Cognition emerges from Memory through
            Understanding and Engineering Beliefs.
          </desc>

          <rect width="1200" height="360" fill="none" />

          <defs>
            <marker
              id="arrow-right"
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
             ARROWS & BLUE BALLS (drawn behind circles)
             ═══════════════════════════════════════════════════════════════ */}

          {/* Arrow 1 — Memory → Understanding */}
          <g>
            <line
              x1="120"
              y1="180"
              x2="320"
              y2="180"
              stroke="#8A9AAF"
              strokeWidth="0.8"
              opacity="0.4"
              markerEnd="url(#arrow-right)"
            />
            <circle cx="176" cy="180" r="2" fill="#4A6FA5" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
              <animate attributeName="cx" values="176;320;176" dur="3s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Arrow 2 — Understanding → Engineering Beliefs */}
          <g>
            <line
              x1="384"
              y1="180"
              x2="594"
              y2="180"
              stroke="#8A9AAF"
              strokeWidth="0.8"
              opacity="0.4"
              markerEnd="url(#arrow-right)"
            />
            <circle cx="448" cy="180" r="2" fill="#4A6FA5" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.5s" repeatCount="indefinite" />
              <animate attributeName="cx" values="448;594;448" dur="3.5s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Arrow 3 — Engineering Beliefs → Engineering Cognition */}
          <g>
            <line
              x1="668"
              y1="180"
              x2="888"
              y2="180"
              stroke="#8A9AAF"
              strokeWidth="0.8"
              opacity="0.4"
              markerEnd="url(#arrow-right)"
            />
            <circle cx="742" cy="180" r="2" fill="#4A6FA5" opacity="0.4">
              <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.2s" repeatCount="indefinite" />
              <animate attributeName="cx" values="742;888;742" dur="3.2s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* ═══════════════════════════════════════════════════════════════
             CIRCLE 1 — Memory (smallest)
             ═══════════════════════════════════════════════════════════════ */}
          <g>
            <circle cx="120" cy="180" r="56" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.8" />
            <text x="120" y="174" textAnchor="middle" fontSize="14" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
              Memory
            </text>
            <text x="120" y="192" textAnchor="middle" fontSize="10" fill="#6B6B6B">
              Stores observations
            </text>
          </g>

          {/* ═══════════════════════════════════════════════════════════════
             CIRCLE 2 — Understanding (medium)
             ═══════════════════════════════════════════════════════════════ */}
          <g>
            <circle cx="384" cy="180" r="64" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.8" />
            <text x="384" y="174" textAnchor="middle" fontSize="14" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
              Understanding
            </text>
            <text x="384" y="192" textAnchor="middle" fontSize="10" fill="#6B6B6B">
              Connects observations
            </text>
          </g>

          {/* ═══════════════════════════════════════════════════════════════
             CIRCLE 3 — Engineering Beliefs (slightly larger)
             ═══════════════════════════════════════════════════════════════ */}
          <g>
            <circle cx="668" cy="180" r="74" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.8" />
            <text x="668" y="174" textAnchor="middle" fontSize="14" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
              Engineering Beliefs
            </text>
            <text x="668" y="192" textAnchor="middle" fontSize="10" fill="#6B6B6B">
              Reusable understanding
            </text>
          </g>

          {/* ═══════════════════════════════════════════════════════════════
             CIRCLE 4 — Engineering Cognition (largest, destination)
             ═══════════════════════════════════════════════════════════════ */}
          <g>
            <circle cx="984" cy="180" r="96" fill="#FAFAFA" stroke="#1A1A1A" strokeWidth="1.2" />
            <text x="984" y="174" textAnchor="middle" fontSize="14" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
              Engineering Cognition
            </text>
            <text x="984" y="192" textAnchor="middle" fontSize="10" fill="#6B6B6B">
              Continuously evolving understanding
            </text>
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
