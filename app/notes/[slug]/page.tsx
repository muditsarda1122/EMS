import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articlesDir = path.join(process.cwd(), "public/articles");
  if (!fs.existsSync(articlesDir)) return [];
  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md"));
  return files.map((f) => ({ slug: f.replace(/\.md$/, "") }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

function getArticle(slug: string) {
  const filePath = path.join(process.cwd(), "public/articles", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  return {
    title:
      data.title ||
      content.match(/^#\s+(.+)/)?.[1] ||
      slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    date: data.date || "",
    excerpt: data.excerpt || "",
    content,
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
      <a
        href="/notes"
        className="inline-flex text-sm text-secondary hover:text-accent transition-colors"
      >
        <span aria-hidden="true" className="mr-2">←</span>
        Back to Notes
      </a>

      <div className="mt-12 mb-16">
        <p className="text-sm text-secondary tabular-nums">{article.date}</p>
        <h1 className="mt-4 text-4xl sm:text-5xl font-normal tracking-tight text-primary">
          {article.title}
        </h1>
      </div>

      <div className="article-content">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>
    </div>
  );
}
