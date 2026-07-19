export default function ProblemDiagram() {
  return (
    <svg
      viewBox="0 0 360 440"
      className="w-full max-w-md mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Visual showing knowledge repeatedly collapsing between sessions"
    >
      <title>Knowledge collapse between sessions</title>
      <desc>
        A visual showing how engineering understanding is built up during a session,
        then collapses when the session ends, forcing rediscovery in the next session.
      </desc>

      <rect width="360" height="440" fill="none" />

      {/* Session 1 — Understanding builds */}
      <g>
        <text x="180" y="25" textAnchor="middle" fontSize="11" fontWeight="500" fill="#1A1A1A">Session 1</text>
        
        {/* Growing understanding arc */}
        <path
          d="M 60 60 Q 180 20 300 60"
          fill="none"
          stroke="#4A6FA5"
          strokeWidth="1.5"
          opacity="0.4"
          strokeLinecap="round"
        >
          <animate attributeName="stroke-dasharray" values="0,400;400,0" dur="3s" fill="freeze" />
        </path>
        
        {/* Understanding nodes */}
        <circle cx="100" cy="55" r="4" fill="#4A6FA5" opacity="0.5">
          <animate attributeName="opacity" values="0;0.5" dur="0.5s" begin="0.5s" fill="freeze" />
        </circle>
        <circle cx="150" cy="45" r="5" fill="#4A6FA5" opacity="0.6">
          <animate attributeName="opacity" values="0;0.6" dur="0.5s" begin="1s" fill="freeze" />
        </circle>
        <circle cx="180" cy="42" r="6" fill="#4A6FA5" opacity="0.7">
          <animate attributeName="opacity" values="0;0.7" dur="0.5s" begin="1.5s" fill="freeze" />
        </circle>
        <circle cx="210" cy="45" r="5" fill="#4A6FA5" opacity="0.6">
          <animate attributeName="opacity" values="0;0.6" dur="0.5s" begin="2s" fill="freeze" />
        </circle>
        <circle cx="260" cy="55" r="4" fill="#4A6FA5" opacity="0.5">
          <animate attributeName="opacity" values="0;0.5" dur="0.5s" begin="2.5s" fill="freeze" />
        </circle>
        
        <text x="180" y="80" textAnchor="middle" fontSize="10" fill="#6B6B6B" opacity="0.7">
          Understanding accumulates
        </text>
      </g>

      {/* Collapse arrow */}
      <g>
        <line x1="180" y1="100" x2="180" y2="130" stroke="#6B6B6B" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
        <polygon points="176,126 180,132 184,126" fill="#6B6B6B" opacity="0.3" />
        <text x="180" y="120" textAnchor="middle" fontSize="9" fill="#6B6B6B" opacity="0.5">
          session ends
        </text>
      </g>

      {/* Collapse visual */}
      <g>
        {/* Falling nodes */}
        <circle cx="100" cy="145" r="4" fill="#4A6FA5" opacity="0.3">
          <animate attributeName="cy" values="55;145" dur="1.5s" begin="3s" fill="freeze" />
          <animate attributeName="opacity" values="0.5;0.15" dur="1.5s" begin="3s" fill="freeze" />
        </circle>
        <circle cx="150" cy="155" r="5" fill="#4A6FA5" opacity="0.2">
          <animate attributeName="cy" values="45;155" dur="1.5s" begin="3.2s" fill="freeze" />
          <animate attributeName="opacity" values="0.6;0.1" dur="1.5s" begin="3.2s" fill="freeze" />
        </circle>
        <circle cx="180" cy="160" r="6" fill="#4A6FA5" opacity="0.15">
          <animate attributeName="cy" values="42;160" dur="1.5s" begin="3.4s" fill="freeze" />
          <animate attributeName="opacity" values="0.7;0.05" dur="1.5s" begin="3.4s" fill="freeze" />
        </circle>
        <circle cx="210" cy="155" r="5" fill="#4A6FA5" opacity="0.2">
          <animate attributeName="cy" values="45;155" dur="1.5s" begin="3.6s" fill="freeze" />
          <animate attributeName="opacity" values="0.6;0.1" dur="1.5s" begin="3.6s" fill="freeze" />
        </circle>
        <circle cx="260" cy="145" r="4" fill="#4A6FA5" opacity="0.3">
          <animate attributeName="cy" values="55;145" dur="1.5s" begin="3.8s" fill="freeze" />
          <animate attributeName="opacity" values="0.5;0.15" dur="1.5s" begin="3.8s" fill="freeze" />
        </circle>
        
        <text x="180" y="180" textAnchor="middle" fontSize="10" fill="#6B6B6B" opacity="0.6">
          Understanding collapses
        </text>
      </g>

      {/* Session 2 — Rediscovery */}
      <g>
        <text x="180" y="205" textAnchor="middle" fontSize="11" fontWeight="500" fill="#1A1A1A">Session 2</text>
        
        {/* Rebuilding arc — dotted, weaker */}
        <path
          d="M 60 240 Q 180 200 300 240"
          fill="none"
          stroke="#4A6FA5"
          strokeWidth="1"
          opacity="0.25"
          strokeLinecap="round"
          strokeDasharray="3 3"
        >
          <animate attributeName="stroke-dasharray" values="0,400;3,3" dur="3s" begin="5s" fill="freeze" />
        </path>
        
        {/* Smaller, weaker nodes */}
        <circle cx="120" cy="235" r="3" fill="#6B6B6B" opacity="0.3">
          <animate attributeName="opacity" values="0;0.3" dur="0.5s" begin="5.5s" fill="freeze" />
        </circle>
        <circle cx="180" cy="225" r="4" fill="#6B6B6B" opacity="0.35">
          <animate attributeName="opacity" values="0;0.35" dur="0.5s" begin="6s" fill="freeze" />
        </circle>
        <circle cx="240" cy="235" r="3" fill="#6B6B6B" opacity="0.3">
          <animate attributeName="opacity" values="0;0.3" dur="0.5s" begin="6.5s" fill="freeze" />
        </circle>
        
        <text x="180" y="260" textAnchor="middle" fontSize="10" fill="#6B6B6B" opacity="0.7">
          Understanding rediscovered
        </text>
      </g>

      {/* Cycle indicator */}
      <g opacity="0.12">
        <path
          d="M 100 300 A 80 80 0 1 1 260 300"
          fill="none"
          stroke="#1A1A1A"
          strokeWidth="1"
          strokeDasharray="5 5"
        >
          <animateTransform attributeName="transform" type="rotate" from="0 180 300" to="360 180 300" dur="30s" repeatCount="indefinite" />
        </path>
        <text x="180" y="340" textAnchor="middle" fontSize="9" fill="#6B6B6B">
          cycle repeats
        </text>
      </g>

      {/* Conclusion */}
      <g>
        <text x="180" y="390" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1A1A1A">
          Engineering understanding
        </text>
        <text x="180" y="408" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1A1A1A">
          is repeatedly reconstructed.
        </text>
        <text x="180" y="430" textAnchor="middle" fontSize="10" fill="#6B6B6B" opacity="0.7">
          Not accumulated.
        </text>
      </g>
    </svg>
  );
}
