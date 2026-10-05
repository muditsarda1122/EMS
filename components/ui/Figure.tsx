import type { ReactNode } from "react";

type Props = {
  number?: string | number;
  caption: ReactNode;
  /** Text equivalent for screen readers; rendered visually hidden. */
  description?: string;
  children: ReactNode;
  className?: string;
};

export default function Figure({ number, caption, description, children, className = "" }: Props) {
  return (
    <figure className={`fig ${className}`.trim()}>
      {children}
      {description ? <p className="sr-only">{description}</p> : null}
      <figcaption className="t-caption">
        {number !== undefined ? <span className="fig-n">Fig. {number}</span> : null}
        {caption}
      </figcaption>
    </figure>
  );
}
