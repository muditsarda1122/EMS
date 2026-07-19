export default function EmsPipeline() {
  return (
    <svg
      viewBox="0 0 400 520"
      className="w-full max-w-sm mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Engineering Memory System cognition pipeline"
    >
      <title>EMS cognition pipeline</title>
      <desc>A vertical pipeline showing the flow from Repository through Extractor, Diffuser, Engineering Brain, Maintainer, Demand-driven Retrieval to Coding Agent.</desc>
      <defs>
        <filter id="pipelineGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="flowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4A6FA5" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#4A6FA5" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#4A6FA5" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      <rect width="400" height="520" fill="none" />

      {/* Vertical flow line */}
      <line
        x1="200"
        y1="40"
        x2="200"
        y2="480"
        stroke="url(#flowGradient)"
        strokeWidth="2"
        strokeDasharray="6 4"
        opacity="0.4"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="0;10;0"
          dur="8s"
          repeatCount="indefinite"
        />
      </line>

      {/* Step 1: Repository */}
      <g>
        <rect
          x="110"
          y="20"
          width="180"
          height="44"
          rx="8"
          fill="#FFFFFF"
          stroke="rgba(26,26,26,0.08)"
          strokeWidth="1"
        />
        <text
          x="200"
          y="38"
          textAnchor="middle"
          fontSize="12"
          fontWeight="500"
          fill="#1A1A1A"
        >
          Repository
        </text>
        <text
          x="200"
          y="52"
          textAnchor="middle"
          fontSize="9"
          fill="#707070"
        >
          implementation
        </text>
        {/* Flow dot */}
        <circle cx="200" cy="64" r="3" fill="#4A6FA5" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Arrow 1→2 */}
      <line x1="200" y1="68" x2="200" y2="88" stroke="#707070" strokeWidth="1" opacity="0.4" />
      <polygon points="197,84 200,90 203,84" fill="#707070" opacity="0.4" />

      {/* Step 2: Extractor */}
      <g>
        <rect
          x="120"
          y="90"
          width="160"
          height="40"
          rx="8"
          fill="#FFFFFF"
          stroke="#4A6FA5"
          strokeWidth="1"
          opacity="0.9"
        >
          <animate attributeName="opacity" values="0.9;1;0.9" dur="4s" repeatCount="indefinite" />
        </rect>
        <text
          x="200"
          y="108"
          textAnchor="middle"
          fontSize="12"
          fontWeight="500"
          fill="#1A1A1A"
        >
          Extractor
        </text>
        <text
          x="200"
          y="122"
          textAnchor="middle"
          fontSize="9"
          fill="#707070"
        >
          observations
        </text>
        <circle cx="200" cy="132" r="3" fill="#4A6FA5" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Arrow 2→3 */}
      <line x1="200" y1="136" x2="200" y2="156" stroke="#707070" strokeWidth="1" opacity="0.4" />
      <polygon points="197,152 200,158 203,152" fill="#707070" opacity="0.4" />

      {/* Step 3: Diffuser */}
      <g>
        <rect
          x="120"
          y="158"
          width="160"
          height="40"
          rx="8"
          fill="#FFFFFF"
          stroke="#4A6FA5"
          strokeWidth="1"
          opacity="0.9"
        >
          <animate attributeName="opacity" values="0.9;1;0.9" dur="5s" repeatCount="indefinite" />
        </rect>
        <text
          x="200"
          y="176"
          textAnchor="middle"
          fontSize="12"
          fontWeight="500"
          fill="#1A1A1A"
        >
          Diffuser
        </text>
        <text
          x="200"
          y="190"
          textAnchor="middle"
          fontSize="9"
          fill="#707070"
        >
          beliefs
        </text>
        <circle cx="200" cy="200" r="3" fill="#4A6FA5" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Arrow 3→4 */}
      <line x1="200" y1="204" x2="200" y2="224" stroke="#707070" strokeWidth="1" opacity="0.4" />
      <polygon points="197,220 200,226 203,220" fill="#707070" opacity="0.4" />

      {/* Step 4: Engineering Brain (living semantic structure) */}
      <g>
        {/* Outer glow */}
        <circle cx="200" cy="260" r="52" fill="none" stroke="#4A6FA5" strokeWidth="1" opacity="0.15" filter="url(#pipelineGlow)">
          <animate attributeName="r" values="52;56;52" dur="6s" repeatCount="indefinite" />
        </circle>
        {/* Inner ring */}
        <circle cx="200" cy="260" r="46" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1.5" />
        {/* Semantic nodes inside */}
        <circle cx="200" cy="240" r="5" fill="#4A6FA5" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="185" cy="270" r="4" fill="#707070" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="215" cy="270" r="4" fill="#707070" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.8;0.5" dur="5s" repeatCount="indefinite" />
        </circle>
        <circle cx="200" cy="285" r="5" fill="#4A6FA5" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3.5s" repeatCount="indefinite" />
        </circle>
        {/* Internal connections */}
        <line x1="200" y1="245" x2="187" y2="266" stroke="#4A6FA5" strokeWidth="0.5" opacity="0.3" />
        <line x1="200" y1="245" x2="213" y2="266" stroke="#4A6FA5" strokeWidth="0.5" opacity="0.3" />
        <line x1="187" y1="274" x2="200" y2="280" stroke="#707070" strokeWidth="0.5" opacity="0.2" />
        <line x1="213" y1="274" x2="200" y2="280" stroke="#707070" strokeWidth="0.5" opacity="0.2" />
        {/* Label */}
        <text
          x="200"
          y="258"
          textAnchor="middle"
          fontSize="10"
          fontWeight="500"
          fill="#1A1A1A"
        >
          Engineering
        </text>
        <text
          x="200"
          y="270"
          textAnchor="middle"
          fontSize="10"
          fontWeight="500"
          fill="#1A1A1A"
        >
          Brain
        </text>
        <circle cx="200" cy="314" r="3" fill="#4A6FA5" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="4.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Arrow 4→5 */}
      <line x1="200" y1="318" x2="200" y2="338" stroke="#707070" strokeWidth="1" opacity="0.4" />
      <polygon points="197,334 200,340 203,334" fill="#707070" opacity="0.4" />

      {/* Step 5: Maintainer */}
      <g>
        <rect
          x="120"
          y="340"
          width="160"
          height="40"
          rx="8"
          fill="#FFFFFF"
          stroke="#4A6FA5"
          strokeWidth="1"
          opacity="0.9"
        >
          <animate attributeName="opacity" values="0.9;1;0.9" dur="5.5s" repeatCount="indefinite" />
        </rect>
        <text
          x="200"
          y="358"
          textAnchor="middle"
          fontSize="12"
          fontWeight="500"
          fill="#1A1A1A"
        >
          Maintainer
        </text>
        <text
          x="200"
          y="372"
          textAnchor="middle"
          fontSize="9"
          fill="#707070"
        >
          evolution
        </text>
        <circle cx="200" cy="382" r="3" fill="#4A6FA5" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Arrow 5→6 */}
      <line x1="200" y1="386" x2="200" y2="406" stroke="#707070" strokeWidth="1" opacity="0.4" />
      <polygon points="197,402 200,408 203,402" fill="#707070" opacity="0.4" />

      {/* Step 6: Demand-driven Retrieval */}
      <g>
        <rect
          x="100"
          y="408"
          width="200"
          height="40"
          rx="8"
          fill="#FFFFFF"
          stroke="#4A6FA5"
          strokeWidth="1"
          opacity="0.9"
        >
          <animate attributeName="opacity" values="0.9;1;0.9" dur="4.5s" repeatCount="indefinite" />
        </rect>
        <text
          x="200"
          y="426"
          textAnchor="middle"
          fontSize="11"
          fontWeight="500"
          fill="#1A1A1A"
        >
          Demand-driven Retrieval
        </text>
        <text
          x="200"
          y="440"
          textAnchor="middle"
          fontSize="9"
          fill="#707070"
        >
          when reasoning requires it
        </text>
        <circle cx="200" cy="450" r="3" fill="#4A6FA5" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="5.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Arrow 6→7 */}
      <line x1="200" y1="454" x2="200" y2="474" stroke="#707070" strokeWidth="1" opacity="0.4" />
      <polygon points="197,470 200,476 203,470" fill="#707070" opacity="0.4" />

      {/* Step 7: Coding Agent */}
      <g>
        <rect
          x="120"
          y="476"
          width="160"
          height="40"
          rx="8"
          fill="#FFFFFF"
          stroke="#1A1A1A"
          strokeWidth="1.5"
        />
        <text
          x="200"
          y="494"
          textAnchor="middle"
          fontSize="12"
          fontWeight="500"
          fill="#1A1A1A"
        >
          Coding Agent
        </text>
        <text
          x="200"
          y="508"
          textAnchor="middle"
          fontSize="9"
          fill="#707070"
        >
          acts with understanding
        </text>
      </g>
    </svg>
  );
}
