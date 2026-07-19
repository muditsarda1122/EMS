import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Research Column */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-4">Research</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/research" 
                  className="text-sm text-secondary hover:text-primary transition-colors duration-300"
                >
                  Engineering Cognition
                </Link>
              </li>
              <li>
                <Link 
                  href="/ems" 
                  className="text-sm text-secondary hover:text-primary transition-colors duration-300"
                >
                  EMS
                </Link>
              </li>
              <li>
                <Link 
                  href="/research" 
                  className="text-sm text-secondary hover:text-primary transition-colors duration-300"
                >
                  EC-Bench
                </Link>
              </li>
              <li>
                <Link 
                  href="/research" 
                  className="text-sm text-secondary hover:text-primary transition-colors duration-300"
                >
                  Technical Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Lab Column */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-4">Lab</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/ethos" 
                  className="text-sm text-secondary hover:text-primary transition-colors duration-300"
                >
                  Ethos
                </Link>
              </li>
              <li>
                <Link 
                  href="/notes" 
                  className="text-sm text-secondary hover:text-primary transition-colors duration-300"
                >
                  Notes
                </Link>
              </li>
              <li>
                <Link 
                  href="/lab" 
                  className="text-sm text-secondary hover:text-primary transition-colors duration-300"
                >
                  Lab
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:muditsarda23@gmail.com"
                  className="text-sm text-secondary hover:text-primary transition-colors duration-300"
                >
                  muditsarda23@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-secondary hover:text-primary transition-colors duration-300"
                >
                  GitHub — EC-Bench
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-xs text-secondary tracking-wide">
            &copy; {new Date().getFullYear()} EMS Research
          </p>
        </div>
      </div>
    </footer>
  );
}
