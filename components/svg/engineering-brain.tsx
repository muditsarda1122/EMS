"use client";

export default function EngineeringBrain() {
  return (
    <svg
      viewBox="0 0 600 400"
      className="w-full max-w-2xl mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Living semantic engineering brain diagram"
    >
      <title>Engineering Brain — living semantic structure</title>
      <desc>A network diagram showing Architecture, Debugging, Protocols, Decisions, Implementations, Invariants and Engineering Beliefs as connected nodes that pulse and evolve.</desc>
      <defs>
        {/* Glow filter */}
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background */}
      <rect width="600" height="400" fill="none" />

      {/* Central hub — Engineering Brain */}
      <g>
        <circle cx="300" cy="200" r="42" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1.5" filter="url(#glow)">
          <animate attributeName="r" values="42;44;42" dur="6s" repeatCount="indefinite" />
        </circle>
        <text x="300" y="196" textAnchor="middle" fontSize="11" fontWeight="500" fill="#1A1A1A">
          Engineering
        </text>
        <text x="300" y="210" textAnchor="middle" fontSize="11" fontWeight="500" fill="#1A1A1A">
          Brain
        </text>
      </g>

      {/* Orbit ring 1 */}
      <ellipse cx="300" cy="200" rx="120" ry="80" fill="none" stroke="rgba(74,111,165,0.08)" strokeWidth="1" strokeDasharray="4 4">
        <animateTransform attributeName="transform" type="rotate" from="0 300 200" to="360 300 200" dur="60s" repeatCount="indefinite" />
      </ellipse>

      {/* Orbit ring 2 */}
      <ellipse cx="300" cy="200" rx="180" ry="110" fill="none" stroke="rgba(74,111,165,0.05)" strokeWidth="1" strokeDasharray="6 6">
        <animateTransform attributeName="transform" type="rotate" from="360 300 200" to="0 300 200" dur="90s" repeatCount="indefinite" />
      </ellipse>

      {/* Top tier — Architecture */}
      <g>
        <circle cx="300" cy="70" r="32" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1" opacity="0.9">
          <animate attributeName="opacity" values="0.9;1;0.9" dur="5s" repeatCount="indefinite" />
        </circle>
        <text x="300" y="67" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Architecture</text>
        <text x="300" y="80" textAnchor="middle" fontSize="9" fill="#707070">discovered</text>
        {/* Connection to center */}
        <line x1="300" y1="102" x2="300" y2="158" stroke="#4A6FA5" strokeWidth="1" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.5;0.3" dur="4s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Second tier — left: Debugging */}
      <g>
        <circle cx="160" cy="140" r="28" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1" opacity="0.85">
          <animate attributeName="opacity" values="0.85;1;0.85" dur="7s" repeatCount="indefinite" />
        </circle>
        <text x="160" y="137" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Debugging</text>
        <text x="160" y="148" textAnchor="middle" fontSize="9" fill="#707070">insight</text>
        {/* Connection */}
        <line x1="186" y1="148" x2="262" y2="178" stroke="#4A6FA5" strokeWidth="1" opacity="0.25">
          <animate attributeName="opacity" values="0.25;0.45;0.25" dur="5s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Second tier — center: Protocols */}
      <g>
        <circle cx="300" cy="130" r="28" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1" opacity="0.9">
          <animate attributeName="opacity" values="0.9;1;0.9" dur="6s" repeatCount="indefinite" />
        </circle>
        <text x="300" y="127" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Protocols</text>
        <text x="300" y="138" textAnchor="middle" fontSize="9" fill="#707070">defined</text>
        <line x1="300" y1="158" x2="300" y2="158" stroke="#4A6FA5" strokeWidth="1" opacity="0.3" />
      </g>

      {/* Second tier — right: Decisions */}
      <g>
        <circle cx="440" cy="140" r="28" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1" opacity="0.85">
          <animate attributeName="opacity" values="0.85;1;0.85" dur="8s" repeatCount="indefinite" />
        </circle>
        <text x="440" y="137" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Decisions</text>
        <text x="440" y="148" textAnchor="middle" fontSize="9" fill="#707070">recorded</text>
        {/* Connection */}
        <line x1="414" y1="148" x2="338" y2="178" stroke="#4A6FA5" strokeWidth="1" opacity="0.25">
          <animate attributeName="opacity" values="0.25;0.45;0.25" dur="6s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Third tier — left: Implementations */}
      <g>
        <circle cx="130" cy="250" r="30" fill="#FFFFFF" stroke="#707070" strokeWidth="1" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.9;0.7" dur="9s" repeatCount="indefinite" />
        </circle>
        <text x="130" y="247" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Implementations</text>
        <text x="130" y="258" textAnchor="middle" fontSize="9" fill="#707070">validated</text>
        <line x1="156" y1="240" x2="260" y2="210" stroke="#707070" strokeWidth="1" opacity="0.2">
          <animate attributeName="opacity" values="0.2;0.35;0.2" dur="7s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Third tier — right: Invariants */}
      <g>
        <circle cx="470" cy="250" r="30" fill="#FFFFFF" stroke="#707070" strokeWidth="1" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.9;0.7" dur="10s" repeatCount="indefinite" />
        </circle>
        <text x="470" y="247" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Invariants</text>
        <text x="470" y="258" textAnchor="middle" fontSize="9" fill="#707070">inferred</text>
        <line x1="444" y1="240" x2="340" y2="210" stroke="#707070" strokeWidth="1" opacity="0.2">
          <animate attributeName="opacity" values="0.2;0.35;0.2" dur="8s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Bottom — Engineering Beliefs */}
      <g>
        <circle cx="300" cy="330" r="34" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" opacity="0.8">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="7s" repeatCount="indefinite" />
        </circle>
        <text x="300" y="325" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Engineering</text>
        <text x="300" y="338" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Beliefs</text>
        <line x1="300" y1="296" x2="300" y2="242" stroke="#1A1A1A" strokeWidth="1" opacity="0.3">
          <animate attributeName="opacity" values="0.3;0.5;0.3" dur="5s" repeatCount="indefinite" />
        </line>
      </g>

      {/* Side floating nodes — fading / merging visual */}
      <g opacity="0.4">
        <circle cx="80" cy="180" r="14" fill="#FFFFFF" stroke="#707070" strokeWidth="1">
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="12s" repeatCount="indefinite" />
          <animate attributeName="cx" values="80;90;80" dur="12s" repeatCount="indefinite" />
        </circle>
        <text x="80" y="184" textAnchor="middle" fontSize="7" fill="#707070">merge</text>
      </g>

      <g opacity="0.4">
        <circle cx="520" cy="300" r="14" fill="#FFFFFF" stroke="#707070" strokeWidth="1">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="15s" repeatCount="indefinite" />
          <animate attributeName="cy" values="300;290;300" dur="15s" repeatCount="indefinite" />
        </circle>
        <text x="520" y="304" textAnchor="middle" fontSize="7" fill="#707070">evolve</text>
      </g>

      <g opacity="0.3">
        <circle cx="100" cy="320" r="12" fill="#FFFFFF" stroke="#707070" strokeWidth="1">
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="10s" repeatCount="indefinite" />
        </circle>
        <text x="100" y="324" textAnchor="middle" fontSize="7" fill="#707070">fade</text>
      </g>

      <g opacity="0.3">
        <circle cx="500" cy="100" r="12" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1">
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="11s" repeatCount="indefinite" />
        </circle>
        <text x="500" y="104" textAnchor="middle" fontSize="7" fill="#4A6FA5">strengthen</text>
      </g>

      {/* Inter-node connections (cross-connections for richness) */}
      <line x1="186" y1="125" x2="272" y2="102" stroke="#4A6FA5" strokeWidth="0.5" opacity="0.15">
        <animate attributeName="opacity" values="0.15;0.3;0.15" dur="8s" repeatCount="indefinite" />
      </line>
      <line x1="414" y1="125" x2="328" y2="102" stroke="#4A6FA5" strokeWidth="0.5" opacity="0.15">
        <animate attributeName="opacity" values="0.15;0.3;0.15" dur="9s" repeatCount="indefinite" />
      </line>
      <line x1="160" y1="310" x2="270" y2="296" stroke="#707070" strokeWidth="0.5" opacity="0.15">
        <animate attributeName="opacity" values="0.15;0.25;0.15" dur="10s" repeatCount="indefinite" />
      </line>
      <line x1="440" y1="310" x2="330" y2="296" stroke="#707070" strokeWidth="0.5" opacity="0.15">
        <animate attributeName="opacity" values="0.15;0.25;0.15" dur="11s" repeatCount="indefinite" />
      </line>
    </svg>
  );
}
