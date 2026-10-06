// M1: the memory map. Animation keyframes live in app/home.css; MemoryMapControls (client island) adds pause and off-screen stop.
import type { ReactNode } from "react";

/**
 * A canonical record: box, accent bar and one line of text (13 px, baseline 18.5 below the top).
 * `blank` records are the background of the map: a faint line instead of words, so only the records that change are read.
 */
function Rec({ x, y, w, children, blank = false }: { x: number; y: number; w: number; children?: string; blank?: boolean }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={28} rx={2} className="rec-canon" />
      <rect x={x} y={y} width={3} height={28} className="bar-accent" />
      {blank ? (
        <rect x={x + 12} y={y + 11} width={Math.round((w - 24) * 0.72)} height={6} rx={3} className="skel" />
      ) : (
        <text x={x + 12} y={y + 18.5} className="t-rec">{children}</text>
      )}
    </>
  );
}

export const MEMORY_MAP_EVENTS = [
  "A new conclusion arrives from a session and waits, dashed, for your review.",
  "After review it joins long-term memory and strengthens a related conclusion.",
  "A newer conclusion disagrees with an older one, which is marked challenged.",
  "You prefer the newer conclusion: it replaces the older one, which is kept, struck through.",
  "A conclusion that is never used fades.",
];

export default function MemoryMap({ controls }: { controls?: ReactNode }) {
  return (
    <div className="mm-wrap">
      {controls}
      <div id="mm" className="mm">
        {/* desktop map */}
        <svg className="desk" viewBox="0 0 1200 280" role="img" aria-labelledby="f2cap" aria-describedby="mm-events">
          <g>
            <path d="M242,224 C266,224 274,204 296,202" className="edge-dash" markerEnd="url(#ahg)" />
            <path d="M469,196 C500,190 512,146 536,138" className="edge-dash" markerEnd="url(#ahg)" />
            <path d="M471,72 C502,74 514,116 536,124" className="edge" markerEnd="url(#ahg)" />
            <path d="M622,218 C622,196 622,170 622,150" className="edge-dash" markerEnd="url(#ahg)" />
            <path d="M900,168 C910,140 920,122 936,110" className="edge" markerEnd="url(#ahg)" />
            <path d="M1012,78 C1030,66 1042,58 1056,52" className="edge" markerEnd="url(#ahg)" />
            <path d="M872,200 C872,214 870,226 868,240" className="edge" markerEnd="url(#ahg)" />
          </g>
          <Rec x={40} y={24} w={132} blank />
          <Rec x={40} y={210} w={200} blank />
          <rect className="n2-rect anim rec-canon" x="280" y="58" width="189" height="28" rx="2" />
          <rect x="280" y="58" width="3" height="28" className="bar-accent" />
          <text x="292" y="76.5" className="t-rec">cache reads wait for refresh</text>
          <Rec x={300} y={188} w={167} blank />
          <g className="n1-body anim"><Rec x={540} y={118} w={168}>tokens refresh at expiry</Rec></g>
          <rect className="n1-amber anim bar-amber" x="540" y="118" width="3" height="28" />
          <line className="n1-strike anim s-ink3" pathLength="100" x1="551" y1="132" x2="697" y2="132" strokeWidth="1.2" />
          <Rec x={548} y={220} w={189} blank />
          <Rec x={800} y={170} w={180} blank />
          <Rec x={890} y={80} w={145} blank />
          <Rec x={1030} y={22} w={155} blank />
          <Rec x={812} y={244} w={142} blank />
          <g className="n6 anim">
            <path d="M1060,188 C1052,150 1036,124 1016,112" className="edge-dash" markerEnd="url(#ahg)" />
            <Rec x={1010} y={190} w={160}>build cache per lockfile</Rec>
          </g>
          {/* events */}
          <g className="a1-dashed anim">
            <rect x="40" y="116" width="156" height="28" rx="2" className="rec-session" />
            <text x="52" y="134.5" className="t-rec">cache cleared too early</text>
          </g>
          <g className="a1-solid anim">
            <rect x="40" y="116" width="156" height="28" rx="2" className="rec-strong" />
            <rect x="40" y="116" width="3" height="28" className="bar-accent" />
            <text x="52" y="134.5" className="t-rec">cache cleared too early</text>
          </g>
          <text className="lab-new anim t-ev" x="40" y="108">new · awaiting review</text>
          <text className="lab-added anim t-ev" x="40" y="108">added after review</text>
          <path className="e-a1n2 anim s-ink" pathLength="100" d="M198,124 C226,112 246,80 276,72" strokeWidth="1.4" fill="none" />
          <path className="e-a1n2-head anim" d="M198,124 C226,112 246,80 276,72" stroke="none" fill="none" markerEnd="url(#ah)" />
          <text className="lab-strong anim t-ev" x="280" y="50">strengthened</text>
          <g className="c1 anim">
            <rect x="566" y="20" width="198" height="28" rx="2" className="rec-strong" />
            <rect x="566" y="20" width="3" height="28" className="bar-accent" />
            <text x="578" y="38.5" className="t-rec">tokens refresh before expiry</text>
          </g>
          <path className="e-contra anim s-amber" pathLength="100" d="M640,50 C636,74 630,94 626,114" strokeWidth="1.4" fill="none" />
          <line className="e-contra anim s-amber" pathLength="100" x1="617" y1="109" x2="635" y2="112" strokeWidth="1.6" />
          <text className="lab-challenged anim t-ev f-amber" x="720" y="137">challenged</text>
          <g className="e-replaces anim">
            <path d="M640,50 C636,74 630,94 626,114" className="edge-replace" markerEnd="url(#ah)" />
            <text x="646" y="88" className="t-mono-sm">replaces</text>
          </g>
          <text className="lab-superseded anim t-ev" x="720" y="137">superseded · kept</text>
          <text className="lab-fading anim t-ev" x="1010" y="238">fading · unused</text>
        </svg>

        {/* mobile map */}
        <svg className="mob" viewBox="0 0 360 410" role="img" aria-labelledby="f2cap" aria-describedby="mm-events">
          <path d="M90,328 C92,310 96,296 100,282" className="edge-dash" markerEnd="url(#ahg)" />
          <rect className="n2-rect anim rec-canon" x="150" y="30" width="186" height="28" rx="2" />
          <rect x="150" y="30" width="3" height="28" className="bar-accent" />
          <text x="162" y="48.5" className="t-rec">cache reads wait for refresh</text>
          <g className="n1-body anim"><Rec x={40} y={250} w={164}>tokens refresh at expiry</Rec></g>
          <rect className="n1-amber anim bar-amber" x="40" y="250" width="3" height="28" />
          <line className="n1-strike anim s-ink3" pathLength="100" x1="51" y1="264" x2="192" y2="264" strokeWidth="1.2" />
          <Rec x={10} y={330} w={160} blank />
          <g className="n6 anim"><Rec x={186} y={370} w={160}>build cache per lockfile</Rec></g>
          <g className="a1-dashed anim">
            <rect x="10" y="100" width="156" height="28" rx="2" className="rec-session" />
            <text x="22" y="118.5" className="t-rec">cache cleared too early</text>
          </g>
          <g className="a1-solid anim">
            <rect x="10" y="100" width="156" height="28" rx="2" className="rec-strong" />
            <rect x="10" y="100" width="3" height="28" className="bar-accent" />
            <text x="22" y="118.5" className="t-rec">cache cleared too early</text>
          </g>
          <text className="lab-new anim t-ev" x="10" y="92">new · awaiting review</text>
          <text className="lab-added anim t-ev" x="10" y="92">added after review</text>
          <path className="e-a1n2 anim s-ink" pathLength="100" d="M168,106 C182,92 190,76 200,62" strokeWidth="1.4" fill="none" />
          <path className="e-a1n2-head anim" d="M168,106 C182,92 190,76 200,62" stroke="none" fill="none" markerEnd="url(#ah)" />
          <text className="lab-strong anim t-ev" x="150" y="22">strengthened</text>
          <g className="c1 anim">
            <rect x="160" y="170" width="190.5" height="28" rx="2" className="rec-strong" />
            <rect x="160" y="170" width="3" height="28" className="bar-accent" />
            <text x="172" y="188.5" className="t-rec">tokens refresh before expiry</text>
          </g>
          <path className="e-contra anim s-amber" pathLength="100" d="M220,200 C206,218 190,232 176,246" strokeWidth="1.4" fill="none" />
          <line className="e-contra anim s-amber" pathLength="100" x1="171" y1="237" x2="183" y2="249" strokeWidth="1.6" />
          <text className="lab-challenged anim t-ev f-amber" x="214" y="269">challenged</text>
          <g className="e-replaces anim">
            <path d="M220,200 C206,218 190,232 176,246" className="edge-replace" markerEnd="url(#ah)" />
            <text x="206" y="230" className="t-mono-sm">replaces</text>
          </g>
          <text className="lab-superseded anim t-ev" x="214" y="269">superseded · kept</text>
          <text className="lab-fading anim t-ev" x="186" y="362">fading · unused</text>
        </svg>
      </div>

      <ol id="mm-events" className="sr-only">
        {MEMORY_MAP_EVENTS.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ol>
    </div>
  );
}
