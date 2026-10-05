// BibTeX for the paper, built from title, author, year and (when a domain is configured) URL.

export type CiteInput = {
  title: string;
  /** "Family, Given" form, as BibTeX expects. */
  author: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  /** Absolute URL, or null while the domain is not decided. The field is then left out. */
  url: string | null;
};

const MONTH_KEYS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

export function bibtexKey(author: string, year: number): string {
  const family = author.split(",")[0].toLowerCase().replace(/[^a-z]/g, "");
  return `${family}${year}reverie`;
}

export function buildBibtex({ title, author, date, url }: CiteInput): string {
  const [year, month] = date.split("-").map(Number);
  const fields: [string, string][] = [
    ["title", `{${title}}`],
    ["author", `{${author}}`],
    ["year", `{${year}}`],
    ["month", MONTH_KEYS[month - 1]],
  ];
  if (url) fields.push(["url", `{${url}}`]);
  const body = fields.map(([k, v]) => `  ${k} = ${v}`).join(",\n");
  return `@misc{${bibtexKey(author, year)},\n${body}\n}`;
}

/** Absolute URL for a path, or null while no domain is configured. */
export function absoluteUrl(domain: string | null, path: string): string | null {
  return domain ? `https://${domain}${path}` : null;
}
