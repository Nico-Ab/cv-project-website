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
    category: "warehouse build",
    statusLabel: "In progress",
    accentKey: "amber",
    summary: "Dimensional modeling with dbt, SCD handling, and a retail reporting layer.",
    overview:
      "Small retail domain modeled with Kimball: staging to dimensions and facts, plus practical SCD handling. The aim is a clear star schema and a dashboard that answers a few concrete questions.",
    goal:
      "Build a warehouse layer that is easy to explain, easy to test, and ready for dashboard delivery.",
    nextMilestone:
      "Add SCD2 logic to dim_customer, publish dbt docs, and wire a compact dashboard.",
    stack: ["dbt", "Postgres / DuckDB", "Dimensional modeling", "Dashboard layer"],
    scope: [
      "Staging views with source tests for nulls, uniqueness, and accepted values.",
      "Core dimensions and facts: dim_customer, dim_product, dim_date, and fct_orders.",
      "SCD1 for products and a simple SCD2 example for customer history.",
    ],
    status: [
      "Schema draft and seeds prepared.",
      "dbt project skeleton ready.",
      "Next step: finish customer history logic and publish docs that explain the grain cleanly.",
    ],
    plannedArtifacts: [
      {
        title: "Star schema snapshot",
        description: "A clean ERD-style view of the retail dimensions, fact grain, and key flow.",
      },
      {
        title: "dbt docs capture",
        description: "A browsable lineage and test summary once docs are published.",
      },
      {
        title: "Retail KPI board",
        description: "A small dashboard for orders, revenue, and customer mix.",
      },
    ],
  },
  {
    slug: "data-quality-lineage",
    title: "Data Quality & Lineage Observatory",
    href: "/projects/data-quality-lineage",
    category: "quality observatory",
    statusLabel: "Checks wiring",
    accentKey: "jade",
    summary:
      "Great Expectations or Soda, dbt tests, and lineage that make regressions visible early.",
    overview:
      "Add expectations and lineage so broken data is caught early and table ownership stays clear. This complements the mini-warehouse with CI checks and easier-to-browse documentation.",
    goal:
      "Show how data quality signals and lineage make a small warehouse feel operational, not just correct on paper.",
    nextMilestone:
      "Wire a failing-test demo and publish lineage screenshots from the docs flow.",
    stack: ["dbt tests", "Great Expectations / Soda", "Lineage docs", "CI gates"],
    scope: [
      "dbt tests on critical dimensions and facts.",
      "Row-level expectations for nulls, ranges, duplicates, and broken assumptions.",
      "Lineage via dbt docs now, with room to grow into OpenLineage later.",
    ],
    status: [
      "Critical checks identified.",
      "Project direction is aligned with the warehouse models already in progress.",
      "Next step: create a demo where the pipeline visibly blocks bad data before it lands downstream.",
    ],
    plannedArtifacts: [
      {
        title: "Expectation failure demo",
        description: "A failing check path that shows exactly where the data contract breaks.",
      },
      {
        title: "Lineage screenshot set",
        description: "Model dependencies, upstream ownership, and test coverage in one view.",
      },
      {
        title: "CI gate note",
        description: "A concise record of which checks stop deployment and why.",
      },
    ],
  },
  {
    slug: "cdc-warehouse",
    title: "CDC -> Warehouse",
    href: "/projects/cdc-warehouse",
    category: "streaming ingest",
    statusLabel: "Events flowing",
    accentKey: "cyan",
    summary:
      "Debezium and Kafka style CDC into incremental warehouse models for near-real-time reporting.",
    overview:
      "Change Data Capture from a source database into incremental dbt models. The target is near-real-time orders-today reporting and a simple customer 360 built on upserts and idempotent loads.",
    goal:
      "Demonstrate a practical bridge from event streams into warehouse tables that stay trustworthy under replays.",
    nextMilestone:
      "Implement the upsert path and add a lightweight live metrics view for current activity.",
    stack: ["Debezium", "Kafka / Redpanda", "Incremental models", "Customer 360"],
    scope: [
      "Source Postgres emitting order events through CDC.",
      "Incremental models with handling for late-arriving data.",
      "Latency-aware metrics tables for fast, current reporting.",
    ],
    status: [
      "Source schema and event format drafted.",
      "Concept tests already cover the idempotent upsert behavior this project depends on.",
      "Next step: wire the ingestion path into a small live operational view.",
    ],
    plannedArtifacts: [
      {
        title: "Pipeline trace",
        description: "A visual handoff from source table to event stream to warehouse model.",
      },
      {
        title: "Upsert logic excerpt",
        description: "A short implementation note showing replay-safe record updates.",
      },
      {
        title: "Live metric panel",
        description: "A compact current-orders view that proves the flow is working.",
      },
    ],
  },
  {
    slug: "performance-governance",
    title: "Performance & Governance",
    href: "/projects/performance-governance",
    category: "ops and policy",
    statusLabel: "Benchmarks staged",
    accentKey: "steel",
    summary:
      "Benchmarking, storage tuning, masking rules, and a DSAR-style export path.",
    overview:
      "Practical SQL tuning and sensible policies. Compare baseline versus partitioning and indexing, then add basic masking rules and a simple DSAR export path.",
    goal:
      "Prove that warehouse design work also includes runtime discipline, access boundaries, and user-data handling.",
    nextMilestone:
      "Run timings, capture plans, and document the masking policy examples.",
    stack: ["Query plans", "Partitioning / indexing", "Masking rules", "DSAR export"],
    scope: [
      "Before-and-after query plans and timings.",
      "Partitioning, indexing, or projection choices documented with measured deltas.",
      "Masking views and a minimal DSAR script for governed access.",
    ],
    status: [
      "Benchmark queries selected.",
      "The comparison path is defined; evidence capture is the next major deliverable.",
      "Next step: record deltas and pair them with concrete policy examples.",
    ],
    plannedArtifacts: [
      {
        title: "Benchmark ledger",
        description: "Query timings and plan deltas captured in a clean before-after format.",
      },
      {
        title: "Masking policy walkthrough",
        description: "Examples of how sensitive fields are obscured or restricted.",
      },
      {
        title: "DSAR output sample",
        description: "A minimal export example that demonstrates governed retrieval.",
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
