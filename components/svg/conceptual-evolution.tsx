export default function ConceptualEvolution() {
  return (
    <svg
      viewBox="0 0 400 520"
      className="w-full max-w-sm mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Conceptual evolution from Memory to Understanding to Belief to Engineering Cognition"
    >
      <title>Conceptual evolution diagram</title>
      <desc>
        A visual showing the conceptual evolution from Memory through Understanding 
        and Belief to Engineering Cognition, illustrating how simple storage becomes 
        accumulated understanding.
      </desc>

      <rect width="400" height="520" fill="none" />

      {/* Memory */}
      <g>
        <circle cx="200" cy="60" r="35" fill="#FFFFFF" stroke="#6B6B6B" strokeWidth="1" opacity="0.6">
          <animate attributeName="opacity" values="0.5;0.7;0.5" dur="6s" repeatCount="indefinite" />
        </circle>
        <text x="200" y="56" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1A1A1A">Memory</text>
        <text x="200" y="70" textAnchor="middle" fontSize="9" fill="#6B6B6B">stores information</text>
      </g>

      {/* Arrow 1 */}
      <g>
        <line x1="200" y1="100" x2="200" y2="130" stroke="#6B6B6B" strokeWidth="1" opacity="0.3" />
        <polygon points="196,124 200,132 204,124" fill="#6B6B6B" opacity="0.3" />
        
        {/* Transformation particles */}
        <circle cx="200" cy="115" r="2" fill="#4A6FA5" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
          <animate attributeName="cy" values="105;125;105" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Understanding */}
      <g>
        <circle cx="200" cy="170" r="38" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1" opacity="0.75">
          <animate attributeName="opacity" values="0.7;0.9;0.7" dur="7s" repeatCount="indefinite" />
          <animate attributeName="r" values="38;40;38" dur="7s" repeatCount="indefinite" />
        </circle>
        <text x="200" y="164" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1A1A1A">Understanding</text>
        <text x="200" y="178" textAnchor="middle" fontSize="9" fill="#6B6B6B">connects patterns</text>
      </g>

      {/* Arrow 2 */}
      <g>
        <line x1="200" y1="212" x2="200" y2="242" stroke="#4A6FA5" strokeWidth="1" opacity="0.35" />
        <polygon points="196,236 200,244 204,236" fill="#4A6FA5" opacity="0.35" />
        
        <circle cx="200" cy="227" r="2" fill="#4A6FA5" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4s" repeatCount="indefinite" />
          <animate attributeName="cy" values="217;237;217" dur="4s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Belief */}
      <g>
        <circle cx="200" cy="282" r="35" fill="#FFFFFF" stroke="#4A6FA5" strokeWidth="1.2" opacity="0.85">
          <animate attributeName="opacity" values="0.8;1;0.8" dur="6s" repeatCount="indefinite" />
        </circle>
        <text x="200" y="276" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1A1A1A">Belief</text>
        <text x="200" y="290" textAnchor="middle" fontSize="9" fill="#6B6B6B">reusable understanding</text>
      </g>

      {/* Arrow 3 */}
      <g>
        <line x1="200" y1="322" x2="200" y2="352" stroke="#4A6FA5" strokeWidth="1.2" opacity="0.4" />
        <polygon points="196,346 200,354 204,346" fill="#4A6FA5" opacity="0.4" />
        
        <circle cx="200" cy="337" r="2.5" fill="#1A1A1A" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="cy" values="327;347;327" dur="3.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Engineering Cognition */}
      <g>
        <circle cx="200" cy="400" r="42" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="1.5" opacity="0.95">
          <animate attributeName="opacity" values="0.9;1;0.9" dur="5s" repeatCount="indefinite" />
          <animate attributeName="r" values="42;44;42" dur="6s" repeatCount="indefinite" />
        </circle>
        <text x="200" y="392" textAnchor="middle" fontSize="11" fontWeight="500" fill="#1A1A1A">Engineering</text>
        <text x="200" y="406" textAnchor="middle" fontSize="11" fontWeight="500" fill="#1A1A1A">Cognition</text>
        <text x="200" y="420" textAnchor="middle" fontSize="8" fill="#6B6B6B">accumulated understanding</text>
      </g>

      {/* Decorative orbit */}
      <ellipse cx="200" cy="230" rx="160" ry="180" fill="none" stroke="rgba(74,111,165,0.03)" strokeWidth="1" strokeDasharray="3 3">
        <animateTransform attributeName="transform" type="rotate" from="0 200 230" to="360 200 230" dur="120s" repeatCount="indefinite" />
      </ellipse>

      {/* Subtle evolution label */}
      <text x="200" y="480" textAnchor="middle" fontSize="9" fill="#6B6B6B" opacity="0.35" letterSpacing="2">
        conceptual evolution
      </text>
    </svg>
  );
}
