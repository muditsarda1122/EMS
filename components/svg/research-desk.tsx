export default function ResearchDesk() {
  return (
    <svg
      viewBox="0 0 600 340"
      className="w-full max-w-2xl mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Research desk with open notebooks, papers, diagrams, and engineering artefacts"
    >
      <title>Research desk</title>
      <desc>
        A visual of a research desk with open notebooks, papers, diagrams, and 
        engineering artefacts. The visual message: Ideas matter more than people.
      </desc>

      <rect width="600" height="340" fill="none" />

      {/* Desk surface - subtle */}
      <rect x="50" y="200" width="500" height="4" rx="1" fill="rgba(26,26,26,0.04)" />

      {/* Open notebook */}
      <g>
        <rect x="120" y="110" width="160" height="100" rx="2" fill="#FFFFFF" stroke="rgba(26,26,26,0.08)" strokeWidth="1" />
        <line x1="200" y1="110" x2="200" y2="210" stroke="rgba(26,26,26,0.06)" strokeWidth="0.5" />
        
        {/* Left page lines */}
        <line x1="135" y1="130" x2="190" y2="130" stroke="rgba(26,26,26,0.05)" strokeWidth="0.5" />
        <line x1="135" y1="145" x2="190" y2="145" stroke="rgba(26,26,26,0.05)" strokeWidth="0.5" />
        <line x1="135" y1="160" x2="190" y2="160" stroke="rgba(26,26,26,0.05)" strokeWidth="0.5" />
        <line x1="135" y1="175" x2="190" y2="175" stroke="rgba(26,26,26,0.05)" strokeWidth="0.5" />
        <line x1="135" y1="190" x2="190" y2="190" stroke="rgba(26,26,26,0.05)" strokeWidth="0.5" />
        
        {/* Right page - a small diagram */}
        <circle cx="245" cy="140" r="10" fill="none" stroke="#4A6FA5" strokeWidth="0.6" opacity="0.25" />
        <circle cx="265" cy="155" r="7" fill="none" stroke="#4A6FA5" strokeWidth="0.6" opacity="0.2" />
        <line x1="255" y1="140" x2="258" y2="155" stroke="#4A6FA5" strokeWidth="0.4" opacity="0.15" />
        <text x="255" y="180" textAnchor="middle" fontSize="6" fill="#6B6B6B" opacity="0.35">pipeline</text>
      </g>

      {/* Stack of papers */}
      <g>
        <rect x="320" y="100" width="100" height="70" rx="1" fill="#FFFFFF" stroke="rgba(26,26,26,0.06)" strokeWidth="0.8" opacity="0.8">
          <animate attributeName="opacity" values="0.7;0.85;0.7" dur="9s" repeatCount="indefinite" />
        </rect>
        <rect x="325" y="95" width="100" height="70" rx="1" fill="#FFFFFF" stroke="rgba(26,26,26,0.06)" strokeWidth="0.8" opacity="0.6">
          <animate attributeName="opacity" values="0.5;0.7;0.5" dur="11s" repeatCount="indefinite" />
        </rect>
        <rect x="330" y="90" width="100" height="70" rx="1" fill="#FFFFFF" stroke="rgba(26,26,26,0.06)" strokeWidth="0.8" opacity="0.5">
          <animate attributeName="opacity" values="0.4;0.6;0.4" dur="13s" repeatCount="indefinite" />
        </rect>
        
        {/* Top paper - a graph */}
        <line x1="345" y1="110" x2="410" y2="110" stroke="rgba(26,26,26,0.05)" strokeWidth="0.5" />
        <line x1="345" y1="125" x2="410" y2="125" stroke="rgba(26,26,26,0.05)" strokeWidth="0.5" />
        <line x1="345" y1="140" x2="410" y2="140" stroke="rgba(26,26,26,0.05)" strokeWidth="0.5" />
        <polyline points="350,135 365,120 380,128 395,115" fill="none" stroke="#4A6FA5" strokeWidth="0.5" opacity="0.2" />
      </g>

      {/* A loose diagram sketch */}
      <g transform="rotate(-5 450 140)">
        <rect x="440" y="100" width="80" height="80" rx="1" fill="#FFFFFF" stroke="rgba(26,26,26,0.06)" strokeWidth="0.8" opacity="0.5">
          <animate attributeName="opacity" values="0.4;0.6;0.4" dur="10s" repeatCount="indefinite" />
        </rect>
        <circle cx="465" cy="125" r="12" fill="none" stroke="#4A6FA5" strokeWidth="0.5" opacity="0.2" />
        <circle cx="495" cy="145" r="10" fill="none" stroke="#4A6FA5" strokeWidth="0.5" opacity="0.15" />
        <line x1="477" y1="125" x2="485" y2="145" stroke="#4A6FA5" strokeWidth="0.4" opacity="0.1" />
        <text x="480" y="175" textAnchor="middle" fontSize="6" fill="#6B6B6B" opacity="0.3">EC-Bench</text>
      </g>

      {/* Coffee cup - very subtle */}
      <g>
        <ellipse cx="100" cy="195" rx="14" ry="6" fill="none" stroke="rgba(26,26,26,0.08)" strokeWidth="0.8" opacity="0.4" />
        <path d="M 86 180 Q 86 195 100 195 Q 114 195 114 180" fill="none" stroke="rgba(26,26,26,0.08)" strokeWidth="0.8" opacity="0.4" />
        <path d="M 114 185 Q 120 185 120 190 Q 120 195 114 195" fill="none" stroke="rgba(26,26,26,0.08)" strokeWidth="0.8" opacity="0.3" />
        {/* Steam */}
        <path d="M 96 175 Q 98 165 96 160" fill="none" stroke="#6B6B6B" strokeWidth="0.5" opacity="0.15">
          <animate attributeName="opacity" values="0.1;0.25;0.1" dur="4s" repeatCount="indefinite" />
          <animate attributeName="d" values="M 96 175 Q 98 165 96 160;M 96 175 Q 94 165 96 160;M 96 175 Q 98 165 96 160" dur="4s" repeatCount="indefinite" />
        </path>
        <path d="M 104 175 Q 106 165 104 160" fill="none" stroke="#6B6B6B" strokeWidth="0.5" opacity="0.15">
          <animate attributeName="opacity" values="0.1;0.25;0.1" dur="5s" repeatCount="indefinite" />
          <animate attributeName="d" values="M 104 175 Q 106 165 104 160;M 104 175 Q 102 165 104 160;M 104 175 Q 106 165 104 160" dur="5s" repeatCount="indefinite" />
        </path>
      </g>

      {/* Pencil */}
      <g transform="rotate(20 520 190)">
        <rect x="500" y="185" width="50" height="5" rx="1" fill="#FFFFFF" stroke="rgba(26,26,26,0.1)" strokeWidth="0.6" opacity="0.5" />
        <polygon points="550,185 555,187.5 550,190" fill="#6B6B6B" opacity="0.2" />
      </g>

      {/* Ruler */}
      <g transform="rotate(-10 520 220)">
        <rect x="480" y="215" width="80" height="8" rx="1" fill="#FFFFFF" stroke="rgba(26,26,26,0.08)" strokeWidth="0.6" opacity="0.4" />
        <line x1="490" y1="219" x2="490" y2="222" stroke="#6B6B6B" strokeWidth="0.4" opacity="0.2" />
        <line x1="500" y1="219" x2="500" y2="222" stroke="#6B6B6B" strokeWidth="0.4" opacity="0.2" />
        <line x1="510" y1="219" x2="510" y2="222" stroke="#6B6B6B" strokeWidth="0.4" opacity="0.2" />
        <line x1="520" y1="219" x2="520" y2="222" stroke="#6B6B6B" strokeWidth="0.4" opacity="0.2" />
        <line x1="530" y1="219" x2="530" y2="222" stroke="#6B6B6B" strokeWidth="0.4" opacity="0.2" />
        <line x1="540" y1="219" x2="540" y2="222" stroke="#6B6B6B" strokeWidth="0.4" opacity="0.2" />
      </g>

      {/* Connecting thread between ideas */}
      <path d="M 280 150 Q 320 120 360 130" fill="none" stroke="#4A6FA5" strokeWidth="0.5" opacity="0.1" strokeDasharray="2 2">
        <animate attributeName="opacity" values="0.05;0.15;0.05" dur="12s" repeatCount="indefinite" />
      </path>
      <path d="M 420 140 Q 450 160 480 150" fill="none" stroke="#4A6FA5" strokeWidth="0.5" opacity="0.08" strokeDasharray="2 2">
        <animate attributeName="opacity" values="0.04;0.12;0.04" dur="14s" repeatCount="indefinite" />
      </path>

      {/* Label */}
      <text x="300" y="255" textAnchor="middle" fontSize="10" fill="#1A1A1A" opacity="0.7" letterSpacing="1">
        Ideas matter more than people.
      </text>

      <text x="300" y="275" textAnchor="middle" fontSize="9" fill="#6B6B6B" opacity="0.35" letterSpacing="2">
        research laboratory
      </text>
    </svg>
  );
}
