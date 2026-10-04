export const site = {
  name: "Aditya Jamuar",
  url: "https://adityajamuar.com",
  title: "Aditya Jamuar — Full-stack product engineer",
  description:
    "Software Engineer at epilot. Seven years building products end to end — APIs, cloud tooling, CI/CD and the interfaces on top — from BuilderX to Jira to customer portals for energy utilities.",
  email: "hi@adityajamuar.com",
  location: "Bengaluru, India",
  links: {
    linkedin: "https://www.linkedin.com/in/asjamuar",
    github: "https://github.com/Ajamuar",
  },
};

export type Highlight = {
  org: string;
  area: string;
  title: string;
  body: string;
  figure?: string;
  figureUnit?: string;
  featured?: boolean;
};

export const highlights: Highlight[] = [
  {
    org: "epilot",
    area: "platform",
    title: "Any merge request, live in a real portal",
    body: "Review builds for the end-customer portal: one URL parameter loads any MR into a deployed environment, pinned to immutable build IDs. I wrote the RFC and built it.",
    featured: true,
  },
  {
    org: "epilot",
    area: "cloud",
    title: "AWS tooling that cleans up after itself",
    body: "Tooling that finds and safely removes stale Cognito resources across dev environments, with dry runs and confirmation gates before anything is deleted.",
  },
  {
    org: "geekyants",
    area: "backend",
    title: "BuilderX, from FeathersJS to Laravel",
    body: "Drove the architecture of an early design-to-code platform end to end, including moving its backend from FeathersJS to Laravel — and gave a talk on how we did it.",
  },
  {
    org: "atlassian",
    area: "reliability",
    figure: "45 → 15",
    figureUnit: "min",
    title: "65% faster incident detection",
    body: "Drove org-wide monitoring and incident response practices for Jira.",
  },
  {
    org: "atlassian",
    area: "architecture",
    title: "Jira Issue View, re-platformed",
    body: "Led the Relay migration and layout modernization, moved ownership from Australia to India, and ran experiments that lifted engagement 31%.",
  },
  {
    org: "geekyants",
    area: "open source",
    figure: "20k+",
    figureUnit: "stars",
    title: "NativeBase v3, co-created",
    body: "One of the first cross-platform React Native design systems, with 70k+ weekly downloads.",
  },
];

export const practices = [
  {
    icon: "orchestrate",
    title: "Orchestrate, then delegate",
    body: "A strong model plans the work; faster sub-agents implement; a separate reviewer reads the diff with fresh context.",
  },
  {
    icon: "heal",
    title: "Self-healing tests",
    body: "Playwright suites that repair themselves in CI: an agent proposes the fix as a pull request, and a human always merges.",
  },
  {
    icon: "context",
    title: "Context that travels",
    body: "Shared context files that work in Claude Code and Cursor alike, kept above the repo so multi-repo initiatives stay coherent.",
  },
  {
    icon: "guard",
    title: "Guardrails first",
    body: "Dry runs before anything destructive, explicit confirmation gates, and agents that never hold production credentials.",
  },
] as const;

export const stack = [
  { group: "Backend & cloud", items: ["Node.js", "TypeScript", "PHP & Laravel", "FeathersJS", "GraphQL", "MySQL", "AWS", "Docker"] },
  { group: "Delivery", items: ["GitLab CI", "GitHub Actions", "Jenkins", "Playwright", "Jest"] },
  { group: "Interfaces", items: ["React", "Next.js", "React Native", "Relay"] },
  { group: "AI tooling", items: ["Claude Code", "Cursor", "Agentic workflows"] },
];

export const filters = [
  { id: "all", label: "All" },
  { id: "backend", label: "Backend & cloud" },
  { id: "platform", label: "Platform & DX" },
  { id: "ai", label: "AI" },
  { id: "design", label: "Design systems" },
  { id: "leadership", label: "Leadership" },
] as const;

export type Release = {
  version: string;
  dates: string;
  company: string;
  role: string;
  tone: "accent" | "accent2" | "muted";
  cats: string[];
  items: string[];
};

export const releases: Release[] = [
  {
    version: "v5.0",
    dates: "May 2026 — now",
    company: "epilot",
    role: "Software Engineer 2",
    tone: "accent",
    cats: ["backend", "platform", "ai"],
    items: [
      "Work across the customer portal stack: the frontend, its API and the CI/CD pipelines that ship them.",
      "Designed review builds for the end-customer portal: any merge request can be loaded into a deployed environment with one URL parameter and immutable build IDs. Wrote the RFC.",
      "Built a self-healing Playwright pipeline on GitHub Actions and Claude Code that opens fix PRs for broken tests and never auto-merges.",
      "Shipped a Git worktree CLI that runs four portal repos side by side with deterministic ports.",
      "Built AWS tooling to find and safely clean up stale Cognito resources across dev environments, with dry runs and confirmation gates.",
      "Proposed portal versioning with a visual diff and preview model.",
    ],
  },
  {
    version: "v4.0",
    dates: "Jan 2024 — Mar 2026",
    company: "Atlassian",
    role: "Software Engineer 2",
    tone: "accent2",
    cats: ["platform", "leadership"],
    items: [
      "Moved ownership of Jira Issue View from the Australia team to India.",
      "Cut incident detection time by 65% (45 → 15 min) by driving org-wide monitoring and response practices.",
      "Led the Relay migration and Issue Layout modernization for Jira Issue View.",
      "Ran UX experiments that lifted engagement by 31%.",
      "Set cross-team coding standards for Relay migration and component platformisation.",
    ],
  },
  {
    version: "v3.0",
    dates: "Jan 2022 — Jan 2024",
    company: "Intuit",
    role: "Software Engineer 2",
    tone: "accent",
    cats: ["platform", "leadership"],
    items: [
      "Delivered a video meeting platform across the Intuit ecosystem with NPS above 90.",
      "Designed a resilient, highly available architecture and built the foundation for multi-participant meetings.",
      "Mentored new hires and defined coding standards. CX3 Technical Excellence Award, FY22 Q3.",
    ],
  },
  {
    version: "v2.0",
    dates: "Feb 2019 — Dec 2021",
    company: "GeekyAnts",
    role: "Intern → Senior Software Engineer",
    tone: "accent2",
    cats: ["backend", "design", "leadership"],
    items: [
      "Drove BuilderX's architecture end to end: Next.js frontend, Laravel and FeathersJS services, and Dockerized deploys. Led its backend move from FeathersJS to Laravel.",
      "Co-created NativeBase v3, one of the first cross-platform React Native design systems: 20k+ GitHub stars, 70k+ weekly downloads.",
      "Built and led an R&D team shipping developer productivity tools.",
    ],
  },
  {
    version: "v1.0",
    dates: "2015 — 2019",
    company: "DIT University",
    role: "B.Tech, Computer Science",
    tone: "muted",
    cats: ["leadership"],
    items: ["Founded the hackathon club and placed top 3 in multiple coding competitions."],
  },
];

export const talks = [
  {
    title: "Building a form library for React",
    host: "GeekyAnts",
    url: "https://www.youtube.com/watch?v=9-_waee8VSs",
  },
  {
    title: "Journey from FeathersJS to Laravel: BuilderX edition",
    host: "GeekyAnts",
    url: "https://www.youtube.com/watch?v=_uhnrHRTYnE",
  },
];
