export default function ResearchGraph() {
  return (
    <svg
      viewBox="0 0 600 340"
      className="w-full max-w-2xl mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Animated research graph showing convergence toward Engineering Cognition"
    >
      <title>Research convergence graph</title>
      <desc>
        A research graph showing EMS, EC-Bench, Technical Report, and Experiment Paper
        all converging toward Engineering Cognition as the central research direction.
      </desc>

      <rect width="600" height="340" fill="none" />

      {/* Background */}
      <rect width="600" height="340" fill="#FAFAF8" opacity="0.5" />

      {/* Central hub — Engineering Cognition */}
      <g>
        <circle cx="300" cy="170" r="45" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" opacity="0.95">
          <animate attributeName="opacity" values="0.9;1;0.9" dur="5s" repeatCount="indefinite" />
          <animate attributeName="r" values="45;47;45" dur="6s" repeatCount="indefinite" />
        </circle>
        <text x="300" y="160" textAnchor="middle" fontSize="11" fontWeight="500" fill="#1A1A1A">
          Engineering
        </text>
        <text x="300" y="175" textAnchor="middle" fontSize="11" fontWeight="500" fill="#1A1A1A">
          Cognition
        </text>
        <text x="300" y="190" textAnchor="middle" fontSize="8" fill="#6B6B6B">
          central question
        </text>
      </g>

      {/* Surrounding nodes */}
      {/* EMS */}
      <g>
        <circle cx="120" cy="100" r="28" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1" opacity="0.85">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="7s" repeatCount="indefinite" />
        </circle>
        <text x="120" y="97" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">EMS</text>
        <text x="120" y="108" textAnchor="middle" fontSize="8" fill="#6B6B6B">system</text>
      </g>

      {/* EC-Bench */}
      <g>
        <circle cx="120" cy="240" r="28" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1" opacity="0.85">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="8s" repeatCount="indefinite" />
        </circle>
        <text x="120" y="237" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">EC-Bench</text>
        <text x="120" y="248" textAnchor="middle" fontSize="8" fill="#6B6B6B">benchmark</text>
      </g>

      {/* Technical Report */}
      <g>
        <circle cx="480" cy="100" r="30" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1" opacity="0.85">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="6s" repeatCount="indefinite" />
        </circle>
        <text x="480" y="95" textAnchor="middle" fontSize="9" fontWeight="500" fill="#1A1A1A">Technical</text>
        <text x="480" y="106" textAnchor="middle" fontSize="9" fontWeight="500" fill="#1A1A1A">Report</text>
        <text x="480" y="117" textAnchor="middle" fontSize="8" fill="#6B6B6B">60 pages</text>
      </g>

      {/* Experiment Paper */}
      <g>
        <circle cx="480" cy="240" r="30" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1" opacity="0.85">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="9s" repeatCount="indefinite" />
        </circle>
        <text x="480" y="235" textAnchor="middle" fontSize="9" fontWeight="500" fill="#1A1A1A">Experiment</text>
        <text x="480" y="246" textAnchor="middle" fontSize="9" fontWeight="500" fill="#1A1A1A">Paper</text>
        <text x="480" y="257" textAnchor="middle" fontSize="8" fill="#6B6B6B">findings</text>
      </g>

      {/* Converging connections */}
      {/* EMS → Engineering Cognition */}
      <line x1="146" y1="110" x2="260" y2="155" stroke="#4A6FA5" strokeWidth="1" opacity="0.3">
        <animate attributeName="opacity" values="0.2;0.45;0.2" dur="5s" repeatCount="indefinite" />
        <animate attributeName="stroke-width" values="1;1.5;1" dur="5s" repeatCount="indefinite" />
      </line>

      {/* EC-Bench → Engineering Cognition */}
      <line x1="146" y1="230" x2="260" y2="185" stroke="#4A6FA5" strokeWidth="1" opacity="0.3">
        <animate attributeName="opacity" values="0.2;0.45;0.2" dur="6s" repeatCount="indefinite" />
        <animate attributeName="stroke-width" values="1;1.5;1" dur="6s" repeatCount="indefinite" />
      </line>

      {/* Technical Report → Engineering Cognition */}
      <line x1="454" y1="110" x2="340" y2="155" stroke="#4A6FA5" strokeWidth="1" opacity="0.3">
        <animate attributeName="opacity" values="0.2;0.45;0.2" dur="7s" repeatCount="indefinite" />
        <animate attributeName="stroke-width" values="1;1.5;1" dur="7s" repeatCount="indefinite" />
      </line>

      {/* Experiment Paper → Engineering Cognition */}
      <line x1="454" y1="230" x2="340" y2="185" stroke="#4A6FA5" strokeWidth="1" opacity="0.3">
        <animate attributeName="opacity" values="0.2;0.45;0.2" dur="8s" repeatCount="indefinite" />
        <animate attributeName="stroke-width" values="1;1.5;1" dur="8s" repeatCount="indefinite" />
      </line>

      {/* Cross-connections for richness */}
      <line x1="146" y1="100" x2="454" y2="100" stroke="#4A6FA5" strokeWidth="0.5" opacity="0.08">
        <animate attributeName="opacity" values="0.05;0.15;0.05" dur="12s" repeatCount="indefinite" />
      </line>
      <line x1="146" y1="240" x2="454" y2="240" stroke="#4A6FA5" strokeWidth="0.5" opacity="0.08">
        <animate attributeName="opacity" values="0.05;0.15;0.05" dur="13s" repeatCount="indefinite" />
      </line>

      {/* Orbital rings */}
      <ellipse cx="300" cy="170" rx="200" ry="120" fill="none" stroke="rgba(74,111,165,0.04)" strokeWidth="1" strokeDasharray="4 4">
        <animateTransform attributeName="transform" type="rotate" from="0 300 170" to="360 300 170" dur="90s" repeatCount="indefinite" />
      </ellipse>

      {/* Floating data particles */}
      <g opacity="0.25">
        <circle cx="200" cy="60" r="3" fill="#4A6FA5">
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="8s" repeatCount="indefinite" />
          <animate attributeName="cy" values="60;50;60" dur="8s" repeatCount="indefinite" />
        </circle>
      </g>
      <g opacity="0.25">
        <circle cx="400" cy="280" r="3" fill="#4A6FA5">
          <animate attributeName="opacity" values="0.15;0.4;0.15" dur="10s" repeatCount="indefinite" />
          <animate attributeName="cy" values="280;290;280" dur="10s" repeatCount="indefinite" />
        </circle>
      </g>
      <g opacity="0.2">
        <circle cx="280" cy="300" r="2" fill="#6B6B6B">
          <animate attributeName="opacity" values="0.1;0.3;0.1" dur="12s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Subtle label */}
      <text x="300" y="330" textAnchor="middle" fontSize="9" fill="#6B6B6B" opacity="0.4" letterSpacing="2">
        all research converges here
      </text>
    </svg>
  );
}
