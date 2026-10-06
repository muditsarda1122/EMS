// S3b, published: one recording that compares both runs, in an embedded player (site.config.ts → video).
// Labelled as a demonstration: the benchmark, not this video, is where results live.
import ArrowLink from "@/components/ui/ArrowLink";
import Tag from "@/components/ui/Tag";
import { siteConfig } from "@/content/site.config";

export default function ComparisonVideo() {
  const v = siteConfig.video;
  if (!v) return null;
  return (
    <figure className="vs vs-video">
      <div className="vs-player" style={{ aspectRatio: v.aspect }}>
        <iframe
          src={v.embedUrl}
          title={`Video: ${v.title}`}
          loading="lazy"
          allow="autoplay; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <figcaption className="vs-status">
        <Tag>Demonstration</Tag>
        <span className="caption">A recorded demonstration, not a benchmark result.</span>
        <ArrowLink href="/research/ec-bench">Benchmark results</ArrowLink>
        <a className="text-link vs-share" href={v.shareUrl} target="_blank" rel="noopener noreferrer">
          {v.shareLabel} ↗
        </a>
      </figcaption>
    </figure>
  );
}
