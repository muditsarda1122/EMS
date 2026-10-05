import { ogSize, ogContentType, renderOg } from "@/lib/og/render";

export const dynamic = "force-static";
export const alt = "Reverie: A Biological Memory Architecture for AI Agents";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("Reverie: A Biological Memory Architecture for AI Agents", "Paper");
}
