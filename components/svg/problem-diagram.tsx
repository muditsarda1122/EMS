export default function ProblemDiagram() {
  return (
    <svg
      viewBox="0 0 320 420"
      className="w-full max-w-sm mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Diagram showing repeated architecture rediscovery across sessions"
    >
      <title>Session cycle diagram</title>
      <desc>A diagram illustrating how architecture is discovered in session 1, then rediscovered in sessions 2 and 3, showing the cycle of repeated reconstruction.</desc>
      {/* Background */}
      <rect width="320" height="420" fill="none" />

      {/* Session 1 */}
      <g>
        <rect
          x="60"
          y="20"
          width="200"
          height="56"
          rx="6"
          fill="#FFFFFF"
          stroke="rgba(26,26,26,0.08)"
          strokeWidth="1"
        />
        <text
          x="160"
          y="40"
          textAnchor="middle"
          fontSize="12"
          fontWeight="500"
          fill="#1A1A1A"
        >
          Session 1
        </text>
        <text
          x="160"
          y="60"
          textAnchor="middle"
          fontSize="11"
          fill="#707070"
        >
          Architecture discovered
        </text>
      </g>

      {/* Arrow 1 */}
      <line
        x1="160"
        y1="76"
        x2="160"
        y2="96"
        stroke="#707070"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.5"
      />
      <text
        x="160"
        y="92"
        textAnchor="middle"
        fontSize="10"
        fill="#707070"
        opacity="0.6"
      >
        Session ends
      </text>

      {/* Arrow down */}
      <line
        x1="160"
        y1="96"
        x2="160"
        y2="116"
        stroke="#707070"
        strokeWidth="1"
      />
      <polygon points="156,112 160,118 164,112" fill="#707070" opacity="0.5" />

      {/* Session 2 */}
      <g>
        <rect
          x="60"
          y="118"
          width="200"
          height="56"
          rx="6"
          fill="#FFFFFF"
          stroke="rgba(26,26,26,0.08)"
          strokeWidth="1"
        />
        <text
          x="160"
          y="138"
          textAnchor="middle"
          fontSize="12"
          fontWeight="500"
          fill="#1A1A1A"
        >
          Session 2
        </text>
        <text
          x="160"
          y="158"
          textAnchor="middle"
          fontSize="11"
          fill="#707070"
        >
          Architecture rediscovered
        </text>
      </g>

      {/* Arrow 2 */}
      <line
        x1="160"
        y1="174"
        x2="160"
        y2="194"
        stroke="#707070"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.5"
      />
      <text
        x="160"
        y="190"
        textAnchor="middle"
        fontSize="10"
        fill="#707070"
        opacity="0.6"
      >
        Session ends
      </text>

      {/* Arrow down */}
      <line
        x1="160"
        y1="194"
        x2="160"
        y2="214"
        stroke="#707070"
        strokeWidth="1"
      />
      <polygon points="156,210 160,216 164,210" fill="#707070" opacity="0.5" />

      {/* Session 3 */}
      <g>
        <rect
          x="60"
          y="216"
          width="200"
          height="56"
          rx="6"
          fill="#FFFFFF"
          stroke="rgba(26,26,26,0.08)"
          strokeWidth="1"
        />
        <text
          x="160"
          y="236"
          textAnchor="middle"
          fontSize="12"
          fontWeight="500"
          fill="#1A1A1A"
        >
          Session 3
        </text>
        <text
          x="160"
          y="256"
          textAnchor="middle"
          fontSize="11"
          fill="#707070"
        >
          Architecture rediscovered again
        </text>
      </g>

      {/* Arrow 3 */}
      <line
        x1="160"
        y1="272"
        x2="160"
        y2="292"
        stroke="#707070"
        strokeWidth="1"
        strokeDasharray="3 3"
        opacity="0.5"
      />

      {/* Fade indicator */}
      <text
        x="160"
        y="310"
        textAnchor="middle"
        fontSize="10"
        fill="#707070"
        opacity="0.4"
      >
        Understanding fades
      </text>

      {/* Cycle indicator */}
      <path
        d="M 80 340 A 70 70 0 1 1 240 340"
        fill="none"
        stroke="rgba(26,26,26,0.06)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />
      <polygon
        points="238,338 244,342 236,344"
        fill="rgba(26,26,26,0.1)"
      />
      <text
        x="160"
        y="375"
        textAnchor="middle"
        fontSize="10"
        fill="#707070"
        opacity="0.5"
      >
        Cycle repeats
      </text>

      {/* Subtle pulse on the last session box */}
      <rect
        x="58"
        y="116"
        width="204"
        height="60"
        rx="8"
        fill="none"
        stroke="#4A6FA5"
        strokeWidth="1"
        opacity="0"
      >
        <animate
          attributeName="opacity"
          values="0;0.15;0"
          dur="4s"
          repeatCount="indefinite"
        />
      </rect>
    </svg>
  );
}
