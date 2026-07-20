"use client";

export default function ProblemDiagram() {
  return (
    <svg
      viewBox="0 0 2400 900"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Engineering understanding is repeatedly reconstructed, never accumulated"
    >
      <title>Engineering Understanding is Repeatedly Reconstructed</title>
      <desc>
        A research-style diagram showing how human engineers accumulate
        understanding across sessions while AI coding agents must rebuild it
        from scratch every time.
      </desc>

      <rect width="2400" height="900" fill="none" />

      {/* ═══════════════════════════════════════════════════════════════
         LEFT SECTION — Repository → Session → Task Complete → Closed
         ═══════════════════════════════════════════════════════════════ */}
      <g>
        {/* Repository icon */}
        <rect x="120" y="390" width="70" height="55" rx="1" fill="none" stroke="#9CA3AF" strokeWidth="1.5" />
        <rect x="135" y="376" width="32" height="18" rx="1" fill="none" stroke="#9CA3AF" strokeWidth="1.5" />
        <line x1="120" y1="418" x2="190" y2="418" stroke="#9CA3AF" strokeWidth="1.5" />
        <text x="155" y="468" textAnchor="middle" fontSize="16" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Repository
        </text>

        {/* Arrow right */}
        <line x1="220" y1="418" x2="280" y2="418" stroke="#9CA3AF" strokeWidth="1" opacity="0.4" />
        <polyline points="273,412 283,418 273,424" fill="none" stroke="#9CA3AF" strokeWidth="1" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Session #1 — Notebook page */}
        <rect x="300" y="300" width="300" height="236" rx="0" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.5" />
        <line x1="320" y1="340" x2="580" y2="340" stroke="#E5E7EB" strokeWidth="0.5" />
        <text x="450" y="325" textAnchor="middle" fontSize="18" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Session #1
        </text>
        <line x1="320" y1="360" x2="580" y2="360" stroke="#E5E7EB" strokeWidth="0.5" />

        {/* Bullets */}
        <g transform="translate(340, 395)">
          <circle cx="0" cy="0" r="2.5" fill="#1A1A1A" />
          <text x="14" y="4" fontSize="15" fill="#1A1A1A" letterSpacing="-0.01em">Explore repository</text>
        </g>
        <g transform="translate(340, 435)">
          <circle cx="0" cy="0" r="2.5" fill="#1A1A1A" />
          <text x="14" y="4" fontSize="15" fill="#1A1A1A" letterSpacing="-0.01em">Build understanding</text>
        </g>
        <g transform="translate(340, 475)">
          <circle cx="0" cy="0" r="2.5" fill="#1A1A1A" />
          <text x="14" y="4" fontSize="15" fill="#1A1A1A" letterSpacing="-0.01em">Solve task</text>
        </g>
        <line x1="320" y1="520" x2="580" y2="520" stroke="#E5E7EB" strokeWidth="0.5" />

        {/* Arrow right */}
        <line x1="620" y1="418" x2="720" y2="418" stroke="#9CA3AF" strokeWidth="1" opacity="0.4" />
        <polyline points="713,412 723,418 713,424" fill="none" stroke="#9CA3AF" strokeWidth="1" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Task Complete */}
        <text x="810" y="425" textAnchor="middle" fontSize="18" fontWeight="500" fill="#16A34A">
          ✓ Task Complete
        </text>

        {/* Arrow right */}
        <line x1="870" y1="418" x2="970" y2="418" stroke="#9CA3AF" strokeWidth="1" opacity="0.4" />
        <polyline points="963,412 973,418 963,424" fill="none" stroke="#9CA3AF" strokeWidth="1" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Session Closed */}
        <text x="1080" y="425" textAnchor="middle" fontSize="16" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Session Closed
        </text>
      </g>

      {/* ═══════════════════════════════════════════════════════════════
         DIVIDER (vertical)
         ═══════════════════════════════════════════════════════════════ */}
      <line x1="1200" y1="200" x2="1200" y2="700" stroke="#E5E7EB" strokeWidth="0.5" />

      {/* ═══════════════════════════════════════════════════════════════
         TOP RIGHT — Human Engineer
         ═══════════════════════════════════════════════════════════════ */}
      <g>
        <text x="1350" y="250" textAnchor="start" fontSize="18" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Human Engineer
        </text>

        {/* Understanding bar — fully filled */}
        <rect x="1350" y="280" width="280" height="10" rx="5" fill="#B8C5D9" />

        <text x="1350" y="315" textAnchor="start" fontSize="13" fill="#6B6B6B" letterSpacing="-0.01em">
          Understanding retained
        </text>

        {/* Arrow down */}
        <line x1="1490" y1="340" x2="1490" y2="380" stroke="#9CA3AF" strokeWidth="1" opacity="0.4" />
        <polyline points="1484,373 1490,383 1496,373" fill="none" stroke="#9CA3AF" strokeWidth="1" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />

        <text x="1350" y="415" textAnchor="start" fontSize="16" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Session #2
        </text>

        <text x="1350" y="445" textAnchor="start" fontSize="13" fill="#6B6B6B" letterSpacing="-0.01em">
          Continues from prior understanding
        </text>
      </g>

      {/* ═══════════════════════════════════════════════════════════════
         BOTTOM RIGHT — AI Coding Agent
         ═══════════════════════════════════════════════════════════════ */}
      <g>
        <text x="1350" y="560" textAnchor="start" fontSize="18" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          AI Coding Agent
        </text>

        {/* Understanding bar — fragmented / fading */}
        <rect x="1350" y="590" width="280" height="10" rx="5" fill="#E5E7EB" />
        <rect x="1350" y="590" width="70" height="10" rx="5" fill="#D1D5DB" opacity="0.7" />
        <rect x="1430" y="590" width="50" height="10" rx="5" fill="#D1D5DB" opacity="0.45" />
        <rect x="1490" y="590" width="35" height="10" rx="5" fill="#D1D5DB" opacity="0.28" />
        <rect x="1535" y="590" width="22" height="10" rx="5" fill="#D1D5DB" opacity="0.16" />
        <rect x="1567" y="590" width="14" height="10" rx="5" fill="#D1D5DB" opacity="0.1" />

        <text x="1350" y="625" textAnchor="start" fontSize="13" fill="#6B6B6B" letterSpacing="-0.01em">
          Understanding discarded
        </text>

        {/* Arrow down */}
        <line x1="1490" y1="650" x2="1490" y2="690" stroke="#9CA3AF" strokeWidth="1" opacity="0.4" />
        <polyline points="1484,683 1490,693 1496,683" fill="none" stroke="#9CA3AF" strokeWidth="1" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Session #2 — Notebook page */}
        <rect x="1350" y="710" width="280" height="180" rx="0" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.5" />
        <line x1="1370" y1="750" x2="1610" y2="750" stroke="#E5E7EB" strokeWidth="0.5" />
        <text x="1490" y="735" textAnchor="middle" fontSize="18" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Session #2
        </text>
        <line x1="1370" y1="770" x2="1610" y2="770" stroke="#E5E7EB" strokeWidth="0.5" />

        {/* Question mark */}
        <text x="1490" y="805" textAnchor="middle" fontSize="28" fill="#9CA3AF" fontWeight="300">
          ?
        </text>

        {/* Bullets */}
        <g transform="translate(1390, 840)">
          <circle cx="0" cy="0" r="2.5" fill="#1A1A1A" />
          <text x="14" y="4" fontSize="14" fill="#1A1A1A" letterSpacing="-0.01em">Explore repository</text>
        </g>
        <g transform="translate(1390, 868)">
          <circle cx="0" cy="0" r="2.5" fill="#1A1A1A" />
          <text x="14" y="4" fontSize="14" fill="#1A1A1A" letterSpacing="-0.01em">Rebuild understanding</text>
        </g>
        <line x1="1370" y1="890" x2="1610" y2="890" stroke="#E5E7EB" strokeWidth="0.5" />
      </g>

      {/* Circular arrow */}
      <path
        d="M1450,930 A 25,25 0 1,1 1530,930"
        fill="none"
        stroke="#9CA3AF"
        strokeWidth="1"
        opacity="0.35"
        strokeLinecap="round"
      />
      <polyline points="1522,922 1534,930 1522,938" fill="none" stroke="#9CA3AF" strokeWidth="1" opacity="0.35" strokeLinecap="round" strokeLinejoin="round" />

      <text x="1490" y="975" textAnchor="middle" fontSize="14" fill="#6B6B6B" letterSpacing="-0.01em">
        Same investigation. Again.
      </text>

      {/* ═══════════════════════════════════════════════════════════════
         CONCLUSION (far right)
         ═══════════════════════════════════════════════════════════════ */}
      <g>
        <line x1="1780" y1="330" x2="1780" y2="570" stroke="#E5E7EB" strokeWidth="0.5" />

        <text x="1900" y="380" textAnchor="middle" fontSize="22" fontWeight="400" fill="#1A1A1A" letterSpacing="-0.02em">
          Engineering understanding
        </text>

        <text x="1900" y="430" textAnchor="middle" fontSize="30" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.02em">
          is repeatedly reconstructed.
        </text>

        <text x="1900" y="510" textAnchor="middle" fontSize="38" fontWeight="600" fill="#1A1A1A" letterSpacing="-0.02em">
          Never accumulated.
        </text>
      </g>
    </svg>
  );
}
