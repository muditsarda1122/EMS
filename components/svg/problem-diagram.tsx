"use client";

export default function ProblemDiagram() {
  return (
    <figure className="w-full">
      <svg
        viewBox="0 0 1000 630"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Human engineers accumulate understanding over sessions. AI coding agents repeatedly reconstruct it."
        style={{ fontFamily: "var(--font-inter), ui-sans-serif, system-ui, sans-serif" }}
      >
        <title>Accumulation vs Reconstruction</title>
        <desc>
          A minimal scientific figure comparing engineering understanding
          across sessions. The human engineer line shows continuous
          accumulation. The AI coding agent line shows a sawtooth pattern
          of repeated reconstruction and forgetting.
        </desc>

        <rect width="1000" height="630" fill="none" />

        {/* ─── Axes ─── */}
        <line
          x1="160"
          y1="520"
          x2="940"
          y2="520"
          stroke="#1A1A1A"
          strokeWidth="1.5"
        />
        <line
          x1="160"
          y1="520"
          x2="160"
          y2="110"
          stroke="#1A1A1A"
          strokeWidth="1.5"
        />

        {/* ─── Axis Labels ─── */}
        <text
          x="100"
          y="315"
          textAnchor="middle"
          fontSize="15"
          fontWeight="500"
          fill="#6B6B6B"
          letterSpacing="0.02em"
          transform="rotate(-90, 100, 315)"
        >
          Engineering Understanding
        </text>
        <text
          x="550"
          y="555"
          textAnchor="middle"
          fontSize="15"
          fontWeight="500"
          fill="#6B6B6B"
          letterSpacing="0.02em"
        >
          Engineering Sessions
        </text>

        {/* ─── Blue line — Human Engineer ─── */}
        <path
          d="M 160 460 C 380 420, 620 300, 940 130"
          fill="none"
          stroke="#4A6FA5"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* ─── Grey sawtooth — AI Coding Agent ─── */}
        <polyline
          points="160,510 225,340 290,510 355,340 420,510 485,340 550,510 615,340 680,510 745,340 810,510 875,340 940,510"
          fill="none"
          stroke="#9CA3AF"
          strokeWidth="2.5"
          strokeLinejoin="miter"
        />

        {/* ─── Legend ─── */}
        <line
          x1="310"
          y1="590"
          x2="340"
          y2="590"
          stroke="#4A6FA5"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <text
          x="355"
          y="595"
          fontSize="15"
          fontWeight="500"
          fill="#6B6B6B"
          letterSpacing="-0.01em"
        >
          Human Engineer
        </text>

        <line
          x1="515"
          y1="590"
          x2="545"
          y2="590"
          stroke="#9CA3AF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <text
          x="560"
          y="595"
          fontSize="15"
          fontWeight="500"
          fill="#6B6B6B"
          letterSpacing="-0.01em"
        >
          AI Coding Agent
        </text>
      </svg>

      <figcaption className="mt-8 text-center space-y-2">
        <p className="text-xl sm:text-2xl font-medium text-primary tracking-tight">
          Humans accumulate engineering understanding.
        </p>
        <p className="text-xl sm:text-2xl font-medium text-primary tracking-tight">
          Today&apos;s coding agents repeatedly reconstruct it.
        </p>
      </figcaption>
    </figure>
  );
}
