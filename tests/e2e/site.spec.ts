import { test, expect } from '@playwright/test';

test('homepage renders query console and base-aware project links', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1, name: /dimensional models/i })).toBeVisible();
  await expect(page.locator('[data-role="query-console"]').first()).toBeVisible();
  await expect(page.locator('[data-role="project-card"]')).toHaveCount(4);
  await expect(
    page.locator('[data-role="project-card"][href$="/cv-project-website/projects/mini-warehouse"]')
  ).toHaveCount(1);
});

test('sidebar links navigate', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('[data-role="workspace-sidebar"]')).toBeVisible();
  await page.getByRole('link', { name: /About/ }).first().click();
  await expect(page).toHaveURL(/about/);
  await expect(page.getByRole('heading', { level: 1, name: /About/ })).toBeVisible();
});

test('theme toggle works and persists', async ({ page }) => {
  await page.goto('./');
  const html = page.locator('html');
  const before = await html.getAttribute('class');
  await page.getByRole('button', { name: /Toggle theme/ }).first().click();
  const after = await html.getAttribute('class');
  expect(before).not.toEqual(after);
  await page.reload();
  const afterReload = await html.getAttribute('class');
  expect(afterReload).toEqual(after);
});

test('mobile menu opens and closes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  const menuBtn = page.getByRole('button', { name: 'Menu' });
  await expect(menuBtn).toBeVisible();
  await menuBtn.click();
  await expect(page.locator('#mobileNav')).toBeVisible();
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/about/);
  await expect(page.locator('#mobileNav')).toBeHidden();
});
