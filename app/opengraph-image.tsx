import { ogSize, ogContentType, renderOg } from "@/lib/og/render";

export const dynamic = "force-static";
export const alt = "Reverie: memory for coding agents";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Memory for coding agents.", undefined);
}
