export type ExperimentStatus = "hidden" | "design" | "running" | "published";

export type NavItem = { label: string; href: string };

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  domain: string | null;
  contactEmail: string;
  repository: { url: string | null; ref: string | null };
  experiment: { status: ExperimentStatus; homepageSlot: boolean };
  version: string | null; // TODO(fact): product version not stated in the plan
  supportedAgents: string[];
  claims: { anyMcpAgent: boolean };
  nav: NavItem[];
  author: string;
  links: { linkedin: string };
};

export const siteConfig: SiteConfig = {
  name: "Reverie",
  tagline: "Memory for coding agents.",
  description:
    "Reverie keeps the engineering conclusions your coding agent reaches, reviewed by you, grounded in your repository, and revised as evidence changes. Works with Claude Code, Cursor, OpenCode and Codex.",
  domain: null,
  contactEmail: "muditsarda23@gmail.com",
  repository: { url: null, ref: null },
  experiment: { status: "hidden", homepageSlot: true },
  version: null,
  supportedAgents: ["Claude Code", "Cursor", "OpenCode", "Codex"],
  claims: { anyMcpAgent: true },
  nav: [
    { label: "How it works", href: "/how-it-works" },
    { label: "Research", href: "/research" },
    { label: "About", href: "/about" },
  ],
  author: "Mudit Sarda",
  links: { linkedin: "https://www.linkedin.com/in/mudit-sarda-ab84991bb/" },
};

/** State B: the repository is public. */
export function isRepoPublic(): boolean {
  return siteConfig.repository.url !== null;
}

export type RepoCta = { label: string; href: string; external: boolean };

/** The header call to action: GitHub in State B, Contact in State A. */
export function getCta(): RepoCta {
  if (siteConfig.repository.url) {
    return { label: "GitHub ↗", href: siteConfig.repository.url, external: true };
  }
  return {
    label: "Contact",
    href: `mailto:${siteConfig.contactEmail}?subject=Reverie`,
    external: false,
  };
}

export function isExperimentVisible(): boolean {
  return siteConfig.experiment.status !== "hidden";
}
