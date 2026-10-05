// The "specimen": one conclusion rendered from JSON (WEBSITE-DESIGN-PLAN §10.9, DIAGRAM-PLAN V1/F3).
// compact = the homepage hero card (330 px); full = F3 on How it works.
import Tag from "@/components/ui/Tag";

export type ConclusionSpecimen = {
  label: string;
  status: "reviewed" | "unreviewed";
  cognition: string;
  type: string;
  scope: string;
  confidence: number;
  grounding: { files: string[]; commit?: string; symbols?: string[] };
  /** TODO(fact): exact framing-note wording from PRODUCT.md §13; the short form is used for now. */
  framingNote: string;
  related?: { relation: string; text: string; struck?: boolean }[];
  captured: { source: "illustrative" | "captured"; date?: string; reverieVersion?: string };
};

/** Paths wrap after `/`. */
function Path({ children }: { children: string }) {
  const parts = children.split("/");
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 ? "/" : null}
          {i < parts.length - 1 ? <wbr /> : null}
        </span>
      ))}
    </>
  );
}

export default function ConclusionRecord({
  data,
  variant = "compact",
  showTag = true,
}: {
  data: ConclusionSpecimen;
  variant?: "compact" | "full";
  /** Print the `Example` tag for illustrative data. Pass false where the caption carries it. */
  showTag?: boolean;
}) {
  const full = variant === "full";
  const reviewed = data.status === "reviewed";
  const statusText = full ? (reviewed ? "canonical · reviewed" : "session · unreviewed") : data.status;
  const pct = Math.round(data.confidence * 100);

  return (
    <div className={`specimen specimen-${variant}`}>
      <div className="sp-head">
        <span>{data.label}</span>
        <span className="sp-status">
          <i className={reviewed ? undefined : "hollow"} aria-hidden="true" />
          {statusText}
        </span>
      </div>
      <p className="sp-cognition">{data.cognition}</p>
      <dl className="sp-fields">
        <dt>type</dt>
        <dd>{data.type}</dd>
        <dt>scope</dt>
        <dd>{data.scope}</dd>
        <dt>confidence</dt>
        <dd>
          {data.confidence.toFixed(2)}
          <span className="cbar" role="img" aria-label={`${pct} percent`}>
            <i style={{ width: `${pct}%` }} />
          </span>
        </dd>
        <dt>grounding</dt>
        <dd>
          {data.grounding.files.map((f, i) => (
            <span key={f}>
              {i > 0 ? <br /> : null}
              <Path>{f}</Path>
              {i === data.grounding.files.length - 1 && data.grounding.commit ? (
                <span className="dim"> @ {data.grounding.commit}</span>
              ) : null}
            </span>
          ))}
        </dd>
        {full && data.grounding.symbols ? (
          <>
            <dt>symbols</dt>
            <dd>
              {data.grounding.symbols.map((s, i) => (
                <span key={s}>
                  {i > 0 ? <br /> : null}
                  {s}
                </span>
              ))}
            </dd>
          </>
        ) : null}
      </dl>
      {full && data.related?.length ? (
        <ul className="sp-related">
          {data.related.map((r) => (
            <li key={r.text}>
              <span className="rel">{r.relation}</span>
              {r.struck ? <s style={{ color: "var(--ink-3)" }}>{r.text}</s> : r.text}
            </li>
          ))}
        </ul>
      ) : null}
      <p className="sp-foot">{data.framingNote}</p>
      {showTag && data.captured.source === "illustrative" ? (
        <div style={{ padding: "0 16px 12px" }}>
          <Tag>Example</Tag>
        </div>
      ) : null}
    </div>
  );
}
