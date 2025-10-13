export type Project = {
  title: string;
  summary: string;
  href: string;     // relative path (no leading slash)
  stack?: string[];
};

export const projects: Project[] = [
  {
    title: "Mini Data Warehouse (Retail)",
    summary:
      "A compact retail dataset modeled with Kimball dims/facts in dbt. Goal: a clear star schema, predictable loads, and a small KPI view.",
    href: "projects/mini-warehouse",
    stack: ["dbt", "Postgres/DuckDB", "SQL"]
  },
  {
    title: "Data Quality & Lineage",
    summary:
      "Add expectations and lineage so issues surface early and ownership is clear. Failing checks block deployments with a useful message.",
    href: "projects/data-quality-lineage",
    stack: ["dbt tests", "Great Expectations/Soda"]
  },
  {
    title: "CDC → Warehouse",
    summary:
      "Stream changes from a source DB into incremental models. Focus: idempotent upserts, late-arriving data, and near-real-time metrics.",
    href: "projects/cdc-warehouse",
    stack: ["Debezium/Kafka", "dbt", "SQL"]
  },
  {
    title: "Performance & Governance",
    summary:
      "Measure query plans and timings before/after simple optimizations, then add basic masking/row-level rules and a minimal DSAR export.",
    href: "projects/performance-governance",
    stack: ["SQL", "Indexing/Partitioning", "Policies"]
  }
];
