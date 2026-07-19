export default function EmsPipeline() {
  return (
    <svg
      viewBox="0 0 500 540"
      className="w-full max-w-lg mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Engineering Cognition Pipeline — flowing cognition without boxes"
    >
      <title>Engineering Cognition Pipeline</title>
      <desc>
        A flowing pipeline showing the flow from Repository through Extractor, Diffuser, 
        Engineering Brain, Maintainer, Demand-driven Retrieval to Coding Agent. 
        Illustrated as flowing cognition rather than boxes.
      </desc>

      <defs>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A6FA5" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#4A6FA5" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#4A6FA5" stopOpacity="0.15" />
        </linearGradient>
        
        <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="500" height="540" fill="none" />

      {/* Main flowing spine */}
      <path
        d="M 250 30 Q 250 80 250 120 Q 250 160 250 200 Q 250 240 250 280 Q 250 320 250 360 Q 250 400 250 440 Q 250 480 250 510"
        fill="none"
        stroke="url(#flowGradient)"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.3"
      >
        <animate attributeName="stroke-dasharray" values="0,600;600,0" dur="8s" repeatCount="indefinite" />
      </path>

      {/* === NODES AS CIRCLES (NOT BOXES) === */}

      {/* Repository */}
      <g>
        <circle cx="250" cy="45" r="24" fill="#FFFFFF" stroke="#6B6B6B" strokeWidth="1" opacity="0.7">
          <animate attributeName="opacity" values="0.65;0.8;0.65" dur="5s" repeatCount="indefinite" />
        </circle>
        <text x="250" y="41" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Repository</text>
        <text x="250" y="52" textAnchor="middle" fontSize="8" fill="#6B6B6B">implementation</text>
      </g>

      {/* Flow connection */}
      <line x1="250" y1="70" x2="250" y2="95" stroke="#6B6B6B" strokeWidth="0.8" opacity="0.25" strokeDasharray="3 3" />
      <circle cx="250" cy="95" r="2" fill="#4A6FA5" opacity="0.5">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
      </circle>

      {/* Extractor */}
      <g>
        <circle cx="250" cy="115" r="22" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1" opacity="0.8">
          <animate attributeName="opacity" values="0.75;0.95;0.75" dur="6s" repeatCount="indefinite" />
        </circle>
        <text x="250" y="111" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Extractor</text>
        <text x="250" y="122" textAnchor="middle" fontSize="8" fill="#6B6B6B">observations</text>
      </g>

      {/* Flow */}
      <line x1="250" y1="138" x2="250" y2="163" stroke="#4A6FA5" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />
      <circle cx="250" cy="163" r="2" fill="#4A6FA5" opacity="0.5">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.5s" repeatCount="indefinite" />
      </circle>

      {/* Diffuser */}
      <g>
        <circle cx="250" cy="183" r="22" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1" opacity="0.8">
          <animate attributeName="opacity" values="0.75;0.95;0.75" dur="7s" repeatCount="indefinite" />
        </circle>
        <text x="250" y="179" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Diffuser</text>
        <text x="250" y="190" textAnchor="middle" fontSize="8" fill="#6B6B6B">beliefs</text>
      </g>

      {/* Flow */}
      <line x1="250" y1="206" x2="250" y2="231" stroke="#4A6FA5" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />
      <circle cx="250" cy="231" r="2" fill="#4A6FA5" opacity="0.5">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
      </circle>

      {/* Engineering Brain — larger, central */}
      <g>
        <circle cx="250" cy="265" r="38" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1.5" opacity="0.9" filter="url(#softGlow)">
          <animate attributeName="opacity" values="0.85;1;0.85" dur="5s" repeatCount="indefinite" />
          <animate attributeName="r" values="38;40;38" dur="6s" repeatCount="indefinite" />
        </circle>
        
        {/* Inner semantic nodes */}
        <circle cx="250" cy="250" r="4" fill="#4A6FA5" opacity="0.5">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="235" cy="275" r="3" fill="#6B6B6B" opacity="0.4">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="265" cy="275" r="3" fill="#6B6B6B" opacity="0.4">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="250" cy="285" r="4" fill="#4A6FA5" opacity="0.5">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3.5s" repeatCount="indefinite" />
        </circle>
        
        {/* Internal connections */}
        <line x1="250" y1="254" x2="237" y2="272" stroke="#4A6FA5" strokeWidth="0.5" opacity="0.2" />
        <line x1="250" y1="254" x2="263" y2="272" stroke="#4A6FA5" strokeWidth="0.5" opacity="0.2" />
        <line x1="237" y1="278" x2="250" y2="281" stroke="#6B6B6B" strokeWidth="0.5" opacity="0.15" />
        <line x1="263" y1="278" x2="250" y2="281" stroke="#6B6B6B" strokeWidth="0.5" opacity="0.15" />
        
        <text x="250" y="262" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Engineering</text>
        <text x="250" y="274" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Brain</text>
      </g>

      {/* Flow */}
      <line x1="250" y1="304" x2="250" y2="329" stroke="#4A6FA5" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />
      <circle cx="250" cy="329" r="2" fill="#4A6FA5" opacity="0.5">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4.5s" repeatCount="indefinite" />
      </circle>

      {/* Maintainer */}
      <g>
        <circle cx="250" cy="349" r="22" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1" opacity="0.8">
          <animate attributeName="opacity" values="0.75;0.95;0.75" dur="6.5s" repeatCount="indefinite" />
        </circle>
        <text x="250" y="345" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Maintainer</text>
        <text x="250" y="356" textAnchor="middle" fontSize="8" fill="#6B6B6B">evolution</text>
      </g>

      {/* Flow */}
      <line x1="250" y1="372" x2="250" y2="397" stroke="#4A6FA5" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />
      <circle cx="250" cy="397" r="2" fill="#4A6FA5" opacity="0.5">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="5s" repeatCount="indefinite" />
      </circle>

      {/* Demand-driven Retrieval */}
      <g>
        <circle cx="250" cy="417" r="26" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1" opacity="0.8">
          <animate attributeName="opacity" values="0.75;0.95;0.75" dur="7s" repeatCount="indefinite" />
        </circle>
        <text x="250" y="411" textAnchor="middle" fontSize="9" fontWeight="500" fill="#1A1A1A">Demand-driven</text>
        <text x="250" y="422" textAnchor="middle" fontSize="9" fontWeight="500" fill="#1A1A1A">Retrieval</text>
        <text x="250" y="433" textAnchor="middle" fontSize="8" fill="#6B6B6B">when needed</text>
      </g>

      {/* Flow */}
      <line x1="250" y1="444" x2="250" y2="469" stroke="#4A6FA5" strokeWidth="0.8" opacity="0.3" strokeDasharray="3 3" />
      <circle cx="250" cy="469" r="2" fill="#1A1A1A" opacity="0.5">
        <animate attributeName="opacity" values="0.3;0.7;0.3" dur="5.5s" repeatCount="indefinite" />
      </circle>

      {/* Coding Agent */}
      <g>
        <circle cx="250" cy="489" r="24" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.2" opacity="0.9">
          <animate attributeName="opacity" values="0.85;1;0.85" dur="5s" repeatCount="indefinite" />
        </circle>
        <text x="250" y="485" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Coding Agent</text>
        <text x="250" y="496" textAnchor="middle" fontSize="8" fill="#6B6B6B">acts with understanding</text>
      </g>

      {/* Side annotations */}
      <text x="330" y="265" textAnchor="start" fontSize="9" fill="#6B6B6B" opacity="0.4">
        information
      </text>
      <text x="330" y="278" textAnchor="start" fontSize="9" fill="#6B6B6B" opacity="0.4">
        metabolism
      </text>

      {/* Bottom label */}
      <text x="250" y="530" textAnchor="middle" fontSize="9" fill="#6B6B6B" opacity="0.35" letterSpacing="2">
        flowing cognition
      </text>
    </svg>
  );
}
