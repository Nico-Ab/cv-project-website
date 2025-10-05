# Tests

This repo includes two kinds of tests:

1. **End-to-end (E2E)** tests with Playwright for the website (navigation, theme, mobile menu).
2. **Data** tests with Python (pytest + DuckDB) to lay the foundation for each project.

## Install & run locally

### E2E (website)
```bash
npm i -D @playwright/test
npx playwright install
npx playwright test
```

### Data tests
```bash
python3 -m venv .venv && source .venv/bin/activate
pip install -U pip duckdb pytest pandas
pytest -q
```

## CI
The workflow in `.github/workflows/ci-tests.yml` runs both suites on every push/PR.
