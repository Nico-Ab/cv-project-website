import { test, expect } from '@playwright/test';

const pages = [
  '/about',
  '/projects/mini-warehouse',
  '/projects/data-quality-lineage',
  '/projects/cdc-warehouse',
  '/projects/performance-governance',
];

for (const p of pages) {
  test(`page loads: ${p}`, async ({ page }) => {
    await page.goto(p);
    await expect(page.getByRole('heading')).toBeVisible();
  });
}