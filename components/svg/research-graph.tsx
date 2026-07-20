"use client";

export default function ResearchGraph() {
  return (
    <svg
      viewBox="0 0 1200 720"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Research agenda overview: Engineering Cognition as the central question with five surrounding research programs"
    >
      <title>Research Agenda Overview</title>
      <desc>
        A research roadmap showing Engineering Cognition as the central question,
        with five connected research programs orbiting it: Understanding,
        Knowledge Extraction, Systems Architecture, Continuous Evolution, and Measurement.
      </desc>

      <rect width="1200" height="720" fill="none" />

      <defs>
        <marker
          id="arrow-to-center"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#8A9AAF" opacity="0.4" />
        </marker>
      </defs>

      {/* ─── Arrows from outer circles to centre ─── */}
      <g stroke="#8A9AAF" strokeWidth="0.8" opacity="0.4">
        <line x1="260" y1="240" x2="523.1" y2="363.8" markerEnd="url(#arrow-to-center)" />
        <line x1="220" y1="520" x2="519.0" y2="425.6" markerEnd="url(#arrow-to-center)" />
        <line x1="600" y1="630" x2="600" y2="485" markerEnd="url(#arrow-to-center)" />
        <line x1="980" y1="520" x2="681.0" y2="425.6" markerEnd="url(#arrow-to-center)" />
        <line x1="940" y1="240" x2="676.9" y2="363.8" markerEnd="url(#arrow-to-center)" />
      </g>

      {/* ─── Blue balls travelling along arrows ─── */}
      <g>
        <circle cx="307.1" cy="262.1" r="2" fill="#4A6FA5" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
          <animate attributeName="cx" values="307.1;523.1;307.1" dur="3s" repeatCount="indefinite" />
          <animate attributeName="cy" values="262.1;363.8;262.1" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="277.2" cy="501.9" r="2" fill="#4A6FA5" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="cx" values="277.2;519.0;277.2" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="cy" values="501.9;425.6;501.9" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="600" cy="574" r="2" fill="#4A6FA5" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.8s" repeatCount="indefinite" />
          <animate attributeName="cy" values="574;485;574" dur="2.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="928.5" cy="503.7" r="2" fill="#4A6FA5" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.2s" repeatCount="indefinite" />
          <animate attributeName="cx" values="928.5;681.0;928.5" dur="3.2s" repeatCount="indefinite" />
          <animate attributeName="cy" values="503.7;425.6;503.7" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="896.6" cy="260.4" r="2" fill="#4A6FA5" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.8s" repeatCount="indefinite" />
          <animate attributeName="cx" values="896.6;676.9;896.6" dur="3.8s" repeatCount="indefinite" />
          <animate attributeName="cy" values="260.4;363.8;260.4" dur="3.8s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* ═══════════════════════════════════════════════════════════════
         CENTER — Engineering Cognition (largest, dominates)
         ═══════════════════════════════════════════════════════════════ */}
      <g>
        <circle cx="600" cy="400" r="85" fill="#FAFAFA" stroke="#1A1A1A" strokeWidth="1.2" />
        <text x="600" y="385" textAnchor="middle" fontSize="18" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Engineering
        </text>
        <text x="600" y="410" textAnchor="middle" fontSize="18" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Cognition
        </text>
        <text x="600" y="435" textAnchor="middle" fontSize="11" fill="#6B6B6B" letterSpacing="0.02em">
          Central Research Question
        </text>
      </g>

      {/* ═══════════════════════════════════════════════════════════════
         SURROUNDING 1 — Understanding (top-left, medium)
         ═══════════════════════════════════════════════════════════════ */}
      <g>
        <circle cx="260" cy="240" r="52" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.8" />
        <text x="260" y="228" textAnchor="middle" fontSize="13" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Understanding
        </text>
        <text x="260" y="248" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          Engineering beliefs
        </text>
        <text x="260" y="262" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          Mental models
        </text>
        <text x="260" y="276" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          Reasoning
        </text>
      </g>

      {/* ═══════════════════════════════════════════════════════════════
         SURROUNDING 2 — Knowledge Extraction (lower-left, largest)
         ═══════════════════════════════════════════════════════════════ */}
      <g>
        <circle cx="220" cy="520" r="60" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.8" />
        <text x="220" y="498" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Knowledge
        </text>
        <text x="220" y="514" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Extraction
        </text>
        <text x="220" y="534" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          From traces
        </text>
        <text x="220" y="548" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          From conversations
        </text>
        <text x="220" y="562" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          From code
        </text>
      </g>

      {/* ═══════════════════════════════════════════════════════════════
         SURROUNDING 3 — Systems Architecture (bottom-center, medium-large)
         ═══════════════════════════════════════════════════════════════ */}
      <g>
        <circle cx="600" cy="630" r="56" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.8" />
        <text x="600" y="608" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Systems
        </text>
        <text x="600" y="624" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Architecture
        </text>
        <text x="600" y="644" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          EMS
        </text>
        <text x="600" y="658" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          Memory pipeline
        </text>
        <text x="600" y="672" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          Retrieval
        </text>
      </g>

      {/* ═══════════════════════════════════════════════════════════════
         SURROUNDING 4 — Continuous Evolution (lower-right, medium)
         ═══════════════════════════════════════════════════════════════ */}
      <g>
        <circle cx="980" cy="520" r="54" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.8" />
        <text x="980" y="498" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Continuous
        </text>
        <text x="980" y="514" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Evolution
        </text>
        <text x="980" y="534" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          Revision
        </text>
        <text x="980" y="548" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          Maintenance
        </text>
        <text x="980" y="562" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          Forgetting
        </text>
      </g>

      {/* ═══════════════════════════════════════════════════════════════
         SURROUNDING 5 — Measurement (top-right, smallest)
         ═══════════════════════════════════════════════════════════════ */}
      <g>
        <circle cx="940" cy="240" r="48" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.8" />
        <text x="940" y="230" textAnchor="middle" fontSize="13" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Measurement
        </text>
        <text x="940" y="250" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          EC-Bench
        </text>
        <text x="940" y="264" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          Evaluation
        </text>
        <text x="940" y="278" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          Evidence
        </text>
      </g>
    </svg>
  );
}
