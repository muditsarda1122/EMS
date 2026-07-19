"use client";

export default function EngineeringBrain() {
  return (
    <svg
      viewBox="0 0 700 420"
      className="w-full max-w-3xl mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Living semantic engineering brain — animated neural network of engineering understanding"
    >
      <title>Engineering Brain — living semantic structure</title>
      <desc>
        An animated network diagram showing Architecture, Protocols, Debugging, Implementation, 
        Performance, Decisions, Observations, and Beliefs as connected nodes. Connections slowly 
        animate, strengthen, weaken, merge, and fade. Confidence visibly evolves.
      </desc>

      <defs>
        {/* Subtle glow for active connections */}
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="700" height="420" fill="none" />

      {/* Background subtle grid */}
      <g opacity="0.03">
        {[...Array(8)].map((_, i) => (
          <line key={`v${i}`} x1={80 + i * 80} y1="20" x2={80 + i * 80} y2="400" stroke="#1A1A1A" strokeWidth="0.5" />
        ))}
        {[...Array(6)].map((_, i) => (
          <line key={`h${i}`} x1="40" y1={50 + i * 60} x2="660" y2={50 + i * 60} stroke="#1A1A1A" strokeWidth="0.5" />
        ))}
      </g>

      {/* === TOP TIER === */}
      {/* Architecture */}
      <g>
        <circle cx="350" cy="50" r="28" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1" opacity="0.9">
          <animate attributeName="opacity" values="0.85;1;0.85" dur="5s" repeatCount="indefinite" />
          <animate attributeName="r" values="28;30;28" dur="6s" repeatCount="indefinite" />
        </circle>
        <text x="350" y="46" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Architecture</text>
        <text x="350" y="58" textAnchor="middle" fontSize="8" fill="#6B6B6B">discovered</text>
      </g>

      {/* === SECOND TIER === */}
      {/* Protocols */}
      <g>
        <circle cx="200" cy="140" r="26" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1" opacity="0.85">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="7s" repeatCount="indefinite" />
        </circle>
        <text x="200" y="136" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Protocols</text>
        <text x="200" y="147" textAnchor="middle" fontSize="8" fill="#6B6B6B">defined</text>
      </g>

      {/* Debugging */}
      <g>
        <circle cx="350" cy="130" r="26" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1" opacity="0.9">
          <animate attributeName="opacity" values="0.85;1;0.85" dur="6s" repeatCount="indefinite" />
        </circle>
        <text x="350" y="126" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Debugging</text>
        <text x="350" y="137" textAnchor="middle" fontSize="8" fill="#6B6B6B">insight</text>
      </g>

      {/* Decisions */}
      <g>
        <circle cx="500" cy="140" r="26" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1" opacity="0.85">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="8s" repeatCount="indefinite" />
        </circle>
        <text x="500" y="136" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Decisions</text>
        <text x="500" y="147" textAnchor="middle" fontSize="8" fill="#6B6B6B">recorded</text>
      </g>

      {/* === THIRD TIER === */}
      {/* Implementation */}
      <g>
        <circle cx="140" cy="240" r="28" fill="#FFFFFF" stroke="#6B6B6B" strokeWidth="1" opacity="0.75">
          <animate attributeName="opacity" values="0.7;0.9;0.7" dur="9s" repeatCount="indefinite" />
        </circle>
        <text x="140" y="236" textAnchor="middle" fontSize="9" fontWeight="500" fill="#1A1A1A">Implementation</text>
        <text x="140" y="247" textAnchor="middle" fontSize="8" fill="#6B6B6B">validated</text>
      </g>

      {/* Performance */}
      <g>
        <circle cx="280" cy="230" r="26" fill="#FFFFFF" stroke="#6B6B6B" strokeWidth="1" opacity="0.8">
          <animate attributeName="opacity" values="0.75;0.95;0.75" dur="7s" repeatCount="indefinite" />
        </circle>
        <text x="280" y="226" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Performance</text>
        <text x="280" y="237" textAnchor="middle" fontSize="8" fill="#6B6B6B">measured</text>
      </g>

      {/* Observations */}
      <g>
        <circle cx="420" cy="230" r="26" fill="#FFFFFF" stroke="#6B6B6B" strokeWidth="1" opacity="0.8">
          <animate attributeName="opacity" values="0.75;0.95;0.75" dur="8s" repeatCount="indefinite" />
        </circle>
        <text x="420" y="226" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Observations</text>
        <text x="420" y="237" textAnchor="middle" fontSize="8" fill="#6B6B6B">extracted</text>
      </g>

      {/* === BOTTOM TIER === */}
      {/* Engineering Beliefs */}
      <g>
        <circle cx="350" cy="340" r="32" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" opacity="0.9">
          <animate attributeName="opacity" values="0.85;1;0.85" dur="6s" repeatCount="indefinite" />
          <animate attributeName="r" values="32;34;32" dur="7s" repeatCount="indefinite" />
        </circle>
        <text x="350" y="334" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Engineering</text>
        <text x="350" y="347" textAnchor="middle" fontSize="10" fontWeight="500" fill="#1A1A1A">Beliefs</text>
      </g>

      {/* === CONNECTIONS === */}
      {/* All connections use soft, animated lines */}
      
      {/* Architecture to second tier */}
      <line x1="350" y1="78" x2="200" y2="114" stroke="#4A6FA5" strokeWidth="0.8" opacity="0.25" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="5s" repeatCount="indefinite" />
      </line>
      <line x1="350" y1="78" x2="350" y2="104" stroke="#4A6FA5" strokeWidth="0.8" opacity="0.3" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.25;0.45;0.25" dur="4s" repeatCount="indefinite" />
      </line>
      <line x1="350" y1="78" x2="500" y2="114" stroke="#4A6FA5" strokeWidth="0.8" opacity="0.25" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="6s" repeatCount="indefinite" />
      </line>

      {/* Second tier to third tier */}
      <line x1="200" y1="166" x2="140" y2="212" stroke="#4A6FA5" strokeWidth="0.7" opacity="0.2" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.15;0.35;0.15" dur="7s" repeatCount="indefinite" />
      </line>
      <line x1="200" y1="166" x2="280" y2="204" stroke="#4A6FA5" strokeWidth="0.7" opacity="0.2" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.15;0.35;0.15" dur="8s" repeatCount="indefinite" />
      </line>
      <line x1="350" y1="156" x2="280" y2="204" stroke="#4A6FA5" strokeWidth="0.7" opacity="0.25" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="6s" repeatCount="indefinite" />
      </line>
      <line x1="350" y1="156" x2="420" y2="204" stroke="#4A6FA5" strokeWidth="0.7" opacity="0.25" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="5s" repeatCount="indefinite" />
      </line>
      <line x1="500" y1="166" x2="420" y2="204" stroke="#4A6FA5" strokeWidth="0.7" opacity="0.2" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.15;0.35;0.15" dur="9s" repeatCount="indefinite" />
      </line>
      <line x1="500" y1="166" x2="560" y2="212" stroke="#4A6FA5" strokeWidth="0.7" opacity="0.15" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.1;0.3;0.1" dur="10s" repeatCount="indefinite" />
      </line>

      {/* Third tier to Beliefs */}
      <line x1="140" y1="268" x2="310" y2="318" stroke="#6B6B6B" strokeWidth="0.7" opacity="0.2" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.15;0.3;0.15" dur="8s" repeatCount="indefinite" />
      </line>
      <line x1="280" y1="256" x2="330" y2="318" stroke="#6B6B6B" strokeWidth="0.7" opacity="0.25" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.2;0.35;0.2" dur="7s" repeatCount="indefinite" />
      </line>
      <line x1="420" y1="256" x2="370" y2="318" stroke="#6B6B6B" strokeWidth="0.7" opacity="0.25" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.2;0.35;0.2" dur="6s" repeatCount="indefinite" />
      </line>
      <line x1="500" y1="240" x2="370" y2="318" stroke="#6B6B6B" strokeWidth="0.6" opacity="0.15" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.1;0.25;0.1" dur="9s" repeatCount="indefinite" />
      </line>

      {/* Cross-connections for richness */}
      <line x1="200" y1="140" x2="350" y2="130" stroke="#4A6FA5" strokeWidth="0.5" opacity="0.1" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.08;0.2;0.08" dur="11s" repeatCount="indefinite" />
      </line>
      <line x1="350" y1="130" x2="500" y2="140" stroke="#4A6FA5" strokeWidth="0.5" opacity="0.1" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.08;0.2;0.08" dur="12s" repeatCount="indefinite" />
      </line>
      <line x1="280" y1="230" x2="420" y2="230" stroke="#6B6B6B" strokeWidth="0.5" opacity="0.08" filter="url(#softGlow)">
        <animate attributeName="opacity" values="0.05;0.15;0.05" dur="13s" repeatCount="indefinite" />
      </line>

      {/* === FLOATING EVOLUTION NODES === */}
      {/* Nodes that fade, strengthen, merge, and evolve */}
      <g opacity="0.35">
        <circle cx="80" cy="180" r="14" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="0.8">
          <animate attributeName="opacity" values="0.3;0.6;0.1;0.3" dur="12s" repeatCount="indefinite" />
          <animate attributeName="cx" values="80;95;75;80" dur="12s" repeatCount="indefinite" />
        </circle>
        <text x="80" y="184" textAnchor="middle" fontSize="7" fill="#4A6FA5">merge</text>
      </g>

      <g opacity="0.3">
        <circle cx="620" cy="300" r="14" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="0.8">
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="15s" repeatCount="indefinite" />
          <animate attributeName="cy" values="300;285;300" dur="15s" repeatCount="indefinite" />
        </circle>
        <text x="620" y="304" textAnchor="middle" fontSize="7" fill="#4A6FA5">evolve</text>
      </g>

      <g opacity="0.25">
        <circle cx="100" cy="320" r="12" fill="#FFFFFF" stroke="#6B6B6B" strokeWidth="0.8">
          <animate attributeName="opacity" values="0.15;0.4;0.1;0.15" dur="10s" repeatCount="indefinite" />
        </circle>
        <text x="100" y="324" textAnchor="middle" fontSize="7" fill="#6B6B6B">fade</text>
      </g>

      <g opacity="0.3">
        <circle cx="600" cy="100" r="12" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="0.8">
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="11s" repeatCount="indefinite" />
        </circle>
        <text x="600" y="104" textAnchor="middle" fontSize="7" fill="#4A6FA5">strengthen</text>
      </g>

      <g opacity="0.2">
        <circle cx="580" cy="200" r="10" fill="#FFFFFF" stroke="#6B6B6B" strokeWidth="0.8">
          <animate attributeName="opacity" values="0.1;0.3;0.1" dur="14s" repeatCount="indefinite" />
          <animate attributeName="r" values="10;12;10" dur="14s" repeatCount="indefinite" />
        </circle>
        <text x="580" y="204" textAnchor="middle" fontSize="6" fill="#6B6B6B">weaken</text>
      </g>

      {/* Confidence evolution indicator */}
      <g opacity="0.15">
        <text x="350" y="395" textAnchor="middle" fontSize="9" fill="#6B6B6B" letterSpacing="2">
          confidence evolves
        </text>
      </g>
    </svg>
  );
}
