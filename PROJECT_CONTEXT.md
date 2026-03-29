# Project Context

Last updated: 2026-03-28

This is a running context document for the portfolio site. The goal is to keep a compact but useful memory of:

- what the site currently does
- what is still missing
- how the repo is structured
- what tests and deployment exist
- any environment or repo quirks that matter when picking work back up

## Project Summary

- Repo purpose: personal portfolio website for Nico Abramowski focused on data warehousing / analytics engineering work.
- Frontend stack: Astro 4, Tailwind CSS, static site output.
- Hosting target: GitHub Pages.
- Main audience: hiring managers, recruiters, collaborators.
- Current product shape: a polished static portfolio site with a query-console visual system, richer case-study framing, and roadmap-style project pages. It is still content-first rather than demo-heavy.

## Current Site State

### Implemented now

- Homepage with hero section, quick facts, project cards, and a short "what is coming next" section.
- About page with background, focus areas, toolbox, and contact links.
- Four project detail pages:
  - Mini Data Warehouse
  - Data Quality and Lineage
  - CDC to Warehouse
  - Performance and Governance
- Shared responsive layout with:
  - desktop sidebar navigation
  - mobile header and collapsible menu
  - theme toggle with `localStorage` persistence
  - scroll reveal animation
- Shared styling system in Tailwind plus custom utility/component classes in `src/styles/global.css`.
- Public assets currently include:
  - `public/CV.pdf`
  - `public/favicon.svg`

### Implemented in the visual overhaul

- The site now uses a database-inspired "query console" aesthetic rather than a generic SaaS card layout.
- The shell has been redesigned into workspace chrome:
  - schema-style navigation groups
  - tab-like active states
  - branded stacked-row mark
  - animated grid / scan background
- Typography now uses `IBM Plex Sans` plus `IBM Plex Mono`.
- The homepage now includes:
  - split hero with query-console artifact
  - metadata cards
  - redesigned project cards with status/category/accent cues
  - roadmap and delivery-rule panels
- The About page is now presented as a technical dossier instead of a plain text card.
- Project pages now use a shared case-study layout with:
  - project header strip
  - scope and status panels
  - planned artifact placeholders
  - delivery-lane notes

### What the site feels like today

- The site is now more visually distinctive and more aligned with the database / warehouse theme.
- The content is clear and structured around a data-engineering learning path.
- The project pages currently describe work, scope, and next steps rather than showing completed embedded demos, dashboards, screenshots, or linked project repos.

## What Still Needs To Be Implemented

### Site-level gaps

- Interactive demos mentioned on the homepage are not implemented yet.
- Embedded or linked dbt docs are not present yet.
- Dashboard examples are not yet wired into the site.
- There is no dynamic content layer, CMS, API, or backend in this repo.
- There is no shared "project status" system beyond page copy itself.

### Project-specific gaps called out by current copy

#### Mini Data Warehouse

- SCD2 logic for `dim_customer`
- published dbt docs
- small dashboard answering concrete business questions

#### Data Quality and Lineage

- failing-test demo
- lineage screenshots
- fuller lineage story beyond dbt docs, later OpenLineage

#### CDC to Warehouse

- implemented upsert logic
- live or near-real-time metrics view
- fuller late-arriving data handling example

#### Performance and Governance

- benchmark timings and captured plans
- masking policy examples
- DSAR export example

## Architecture Notes

### Important frontend files

- `src/layouts/BaseLayout.astro`
  - global page shell
  - desktop and mobile navigation
  - theme toggle logic
  - scroll reveal setup
- `src/components/ProjectCard.astro`
  - reusable project card used on the homepage
- `src/data/projects.ts`
  - project card metadata used to render the homepage grid
- `src/pages/index.astro`
  - homepage
- `src/pages/about.astro`
  - about page
- `src/pages/projects/*.astro`
  - one Astro page per featured project
- `src/styles/global.css`
  - Tailwind imports plus custom tokens, cards, buttons, nav styles, background layers, and dark-mode safety overrides

### Routing model

- Astro file-based routing.
- GitHub Pages base path is configured as `/cv-project-website/`.
- Most layout links use `import.meta.env.BASE_URL`.
- Important caveat: homepage project card `href` values in `src/data/projects.ts` are currently raw `/projects/...` paths rather than base-aware links.

### Styling and behavior

- Visual style uses cards, soft gradient accents, a dot-grid background, and light/dark theming.
- Theme state is stored in `localStorage`.
- Mobile nav starts closed and closes on navigation or desktop resize.
- Reveal animation uses `IntersectionObserver`.

## Testing State

### Website tests

- Playwright tests live in `tests/e2e`.
- Current E2E coverage includes:
  - homepage renders
  - sidebar navigation works
  - theme toggle persists after reload
  - mobile menu opens and closes
  - major pages load and expose a heading

### Data/project concept tests

- Python tests live in `tests/projects`.
- These are not backend tests for this site.
- They are small executable examples that reflect the concepts described on the project pages:
  - dimensional integrity and SCD2 expectations
  - data quality expectation failures
  - CDC upsert idempotency
  - benchmark equivalence between naive and pre-aggregated queries

### Last known validation state

- `tests/results.xml` still shows 5 Python project tests passing in a prior run dated 2025-10-05.
- On 2026-03-28, `npm run build` completed successfully after repairing the local Node install.
- On 2026-03-28, the Playwright E2E suite passed after:
  - aligning Playwright with the GitHub Pages base path
  - disabling Astro telemetry in the Playwright web server
  - installing the local Playwright Chromium browser

## Deployment And Tooling

- Astro config:
  - static output
  - Tailwind integration enabled
  - site URL points at GitHub Pages
  - base path set for Pages deployment
- CI workflow:
  - Node job runs Playwright tests
  - Python job runs pytest-based project tests
- Deploy workflow:
  - installs Node deps
  - builds Astro site
  - uploads `dist`
  - deploys to GitHub Pages

## Environment / Repo Caveats

### Local validation caveats found during inspection

- The current `node_modules` appears incomplete for this Windows environment:
  - this was repaired during the redesign work by rerunning `npm install`
- The repo contains a Unix-style `.venv/bin` virtual environment.
- In this PowerShell environment, that Unix-style venv is not directly usable.
- The system Python available on this machine does not currently have the test dependencies (`duckdb`, `pandas`, `pytest`) installed globally.
- Because of that, local re-validation was partially blocked without changing the environment.
- Playwright browser binaries had to be installed locally before E2E tests could run.

### Git working tree note

- The repo currently has many modified files under `.venv/`.
- Those look environment-related, not like intentional site source edits.
- Be careful not to treat those as application changes.

## Content And Product Direction

### Current narrative

- Nico is positioned as an aspiring analytics engineer / data warehouse developer.
- The site emphasizes:
  - dimensional modeling
  - dbt-style ELT
  - data quality
  - CDC
  - governance and performance

### Likely next-value improvements

- Turn project pages from "status placeholders" into proof pages with screenshots, diagrams, repo links, metrics, and short technical writeups.
- Add at least one interactive or embedded artifact so the portfolio is not only descriptive.
- Normalize project metadata so progress/status is defined in data rather than hard-coded page copy.
- Decide whether each project should stay as a single Astro page or grow into a richer sub-section with assets and supporting pages.

## Useful Quick Map

### Top-level files

- `README.md`
- `package.json`
- `astro.config.mjs`
- `tailwind.config.mjs`
- `playwright.config.ts`
- `pytest.ini`
- `.github/workflows/ci-tests.yml`
- `.github/workflows/deploy.yml`

### Source tree

- `src/components`
- `src/data`
- `src/layouts`
- `src/pages`
- `src/styles`

### Tests

- `tests/e2e`
- `tests/projects`

## Suggested Use Of This File

- Update this file whenever we learn something structural about the project.
- Add decisions, constraints, and caveats here before they are easy to forget.
- Prefer short factual notes over long prose so this stays useful as a recovery document.
