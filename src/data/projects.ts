export type AccentKey = "amber" | "cyan" | "jade" | "steel";

export interface ProjectArtifact {
  title: string;
  description: string;
}

export interface ProjectRecord {
  slug: string;
  title: string;
  href: string;
  category: string;
  statusLabel: string;
  accentKey: AccentKey;
  summary: string;
  overview: string;
  goal: string;
  nextMilestone: string;
  stack: string[];
  scope: string[];
  status: string[];
  plannedArtifacts: ProjectArtifact[];
}

export const withBasePath = (base: string, href: string) => {
  const normalizedBase = base.endsWith("/") ? base : `${base}/`;
  return `${normalizedBase}${href.replace(/^\/+/, "")}`;
};

export const projects: ProjectRecord[] = [
  {
    slug: "mini-warehouse",
    title: "Mini Data Warehouse (Retail)",
    href: "/projects/mini-warehouse",
    category: "database modeling",
    statusLabel: "study note",
    accentKey: "amber",
    summary: "Notes on dimensional modeling, SCD handling, and reporting structure in a small retail example.",
    overview:
      "This page documents a small warehouse-style learning project around staging, star schemas, and reporting questions. It is useful as a structured database study exercise, not as a finished production system.",
    goal:
      "It shows how I think about schema design, testing, and explaining tradeoffs in a compact example.",
    nextMilestone:
      "If I continue it, the next addition would be a fuller SCD2 example, clearer docs, and a small reporting view.",
    stack: ["dbt", "Postgres / DuckDB", "Dimensional modeling", "Reporting example"],
    scope: [
      "Staging views and basic source checks for a small retail dataset.",
      "A compact star-schema shape with dimensions and facts.",
      "Simple SCD-style handling discussed as part of the modeling approach.",
    ],
    status: [
      "The page currently serves mainly as structured study notes for the schema and test ideas.",
      "Concept tests in tests/projects cover integrity and SCD-style behavior related to this topic.",
      "It should not be read as a finished warehouse implementation or production dashboard.",
    ],
    plannedArtifacts: [
      {
        title: "Schema diagram",
        description: "Could be added later to make the star-schema shape easier to inspect.",
      },
      {
        title: "dbt docs snapshot",
        description: "Could be added later if the project grows into a fuller documented example.",
      },
      {
        title: "Reporting view",
        description: "Could be added later to show how the modeled data answers a small reporting question.",
      },
    ],
  },
  {
    slug: "data-quality-lineage",
    title: "Data Quality & Lineage Observatory",
    href: "/projects/data-quality-lineage",
    category: "data quality",
    statusLabel: "study note",
    accentKey: "jade",
    summary:
      "Notes on testing, expectations, and lineage in smaller database projects.",
    overview:
      "This page collects ideas around checks, lineage, and failure visibility for smaller data workflows. It is a technical note, not a completed observability product.",
    goal:
      "I kept it on the site because debugging, validation, and clear failure signals matter well beyond data-specific roles.",
    nextMilestone:
      "If I continue it, I would add a clearer failing-test demo and a simpler lineage view.",
    stack: ["dbt tests", "DuckDB / pytest", "Expectation checks", "Documentation"],
    scope: [
      "Checks around nulls, ranges, duplicates, and broken assumptions.",
      "Simple lineage thinking for smaller projects where dependencies still need to stay understandable.",
      "A compact example of how validation can stop bad data from spreading.",
    ],
    status: [
      "This page is currently a study-oriented write-up rather than a finished monitoring system.",
      "The repo already includes concept tests around expectations and failing checks for this topic.",
      "It should not be read as a production observability stack or completed lineage platform.",
    ],
    plannedArtifacts: [
      {
        title: "Expectation failure demo",
        description: "Could be added later to make the validation story easier to inspect.",
      },
      {
        title: "Lineage view",
        description: "Could be added later as a simple dependency snapshot for the example models.",
      },
      {
        title: "Validation notes",
        description: "Could be added later to explain which checks matter most and why.",
      },
    ],
  },
  {
    slug: "cdc-warehouse",
    title: "CDC -> Warehouse",
    href: "/projects/cdc-warehouse",
    category: "cdc / streaming",
    statusLabel: "exploration",
    accentKey: "cyan",
    summary:
      "Exploratory notes on CDC, idempotent updates, and moving source changes into warehouse tables.",
    overview:
      "This page captures a smaller exploration of change-data-capture patterns and replay-safe updates. It is useful as a learning exercise around event-driven data movement, not as a deployed streaming system.",
    goal:
      "It shows interest in system behavior, correctness under replays, and how technical ideas move from concept tests to implementation.",
    nextMilestone:
      "If I continue it, I would add a clearer ingest-path example and a small current-state view.",
    stack: ["Debezium", "Kafka / Redpanda", "Incremental models", "Customer 360"],
    scope: [
      "A source-database-to-target flow shaped around CDC concepts.",
      "Replay-safe updates and idempotent handling as the core technical concern.",
      "A compact example of how streaming ideas connect to warehouse-style storage.",
    ],
    status: [
      "This page currently documents the idea and its important correctness concerns.",
      "Concept tests in the repo already cover idempotent upsert behavior related to this topic.",
      "It should not be read as a live deployed CDC pipeline.",
    ],
    plannedArtifacts: [
      {
        title: "Pipeline trace",
        description: "Could be added later to show the handoff from source changes to target tables.",
      },
      {
        title: "Upsert logic note",
        description: "Could be added later as a short replay-safe update example.",
      },
      {
        title: "Current-state view",
        description: "Could be added later as a compact view of what the ingest path is meant to support.",
      },
    ],
  },
  {
    slug: "performance-governance",
    title: "Performance & Governance",
    href: "/projects/performance-governance",
    category: "performance / governance",
    statusLabel: "study note",
    accentKey: "steel",
    summary:
      "Notes on query performance, masking rules, and simple governed data access.",
    overview:
      "This page documents a compact exploration around performance measurement and basic data-governance concerns. It is not presented as a complete operational policy system.",
    goal:
      "I kept it because tuning, access boundaries, and explainable tradeoffs are part of practical technical work.",
    nextMilestone:
      "If I continue it, I would add clearer benchmark evidence and a small masking example.",
    stack: ["Query plans", "Partitioning / indexing", "Masking rules", "DSAR export"],
    scope: [
      "Before-and-after query plans and timings as a way to reason about performance.",
      "Simple examples of masking or restricted views.",
      "A small governed-access example to show why policy and implementation belong together.",
    ],
    status: [
      "This page currently serves as a structured note around performance and access concerns.",
      "The repo includes a concept benchmark test related to the measurement side of this topic.",
      "It should not be read as a complete governance framework or finished policy implementation.",
    ],
    plannedArtifacts: [
      {
        title: "Benchmark ledger",
        description: "Could be added later to show timings and plan deltas in a compact format.",
      },
      {
        title: "Masking example",
        description: "Could be added later to show how sensitive fields might be restricted or obscured.",
      },
      {
        title: "Access example",
        description: "Could be added later as a small governed retrieval example.",
      },
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
