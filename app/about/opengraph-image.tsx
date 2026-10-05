import { ogSize, ogContentType, renderOg } from "@/lib/og/render";

export const dynamic = "force-static";
export const alt = "Reverie: about";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOg("About", undefined);
}
