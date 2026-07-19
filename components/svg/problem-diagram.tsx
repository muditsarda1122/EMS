"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function ProblemDiagram() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const reducedMotion = useReducedMotion();

  /* ─── Helpers ─── */
  const t = (
    inputRange: [number, number],
    outputRange: [number, number]
  ) => useTransform(scrollYProgress, inputRange, outputRange, { clamp: true });

  const tY = (range: [number, number]) => t(range, [8, 0]);
  const tOp = (range: [number, number]) => t(range, [0, 1]);

  /* ─── Stage 1: Repository ─── */
  const repoOp = tOp([0.0, 0.1]);
  const repoY = t([0.0, 0.1], [10, 0]);

  /* ─── Stage 2: Session #1 ─── */
  const arrowRepoSessOp = tOp([0.1, 0.15]);
  const sess1CardOp = tOp([0.1, 0.2]);
  const sess1CardY = t([0.1, 0.2], [10, 0]);
  const sess1TitleOp = tOp([0.12, 0.2]);
  const sess1TitleY = tY([0.12, 0.2]);
  const sess1LineOp = tOp([0.12, 0.2]);

  /* ─── Stage 3: Learning events ─── */
  const e1Op = tOp([0.2, 0.225]);
  const e1Y = tY([0.2, 0.225]);
  const e2Op = tOp([0.225, 0.25]);
  const e2Y = tY([0.225, 0.25]);
  const e3Op = tOp([0.25, 0.275]);
  const e3Y = tY([0.25, 0.275]);
  const e4Op = tOp([0.275, 0.3]);
  const e4Y = tY([0.275, 0.3]);

  /* ─── Stage 4: Task complete ─── */
  const arrowSessTaskOp = tOp([0.3, 0.35]);
  const taskOp = tOp([0.32, 0.4]);
  const taskY = tY([0.32, 0.4]);

  /* ─── Stage 5: Session closed + split ─── */
  const arrowTaskClosedOp = tOp([0.4, 0.45]);
  const closedOp = tOp([0.42, 0.5]);
  const closedY = tY([0.42, 0.5]);
  const topGroupY = t([0.4, 0.5], [0, 20]);

  const stemPath = t([0.42, 0.5], [0, 1]);
  const leftCurvePath = t([0.45, 0.55], [0, 1]);
  const rightCurvePath = t([0.45, 0.55], [0, 1]);

  /* ─── Stage 6: Human branch ─── */
  const humanHeadOp = tOp([0.5, 0.58]);
  const humanHeadY = tY([0.5, 0.58]);
  const humanSubOp = tOp([0.52, 0.6]);
  const humanSubY = tY([0.52, 0.6]);
  const humanBarW = t([0.5, 0.6], [0, 120]);
  const humanArrowOp = tOp([0.55, 0.6]);
  const humanS2CardOp = tOp([0.55, 0.6]);
  const humanS2TitleOp = tOp([0.56, 0.62]);
  const humanS2TitleY = tY([0.56, 0.62]);
  const humanS2LineOp = tOp([0.56, 0.62]);
  const humanS2B1Op = tOp([0.58, 0.64]);
  const humanS2B1Y = tY([0.58, 0.64]);
  const humanS2B2Op = tOp([0.6, 0.66]);
  const humanS2B2Y = tY([0.6, 0.66]);
  const humanS2B3Op = tOp([0.62, 0.68]);
  const humanS2B3Y = tY([0.62, 0.68]);

  /* ─── Stage 7: AI branch ─── */
  const aiHeadOp = tOp([0.6, 0.68]);
  const aiHeadY = tY([0.6, 0.68]);
  const aiSubOp = tOp([0.62, 0.7]);
  const aiSubY = tY([0.62, 0.7]);

  const aiBarAppearOp = tOp([0.6, 0.65]);
  const aiBarW = t([0.6, 0.65], [0, 120]);
  const aiBarDissolveOp = t([0.65, 0.7], [1, 0.1]);
  const aiBarDissolveY = t([0.65, 0.7], [0, 6]);

  const redXOp = tOp([0.65, 0.7]);
  const redXY = t([0.65, 0.7], [4, 0]);
  const startsEmptyOp = tOp([0.68, 0.72]);

  /* ─── Stage 8: AI Session #2 (empty) ─── */
  const aiArrowS2Op = tOp([0.7, 0.75]);
  const aiS2CardOp = tOp([0.72, 0.8]);
  const aiS2TitleOp = tOp([0.74, 0.82]);
  const aiS2TitleY = tY([0.74, 0.82]);
  const aiS2LineOp = tOp([0.74, 0.82]);
  const qMarkOp = tOp([0.75, 0.8]);
  const qMarkScale = t([0.75, 0.8], [0.9, 1]);

  /* ─── Stage 9: AI Session #2 bullets (repetition) ─── */
  const aie1Op = tOp([0.8, 0.825]);
  const aie1Y = tY([0.8, 0.825]);
  const aie2Op = tOp([0.825, 0.85]);
  const aie2Y = tY([0.825, 0.85]);
  const aie3Op = tOp([0.85, 0.875]);
  const aie3Y = tY([0.85, 0.875]);
  const aie4Op = tOp([0.875, 0.9]);
  const aie4Y = tY([0.875, 0.9]);

  /* ─── Stage 10: Conclusion ─── */
  const dimOp = t([0.9, 1.0], [1, 0.15]);
  const c1Op = tOp([0.9, 0.95]);
  const c1Y = t([0.9, 0.95], [20, 0]);
  const c2Op = tOp([0.92, 0.97]);
  const c2Y = t([0.92, 0.97], [20, 0]);
  const c3Op = tOp([0.94, 1.0]);
  const c3Y = t([0.94, 1.0], [20, 0]);
  const c4Op = tOp([0.95, 1.0]);
  const c4Y = t([0.95, 1.0], [20, 0]);

  if (reducedMotion) {
    return (
      <div className="relative" style={{ height: "100vh" }}>
        <div className="sticky top-0 h-screen flex items-center justify-center">
          <ReducedMotionDiagram />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <svg
          viewBox="0 0 800 1100"
          className="max-h-[90vh] w-auto max-w-full"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Visual showing engineering understanding repeatedly reconstructed between sessions"
        >
          <title>Engineering understanding is repeatedly reconstructed</title>
          <desc>
            A scroll-driven diagram showing how an engineer builds understanding
            during a session, which then collapses when the session ends, forcing
            rediscovery in the next session.
          </desc>

          <rect width="800" height="1100" fill="none" />

          {/* ─── Everything that dims in Stage 10 ─── */}
          <motion.g style={{ opacity: dimOp }}>
            {/* ─── Top Sequence (shifts down during Stage 5) ─── */}
            <motion.g style={{ y: topGroupY }}>
              {/* Repository */}
              <motion.g style={{ opacity: repoOp, y: repoY }}>
                <rect x="385" y="18" width="30" height="24" rx="1.5" fill="none" stroke="#6B6B6B" strokeWidth="1" />
                <line x1="385" y1="26" x2="415" y2="26" stroke="#6B6B6B" strokeWidth="1" />
                <text x="400" y="58" textAnchor="middle" fontSize="11" fontWeight="500" fill="#1A1A1A">
                  Repository
                </text>
              </motion.g>

              {/* Arrow: Repository → Session #1 */}
              <motion.g style={{ opacity: arrowRepoSessOp }}>
                <line x1="400" y1="68" x2="400" y2="82" stroke="#6B6B6B" strokeWidth="1" opacity="0.5" />
                <polyline points="396,78 400,84 404,78" fill="none" stroke="#6B6B6B" strokeWidth="1" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
              </motion.g>

              {/* Session #1 */}
              <g>
                <motion.rect x="300" y="92" width="200" height="160" rx="2" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.5" style={{ opacity: sess1CardOp, y: sess1CardY }} />
                <motion.text x="400" y="112" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1A1A1A" style={{ opacity: sess1TitleOp, y: sess1TitleY }}>
                  Session #1
                </motion.text>
                <motion.line x1="310" y1="123" x2="490" y2="123" stroke="#1A1A1A" strokeWidth="0.5" opacity="0.12" style={{ opacity: sess1LineOp }} />
                <motion.line x1="310" y1="220" x2="490" y2="220" stroke="#1A1A1A" strokeWidth="0.5" opacity="0.12" style={{ opacity: sess1LineOp }} />

                {/* Learning events */}
                <motion.g style={{ opacity: e1Op, y: e1Y }}>
                  <circle cx="330" cy="132" r="2.5" fill="#1A1A1A" />
                  <text x="340" y="136" fontSize="11" fill="#1A1A1A" opacity="0.9">Explore repository</text>
                </motion.g>
                <motion.g style={{ opacity: e2Op, y: e2Y }}>
                  <circle cx="330" cy="155" r="2.5" fill="#1A1A1A" />
                  <text x="340" y="159" fontSize="11" fill="#1A1A1A" opacity="0.9">Build mental model</text>
                </motion.g>
                <motion.g style={{ opacity: e3Op, y: e3Y }}>
                  <circle cx="330" cy="178" r="2.5" fill="#1A1A1A" />
                  <text x="340" y="182" fontSize="11" fill="#1A1A1A" opacity="0.9">Understand architecture</text>
                </motion.g>
                <motion.g style={{ opacity: e4Op, y: e4Y }}>
                  <circle cx="330" cy="201" r="2.5" fill="#1A1A1A" />
                  <text x="340" y="205" fontSize="11" fill="#1A1A1A" opacity="0.9">Solve task</text>
                </motion.g>
              </g>

              {/* Arrow: Session #1 → Task Complete */}
              <motion.g style={{ opacity: arrowSessTaskOp }}>
                <line x1="400" y1="260" x2="400" y2="274" stroke="#6B6B6B" strokeWidth="1" opacity="0.5" />
                <polyline points="396,270 400,276 404,270" fill="none" stroke="#6B6B6B" strokeWidth="1" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
              </motion.g>

              {/* Task Complete */}
              <motion.g style={{ opacity: taskOp, y: taskY }}>
                <text x="400" y="296" textAnchor="middle" fontSize="12" fontWeight="500" fill="#22C55E">
                  ✓ Task Complete
                </text>
              </motion.g>

              {/* Arrow: Task Complete → Session Closed */}
              <motion.g style={{ opacity: arrowTaskClosedOp }}>
                <line x1="400" y1="308" x2="400" y2="322" stroke="#6B6B6B" strokeWidth="1" opacity="0.5" />
                <polyline points="396,318 400,324 404,318" fill="none" stroke="#6B6B6B" strokeWidth="1" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
              </motion.g>

              {/* Session Closed */}
              <motion.g style={{ opacity: closedOp, y: closedY }}>
                <text x="400" y="348" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1A1A1A">
                  Session Closed
                </text>
              </motion.g>
            </motion.g>

            {/* Split paths */}
            <g>
              <motion.line x1="400" y1="360" x2="400" y2="380" stroke="#6B6B6B" strokeWidth="1" opacity="0.5" style={{ pathLength: stemPath }} />
              <motion.path d="M400,380 C400,400 320,400 250,430" fill="none" stroke="#6B6B6B" strokeWidth="1" opacity="0.4" style={{ pathLength: leftCurvePath }} />
              <motion.path d="M400,380 C400,400 480,400 550,430" fill="none" stroke="#6B6B6B" strokeWidth="1" opacity="0.4" style={{ pathLength: rightCurvePath }} />
            </g>

            {/* ─── Human Branch ─── */}
            <g>
              <motion.text x="250" y="455" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1A1A1A" style={{ opacity: humanHeadOp, y: humanHeadY }}>
                Human Engineer
              </motion.text>
              <motion.text x="250" y="478" textAnchor="middle" fontSize="11" fill="#6B6B6B" style={{ opacity: humanSubOp, y: humanSubY }}>
                Accumulated understanding
              </motion.text>

              {/* Understanding bar background */}
              <rect x="190" y="502" width="120" height="6" rx="3" fill="#E5E7EB" />
              {/* Understanding bar fill */}
              <motion.rect x="190" y="502" height="6" rx="3" fill="#4A6FA5" style={{ width: humanBarW }} />

              {/* Arrow to Human Session #2 */}
              <motion.g style={{ opacity: humanArrowOp }}>
                <line x1="250" y1="520" x2="250" y2="534" stroke="#6B6B6B" strokeWidth="1" opacity="0.5" />
                <polyline points="246,530 250,536 254,530" fill="none" stroke="#6B6B6B" strokeWidth="1" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
              </motion.g>

              {/* Human Session #2 card */}
              <motion.rect x="160" y="542" width="180" height="100" rx="2" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.5" style={{ opacity: humanS2CardOp }} />
              <motion.text x="250" y="562" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1A1A1A" style={{ opacity: humanS2TitleOp, y: humanS2TitleY }}>
                Session #2
              </motion.text>
              <motion.line x1="170" y1="572" x2="330" y2="572" stroke="#1A1A1A" strokeWidth="0.5" opacity="0.12" style={{ opacity: humanS2LineOp }} />

              <motion.g style={{ opacity: humanS2B1Op, y: humanS2B1Y }}>
                <text x="250" y="590" textAnchor="middle" fontSize="11" fill="#1A1A1A" opacity="0.9">Build on previous understanding</text>
              </motion.g>
              <motion.g style={{ opacity: humanS2B2Op, y: humanS2B2Y }}>
                <text x="250" y="610" textAnchor="middle" fontSize="11" fill="#1A1A1A" opacity="0.9">Continue investigation</text>
              </motion.g>
              <motion.g style={{ opacity: humanS2B3Op, y: humanS2B3Y }}>
                <text x="250" y="630" textAnchor="middle" fontSize="11" fill="#1A1A1A" opacity="0.9">Move forward</text>
              </motion.g>
            </g>

            {/* ─── AI Branch ─── */}
            <g>
              <motion.text x="550" y="455" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1A1A1A" style={{ opacity: aiHeadOp, y: aiHeadY }}>
                AI Coding Agent
              </motion.text>
              <motion.text x="550" y="478" textAnchor="middle" fontSize="11" fill="#EF4444" style={{ opacity: aiSubOp, y: aiSubY }}>
                Understanding lost
              </motion.text>

              {/* AI bar background */}
              <rect x="490" y="502" width="120" height="6" rx="3" fill="#E5E7EB" />
              {/* AI bar fill (appears then dissolves) */}
              <motion.g style={{ opacity: aiBarDissolveOp, y: aiBarDissolveY }}>
                <motion.rect x="490" y="502" height="6" rx="3" fill="#4A6FA5" style={{ opacity: aiBarAppearOp, width: aiBarW }} />
              </motion.g>

              {/* Red ✕ */}
              <motion.g style={{ opacity: redXOp, y: redXY }}>
                <text x="550" y="545" textAnchor="middle" fontSize="14" fontWeight="600" fill="#EF4444">
                  ✕
                </text>
              </motion.g>

              <motion.text x="550" y="565" textAnchor="middle" fontSize="11" fill="#6B6B6B" style={{ opacity: startsEmptyOp }}>
                Starts empty
              </motion.text>

              {/* Arrow to AI Session #2 */}
              <motion.g style={{ opacity: aiArrowS2Op }}>
                <line x1="550" y1="578" x2="550" y2="592" stroke="#6B6B6B" strokeWidth="1" opacity="0.5" />
                <polyline points="546,588 550,594 554,588" fill="none" stroke="#6B6B6B" strokeWidth="1" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
              </motion.g>

              {/* AI Session #2 card */}
              <motion.rect x="460" y="600" width="180" height="130" rx="2" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.5" style={{ opacity: aiS2CardOp }} />
              <motion.text x="550" y="620" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1A1A1A" style={{ opacity: aiS2TitleOp, y: aiS2TitleY }}>
                Session #2
              </motion.text>
              <motion.line x1="470" y1="630" x2="630" y2="630" stroke="#1A1A1A" strokeWidth="0.5" opacity="0.12" style={{ opacity: aiS2LineOp }} />

              {/* Question mark */}
              <motion.g style={{ opacity: qMarkOp, scale: qMarkScale, transformOrigin: "550px 650px" }}>
                <text x="550" y="650" textAnchor="middle" fontSize="14" fill="#6B6B6B">
                  ?
                </text>
              </motion.g>

              {/* Repeated learning bullets */}
              <motion.g style={{ opacity: aie1Op, y: aie1Y }}>
                <circle cx="475" cy="656" r="2.5" fill="#1A1A1A" />
                <text x="485" y="660" fontSize="11" fill="#1A1A1A" opacity="0.9">Explore repository</text>
              </motion.g>
              <motion.g style={{ opacity: aie2Op, y: aie2Y }}>
                <circle cx="475" cy="676" r="2.5" fill="#1A1A1A" />
                <text x="485" y="680" fontSize="11" fill="#1A1A1A" opacity="0.9">Build mental model</text>
              </motion.g>
              <motion.g style={{ opacity: aie3Op, y: aie3Y }}>
                <circle cx="475" cy="696" r="2.5" fill="#1A1A1A" />
                <text x="485" y="700" fontSize="11" fill="#1A1A1A" opacity="0.9">Understand architecture</text>
              </motion.g>
              <motion.g style={{ opacity: aie4Op, y: aie4Y }}>
                <circle cx="475" cy="716" r="2.5" fill="#1A1A1A" />
                <text x="485" y="720" fontSize="11" fill="#1A1A1A" opacity="0.9">Solve task</text>
              </motion.g>
            </g>
          </motion.g>

          {/* ─── Conclusion (Stage 10) ─── */}
          <motion.g style={{ opacity: c1Op, y: c1Y }}>
            <text x="400" y="920" textAnchor="middle" fontSize="26" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
              Today&apos;s coding agents complete tasks.
            </text>
          </motion.g>
          <motion.g style={{ opacity: c2Op, y: c2Y }}>
            <text x="400" y="960" textAnchor="middle" fontSize="26" fontWeight="600" fill="#1A1A1A" letterSpacing="-0.01em">
              They do not become wiser.
            </text>
          </motion.g>
          <motion.g style={{ opacity: c3Op, y: c3Y }}>
            <text x="400" y="1000" textAnchor="middle" fontSize="26" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">
              Engineering understanding is reconstructed.
            </text>
          </motion.g>
          <motion.g style={{ opacity: c4Op, y: c4Y }}>
            <text x="400" y="1040" textAnchor="middle" fontSize="26" fontWeight="600" fill="#1A1A1A" letterSpacing="-0.01em">
              Never accumulated.
            </text>
          </motion.g>
        </svg>
      </div>
    </div>
  );
}

/* ─── Reduced-motion fallback: show everything fully visible ─── */
function ReducedMotionDiagram() {
  return (
    <svg
      viewBox="0 0 800 1100"
      className="max-h-[90vh] w-auto max-w-full"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Visual showing engineering understanding repeatedly reconstructed between sessions"
    >
      <title>Engineering understanding is repeatedly reconstructed</title>
      <desc>
        A diagram showing how an engineer builds understanding during a session,
        which then collapses when the session ends, forcing rediscovery in the next session.
      </desc>

      <rect width="800" height="1100" fill="none" />

      {/* Repository */}
      <g>
        <rect x="385" y="18" width="30" height="24" rx="1.5" fill="none" stroke="#6B6B6B" strokeWidth="1" />
        <line x1="385" y1="26" x2="415" y2="26" stroke="#6B6B6B" strokeWidth="1" />
        <text x="400" y="58" textAnchor="middle" fontSize="11" fontWeight="500" fill="#1A1A1A">Repository</text>
      </g>

      <line x1="400" y1="68" x2="400" y2="82" stroke="#6B6B6B" strokeWidth="1" opacity="0.5" />
      <polyline points="396,78 400,84 404,78" fill="none" stroke="#6B6B6B" strokeWidth="1" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />

      {/* Session #1 */}
      <rect x="300" y="92" width="200" height="160" rx="2" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.5" />
      <text x="400" y="112" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1A1A1A">Session #1</text>
      <line x1="310" y1="123" x2="490" y2="123" stroke="#1A1A1A" strokeWidth="0.5" opacity="0.12" />
      <line x1="310" y1="220" x2="490" y2="220" stroke="#1A1A1A" strokeWidth="0.5" opacity="0.12" />

      <circle cx="330" cy="132" r="2.5" fill="#1A1A1A" />
      <text x="340" y="136" fontSize="11" fill="#1A1A1A" opacity="0.9">Explore repository</text>
      <circle cx="330" cy="155" r="2.5" fill="#1A1A1A" />
      <text x="340" y="159" fontSize="11" fill="#1A1A1A" opacity="0.9">Build mental model</text>
      <circle cx="330" cy="178" r="2.5" fill="#1A1A1A" />
      <text x="340" y="182" fontSize="11" fill="#1A1A1A" opacity="0.9">Understand architecture</text>
      <circle cx="330" cy="201" r="2.5" fill="#1A1A1A" />
      <text x="340" y="205" fontSize="11" fill="#1A1A1A" opacity="0.9">Solve task</text>

      <line x1="400" y1="260" x2="400" y2="274" stroke="#6B6B6B" strokeWidth="1" opacity="0.5" />
      <polyline points="396,270 400,276 404,270" fill="none" stroke="#6B6B6B" strokeWidth="1" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />

      <text x="400" y="296" textAnchor="middle" fontSize="12" fontWeight="500" fill="#22C55E">✓ Task Complete</text>

      <line x1="400" y1="308" x2="400" y2="322" stroke="#6B6B6B" strokeWidth="1" opacity="0.5" />
      <polyline points="396,318 400,324 404,318" fill="none" stroke="#6B6B6B" strokeWidth="1" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />

      <text x="400" y="348" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1A1A1A">Session Closed</text>

      {/* Split paths */}
      <line x1="400" y1="360" x2="400" y2="380" stroke="#6B6B6B" strokeWidth="1" opacity="0.5" />
      <path d="M400,380 C400,400 320,400 250,430" fill="none" stroke="#6B6B6B" strokeWidth="1" opacity="0.4" />
      <path d="M400,380 C400,400 480,400 550,430" fill="none" stroke="#6B6B6B" strokeWidth="1" opacity="0.4" />

      {/* Human */}
      <text x="250" y="455" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1A1A1A">Human Engineer</text>
      <text x="250" y="478" textAnchor="middle" fontSize="11" fill="#6B6B6B">Accumulated understanding</text>
      <rect x="190" y="502" width="120" height="6" rx="3" fill="#4A6FA5" />

      <line x1="250" y1="520" x2="250" y2="534" stroke="#6B6B6B" strokeWidth="1" opacity="0.5" />
      <polyline points="246,530 250,536 254,530" fill="none" stroke="#6B6B6B" strokeWidth="1" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="160" y="542" width="180" height="100" rx="2" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.5" />
      <text x="250" y="562" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1A1A1A">Session #2</text>
      <line x1="170" y1="572" x2="330" y2="572" stroke="#1A1A1A" strokeWidth="0.5" opacity="0.12" />
      <text x="250" y="590" textAnchor="middle" fontSize="11" fill="#1A1A1A" opacity="0.9">Build on previous understanding</text>
      <text x="250" y="610" textAnchor="middle" fontSize="11" fill="#1A1A1A" opacity="0.9">Continue investigation</text>
      <text x="250" y="630" textAnchor="middle" fontSize="11" fill="#1A1A1A" opacity="0.9">Move forward</text>

      {/* AI */}
      <text x="550" y="455" textAnchor="middle" fontSize="13" fontWeight="600" fill="#1A1A1A">AI Coding Agent</text>
      <text x="550" y="478" textAnchor="middle" fontSize="11" fill="#EF4444">Understanding lost</text>
      <rect x="490" y="502" width="120" height="6" rx="3" fill="#E5E7EB" />
      <text x="550" y="545" textAnchor="middle" fontSize="14" fontWeight="600" fill="#EF4444">✕</text>
      <text x="550" y="565" textAnchor="middle" fontSize="11" fill="#6B6B6B">Starts empty</text>

      <line x1="550" y1="578" x2="550" y2="592" stroke="#6B6B6B" strokeWidth="1" opacity="0.5" />
      <polyline points="546,588 550,594 554,588" fill="none" stroke="#6B6B6B" strokeWidth="1" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />

      <rect x="460" y="600" width="180" height="130" rx="2" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="0.5" />
      <text x="550" y="620" textAnchor="middle" fontSize="12" fontWeight="500" fill="#1A1A1A">Session #2</text>
      <line x1="470" y1="630" x2="630" y2="630" stroke="#1A1A1A" strokeWidth="0.5" opacity="0.12" />
      <text x="550" y="650" textAnchor="middle" fontSize="14" fill="#6B6B6B">?</text>
      <circle cx="475" cy="656" r="2.5" fill="#1A1A1A" />
      <text x="485" y="660" fontSize="11" fill="#1A1A1A" opacity="0.9">Explore repository</text>
      <circle cx="475" cy="676" r="2.5" fill="#1A1A1A" />
      <text x="485" y="680" fontSize="11" fill="#1A1A1A" opacity="0.9">Build mental model</text>
      <circle cx="475" cy="696" r="2.5" fill="#1A1A1A" />
      <text x="485" y="700" fontSize="11" fill="#1A1A1A" opacity="0.9">Understand architecture</text>
      <circle cx="475" cy="716" r="2.5" fill="#1A1A1A" />
      <text x="485" y="720" fontSize="11" fill="#1A1A1A" opacity="0.9">Solve task</text>

      {/* Conclusion */}
      <text x="400" y="920" textAnchor="middle" fontSize="26" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">Today&apos;s coding agents complete tasks.</text>
      <text x="400" y="960" textAnchor="middle" fontSize="26" fontWeight="600" fill="#1A1A1A" letterSpacing="-0.01em">They do not become wiser.</text>
      <text x="400" y="1000" textAnchor="middle" fontSize="26" fontWeight="500" fill="#1A1A1A" letterSpacing="-0.01em">Engineering understanding is reconstructed.</text>
      <text x="400" y="1040" textAnchor="middle" fontSize="26" fontWeight="600" fill="#1A1A1A" letterSpacing="-0.01em">Never accumulated.</text>
    </svg>
  );
}
