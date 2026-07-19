import Link from "next/link";

interface PaperCardProps {
  title: string;
  authors: string;
  status: string;
  abstract: string;
  href?: string;
  downloadHref?: string;
}

export default function PaperCard({
  title,
  authors,
  status,
  abstract,
  href,
  downloadHref,
}: PaperCardProps) {
  return (
    <article className="card-editorial">
      <div className="flex items-center gap-3 mb-4">
        <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-secondary">
          {status}
        </span>
      </div>
      <h3 className="text-xl font-medium text-primary">{title}</h3>
      <p className="mt-1 text-sm text-secondary">{authors}</p>
      <p className="mt-4 text-base text-secondary leading-relaxed">{abstract}</p>
      {(href || downloadHref) && (
        <div className="mt-6 flex items-center gap-3">
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial"
            >
              Read Paper
            </a>
          )}
          {downloadHref && (
            <a href={downloadHref} download className="btn-editorial">
              Download PDF
            </a>
          )}
        </div>
      )}
    </article>
  );
}
