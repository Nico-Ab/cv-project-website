# Nico Abramowski — Data Warehousing / Analytics Engineering Portfolio

This repository contains my public portfolio website and project pages focused on **dimensional modeling**, **dbt-driven ELT**, and **data quality**. It’s intended for hiring managers and collaborators to review how I structure models, document decisions, and automate checks.

**Live site:** https://nico-ab.github.io/cv-project-website  
**CV (PDF):** see the “CV” link in the site sidebar

---

## What this site shows (in 2 minutes)

- **About:** Short background and what I’m looking for.
- **Projects:** Four data projects aligned with a practical 8-week learning plan:
  1) **Mini Data Warehouse (Retail)** - Kimball-style dimensional modeling with dbt, SCD1/2, and a small dashboard.
  2) **Data Quality & Lineage Observatory** - Expectations with GE/Soda, dbt tests/docs, and lineage.
  3) **CDC → Warehouse** - Debezium/Kafka into incremental dbt models for near-real-time metrics.
  4) **Performance & Governance** - Query benchmarking, partitioning/indexes, masking policies, and a DSAR export.

> Each project page outlines the problem, architecture, and how to run it locally. Where useful, I include screenshots and short walkthroughs.

---

## Tech stack

- **Frontend:** Astro + Tailwind CSS
- **Data tooling:** dbt, PostgreSQL/DuckDB, Great Expectations/Soda (basics), Airflow/Prefect (basics), Kafka/Debezium (intro)
- **Infra/Dev:** Docker, GitHub Actions (build & deploy to Pages), Linux (Mint)

---

## Local development

```bash
git clone git@github.com:Nico-Ab/cv-project-website.git
cd cv-project-website
npm install
npm run dev
