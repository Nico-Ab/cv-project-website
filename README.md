# Nico Abramowski — Data Warehousing / Analytics Engineering Portfolio

This repository contains my public portfolio website and project pages focused on **dimensional modeling**, **dbt-driven ELT**, and **data quality**. It’s intended for hiring managers and collaborators to review how I structure models, document decisions, and automate checks.

**Live site:** https://nico-ab.github.io/cv-project-website  
**CV (PDF):** see the “CV” link in the site sidebar

---

## Highlights

- **Clear modeling:** Kimball-style dimensions and facts, SCD strategies where appropriate.
- **Reliable ELT:** dbt transformations with tests and incremental models; reproducible local setup.
- **Data quality & lineage:** expectations and docs to prevent regressions and clarify ownership.
- **Lightweight delivery:** simple dashboards/docs that answer a defined business question.

---

## Projects

- **Mini Data Warehouse (Retail)**  
  Dimensional modeling with dbt (staging → dims/facts), SCD patterns, and a small dashboard.

- **Data Quality & Lineage**  
  Expectations (GE/Soda), dbt tests/docs, and lineage visuals; focus on preventing bad deploys.

- **CDC → Warehouse**  
  Debezium/Kafka into incremental models (PostgreSQL/DuckDB), targeting near-real-time metrics.

- **Performance & Governance**  
  Query benchmarking (partitioning, indexing), masking policies, and a simple DSAR export.

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
