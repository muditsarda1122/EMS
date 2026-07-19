import Link from "next/link";

interface ResearchArtefactCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
}

export default function ResearchArtefactCard({
  title,
  description,
  href,
  icon,
}: ResearchArtefactCardProps) {
  return (
    <Link
      href={href}
      className="card-editorial group block"
    >
      {icon && (
        <div className="mb-4 text-secondary group-hover:text-accent transition-colors duration-300">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-medium text-primary">{title}</h3>
      <p className="mt-2 text-sm text-secondary leading-relaxed">{description}</p>
      <span className="mt-4 inline-flex items-center text-sm text-accent hover:text-accent-hover transition-colors duration-300">
        Explore &rarr;
      </span>
    </Link>
  );
}
