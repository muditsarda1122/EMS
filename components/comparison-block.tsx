interface ComparisonBlockProps {
  title: string;
  leftLabel: string;
  rightLabel: string;
  rows: [string, string][];
}

export default function ComparisonBlock({
  title,
  leftLabel,
  rightLabel,
  rows,
}: ComparisonBlockProps) {
  return (
    <section className="mb-16">
      <h2 className="text-xl font-medium text-primary mb-6">{title}</h2>
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <div className="grid grid-cols-2 divide-x divide-border">
          <div className="px-6 py-4 text-sm font-medium text-primary bg-background/50">
            {leftLabel}
          </div>
          <div className="px-6 py-4 text-sm font-medium text-primary bg-background/50">
            {rightLabel}
          </div>
        </div>
        <div className="divide-y divide-border">
          {rows.map(([left, right], i) => (
            <div key={i} className="grid grid-cols-2 divide-x divide-border">
              <div className="px-6 py-4 text-sm text-secondary">{left}</div>
              <div className="px-6 py-4 text-sm text-secondary">{right}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
