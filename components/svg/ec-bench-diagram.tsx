"use client";

export default function EcBenchDiagram() {
  return (
    <svg
      viewBox="0 0 2000 620"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="EC-Bench measures accumulated engineering understanding across sessions"
    >
      <title>EC-Bench Trajectory</title>
      <desc>
        A minimal research-style figure showing how EC-Bench evaluates
        trajectories of accumulated engineering understanding over multiple
        sessions, rather than isolated benchmark scores.
      </desc>

      <rect width="2000" height="620" fill="none" />

      {/* ═══════════════════════════════════════════════════════════════
         AXES — thin, editorial, neutral gray
         ═══════════════════════════════════════════════════════════════ */}
      <g opacity="0.4">
        {/* Y axis */}
        <line x1="400" y1="480" x2="400" y2="220" stroke="#9CA3AF" strokeWidth="1" />
        {/* Y axis arrowhead */}
        <polyline
          points="394,230 400,220 406,230"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* X axis */}
        <line x1="400" y1="480" x2="1600" y2="480" stroke="#9CA3AF" strokeWidth="1" />
        {/* X axis arrowhead */}
        <polyline
          points="1590,474 1600,480 1590,486"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Axis labels */}
      <text
        x="350"
        y="350"
        transform="rotate(-90 350 350)"
        textAnchor="middle"
        fontSize="14"
        fontWeight="500"
        fill="#6B6B6B"
        letterSpacing="-0.01em"
      >
        Accumulated Engineering Understanding
      </text>
      <text
        x="1000"
        y="520"
        textAnchor="middle"
        fontSize="14"
        fontWeight="500"
        fill="#6B6B6B"
        letterSpacing="-0.01em"
      >
        Engineering Sessions
      </text>

      {/* ═══════════════════════════════════════════════════════════════
         TRAJECTORY — 7 points, gently increasing, thin editorial line
         ═══════════════════════════════════════════════════════════════ */}
      <g>
        {/* Connecting line */}
        <polyline
          points="520,445 700,415 880,395 1060,360 1240,335 1420,300 1580,270"
          fill="none"
          stroke="#4A6FA5"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />

        {/* Data points */}
        <circle cx="520" cy="445" r="3.5" fill="#4A6FA5" />
        <circle cx="700" cy="415" r="3.5" fill="#4A6FA5" />
        <circle cx="880" cy="395" r="3.5" fill="#4A6FA5" />
        <circle cx="1060" cy="360" r="3.5" fill="#4A6FA5" />
        <circle cx="1240" cy="335" r="3.5" fill="#4A6FA5" />
        <circle cx="1420" cy="300" r="3.5" fill="#4A6FA5" />
        <circle cx="1580" cy="270" r="3.5" fill="#4A6FA5" />
      </g>

      {/* ═══════════════════════════════════════════════════════════════
         LABEL — quiet label near final point
         ═══════════════════════════════════════════════════════════════ */}
      <text
        x="1630"
        y="275"
        textAnchor="start"
        fontSize="15"
        fontWeight="500"
        fill="#1A1A1A"
        letterSpacing="-0.01em"
      >
        EC-Bench
      </text>

      {/* ═══════════════════════════════════════════════════════════════
         CAPTION — centered beneath the graph
         ═══════════════════════════════════════════════════════════════ */}
      <text
        x="1000"
        y="585"
        textAnchor="middle"
        fontSize="20"
        fill="#6B6B6B"
        letterSpacing="-0.01em"
      >
        Traditional benchmarks evaluate points.
      </text>
      <text
        x="1000"
        y="615"
        textAnchor="middle"
        fontSize="22"
        fontWeight="500"
        fill="#1A1A1A"
        letterSpacing="-0.01em"
      >
        EC-Bench evaluates trajectories.
      </text>
    </svg>
  );
}
