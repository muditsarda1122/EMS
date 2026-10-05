import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ArrowLink from "@/components/ui/ArrowLink";
import Tag from "@/components/ui/Tag";
import { formatDate } from "@/content/research";
import { getNote, getNoteSlugs } from "@/lib/markdown";
import "../../research.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getNoteSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return { title: "Not found" };
  return { title: note.title, description: note.excerpt };
}

// One h1 per page: the title is the h1, so the entry's own headings step down a level.
const components = {
  h1: ({ children }: { children?: React.ReactNode }) => <h2>{children}</h2>,
  h2: ({ children }: { children?: React.ReactNode }) => <h3>{children}</h3>,
  h3: ({ children }: { children?: React.ReactNode }) => <h4>{children}</h4>,
};

export default async function NotePage({ params }: Props) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();

  return (
    <article className="wrap rs-note">
      <Link href="/research#notebook" className="back">
        <span aria-hidden="true">←</span> Research
      </Link>
      <div className="grid-12">
        <div className="rs-note-col">
          <header>
            <div className="row">
              <span className="mono-label">{note.date ? formatDate(note.date) : "Notebook"}</span>
              {note.status ? <Tag>{note.status}</Tag> : null}
            </div>
            <h1>{note.title}</h1>
          </header>

          {note.editorsNote ? (
            <aside className="rs-editor" aria-label="Editor’s note">
              <p>{note.editorsNote}</p>
            </aside>
          ) : null}

          <div className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {note.content}
            </ReactMarkdown>
          </div>

          {note.seeAlso.length ? (
            <footer className="rs-foot">
              <span className="mono-label">See also</span>
              <ul>
                {note.seeAlso.map((l) => (
                  <li key={l.href}>
                    <ArrowLink href={l.href}>{l.label}</ArrowLink>
                  </li>
                ))}
              </ul>
            </footer>
          ) : null}
        </div>
      </div>
    </article>
  );
}
