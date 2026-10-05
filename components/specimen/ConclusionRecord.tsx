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
  /** How the conclusion was reached (full variant only; Fig. 3 annotates it). */
  source?: string;
  /** Lifecycle status, for example `active` (full variant only). The header shows the brain. */
  lifecycleStatus?: string;
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

export type MarkerKey = "cognition" | "type" | "scope" | "confidence" | "status" | "source" | "grounding" | "related" | "framing";

export default function ConclusionRecord({
  data,
  variant = "compact",
  showTag = true,
  markers,
}: {
  data: ConclusionSpecimen;
  variant?: "compact" | "full";
  /** Print the `Example` tag for illustrative data. Pass false where the caption carries it. */
  showTag?: boolean;
  /** Numbered markers at the right edge of rows (Fig. 3). Full variant only. */
  markers?: Partial<Record<MarkerKey, number>>;
}) {
  const full = variant === "full";
  const mk = (k: MarkerKey) =>
    full && markers?.[k] ? (
      <span className="sp-mk" data-mk={markers[k]} aria-hidden="true">
        {markers[k]}
      </span>
    ) : null;
  const mc = (k: MarkerKey) => (full && markers?.[k] ? "has-mk" : undefined);
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
      <p className={`sp-cognition ${mc("cognition") ?? ""}`.trim()}>
        {data.cognition}
        {mk("cognition")}
      </p>
      <dl className="sp-fields">
        <dt>type</dt>
        <dd className={mc("type")}>
          {data.type}
          {mk("type")}
        </dd>
        <dt>scope</dt>
        <dd className={mc("scope")}>
          {data.scope}
          {mk("scope")}
        </dd>
        <dt>confidence</dt>
        <dd className={mc("confidence")}>
          {data.confidence.toFixed(2)}
          <span className="cbar" role="img" aria-label={`${pct} percent`}>
            <i style={{ width: `${pct}%` }} />
          </span>
          {mk("confidence")}
        </dd>
        {full && data.lifecycleStatus ? (
          <>
            <dt>status</dt>
            <dd className={mc("status")}>
              {data.lifecycleStatus}
              {mk("status")}
            </dd>
          </>
        ) : null}
        {full && data.source ? (
          <>
            <dt>source</dt>
            <dd className={mc("source")}>
              {data.source}
              {mk("source")}
            </dd>
          </>
        ) : null}
        <dt>grounding</dt>
        <dd className={mc("grounding")}>
          {mk("grounding")}
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
        <ul className={`sp-related ${mc("related") ?? ""}`.trim()}>
          {mk("related")}
          {data.related.map((r) => (
            <li key={r.text}>
              <span className="rel">{r.relation}</span>
              {r.struck ? <s style={{ color: "var(--ink-3)" }}>{r.text}</s> : r.text}
            </li>
          ))}
        </ul>
      ) : null}
      <p className={`sp-foot ${mc("framing") ?? ""}`.trim()}>
        {data.framingNote}
        {mk("framing")}
      </p>
      {showTag && data.captured.source === "illustrative" ? (
        <div style={{ padding: "0 16px 12px" }}>
          <Tag>Example</Tag>
        </div>
      ) : null}
    </div>
  );
}
