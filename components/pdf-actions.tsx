"use client";

import { useEffect, useState } from "react";

interface PdfActionsProps {
  filename: string;
  github?: string;
}

export default function PdfActions({ filename, github }: PdfActionsProps) {
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(`/EMS-artefacts/${filename}`, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setExists(res.status === 200);
      })
      .catch(() => {
        if (!cancelled) setExists(false);
      });
    return () => { cancelled = true; };
  }, [filename]);

  if (exists === null) {
    return (
      <div className="mt-6 flex items-center gap-4">
        <span className="text-sm text-secondary">Checking paper availability...</span>
      </div>
    );
  }

  if (!exists) {
    return (
      <div className="mt-6 flex items-center gap-4">
        <span className="text-sm text-secondary">Paper coming soon.</span>
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent hover:text-accent-hover transition-colors duration-300"
          >
            GitHub &rarr;
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="mt-6 flex items-center gap-4">
      <a
        href={`/EMS-artefacts/${filename}`}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-editorial"
      >
        Open PDF
      </a>
      <a
        href={`/EMS-artefacts/${filename}`}
        download
        className="btn-editorial"
      >
        Download PDF
      </a>
      {github && (
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-accent hover:text-accent-hover transition-colors duration-300"
        >
          GitHub &rarr;
        </a>
      )}
    </div>
  );
}
