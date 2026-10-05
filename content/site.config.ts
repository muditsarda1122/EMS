export type ExperimentStatus = "hidden" | "design" | "running" | "published";

export type NavItem = { label: string; href: string };

/** An agent Reverie connects to. `ready: false` shows it as "Coming soon"; `ready: true` gets a tick. */
export type Agent = { name: string; ready: boolean };

export type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  domain: string | null;
  contactEmail: string;
  repository: { url: string | null; ref: string | null; licence: string | null };
  experiment: { status: ExperimentStatus; homepageSlot: boolean };
  version: string | null; // TODO(fact): product version not stated in the plan
  agents: Agent[];
  /** Other MCP agents, set up by hand: false hides the claim, "soon" marks it coming soon, "ready" states it. */
  claims: { anyMcpAgent: false | "soon" | "ready" };
  nav: NavItem[];
  author: string;
  links: { linkedin: string };
};

export const siteConfig: SiteConfig = {
  name: "Reverie",
  tagline: "Memory for coding agents.",
  description:
    "Reverie keeps the engineering conclusions your coding agent reaches, reviewed by you, grounded in your repository, and revised as evidence changes. Works with OpenCode, with Claude Code, Cursor and Codex coming soon.",
  domain: null,
  contactEmail: "muditsarda23@gmail.com",
  repository: { url: null, ref: null, licence: null },
  experiment: { status: "hidden", homepageSlot: true },
  version: null,
  // Only OpenCode's connection is complete (owner, 5 Oct 2026). Flip `ready` as each one lands.
  agents: [
    { name: "OpenCode", ready: true },
    { name: "Claude Code", ready: false },
    { name: "Cursor", ready: false },
    { name: "Codex", ready: false },
  ],
  claims: { anyMcpAgent: "soon" },
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

/** "A", "A and B", "A, B and C". */
export function listText(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** Agents that work today. */
export function readyAgents(): string[] {
  return siteConfig.agents.filter((a) => a.ready).map((a) => a.name);
}

/** Agents shown as "Coming soon", plus other MCP agents when that claim is marked "soon". */
export function comingSoon(): string[] {
  const names = siteConfig.agents.filter((a) => !a.ready).map((a) => a.name);
  return siteConfig.claims.anyMcpAgent === "soon" ? [...names, "other MCP agents"] : names;
}
