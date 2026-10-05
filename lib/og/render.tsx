// Typographic Open Graph image: title in serif, wordmark, paper background (plan §8.9). No imagery.
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export async function renderOg(title: string, kicker?: string) {
  const font = await readFile(path.join(process.cwd(), "lib/og/Newsreader-Regular.ttf"));
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FAFAF7",
          color: "#17171B",
          padding: "72px 80px",
          fontFamily: "Newsreader",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, letterSpacing: "-0.01em" }}>Reverie</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {kicker ? (
            <div style={{ display: "flex", fontSize: 28, color: "#55555D", marginBottom: 20 }}>{kicker}</div>
          ) : null}
          <div style={{ display: "flex", fontSize: title.length > 40 ? 68 : 84, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            {title}
          </div>
        </div>
        <div style={{ display: "flex", borderTop: "2px solid #17171B", paddingTop: 20, fontSize: 26, color: "#55555D" }}>
          Memory for coding agents.
        </div>
      </div>
    ),
    { ...ogSize, fonts: [{ name: "Newsreader", data: font, style: "normal", weight: 400 }] },
  );
}
