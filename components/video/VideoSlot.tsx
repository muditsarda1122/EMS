// S3b: the comparison video. Driven by site.config.ts: `video` shows the player; otherwise experiment.status and
// homepageSlot decide whether the reserved dashed frame shows (no player, play button, thumbnail or outcome language).
import ArrowLink from "@/components/ui/ArrowLink";
import Tag from "@/components/ui/Tag";
import { siteConfig } from "@/content/site.config";
import ComparisonVideo from "./ComparisonVideo";

export type VideoSlotMode = "frame" | "video" | "none";

export function videoSlotMode(): VideoSlotMode {
  const { status, homepageSlot } = siteConfig.experiment;
  if (siteConfig.video || status === "published") return "video";
  return homepageSlot ? "frame" : "none";
}

export default function VideoSlot() {
  const mode = videoSlotMode();
  if (mode === "none") return null;
  const status = siteConfig.experiment.status;

  return (
    <section className="section wrap">
      <div className="grid-12 s-head">
        <h2>The same agent, with and without Reverie.</h2>
        <p className="aside">
          {mode === "video" ? "One recording compares both runs." : "Same repository, same tasks, same sessions — side by side."}
        </p>
      </div>
      {mode === "video" ? (
        <ComparisonVideo />
      ) : (
        <figure className="vs" aria-label="Reserved space for the side-by-side recording">
          <div className="vs-frame">
            <div className="vs-half">
              <span className="vs-label">Without Reverie</span>
              <span className="vs-cond">No memory between sessions</span>
            </div>
            <div className="vs-half">
              <span className="vs-label">With Reverie</span>
              <span className="vs-cond">Reviewed conclusions between sessions</span>
            </div>
          </div>
          <figcaption className="vs-status">
            <Tag dashed>{status === "running" ? "In progress" : "In design"}</Tag>
            <span className="caption">The recording will appear here, whatever it shows.</span>
            {status === "design" || status === "running" ? (
              <ArrowLink href="/research/continuity-experiment">How we’ll run it</ArrowLink>
            ) : null}
          </figcaption>
        </figure>
      )}
    </section>
  );
}
