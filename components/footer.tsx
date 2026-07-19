import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-secondary">
              <li>
                <Link href="/research" className="hover:text-primary transition-colors duration-300">
                  Research
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-primary transition-colors duration-300">
                  Papers
                </Link>
              </li>
              <li>
                <Link href="/notes" className="hover:text-primary transition-colors duration-300">
                  Notes
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors duration-300"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:muditsarda23@gmail.com"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Email
                </a>
              </li>
            </ul>
          </nav>

          <p className="text-sm text-secondary">
            &copy; {new Date().getFullYear()} EMS Research
          </p>
        </div>
      </div>
    </footer>
  );
}
