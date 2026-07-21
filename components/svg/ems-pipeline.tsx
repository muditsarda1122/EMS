"use client";

export default function EmsPipeline() {
  return (
    <svg
      viewBox="0 0 2500 820"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Engineering Memory System cognitive architecture"
    >
      <title>EMS Cognitive Architecture</title>
      <desc>
        A horizontal cognitive architecture showing how a Coding Agent produces
        outputs that are extracted, diffused, and accumulated into Engineering
        Cognition, which is continuously maintained.
      </desc>

      <rect width="2500" height="820" fill="none" />

      <defs>
        <marker
          id="arrow-right"
          markerWidth="8"
          markerHeight="6"
          refX="8"
          refY="3"
          orient="auto"
        >
          <polygon points="0 0, 8 3, 0 6" fill="#8A9AAF" opacity="0.4" />
        </marker>
      </defs>

      {/* ═══════════════════════════════════════════════════════════════
         HORIZONTAL ARROWS & BLUE BALLS (drawn behind all circles)
         ═══════════════════════════════════════════════════════════════ */}
      <g stroke="#8A9AAF" strokeWidth="0.8" opacity="0.4">
        {/* Repository → Coding Agent */}
        <line x1="140" y1="220" x2="300" y2="220" markerEnd="url(#arrow-right)" />
        {/* Coding Agent → Engineering Extractor */}
        <line x1="400" y1="220" x2="570" y2="220" markerEnd="url(#arrow-right)" />
        {/* Engineering Extractor → Engineering Diffuser */}
        <line x1="680" y1="220" x2="854" y2="220" markerEnd="url(#arrow-right)" />
        {/* Engineering Diffuser → Engineering Cognition */}
        <line x1="960" y1="220" x2="1210" y2="220" markerEnd="url(#arrow-right)" />
        {/* Engineering Cognition → Demand-driven Retrieval */}
        <line x1="1380" y1="220" x2="1684" y2="220" markerEnd="url(#arrow-right)" />
        {/* Demand-driven Retrieval → Coding Agent */}
        <line x1="1800" y1="220" x2="2012" y2="220" markerEnd="url(#arrow-right)" />
      </g>

      {/* Blue bouncing balls on horizontal arrows */}
      <g>
        <circle cx="250" cy="220" r="2" fill="#4A6FA5" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite" />
          <animate attributeName="cx" values="200;300;200" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="535" cy="220" r="2" fill="#4A6FA5" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.5s" repeatCount="indefinite" />
          <animate attributeName="cx" values="500;570;500" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="822" cy="220" r="2" fill="#4A6FA5" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.2s" repeatCount="indefinite" />
          <animate attributeName="cx" values="790;854;790" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="1138" cy="220" r="2" fill="#4A6FA5" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.8s" repeatCount="indefinite" />
          <animate attributeName="cx" values="1066;1210;1066" dur="3.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="1617" cy="220" r="2" fill="#4A6FA5" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
          <animate attributeName="cx" values="1550;1684;1550" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="1964" cy="220" r="2" fill="#4A6FA5" opacity="0.4">
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.3s" repeatCount="indefinite" />
          <animate attributeName="cx" values="1916;2012;1916" dur="3.3s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* Curved bidirectional arrows (Cognition Evolution Engine ↔ Engineering Cognition) */}
      <g stroke="#8A9AAF" strokeWidth="0.8" opacity="0.4" fill="none">
        {/* Left curve: Engine → Cognition */}
        <path d="M 1250 560 C 1080 560 1080 220 1210 220" markerEnd="url(#arrow-right)" />
        {/* Right curve: Cognition → Engine */}
        <path d="M 1550 220 C 1680 220 1680 560 1510 560" markerEnd="url(#arrow-right)" />
      </g>

      {/* Blue bouncing balls on curved arrows */}
      <g>
        <circle r="2" fill="#4A6FA5" opacity="0.4">
          <animateMotion path="M 1250 560 C 1080 560 1080 220 1210 220" dur="4s" repeatCount="indefinite" values="0;1;0" keyTimes="0;0.5;1" calcMode="linear" />
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle r="2" fill="#4A6FA5" opacity="0.4">
          <animateMotion path="M 1550 220 C 1680 220 1680 560 1510 560" dur="4.5s" repeatCount="indefinite" values="0;1;0" keyTimes="0;0.5;1" calcMode="linear" />
          <animate attributeName="opacity" values="0.2;0.6;0.2" dur="4.5s" repeatCount="indefinite" />
        </circle>
      </g>

      {/* ═══════════════════════════════════════════════════════════════
         NODE 1 — Repository
         ═══════════════════════════════════════════════════════════════ */}
      <g>
        <circle cx="140" cy="220" r="60" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.8" />
        <text x="140" y="214" textAnchor="middle" fontSize="14" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Repository
        </text>
        <text x="140" y="232" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          implementation
        </text>
      </g>

      {/* ═══════════════════════════════════════════════════════════════
         NODE 2 — Coding Agent
         ═══════════════════════════════════════════════════════════════ */}
      <g>
        <circle cx="400" cy="220" r="100" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.8" />
        <text x="400" y="214" textAnchor="middle" fontSize="14" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Reasoning Agent
        </text>
        <text x="400" y="232" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          reasoning • planning • coding
        </text>
      </g>

      {/* ═══════════════════════════════════════════════════════════════
         NODE 3 — Engineering Extractor
         ═══════════════════════════════════════════════════════════════ */}
      <g>
        <circle cx="680" cy="220" r="110" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.8" />
        <text x="680" y="214" textAnchor="middle" fontSize="14" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Understanding Extractor
        </text>
        <text x="680" y="232" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          extracts reusable understanding
        </text>
      </g>

      {/* ═══════════════════════════════════════════════════════════════
         NODE 4 — Engineering Diffuser
         ═══════════════════════════════════════════════════════════════ */}
      <g>
        <circle cx="960" cy="220" r="106" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.8" />
        <text x="960" y="214" textAnchor="middle" fontSize="14" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Cognition Integrator
        </text>
        <text x="960" y="232" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          organises engineering beliefs
        </text>
      </g>

      {/* Diffuser annotations (below the circle, darker) */}
      <text x="960" y="350" textAnchor="middle" fontSize="9" fill="#555555" opacity="0.7">
        Normalizes understanding
      </text>
      <text x="960" y="368" textAnchor="middle" fontSize="9" fill="#555555" opacity="0.7">
        extend
      </text>
      <text x="960" y="386" textAnchor="middle" fontSize="9" fill="#555555" opacity="0.7">
        create
      </text>
      <text x="960" y="404" textAnchor="middle" fontSize="9" fill="#555555" opacity="0.7">
        supersede
      </text>
      <text x="960" y="422" textAnchor="middle" fontSize="9" fill="#555555" opacity="0.7">
        connect
      </text>

      {/* ═══════════════════════════════════════════════════════════════
         NODE 5 — Engineering Cognition (centrepiece, cognition graph)
         ═══════════════════════════════════════════════════════════════ */}
      <g>
        {/* Title — placed well above the circle */}
        <text x="1380" y="30" textAnchor="middle" fontSize="16" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Engineering Cognition
        </text>

        {/* Large boundary circle */}
        <circle cx="1380" cy="220" r="170" fill="#FAFAFA" stroke="#1A1A1A" strokeWidth="1.2" />

        {/* Belief nodes inside the cognition graph */}
        {/* Networking — top */}
        <g>
          <circle cx="1380" cy="140" r="28" fill="#FFFFFF" stroke="#6B6B6B" strokeWidth="0.5" opacity="0.7" />
          <text x="1380" y="143" textAnchor="middle" fontSize="7" fill="#1A1A1A">Networking</text>
        </g>

        {/* Authentication — upper-left */}
        <g>
          <circle cx="1315" cy="190" r="28" fill="#FFFFFF" stroke="#6B6B6B" strokeWidth="0.5" opacity="0.7" />
          <text x="1315" y="193" textAnchor="middle" fontSize="7" fill="#1A1A1A">Authentication</text>
        </g>

        {/* Architecture — upper-right */}
        <g>
          <circle cx="1445" cy="190" r="28" fill="#FFFFFF" stroke="#6B6B6B" strokeWidth="0.5" opacity="0.7" />
          <text x="1445" y="193" textAnchor="middle" fontSize="7" fill="#1A1A1A">Architecture</text>
        </g>

        {/* Deployment — centre */}
        <g>
          <circle cx="1380" cy="230" r="28" fill="#FFFFFF" stroke="#6B6B6B" strokeWidth="0.5" opacity="0.7" />
          <text x="1380" y="233" textAnchor="middle" fontSize="7" fill="#1A1A1A">Deployment</text>
        </g>

        {/* Debugging — lower-left */}
        <g>
          <circle cx="1315" cy="280" r="28" fill="#FFFFFF" stroke="#6B6B6B" strokeWidth="0.5" opacity="0.7" />
          <text x="1315" y="283" textAnchor="middle" fontSize="7" fill="#1A1A1A">Debugging</text>
        </g>

        {/* Protocols — lower-right */}
        <g>
          <circle cx="1445" cy="280" r="28" fill="#FFFFFF" stroke="#6B6B6B" strokeWidth="0.5" opacity="0.7" />
          <text x="1445" y="283" textAnchor="middle" fontSize="7" fill="#1A1A1A">Protocols</text>
        </g>

        {/* Testing — bottom */}
        <g>
          <circle cx="1380" cy="320" r="28" fill="#FFFFFF" stroke="#6B6B6B" strokeWidth="0.5" opacity="0.7" />
          <text x="1380" y="323" textAnchor="middle" fontSize="7" fill="#1A1A1A">Testing</text>
        </g>

        {/* Inner circle connections — center-to-center with edge clipping */}
        <g stroke="#9CA3AF" strokeWidth="0.5" opacity="0.2">
          {/* Networking → Architecture */}
          <line x1="1402.2" y1="157.1" x2="1422.8" y2="172.9" />
          {/* Networking → Protocols */}
          <line x1="1391.8" y1="165.4" x2="1433.2" y2="254.6" />
          {/* Architecture → Authentication */}
          <line x1="1417" y1="190" x2="1343" y2="190" />
          {/* Architecture → Deployment */}
          <line x1="1421.2" y1="204.7" x2="1403.8" y2="215.3" />
          {/* Architecture → Testing */}
          <line x1="1432.5" y1="215.0" x2="1392.5" y2="295.0" />
          {/* Protocols → Debugging */}
          <line x1="1417" y1="280" x2="1343" y2="280" />
          {/* Protocols → Deployment */}
          <line x1="1422.8" y1="262.9" x2="1402.2" y2="247.1" />
          {/* Testing → Debugging */}
          <line x1="1356.2" y1="305.3" x2="1338.8" y2="294.7" />
          {/* Testing → Deployment */}
          <line x1="1380" y1="292" x2="1380" y2="258" />
          {/* Debugging → Authentication */}
          <line x1="1315" y1="252" x2="1315" y2="218" />
          {/* Debugging → Deployment */}
          <line x1="1337.2" y1="262.9" x2="1357.8" y2="247.1" />
        </g>

        {/* Blue bouncing balls on inner connections */}
        <g>
          <circle r="2" fill="#4A6FA5" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="cx" values="1402.2;1422.8;1402.2" dur="2.8s" repeatCount="indefinite" />
            <animate attributeName="cy" values="157.1;172.9;157.1" dur="2.8s" repeatCount="indefinite" />
          </circle>
          <circle r="2" fill="#4A6FA5" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.2s" repeatCount="indefinite" />
            <animate attributeName="cx" values="1391.8;1433.2;1391.8" dur="3.2s" repeatCount="indefinite" />
            <animate attributeName="cy" values="165.4;254.6;165.4" dur="3.2s" repeatCount="indefinite" />
          </circle>
          <circle r="2" fill="#4A6FA5" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.5s" repeatCount="indefinite" />
            <animate attributeName="cx" values="1417;1343;1417" dur="3.5s" repeatCount="indefinite" />
            <animate attributeName="cy" values="190;190;190" dur="3.5s" repeatCount="indefinite" />
          </circle>
          <circle r="2" fill="#4A6FA5" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.9s" repeatCount="indefinite" />
            <animate attributeName="cx" values="1421.2;1403.8;1421.2" dur="2.9s" repeatCount="indefinite" />
            <animate attributeName="cy" values="204.7;215.3;204.7" dur="2.9s" repeatCount="indefinite" />
          </circle>
          <circle r="2" fill="#4A6FA5" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.7s" repeatCount="indefinite" />
            <animate attributeName="cx" values="1432.5;1392.5;1432.5" dur="3.7s" repeatCount="indefinite" />
            <animate attributeName="cy" values="215.0;295.0;215.0" dur="3.7s" repeatCount="indefinite" />
          </circle>
          <circle r="2" fill="#4A6FA5" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.3s" repeatCount="indefinite" />
            <animate attributeName="cx" values="1417;1343;1417" dur="3.3s" repeatCount="indefinite" />
            <animate attributeName="cy" values="280;280;280" dur="3.3s" repeatCount="indefinite" />
          </circle>
          <circle r="2" fill="#4A6FA5" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.0s" repeatCount="indefinite" />
            <animate attributeName="cx" values="1422.8;1402.2;1422.8" dur="3.0s" repeatCount="indefinite" />
            <animate attributeName="cy" values="262.9;247.1;262.9" dur="3.0s" repeatCount="indefinite" />
          </circle>
          <circle r="2" fill="#4A6FA5" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.6s" repeatCount="indefinite" />
            <animate attributeName="cx" values="1356.2;1338.8;1356.2" dur="3.6s" repeatCount="indefinite" />
            <animate attributeName="cy" values="305.3;294.7;305.3" dur="3.6s" repeatCount="indefinite" />
          </circle>
          <circle r="2" fill="#4A6FA5" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2.7s" repeatCount="indefinite" />
            <animate attributeName="cx" values="1380;1380;1380" dur="2.7s" repeatCount="indefinite" />
            <animate attributeName="cy" values="292;258;292" dur="2.7s" repeatCount="indefinite" />
          </circle>
          <circle r="2" fill="#4A6FA5" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.4s" repeatCount="indefinite" />
            <animate attributeName="cx" values="1315;1315;1315" dur="3.4s" repeatCount="indefinite" />
            <animate attributeName="cy" values="252;218;252" dur="3.4s" repeatCount="indefinite" />
          </circle>
          <circle r="2" fill="#4A6FA5" opacity="0.4">
            <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3.1s" repeatCount="indefinite" />
            <animate attributeName="cx" values="1337.2;1357.8;1337.2" dur="3.1s" repeatCount="indefinite" />
            <animate attributeName="cy" values="262.9;247.1;262.9" dur="3.1s" repeatCount="indefinite" />
          </circle>
        </g>
      </g>

      {/* ═══════════════════════════════════════════════════════════════
         NODE 6 — Cognition Maintainer (below Engineering Cognition, no overlap)
         ═══════════════════════════════════════════════════════════════ */}
      <g>
        <circle cx="1380" cy="560" r="130" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.8" />
        <text x="1380" y="554" textAnchor="middle" fontSize="14" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Cognition Evolution Engine
        </text>
        <text x="1380" y="572" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          continuously evolves engineering beliefs
        </text>
      </g>

      {/* Maintainer annotations (faint, below circle) */}
      <text x="1380" y="700" textAnchor="middle" fontSize="9" fill="#555555" opacity="0.7">
        Maintains cognition
      </text>
      <text x="1380" y="718" textAnchor="middle" fontSize="9" fill="#555555" opacity="0.7">
        refine
      </text>
      <text x="1380" y="736" textAnchor="middle" fontSize="9" fill="#555555" opacity="0.7">
        strengthen
      </text>
      <text x="1380" y="754" textAnchor="middle" fontSize="9" fill="#555555" opacity="0.7">
        restructure
      </text>
      <text x="1380" y="772" textAnchor="middle" fontSize="9" fill="#555555" opacity="0.7">
        retire
      </text>

      {/* ═══════════════════════════════════════════════════════════════
         NODE 7 — Demand-driven Retrieval
         ═══════════════════════════════════════════════════════════════ */}
      <g>
        <circle cx="1800" cy="220" r="116" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.8" />
        <text x="1800" y="214" textAnchor="middle" fontSize="14" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Demand-driven Retrieval
        </text>
        <text x="1800" y="232" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          only when reasoning requires it
        </text>
      </g>

      {/* ═══════════════════════════════════════════════════════════════
         NODE 8 — Coding Agent (final)
         ═══════════════════════════════════════════════════════════════ */}
      <g>
        <circle cx="2140" cy="220" r="128" fill="#FFFFFF" stroke="#1A1A1A" strokeWidth="0.8" />
        <text x="2140" y="214" textAnchor="middle" fontSize="14" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
          Reasoning Agent
        </text>
        <text x="2140" y="232" textAnchor="middle" fontSize="10" fill="#6B6B6B">
          reasons with accumulated understanding
        </text>
      </g>
    </svg>
  );
}
