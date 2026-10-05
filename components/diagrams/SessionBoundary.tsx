// F1: how it works, across the session boundary. Four station drawings (shared <symbol>s), a desktop SVG
// and the stacked mobile composition. Geometry ported from design/homepage-preview/home.html.
import ArrowLink from "@/components/ui/ArrowLink";

const STEPS = [
  { n: 1, sym: "st1", title: "Your agent works", line: "Conclusions are extracted as it goes." },
  { n: 2, sym: "st2", title: "You review", line: "Keep what’s right. Drop the rest." },
  { n: 3, sym: "st3", title: "Memory builds up", line: "Grounded in your code." },
  { n: 4, sym: "st4", title: "Your agent asks", line: "After reading the code, not before." },
];

function Stations() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="st1" viewBox="0 0 240 150">
          <rect x="10" y="6" width="220" height="138" rx="2" className="box" />
          <rect x="28" y="24" width="168" height="5" className="reason" />
          <rect x="28" y="37" width="138" height="5" className="reason" />
          <rect x="28" y="50" width="152" height="5" className="reason" />
          <rect x="28" y="72" width="184" height="26" rx="2" className="rec-session" />
          <text x="40" y="89.5" className="t-rec f-ink3">conclusion</text>
          <rect x="28" y="106" width="142" height="26" rx="2" className="rec-session" />
          <text x="40" y="123.5" className="t-rec f-ink3">conclusion</text>
        </symbol>
        <symbol id="st2" viewBox="0 0 240 150">
          <rect x="6" y="38" width="76" height="26" rx="2" className="rec-session" />
          <rect x="6" y="86" width="76" height="26" rx="2" className="rec-session" />
          <line x1="84" y1="51" x2="108" y2="51" className="flow" markerEnd="url(#ah)" />
          <line x1="84" y1="99" x2="108" y2="99" className="flow" markerEnd="url(#ah)" />
          <line x1="120" y1="12" x2="120" y2="138" className="s-ink" strokeWidth="2.2" />
          <rect x="134" y="38" width="76" height="26" rx="2" className="rec-strong" />
          <rect x="134" y="38" width="3" height="26" className="bar-accent" />
          <text x="218" y="57" className="t-title" style={{ fontSize: 17 }}>✓</text>
          <g opacity=".45">
            <rect x="134" y="86" width="76" height="26" rx="2" className="rec-canon" />
            <line x1="142" y1="99" x2="202" y2="99" className="s-ink3" strokeWidth="1" />
            <text x="218" y="105" className="t-title f-ink3" style={{ fontSize: 17 }}>×</text>
          </g>
        </symbol>
        <symbol id="st3" viewBox="0 0 240 150">
          <rect x="0" y="6" width="240" height="138" className="f-sunken" />
          <line x1="66" y1="42" x2="66" y2="64" className="edge" />
          <line x1="170" y1="42" x2="160" y2="64" className="edge" />
          <rect x="16" y="22" width="96" height="20" rx="2" className="rec-canon" />
          <rect x="16" y="22" width="3" height="20" className="bar-accent" />
          <rect x="124" y="22" width="102" height="20" rx="2" className="rec-strong sw-22" />
          <rect x="124" y="22" width="3" height="20" className="bar-accent" />
          <rect x="16" y="64" width="84" height="20" rx="2" className="rec-canon" />
          <rect x="16" y="64" width="3" height="20" className="bar-accent" />
          <rect x="112" y="64" width="110" height="20" rx="2" className="rec-canon" />
          <rect x="112" y="64" width="3" height="20" className="bar-accent" />
          <g opacity=".3">
            <rect x="40" y="106" width="120" height="20" rx="2" className="rec-canon" />
            <rect x="40" y="106" width="3" height="20" className="bar-accent" />
          </g>
        </symbol>
        <symbol id="st4" viewBox="0 0 240 150">
          <rect x="10" y="6" width="220" height="138" rx="2" className="box" />
          <rect x="28" y="24" width="160" height="5" className="reason" />
          <rect x="28" y="37" width="128" height="5" className="reason" />
          <rect x="28" y="50" width="146" height="5" className="reason" />
          <rect x="28" y="78" width="170" height="26" rx="2" className="rec-strong" />
          <rect x="28" y="78" width="3" height="26" className="bar-accent" />
          <text x="40" y="95.5" className="t-rec">relevant conclusion</text>
          <text x="28" y="128" className="t-note">checked against the code</text>
        </symbol>
      </defs>
    </svg>
  );
}

export default function SessionBoundary() {
  return (
    <>
      <Stations />
      <figure className="fig">
        <svg className="desk" viewBox="0 0 1200 270" role="img" aria-labelledby="f1cap">
          <line x1="300" y1="0" x2="300" y2="262" className="dash" />
          <rect x="252" y="0" width="96" height="20" className="f-paper" />
          <text x="300" y="14" textAnchor="middle" className="t-note">session ends</text>
          <line x1="900" y1="0" x2="900" y2="262" className="dash" />
          <rect x="850" y="0" width="100" height="20" className="f-paper" />
          <text x="900" y="14" textAnchor="middle" className="t-note">next session</text>
          {STEPS.map((s, i) => (
            <use key={s.sym} href={`#${s.sym}`} x={30 + i * 300} y={24} width={240} height={150} />
          ))}
          <line x1="262" y1="99" x2="334" y2="99" className="flow" markerEnd="url(#ah)" />
          <line x1="568" y1="75" x2="626" y2="75" className="flow" markerEnd="url(#ah)" />
          <line x1="872" y1="115" x2="956" y2="115" className="flow" markerEnd="url(#ah)" />
          {STEPS.map((s, i) => (
            <g key={s.n}>
              <text x={40 + i * 300} y="212">
                <tspan className="t-num">{s.n}</tspan>
                <tspan className="t-title" dx="10">{s.title}</tspan>
              </text>
              <text x={40 + i * 300} y="238" className="t-line">{s.line}</text>
            </g>
          ))}
        </svg>
        <div className="f1-mobile">
          {STEPS.map((s) => (
            <div key={s.n}>
              {s.n === 2 ? <div className="m-boundary">session ends</div> : null}
              {s.n === 4 ? <div className="m-boundary">next session</div> : null}
              <div className="st">
                <svg viewBox="0 0 240 150" aria-hidden="true"><use href={`#${s.sym}`} /></svg>
                <h3><span className="n">{s.n}</span>{s.title}</h3>
                <p>{s.line}</p>
              </div>
            </div>
          ))}
        </div>
        <figcaption className="caption" id="f1cap">
          <span className="fig-n">Fig. 1</span>Dashed: not yet reviewed. Solid, with a blue edge: reviewed by you.
        </figcaption>
        <p className="sr-only">
          Four steps across two session boundaries. Your agent works and extracts conclusions. The session ends. You review
          and keep what is right. Memory builds up, grounded in your code. In the next session, your agent asks for relevant
          conclusions after reading the code, not before.
        </p>
      </figure>
      <p className="more">
        <ArrowLink href="/how-it-works">The full mechanism</ArrowLink>
      </p>
    </>
  );
}
