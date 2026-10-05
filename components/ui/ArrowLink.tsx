import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  external?: boolean;
};

export default function ArrowLink({ href, children, external = false }: Props) {
  const inner = (
    <>
      {children} <span className="arr" aria-hidden="true">{external ? "↗" : "→"}</span>
    </>
  );
  if (external) {
    return (
      <a href={href} className="arrow-link" target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className="arrow-link">
      {inner}
    </Link>
  );
}
