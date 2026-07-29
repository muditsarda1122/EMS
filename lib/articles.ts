import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDir = path.join(process.cwd(), "public/articles");

export interface Article {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDir)) return [];

  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".md"));

  return files.map((filename) => {
    const slug = filename.replace(/\.md$/, "");
    const filePath = path.join(articlesDir, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const title =
      data.title ||
      content.match(/^#\s+(.+)/)?.[1] ||
      slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

    const excerpt =
      data.excerpt ||
      content
        .replace(/^#.*$/gm, "")
        .replace(/```[\s\S]*?```/g, "")
        .replace(/\n+/g, " ")
        .trim()
        .slice(0, 260)
        .trim() +
        "...";

    const date = data.date || new Date().toISOString().split("T")[0];

    return { slug, title, date, excerpt, content };
  });
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = path.join(articlesDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const title =
    data.title ||
    content.match(/^#\s+(.+)/)?.[1] ||
    slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const excerpt =
    data.excerpt ||
    content
      .replace(/^#.*$/gm, "")
      .replace(/```[\s\S]*?```/g, "")
      .replace(/\n+/g, " ")
      .trim()
      .slice(0, 260)
      .trim() +
      "...";

  const date = data.date || new Date().toISOString().split("T")[0];

  return { slug, title, date, excerpt, content };
}
