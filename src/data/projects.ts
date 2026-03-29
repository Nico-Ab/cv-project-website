export type AccentKey = "amber" | "cyan" | "jade" | "steel";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectRecord {
  slug: string;
  title: string;
  href: string;
  category: string;
  navMeta: string;
  evidenceLabel: string;
  accentKey: AccentKey;
  summary: string;
  whatItIs: string;
  problem: string;
  implemented: string[];
  stack: string[];
  demonstrates: string[];
  currentState: string;
  links: ProjectLink[];
}

export const withBasePath = (base: string, href: string) => {
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return `${normalizedBase}${href.replace(/^\/+/, "")}`;
};

export const projects: ProjectRecord[] = [
  {
    slug: "erasmus-staff-mobility-portal",
    title: "Erasmus Staff Mobility Portal",
    href: "/projects/erasmus-staff-mobility-portal",
    category: "university web application",
    navMeta: "web app",
    evidenceLabel: "repo + docs + tests",
    accentKey: "amber",
    summary:
      "Internal portal for Erasmus+ staff mobility workflows with role-based access, case handling, document management, reporting, and bilingual support.",
    whatItIs:
      "This is an internal Erasmus+ staff mobility portal for South-West University. It is designed for staff members, officers, and admins who need one place to manage profiles, mobility cases, private documents, and reporting.",
    problem:
      "Staff mobility workflows involve registration, approvals, document handling, case review, and reporting. The portal turns that into one structured web application instead of a scattered manual process.",
    implemented: [
      "Credentials-based registration and login with approval-gated accounts.",
      "Role-aware dashboards and workflows for staff, officers, and admins.",
      "Editable staff profiles with faculty and department relationships.",
      "Mobility case drafting, resuming, submission, review, comments, status changes, and archive paths.",
      "Private document upload, version history, and permission-checked download handling.",
      "Reporting views, filtered case lists, CSV export, audit logging, and English/Bulgarian language switching.",
    ],
    stack: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Zod", "Docker", "Vitest", "Playwright"],
    demonstrates: [
      "Building a database-backed web application around a real workflow instead of a toy CRUD example.",
      "Handling authentication, role-based access, and approval logic in a way that matches actual users.",
      "Working with reproducible local setup, test coverage, and documentation as part of the implementation.",
      "Turning a university-domain process into a clearer technical system with traceable actions and reporting.",
    ],
    currentState:
      "The repository contains a locally runnable v1 for internal use and evaluation. It is not presented here as a finished hosted production rollout.",
    links: [
      { label: "GitHub repo", href: "https://github.com/Nico-Ab/Erasmus-Website" },
      { label: "Project docs", href: "https://github.com/Nico-Ab/Erasmus-Website/tree/master/docs" },
    ],
  },
  {
    slug: "german-learning-app",
    title: "German Learning App",
    href: "/projects/german-learning-app",
    category: "android application",
    navMeta: "android",
    evidenceLabel: "repo + technical report",
    accentKey: "jade",
    summary:
      "Offline-first Android flashcard app with spaced repetition, deck-based studying, daily limits, and local persistence.",
    whatItIs:
      "This is a small Android flashcard app built to make vocabulary practice more structured while also serving as a real Android development project in Kotlin.",
    problem:
      "Vocabulary study gets harder to sustain when review is unstructured. The app uses spaced repetition and deck-level limits so studying stays manageable instead of turning into a long unsorted card list.",
    implemented: [
      "An SM-2-style study flow where card ratings update intervals, ease, and next review time.",
      "Deck-based study sessions with due-card and new-card counts.",
      "A configurable daily new-card limit so study sessions stay realistic.",
      "Offline progress storage using Room, with no account or server required.",
      "Settings and a layered data/domain/ui project structure to keep the codebase readable as features grow.",
    ],
    stack: ["Kotlin", "Jetpack Compose", "Navigation Compose", "Room", "SQLite", "DataStore", "KSP"],
    demonstrates: [
      "Implementing domain logic in Kotlin instead of only wiring screens together.",
      "Building Android UI with Compose while keeping persistence and business logic separated.",
      "Thinking in offline-first terms and using local storage intentionally.",
      "Using a personal-use product idea to practice architecture, state, and maintainable feature growth.",
    ],
    currentState:
      "The core study flow and local persistence are implemented. Statistics, in-app editing, import/export, and broader test coverage are still work in progress.",
    links: [
      { label: "GitHub repo", href: "https://github.com/Nico-Ab/German_Learning_App" },
      {
        label: "Technical report",
        href: "https://github.com/Nico-Ab/German_Learning_App/blob/master/Technical-Document.pdf",
      },
    ],
  },
  {
    slug: "linuxhost-tsn-plugin",
    title: "Linux Host TSN / NETCONF Plugin",
    href: "/projects/linuxhost-tsn-plugin",
    category: "systems / networking project",
    navMeta: "systems",
    evidenceLabel: "repo + plugin code",
    accentKey: "cyan",
    summary:
      "Linux and networking project around configuring TSN talker/listener behavior through Sysrepo, NETCONF, and YANG.",
    whatItIs:
      "This project focuses on managing Linux hosts inside a TSN testbed. The repository contains a Sysrepo plugin and supporting environment for configuring talker/listener behavior through NETCONF and YANG-based configuration.",
    problem:
      "In TSN environments, the host side also needs structured configuration, not just the switches. This project brings Linux talker/listener configuration into a more controllable workflow using the same network-management ideas.",
    implemented: [
      "A Docker-based setup for working with the TSN host environment reproducibly.",
      "C-based Sysrepo plugin code in the repository's plugin module.",
      "YANG models and XML change examples for configuration paths.",
      "Integration around Sysrepo and Netopeer2 so configuration changes can drive host-side behavior.",
      "Supporting resources for UDP, VLAN, instructions, and related testbed material.",
    ],
    stack: ["C", "Linux", "Docker", "Sysrepo", "Netopeer2", "NETCONF", "YANG", "TSN"],
    demonstrates: [
      "Comfort with Linux-based technical environments and lower-level systems work.",
      "Working across protocols, configuration models, and implementation details instead of staying only at UI level.",
      "Reading standards and technical material, then turning that into a runnable development setup.",
      "Connecting networking concepts to code, tooling, and reproducible experimentation.",
    ],
    currentState:
      "This is best read as systems and testbed work rather than as a polished end-user product. The repository is strongest as code, environment, and technical implementation evidence.",
    links: [
      { label: "GitHub repo", href: "https://github.com/Nico-Ab/linuxhost" },
      { label: "Project brief", href: "https://github.com/Nico-Ab/linuxhost/blob/main/project.md" },
    ],
  },
];

export const getProjectBySlug = (slug: string) => {
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) {
    throw new Error(`Unknown project slug: ${slug}`);
  }

  return project;
};
