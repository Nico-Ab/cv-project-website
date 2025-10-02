# Nico Abramowski — Data (Warehousing) Portfolio

This repository contains my public portfolio website and interactive project pages focused on **data warehousing / analytics engineering**. It’s designed for hiring managers and teammates to quickly assess my skills in **dimensional modeling, ELT with dbt, data quality, CDC, and performance/governance**.

[![Deploy status](https://github.com/Nico-Ab/cv-project-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/Nico-Ab/cv-project-website/actions/workflows/deploy.yml)

**Live site:** https://nico-ab.github.io/cv-project-website  
**CV:** See the “CV” link in the site sidebar (PDF)

---

## What this site shows (in 2 minutes)

- **About:** Short background and what I’m looking for.
- **Projects:** Four data projects aligned with a practical 8-week learning plan:
  1) **Mini Data Warehouse (Retail)** - Kimball-style dimensional modeling with dbt, SCD1/2, and a small dashboard.
  2) **Data Quality & Lineage Observatory** - Expectations with GE/Soda, dbt tests/docs, and lineage.
  3) **CDC → Warehouse** - Debezium/Kafka into incremental dbt models for near-real-time metrics.
  4) **Performance & Governance**  Query benchmarking, partitioning/indexes, masking policies, and a DSAR export.

> Each project page summarizes the problem, architecture, and how to run the demo. Where appropriate I include screenshots, dbt docs, and a short Loom walkthrough.

---

## Why this repository exists

- **Transparency:** Everything is open so you can evaluate how I structure code, document decisions, and test data.
- **Relevance:** The projects mirror the work of analytics engineers: modeling, orchestration, quality gates, and incremental loads.
- **Operational thinking:** I highlight lineage, CI checks, idempotency, and performance notes—not just SQL.

---

## Tech stack

- **Frontend:** [Astro](https://astro.build) + Tailwind CSS (static, fast, accessible)
- **Data tooling (across projects):** dbt, Postgres/DuckDB, Metabase/Superset, Great Expectations/Soda, Debezium, Kafka/Redpanda, Airflow/Prefect, ClickHouse
- **Infra/Dev:** Docker Compose, GitHub Actions (build & deploy to Pages)

---

## Local development (website)

```bash
# Requirements: Node.js 18+ (or 20+). Repo uses npm and Astro.
git clone git@github.com:Nico-Ab/cv-project-website.git
cd cv-project-website
npm install
npm run dev
