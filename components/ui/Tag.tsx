import type { ReactNode } from "react";

export default function Tag({
  children,
  dashed = false,
}: {
  children: ReactNode;
  dashed?: boolean;
}) {
  return <span className={`tag${dashed ? " tag-dashed" : ""}`}>{children}</span>;
}
