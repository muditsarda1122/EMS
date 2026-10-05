import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const notesDir = path.join(process.cwd(), "content/notes");

export type NoteLink = { label: string; href: string };

export type Note = {
  slug: string;
  title: string;
  date: string; // ISO date
  excerpt: string;
  status: string;
  editorsNote: string | null;
  seeAlso: NoteLink[];
  content: string;
};

function parseNote(slug: string, raw: string): Note {
  const { data, content } = matter(raw);
  const heading = content.match(/^#\s+(.+)$/m)?.[1];
  return {
    slug,
    title: String(data.title ?? heading ?? slug),
    date: String(data.date ?? ""),
    excerpt: String(data.excerpt ?? ""),
    status: String(data.status ?? ""),
    editorsNote: data.editorsNote ? String(data.editorsNote) : null,
    seeAlso: Array.isArray(data.seeAlso) ? (data.seeAlso as NoteLink[]) : [],
    content,
  };
}

export function getNoteSlugs(): string[] {
  if (!fs.existsSync(notesDir)) return [];
  return fs
    .readdirSync(notesDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getNote(slug: string): Note | null {
  const file = path.join(notesDir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  return parseNote(slug, fs.readFileSync(file, "utf8"));
}

/** Newest first. */
export function getAllNotes(): Note[] {
  return getNoteSlugs()
    .map((slug) => getNote(slug) as Note)
    .sort((a, b) => b.date.localeCompare(a.date));
}
