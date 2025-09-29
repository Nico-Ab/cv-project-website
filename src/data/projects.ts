export const projects = [
  {
    slug: "mini-warehouse",
    title: "Mini Data Warehouse (Retail)",
    href: "/projects/mini-warehouse",
    summary: "Dimensional modeling with dbt; SCD1/SCD2; simple dashboard & docs.",
    stack: ["Astro site", "dbt", "Postgres/DuckDB", "Metabase/Superset"],
  },
  {
    slug: "data-quality-lineage",
    title: "Data Quality & Lineage Observatory",
    href: "/projects/data-quality-lineage",
    summary: "Great Expectations/Soda, lineage with dbt docs/OpenLineage; CI that blocks bad data.",
    stack: ["GE/Soda", "dbt", "Airflow/Prefect"],
  },
  {
    slug: "cdc-warehouse",
    title: "CDC → Warehouse",
    href: "/projects/cdc-warehouse",
    summary: "Debezium/Kafka into incremental models; near-real-time orders + Customer 360.",
    stack: ["Debezium", "Kafka/Redpanda", "dbt"],
  },
  {
    slug: "performance-governance",
    title: "Performance & Governance",
    href: "/projects/performance-governance",
    summary: "Benchmarks (partitioning, indexes) + PII masking and a DSAR export script.",
    stack: ["ClickHouse/Postgres", "dbt", "RLS/Policies"],
  },
];