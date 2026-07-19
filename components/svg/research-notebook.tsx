export default function ResearchNotebook() {
  return (
    <svg
      viewBox="0 0 500 320"
      className="w-full max-w-xl mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Research notebook with loose pages, sketches, and connecting ideas"
    >
      <title>Research notebook</title>
      <desc>
        A calm, minimal illustration of a research notebook with loose pages, 
        sketches, and ideas connecting. Very minimal, very calm.
      </desc>

      <rect width="500" height="320" fill="none" />

      {/* Main notebook page */}
      <g>
        <rect x="140" y="40" width="220" height="160" rx="2" fill="#FFFFFF" stroke="rgba(26,26,26,0.08)" strokeWidth="1" />
        
        {/* Page lines */}
        <line x1="160" y1="70" x2="340" y2="70" stroke="rgba(26,26,26,0.06)" strokeWidth="0.5" />
        <line x1="160" y1="90" x2="340" y2="90" stroke="rgba(26,26,26,0.06)" strokeWidth="0.5" />
        <line x1="160" y1="110" x2="340" y2="110" stroke="rgba(26,26,26,0.06)" strokeWidth="0.5" />
        <line x1="160" y1="130" x2="340" y2="130" stroke="rgba(26,26,26,0.06)" strokeWidth="0.5" />
        <line x1="160" y1="150" x2="340" y2="150" stroke="rgba(26,26,26,0.06)" strokeWidth="0.5" />
        <line x1="160" y1="170" x2="340" y2="170" stroke="rgba(26,26,26,0.06)" strokeWidth="0.5" />

        {/* A sketch on the page */}
        <circle cx="200" cy="100" r="12" fill="none" stroke="#4A6FA5" strokeWidth="0.8" opacity="0.3" />
        <circle cx="240" cy="100" r="8" fill="none" stroke="#4A6FA5" strokeWidth="0.8" opacity="0.2" />
        <line x1="212" y1="100" x2="232" y2="100" stroke="#4A6FA5" strokeWidth="0.5" opacity="0.2" />
        
        {/* Marginal note */}
        <text x="170" y="190" fontSize="7" fill="#6B6B6B" opacity="0.5">hypothesis?</text>
      </g>

      {/* Loose page - upper right, slightly rotated */}
      <g transform="rotate(-8 380 80)">
        <rect x="340" y="30" width="100" height="130" rx="1" fill="#FFFFFF" stroke="rgba(26,26,26,0.06)" strokeWidth="0.8" opacity="0.7">
          <animate attributeName="opacity" values="0.6;0.75;0.6" dur="10s" repeatCount="indefinite" />
        </rect>
        <line x1="355" y1="55" x2="425" y2="55" stroke="rgba(26,26,26,0.04)" strokeWidth="0.5" />
        <line x1="355" y1="75" x2="425" y2="75" stroke="rgba(26,26,26,0.04)" strokeWidth="0.5" />
        <line x1="355" y1="95" x2="425" y2="95" stroke="rgba(26,26,26,0.04)" strokeWidth="0.5" />
        <line x1="355" y1="115" x2="425" y2="115" stroke="rgba(26,26,26,0.04)" strokeWidth="0.5" />
        
        {/* Small sketch */}
        <rect x="365" y="65" width="20" height="15" fill="none" stroke="#4A6FA5" strokeWidth="0.6" opacity="0.25" />
        <circle cx="385" cy="105" r="6" fill="none" stroke="#4A6FA5" strokeWidth="0.6" opacity="0.2" />
      </g>

      {/* Loose page - lower left, slightly rotated */}
      <g transform="rotate(6 80 200)">
        <rect x="40" y="150" width="110" height="140" rx="1" fill="#FFFFFF" stroke="rgba(26,26,26,0.06)" strokeWidth="0.8" opacity="0.6">
          <animate attributeName="opacity" values="0.5;0.7;0.5" dur="12s" repeatCount="indefinite" />
        </rect>
        <line x1="55" y1="175" x2="135" y2="175" stroke="rgba(26,26,26,0.04)" strokeWidth="0.5" />
        <line x1="55" y1="195" x2="135" y2="195" stroke="rgba(26,26,26,0.04)" strokeWidth="0.5" />
        <line x1="55" y1="215" x2="135" y2="215" stroke="rgba(26,26,26,0.04)" strokeWidth="0.5" />
        <line x1="55" y1="235" x2="135" y2="235" stroke="rgba(26,26,26,0.04)" strokeWidth="0.5" />
        <line x1="55" y1="255" x2="135" y2="255" stroke="rgba(26,26,26,0.04)" strokeWidth="0.5" />
        
        {/* Small sketch - a graph */}
        <polyline points="65,205 75,195 85,200 95,185 105,190" fill="none" stroke="#4A6FA5" strokeWidth="0.6" opacity="0.25" />
        <text x="60" y="275" fontSize="6" fill="#6B6B6B" opacity="0.4">experiment 1</text>
      </g>

      {/* Connecting lines between ideas */}
      <line x1="250" y1="200" x2="200" y2="230" stroke="#4A6FA5" strokeWidth="0.6" opacity="0.15" strokeDasharray="3 3">
        <animate attributeName="opacity" values="0.1;0.25;0.1" dur="8s" repeatCount="indefinite" />
      </line>
      <line x1="360" y1="160" x2="340" y2="180" stroke="#4A6FA5" strokeWidth="0.6" opacity="0.12" strokeDasharray="3 3">
        <animate attributeName="opacity" values="0.08;0.2;0.08" dur="10s" repeatCount="indefinite" />
      </line>
      <line x1="150" y1="210" x2="180" y2="200" stroke="#4A6FA5" strokeWidth="0.6" opacity="0.12" strokeDasharray="3 3">
        <animate attributeName="opacity" values="0.08;0.2;0.08" dur="9s" repeatCount="indefinite" />
      </line>

      {/* Floating pencil */}
      <g transform="rotate(-15 420 240)">
        <rect x="400" y="220" width="60" height="8" rx="1" fill="#FFFFFF" stroke="rgba(26,26,26,0.1)" strokeWidth="0.8" opacity="0.6">
          <animate attributeName="opacity" values="0.5;0.7;0.5" dur="7s" repeatCount="indefinite" />
          <animate attributeName="y" values="220;215;220" dur="8s" repeatCount="indefinite" />
        </rect>
        <polygon points="460,220 466,224 460,228" fill="#6B6B6B" opacity="0.3" />
      </g>

      {/* Subtle label */}
      <text x="250" y="300" textAnchor="middle" fontSize="9" fill="#6B6B6B" opacity="0.35" letterSpacing="2">
        research journal
      </text>
    </svg>
  );
}
