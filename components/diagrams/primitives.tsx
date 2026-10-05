// Shared diagram building blocks (DIAGRAM-PLAN §2.1). Server components that draw SVG
// fragments; they must be placed inside an <svg>, with <DiagramDefs /> rendered once per page.
// Geometry and classes are ported from design/homepage-preview/home.html; colours come from
// tokens (see the "diagram grammar" block in app/globals.css), so dark mode needs no extra work.
import type { ReactNode } from "react";

/** Shared arrow markers and the blur filter. Render once per page (the root layout does). */
export function DiagramDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <marker id="ah" viewBox="0 0 10 10" refX="8.6" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
          <path d="M1.6,1.6 L8.6,5 L1.6,8.4" className="mk-ink" />
        </marker>
        <marker id="ahg" viewBox="0 0 10 10" refX="8.6" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M1.6,1.6 L8.6,5 L1.6,8.4" className="mk-grey" />
        </marker>
        <filter id="haze" x="-10%" y="-30%" width="120%" height="160%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
      </defs>
    </svg>
  );
}

export type RecordVariant = "session" | "canonical" | "challenged" | "openQuestion" | "superseded" | "deprecated";

type RecordProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  variant: RecordVariant;
  /** Serif lines of conclusion text (13 px, 17 px leading). Omit for an empty box. */
  lines?: string[];
  /** Draw the stroke in ink instead of rule-strong (the focal record). */
  strong?: boolean;
  /** "soft": a receded neighbour (~50%, legible). "blur": an out-of-focus record (~40%, 1 px blur, grey bars for text). */
  haze?: "soft" | "blur";
  /** Mono status label above the record for challenged, open question, superseded and deprecated. Default true. */
  showLabel?: boolean;
  /** Smaller serif (12.5 px), as the hero's neighbours use. */
  small?: boolean;
};

const STATUS_LABEL: Partial<Record<RecordVariant, string>> = {
  challenged: "challenged",
  openQuestion: "open question",
  superseded: "superseded",
  deprecated: "deprecated",
};

export function Record({ x, y, width, height, variant, lines = [], strong, haze, showLabel = true, small }: RecordProps) {
  const dashed = variant === "session" || variant === "openQuestion";
  const faded = variant === "superseded" || variant === "deprecated";
  const barClass = variant === "challenged" ? "bar-amber" : variant === "canonical" ? "bar-accent" : null;
  const boxClass = dashed ? "rec-session" : strong ? "rec-strong" : "rec-canon";
  const textClass = `${small ? "t-rec-sm" : "t-rec"}${faded ? " t-struck" : ""}`;
  const lead = small ? 17 : 17;
  const label = showLabel ? STATUS_LABEL[variant] : undefined;

  const body = (
    <>
      <rect x={x} y={y} width={width} height={height} rx={2} className={boxClass} />
      {barClass ? <rect x={x} y={y} width={3} height={height} className={barClass} /> : null}
      {haze === "blur"
        ? lines.map((l, i) => (
            <rect key={i} x={x + 12} y={y + 10 + i * 8} width={Math.min(width - 24, Math.round(l.length * 3.2))} height={4} className="blur-bar" />
          ))
        : lines.map((l, i) => (
            <text key={i} x={x + 12} y={y + 21 + i * lead} className={textClass}>
              {l}
            </text>
          ))}
      {variant === "openQuestion" ? (
        <text x={x + width - 14} y={y + 20} textAnchor="middle" className="t-ev">
          ?
        </text>
      ) : null}
      {label && haze !== "blur" ? (
        <text x={x} y={y - 6} className="t-mono-sm">
          {label}
        </text>
      ) : null}
    </>
  );

  if (haze === "blur") return <g opacity={0.42} filter="url(#haze)">{body}</g>;
  if (haze === "soft") return <g opacity={0.5}>{body}</g>;
  return <g>{body}</g>;
}

/** A full-width sunken region for things that persist over time. The label is serif italic, top-left. */
export function Band({ x, y, width, height, label }: { x: number; y: number; width: number; height: number; label?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} className="band" />
      {label ? (
        <text x={x + 12} y={y + 20} className="t-note">
          {label}
        </text>
      ) : null}
    </g>
  );
}

/** Process arrow: 1.4 px ink line with an open arrowhead (shared marker). Pass a path `d` for a curve. */
export function FlowArrow(props: { x1: number; y1: number; x2: number; y2: number } | { d: string }) {
  if ("d" in props) return <path d={props.d} className="flow" markerEnd="url(#ah)" />;
  const { x1, y1, x2, y2 } = props;
  return <line x1={x1} y1={y1} x2={x2} y2={y2} className="flow" markerEnd="url(#ah)" />;
}

/**
 * Session boundary: a vertical dashed line. The serif-italic label interrupts it:
 * "top" caps the line (as in Fig. 1), "middle" sits on a paper-coloured patch cut out of the line.
 */
export function Boundary({
  x,
  y1,
  y2,
  label,
  labelAt = "top",
  anchor = "middle",
}: {
  x: number;
  y1: number;
  y2: number;
  label: string;
  labelAt?: "top" | "middle";
  anchor?: "start" | "middle" | "end";
}) {
  if (labelAt === "top") {
    return (
      <g>
        <line x1={x} y1={y1 + 24} x2={x} y2={y2} className="dash" />
        <text x={x} y={y1 + 14} textAnchor={anchor} className="t-note">
          {label}
        </text>
      </g>
    );
  }
  const mid = (y1 + y2) / 2;
  const w = Math.round(label.length * 6.4 + 16);
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2} className="dash" />
      <rect x={x - w / 2} y={mid - 11} width={w} height={20} fill="var(--paper)" />
      <text x={x} y={mid + 4} textAnchor="middle" className="t-note">
        {label}
      </text>
    </g>
  );
}

/** Review gate: a narrow bordered box with "Review" (serif 500) and its outcomes (serif italic). */
export function Gate({ x, y, width, outcomes, height }: { x: number; y: number; width: number; outcomes: string[]; height?: number }) {
  const h = height ?? 40 + outcomes.length * 18;
  return (
    <g>
      <rect x={x} y={y} width={width} height={h} rx={2} className="box" />
      <text x={x + width / 2} y={y + 25} textAnchor="middle" className="t-gate">
        Review
      </text>
      {outcomes.map((o, i) => (
        <text key={i} x={x + width / 2} y={y + 46 + i * 18} textAnchor="middle" className="t-note">
          {o}
        </text>
      ))}
    </g>
  );
}

/**
 * Confidence bar: 1 px outline track, solid fill to `value`.
 * "frozen" fills in ink-3 (parked values). `effective` adds a dashed ghost fill to that value
 * (confidence after decay; never stored). Pass `showValue` for the mono numeral.
 */
export function ConfidenceBar({
  x,
  y,
  width = 96,
  value,
  mode = "solid",
  effective,
  showValue,
}: {
  x: number;
  y: number;
  width?: number;
  value: number;
  mode?: "solid" | "frozen";
  effective?: number;
  showValue?: boolean;
}) {
  const h = 4;
  const fill = (v: number) => Math.max(0, Math.min(1, v)) * width;
  return (
    <g>
      <rect x={x} y={y} width={width} height={h} className="track" />
      <rect x={x} y={y} width={fill(value)} height={h} className={mode === "frozen" ? "track-fill-frozen" : "track-fill"} />
      {effective !== undefined ? <rect x={x + 0.5} y={y + 0.5} width={fill(effective)} height={h - 1} className="track-ghost" /> : null}
      {showValue ? (
        <text x={x + width + 8} y={y + 5} className="t-mono-sm">
          {value.toFixed(2)}
        </text>
      ) : null}
    </g>
  );
}

export type EdgeKind = "supports" | "contradicts" | "supersedes" | "dependsOn";

/**
 * Relationship edge between records. Give a path `d` (a curve) or straight `from`/`to`.
 * supports: solid, grey arrowhead. dependsOn: dashed, grey arrowhead.
 * contradicts: solid with an amber perpendicular tick at the target.
 * supersedes: ink line, arrowhead and the label `replaces` at `labelAt`.
 * `end` is the target point and `endAngle` the direction of travel there (degrees; defaults to from→to).
 */
export function Edge({
  kind,
  d,
  from,
  to,
  endAngle,
  labelAt,
  label,
}: {
  kind: EdgeKind;
  d?: string;
  from?: [number, number];
  to: [number, number];
  endAngle?: number;
  labelAt?: [number, number];
  label?: ReactNode;
}) {
  const path = d ?? `M${from![0]},${from![1]} L${to[0]},${to[1]}`;
  const angle = endAngle ?? (from ? (Math.atan2(to[1] - from[1], to[0] - from[0]) * 180) / Math.PI : 0);
  const rad = (angle * Math.PI) / 180;
  const nx = -Math.sin(rad) * 6;
  const ny = Math.cos(rad) * 6;
  return (
    <g>
      {kind === "supersedes" ? (
        <path d={path} className="edge-replace" markerEnd="url(#ah)" />
      ) : (
        <path d={path} className={kind === "dependsOn" ? "edge-dash" : "edge"} markerEnd={kind === "contradicts" ? undefined : "url(#ahg)"} />
      )}
      {kind === "contradicts" ? <line x1={to[0] - nx} y1={to[1] - ny} x2={to[0] + nx} y2={to[1] + ny} className="edge-tick" /> : null}
      {kind === "supersedes" && labelAt ? (
        <text x={labelAt[0]} y={labelAt[1]} className="t-mono-sm">
          {label ?? "replaces"}
        </text>
      ) : null}
    </g>
  );
}
