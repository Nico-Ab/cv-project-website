export type AccentKey = "amber" | "cyan" | "jade" | "steel";
export type ProjectKind = "project" | "demo";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectRecord {
  slug: string;
  title: string;
  href: string;
  kind: ProjectKind;
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
    kind: "project",
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
      { label: "Workflow demo", href: "/cv-project-website/projects/workflow-permissions-demo#demo" },
    ],
  },
  {
    slug: "german-learning-app",
    title: "German Learning App",
    href: "/projects/german-learning-app",
    kind: "project",
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
      { label: "Review demo", href: "/cv-project-website/projects/review-scheduling-demo#demo" },
    ],
  },
  {
    slug: "linuxhost-tsn-plugin",
    title: "Linux Host TSN / NETCONF Plugin",
    href: "/projects/linuxhost-tsn-plugin",
    kind: "project",
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
  {
    slug: "browser-sql-reporting-demo",
    title: "Browser SQL Reporting Demo",
    href: "/projects/browser-sql-reporting-demo",
    kind: "demo",
    category: "interactive technical demo",
    navMeta: "live demo",
    evidenceLabel: "live demo + code",
    accentKey: "steel",
    summary:
      "Run real SQL in the browser against a small sample dataset inspired by staff mobility reporting.",
    whatItIs:
      "This is a small in-browser SQL and reporting demo built directly into the portfolio. It uses a local sample dataset and a browser-side SQLite engine so visitors can explore joins, aggregates, and result tables without leaving the site.",
    problem:
      "A portfolio can talk about databases and reporting, but an interactive demo is stronger evidence than static copy. This page gives a compact way to show schema thinking, query design, and result presentation in one place.",
    implemented: [
      "A local SQLite database running in the browser through sql.js.",
      "A small relational sample dataset modeled around staff members, mobility cases, and case documents.",
      "Preset reporting queries for joins, counts, averages, and missing-document checks.",
      "An editable SQL query box with run, reset, empty-state, and error-state handling.",
      "A schema explorer and result table designed to stay readable on desktop and mobile screens.",
    ],
    stack: ["Astro", "sql.js", "SQLite", "JavaScript", "HTML", "CSS"],
    demonstrates: [
      "Turning relational data into a small, understandable interactive tool instead of a static mockup.",
      "Working with schema design, SQL queries, aggregates, joins, and practical result presentation.",
      "Shipping a browser-safe technical demo that is self-contained, fast, and honest about its scope.",
      "Using the portfolio itself as a place to demonstrate implementation, not only describe it.",
    ],
    currentState:
      "This is a portfolio demo that runs locally in the browser with sample data only. It is meant to demonstrate technical thinking, not to stand in for a production reporting system.",
    links: [
      { label: "GitHub repo", href: "https://github.com/Nico-Ab/cv-project-website" },
      { label: "Open demo", href: "/cv-project-website/projects/browser-sql-reporting-demo#demo" },
    ],
  },
  {
    slug: "workflow-permissions-demo",
    title: "Workflow & Permissions Demo",
    href: "/projects/workflow-permissions-demo",
    kind: "demo",
    category: "interactive workflow demo",
    navMeta: "live demo",
    evidenceLabel: "live demo + logic",
    accentKey: "amber",
    summary:
      "Role-based workflow simulator inspired by the Erasmus portal work, with blocked actions, document review, status transitions, and audit history.",
    whatItIs:
      "This is a compact in-browser workflow simulator inspired by the kinds of case handling and permissions logic involved in the Erasmus staff mobility portal work. It uses one sample case and simplified rules so the interaction stays easy to understand.",
    problem:
      "Workflow-heavy applications need more than forms. They need clear state transitions, role boundaries, document review rules, and a visible record of what changed. This demo turns those ideas into something interactive and inspectable.",
    implemented: [
      "Role switching between staff, officer, and admin views.",
      "Permission checks that allow or block actions based on the current role and case state.",
      "Status transitions for draft, submission, correction, decision, approval, and archive paths.",
      "Document state handling for missing, pending review, approved, and needs-update cases.",
      "An audit-style activity log that records each successful workflow change.",
    ],
    stack: ["Astro", "JavaScript", "HTML", "CSS", "State logic", "UI flows"],
    demonstrates: [
      "Thinking in application workflows instead of only page layouts.",
      "Mapping business rules into small but real permission and state transitions.",
      "Keeping a process-oriented UI readable while still showing why actions are allowed or blocked.",
      "Using the portfolio itself to show web-application logic inspired by real project work.",
    ],
    currentState:
      "This is a small portfolio simulator with sample data and simplified rules. It is intentionally presented as a demo inspired by the real portal work, not as the actual university system.",
    links: [
      { label: "GitHub repo", href: "https://github.com/Nico-Ab/cv-project-website" },
      { label: "Open demo", href: "/cv-project-website/projects/workflow-permissions-demo#demo" },
    ],
  },
  {
    slug: "review-scheduling-demo",
    title: "Review Scheduling Demo",
    href: "/projects/review-scheduling-demo",
    kind: "demo",
    category: "interactive learning demo",
    navMeta: "live demo",
    evidenceLabel: "live demo + ux logic",
    accentKey: "jade",
    summary:
      "Compact spaced-repetition review demo inspired by the German Learning App, with ratings, progress, and next-review scheduling.",
    whatItIs:
      "This is a small browser demo inspired by the review flow of the German Learning App. It focuses on the user-facing part of the experience: seeing a card, revealing the answer, rating recall, and watching the next review timing update immediately.",
    problem:
      "Learning tools are not only about storing cards. They also need a clear review flow, understandable scheduling feedback, and an interface that helps users stay oriented while moving through repeated study sessions.",
    implemented: [
      "A sample review queue with visible progress through the current session.",
      "Answer reveal before rating so the review flow mirrors a real flashcard interaction.",
      "Hard, medium, and easy ratings that update interval, ease, and next-review timing.",
      "A session log and deck overview so the scheduling effect is visible after each review.",
      "A compact, browser-friendly UI that keeps the product flow understandable on desktop and mobile.",
    ],
    stack: ["Astro", "JavaScript", "HTML", "CSS", "State logic", "UX flow"],
    demonstrates: [
      "Implementing user-facing product logic instead of only building technical back-office tools.",
      "Translating a learning flow into understandable state transitions and feedback.",
      "Thinking about clarity, pacing, and progressive disclosure in a small interactive interface.",
      "Using the portfolio to show practical product-minded implementation inspired by real app work.",
    ],
    currentState:
      "This is a compact browser demo with sample cards and simplified scheduling rules. It is inspired by the Android app's review flow, not presented as the full app in another form.",
    links: [
      { label: "GitHub repo", href: "https://github.com/Nico-Ab/cv-project-website" },
      { label: "Open demo", href: "/cv-project-website/projects/review-scheduling-demo#demo" },
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
