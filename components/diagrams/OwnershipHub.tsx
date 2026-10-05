// O1: one memory, many agents. Desktop SVG plus hub-and-grid on mobile. Agents come from site.config.ts:
// solid records (with a tick) work today, dashed ones are coming soon. "Any MCP agent" follows claims.anyMcpAgent.
import Tick from "@/components/ui/Tick";
import { siteConfig, readyAgents, comingSoon, listText } from "@/content/site.config";

const HUB = { x: 470, y: 88, w: 262, h: 116 };

function edgePath(side: "left" | "right", sy: number, ey: number) {
  const sx = side === "left" ? 310 : 890;
  const ex = side === "left" ? 468 : 734;
  const dir = side === "left" ? 1 : -1;
  const c2y = Math.abs(sy - ey) < 4 ? ey : ey + (sy < ey ? -5 : 5);
  return `M${sx},${sy} C${sx + dir * 80},${sy} ${ex - dir * 67},${c2y} ${ex},${ey}`;
}

export default function OwnershipHub() {
  const any = siteConfig.claims.anyMcpAgent;
  const items = [
    ...siteConfig.agents,
    ...(any ? [{ name: "Any MCP agent", ready: any === "ready" }] : []),
  ];
  const left = items.slice(0, 2);
  const right = items.slice(2);
  const ready = readyAgents();
  const soon = comingSoon();

  const layout = (list: { name: string; ready: boolean }[], side: "left" | "right") => {
    const gap = side === "left" ? 106 : 96;
    const cy = side === "left" ? 145 : 148;
    return list.map((it, i) => {
      const c = cy + (i - (list.length - 1) / 2) * gap;
      const ey = 146 + (i - (list.length - 1) / 2) * 28;
      return { ...it, boxY: c - 22, edge: edgePath(side, c, ey) };
    });
  };
  const L = layout(left, "left");
  const R = layout(right, "right");

  return (
    <figure className="fig">
      <svg className="desk" viewBox="0 0 1200 290" role="img" aria-labelledby="f3cap">
        {[...L, ...R].map((a) => <path key={a.name} d={a.edge} className={a.ready ? "edge" : "edge-dash"} />)}
        <text x="350" y="82" className="t-mono-sm f-ink3">MCP</text>
        <text x="812" y="136" className="t-mono-sm f-ink3">MCP</text>
        <rect x={HUB.x} y={HUB.y} width={HUB.w} height={HUB.h} rx="2" className="rec-strong" />
        <rect x={HUB.x} y={HUB.y} width="4" height={HUB.h} className="bar-accent" />
        <text x="494" y="126" className="t-title" style={{ fontSize: 21 }}>Your memory</text>
        <text x="494" y="152" className="t-mono-sm f-ink" style={{ fontSize: 12.5 }}>~/.ec/ec.db</text>
        <text x="494" y="180" className="t-note f-ink2" style={{ fontSize: 14 }}>on your machine · reviewed by you</text>
        {[...L.map((a) => ({ ...a, x: 110 })), ...R.map((a) => ({ ...a, x: 890 }))].map((a) => (
          <g key={a.name}>
            <rect x={a.x} y={a.boxY} width="200" height="44" rx="2" className={a.ready ? "rec-canon" : "rec-session s-ink3"} />
            <text x={a.x + 20} y={a.boxY + 28} className={`t-title${a.ready ? "" : " f-ink2"}`} style={{ fontSize: 17, fontWeight: 400 }}>{a.name}</text>
            {a.ready ? <path d={`M${a.x + 166},${a.boxY + 22} l4.5,4.5 l8.5,-9`} className="tick-path" /> : null}
          </g>
        ))}
      </svg>
      <div className="o1-mobile">
        <div className="o1m-hub"><b>Your memory</b><code>~/.ec/ec.db</code><i>on your machine · reviewed by you</i></div>
        <div className="o1m-agents">
          {items.map((a) => (
            <span key={a.name} className={a.ready ? undefined : "soon"}>
              {a.name}
              {a.ready ? <Tick /> : null}
            </span>
          ))}
        </div>
      </div>
      <figcaption className="caption" id="f3cap">
        <span className="fig-n">Fig. 3</span>Solid: works today. Dashed: coming soon.
      </figcaption>
      <p className="sr-only">
        One memory file on your machine, shared over MCP by every connected agent. {listText(ready)} works today
        {soon.length ? `; ${listText(soon)} ${soon.length > 1 ? "are" : "is"} coming soon` : ""}.
      </p>
    </figure>
  );
}
