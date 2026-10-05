// V1: the hero graph. One reviewed conclusion (the specimen) with hazy neighbours and a blurred second ring.
// Geometry ported from design/homepage-preview/home.html (.hero-visual).
import ConclusionRecord, { type ConclusionSpecimen } from "@/components/specimen/ConclusionRecord";
import Tag from "@/components/ui/Tag";

export default function HeroGraph({ data }: { data: ConclusionSpecimen }) {
  const related = data.related ?? [];
  return (
    <figure className="hero-visual">
      <div className="hv-card">
        <ConclusionRecord data={data} variant="compact" showTag={false} />
      </div>

      <svg className="hv-net" viewBox="0 0 258 420" aria-hidden="true" preserveAspectRatio="xMinYMin meet">
        {/* second ring: out of focus, so the eye stays on the card */}
        <g opacity=".42" filter="url(#haze)">
          <line x1="196" y1="92" x2="204" y2="114" className="edge" />
          <rect x="168" y="114" width="90" height="30" rx="2" className="rec-canon" />
          <rect x="168" y="114" width="3" height="30" className="bar-accent" />
          <rect x="178" y="124" width="58" height="4" className="f-haze" />
          <rect x="178" y="132" width="40" height="4" className="f-haze" />
          <line x1="188" y1="222" x2="196" y2="244" className="edge" />
          <rect x="160" y="244" width="94" height="30" rx="2" className="rec-canon" />
          <rect x="160" y="244" width="3" height="30" className="bar-accent" />
          <rect x="170" y="254" width="62" height="4" className="f-haze" />
          <rect x="170" y="262" width="44" height="4" className="f-haze" />
        </g>
        {/* first ring: legible but receded */}
        <g opacity=".55">
          <path d="M56,67 C32,67 22,90 4,94" className="edge" markerEnd="url(#ahg)" />
          <path d="M4,186 C26,186 34,197 54,197" className="edge-dash" markerEnd="url(#ahg)" />
          <path d="M4,276 C26,276 34,327 54,327" className="edge" markerEnd="url(#ahg)" />
        </g>
        <g opacity=".7">
          <text x="58" y="34" className="t-mono-sm">supports</text>
          <text x="58" y="164" className="t-mono-sm">depends on</text>
          <text x="58" y="294" className="t-mono-sm">replaced</text>
        </g>
        <g opacity=".5">
          <rect x="58" y="42" width="180" height="50" rx="2" className="rec-canon" />
          <rect x="58" y="42" width="3" height="50" className="bar-accent" />
          <text x="70" y="63" className="t-rec-sm">Token refresh completes</text>
          <text x="70" y="80" className="t-rec-sm">before any cache read</text>
          <rect x="58" y="172" width="180" height="50" rx="2" className="rec-canon" />
          <rect x="58" y="172" width="3" height="50" className="bar-accent" />
          <text x="70" y="193" className="t-rec-sm">TokenManager is the only</text>
          <text x="70" y="210" className="t-rec-sm">writer of the token cache</text>
          <rect x="58" y="302" width="180" height="50" rx="2" className="rec-canon" />
          <text x="70" y="323" className="t-rec-sm f-ink3">Random logouts come from</text>
          <text x="70" y="340" className="t-rec-sm f-ink3">session-store expiry</text>
          <line x1="69" y1="319" x2="229" y2="319" className="s-ink3" />
          <line x1="69" y1="336" x2="184" y2="336" className="s-ink3" />
        </g>
      </svg>

      <div className="hv-mobile" aria-hidden="true">
        {related.map((r) => (
          <div key={r.text}>
            <span className="rel">{r.relation}</span>
            {r.struck ? <s>{r.text}</s> : r.text}
          </div>
        ))}
      </div>
      <figcaption>
        <span className="caption">One reviewed conclusion and its links.</span>
        <Tag>Example</Tag>
      </figcaption>
      <p className="sr-only">
        A reviewed conclusion about cache invalidation and token refresh, shown with the conclusions it links to:
        one it supports, one it depends on, and an older one it replaced. Further linked conclusions fade into the distance.
      </p>
    </figure>
  );
}
