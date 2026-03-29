import { test, expect } from '@playwright/test';

test('homepage renders updated profile and base-aware project links', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1, name: /software and technical work/i })).toBeVisible();
  await expect(page.locator('[data-role="query-console"]').first()).toBeVisible();
  await expect(page.locator('[data-role="project-card"]')).toHaveCount(3);
  await expect(
    page.locator('[data-role="project-card"][href$="/cv-project-website/projects/erasmus-staff-mobility-portal"]')
  ).toHaveCount(1);
  await expect(
    page.locator('[data-role="project-card"][href$="/cv-project-website/projects/german-learning-app"]')
  ).toHaveCount(1);
  await expect(
    page.locator('[data-role="project-card"][href$="/cv-project-website/projects/linuxhost-tsn-plugin"]')
  ).toHaveCount(1);
  await expect(page.locator('[data-role="project-card"]').filter({ hasText: 'Erasmus Staff Mobility Portal' })).toHaveCount(1);
  await expect(page.locator('[data-role="project-card"]').filter({ hasText: 'German Learning App' })).toHaveCount(1);
  await expect(page.locator('[data-role="project-card"]').filter({ hasText: 'Linux Host TSN / NETCONF Plugin' })).toHaveCount(1);
  await expect(page.locator('body')).not.toContainText('Active build sequence');
  await expect(page.locator('body')).not.toContainText('Warehouse / Analytics Engineering');
});

test('sidebar links navigate', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('[data-role="workspace-sidebar"]')).toBeVisible();
  await page.getByRole('link', { name: /About/ }).first().click();
  await expect(page).toHaveURL(/about/);
  await expect(page.getByRole('heading', { level: 1, name: /About/ })).toBeVisible();
  await expect(page.locator('body')).toContainText('University of Rostock');
  await expect(page.locator('body')).not.toContainText('data warehousing and analytics engineering');
});

test('theme toggle works and persists', async ({ page }) => {
  await page.goto('./');
  const html = page.locator('html');
  const before = await html.getAttribute('class');
  await page.getByRole('button', { name: /Toggle theme/ }).first().click();
  const after = await html.getAttribute('class');
  expect(before).not.toEqual(after);
  const verifyPage = await page.context().newPage();
  await verifyPage.goto('./');
  const afterOpen = await verifyPage.locator('html').getAttribute('class');
  expect(afterOpen).toEqual(after);
  await verifyPage.close();
});

test('mobile menu opens and closes', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1, name: /software and technical work/i })).toBeVisible();
  await expect(
    page.locator('[data-role="project-card"]').filter({ hasText: 'Erasmus Staff Mobility Portal' })
  ).toHaveCount(1);
  const menuBtn = page.getByRole('button', { name: 'Menu' });
  await expect(menuBtn).toBeVisible();
  await menuBtn.click();
  await expect(page.locator('#mobileNav')).toBeVisible();
  await page.getByRole('link', { name: 'About' }).click();
  await expect(page).toHaveURL(/about/);
  await expect(page.locator('#mobileNav')).toBeHidden();
  await expect(page.locator('main').getByText(/University of Rostock/i).first()).toBeVisible();
});

test('project cards stay readable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('./');

  const linuxCard = page
    .locator('[data-role="project-card"]')
    .filter({ has: page.getByText('Linux Host TSN / NETCONF Plugin', { exact: true }) });

  await expect(linuxCard).toBeVisible();

  const title = linuxCard.locator('.project-card__title');
  const chipRow = linuxCard.locator('.chip-row').first();

  await expect(title).toBeVisible();
  await expect(chipRow).toBeVisible();

  const titleOverflows = await title.evaluate((node) => node.scrollWidth > node.clientWidth + 1);
  const chipRowOverflows = await chipRow.evaluate((node) => node.scrollWidth > node.clientWidth + 1);

  expect(titleOverflows).toBeFalsy();
  expect(chipRowOverflows).toBeFalsy();
});
