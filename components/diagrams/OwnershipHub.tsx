// O1: one memory, many agents. Desktop SVG plus hub-and-grid on mobile. Agents come from site.config.ts;
// the dashed "Any MCP agent" record renders only when claims.anyMcpAgent is true (P13).
import { siteConfig } from "@/content/site.config";

const HUB = { x: 470, y: 88, w: 262, h: 116 };

function edgePath(side: "left" | "right", sy: number, ey: number) {
  const sx = side === "left" ? 310 : 890;
  const ex = side === "left" ? 468 : 734;
  const dir = side === "left" ? 1 : -1;
  const c2y = Math.abs(sy - ey) < 4 ? ey : ey + (sy < ey ? -5 : 5);
  return `M${sx},${sy} C${sx + dir * 80},${sy} ${ex - dir * 67},${c2y} ${ex},${ey}`;
}

export default function OwnershipHub() {
  const agents = siteConfig.supportedAgents;
  const any = siteConfig.claims.anyMcpAgent;
  const left = agents.slice(0, 2).map((name) => ({ name, dashed: false }));
  const right = [...agents.slice(2).map((name) => ({ name, dashed: false })), ...(any ? [{ name: "Any MCP agent", dashed: true }] : [])];

  const layout = (items: { name: string; dashed: boolean }[], side: "left" | "right") => {
    const gap = side === "left" ? 106 : 96;
    const cy = side === "left" ? 145 : 148;
    return items.map((it, i) => {
      const c = cy + (i - (items.length - 1) / 2) * gap;
      const ey = 146 + (i - (items.length - 1) / 2) * 28;
      return { ...it, boxY: c - 22, edge: edgePath(side, c, ey) };
    });
  };
  const L = layout(left, "left");
  const R = layout(right, "right");

  return (
    <figure className="fig">
      <svg className="desk" viewBox="0 0 1200 290" role="img" aria-labelledby="f3cap">
        {L.map((a) => <path key={a.name} d={a.edge} className="edge" />)}
        {R.map((a) => <path key={a.name} d={a.edge} className={a.dashed ? "edge-dash" : "edge"} />)}
        <text x="350" y="82" className="t-mono-sm f-ink3">MCP</text>
        <text x="812" y="136" className="t-mono-sm f-ink3">MCP</text>
        <rect x={HUB.x} y={HUB.y} width={HUB.w} height={HUB.h} rx="2" className="rec-strong" />
        <rect x={HUB.x} y={HUB.y} width="4" height={HUB.h} className="bar-accent" />
        <text x="494" y="126" className="t-title" style={{ fontSize: 21 }}>Your memory</text>
        <text x="494" y="152" className="t-mono-sm f-ink" style={{ fontSize: 12.5 }}>~/.ec/ec.db</text>
        <text x="494" y="180" className="t-note f-ink2" style={{ fontSize: 14 }}>on your machine · reviewed by you</text>
        {L.map((a) => (
          <g key={a.name}>
            <rect x="110" y={a.boxY} width="200" height="44" rx="2" className="rec-canon" />
            <text x="130" y={a.boxY + 28} className="t-title" style={{ fontSize: 17, fontWeight: 400 }}>{a.name}</text>
          </g>
        ))}
        {R.map((a) => (
          <g key={a.name}>
            <rect x="890" y={a.boxY} width="200" height="44" rx="2" className={a.dashed ? "rec-session s-ink3" : "rec-canon"} />
            <text x="910" y={a.boxY + 28} className={`t-title${a.dashed ? " f-ink2" : ""}`} style={{ fontSize: 17, fontWeight: 400 }}>{a.name}</text>
          </g>
        ))}
      </svg>
      <div className="o1-mobile">
        <div className="o1m-hub"><b>Your memory</b><code>~/.ec/ec.db</code><i>on your machine · reviewed by you</i></div>
        <div className="o1m-agents">
          {agents.map((a) => <span key={a}>{a}</span>)}
          {any ? <span className="byhand">Any MCP agent</span> : null}
        </div>
      </div>
      <figcaption className="caption" id="f3cap">
        <span className="fig-n">Fig. 3</span>Solid: set up for you. Dashed: set up by hand.
      </figcaption>
      <p className="sr-only">
        One memory file on your machine, shared by every connected agent over MCP: {agents.join(", ")}
        {any ? ", and any other MCP agent, which you set up by hand" : ""}.
      </p>
    </figure>
  );
}
