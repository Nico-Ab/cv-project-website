import { test, expect } from '@playwright/test';

test('homepage renders updated profile and base-aware project links', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { level: 1, name: /software and technical work/i })).toBeVisible();
  await expect(page.locator('[data-role="query-console"]').first()).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Project case studies' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 3, name: 'Live demos' })).toBeVisible();
  await expect(page.locator('[data-role="project-card"]')).toHaveCount(6);
  await expect(
    page.locator('[data-role="project-card"][href$="/cv-project-website/projects/erasmus-staff-mobility-portal"]')
  ).toHaveCount(1);
  await expect(
    page.locator('[data-role="project-card"][href$="/cv-project-website/projects/german-learning-app"]')
  ).toHaveCount(1);
  await expect(
    page.locator('[data-role="project-card"][href$="/cv-project-website/projects/linuxhost-tsn-plugin"]')
  ).toHaveCount(1);
  await expect(
    page.locator('[data-role="project-card"][href$="/cv-project-website/projects/browser-sql-reporting-demo"]')
  ).toHaveCount(1);
  await expect(
    page.locator('[data-role="project-card"][href$="/cv-project-website/projects/workflow-permissions-demo"]')
  ).toHaveCount(1);
  await expect(
    page.locator('[data-role="project-card"][href$="/cv-project-website/projects/review-scheduling-demo"]')
  ).toHaveCount(1);
  await expect(page.locator('.project-card__title').filter({ hasText: 'Erasmus Staff Mobility Portal' })).toHaveCount(1);
  await expect(page.locator('.project-card__title').filter({ hasText: 'German Learning App' })).toHaveCount(1);
  await expect(page.locator('.project-card__title').filter({ hasText: 'Linux Host TSN / NETCONF Plugin' })).toHaveCount(1);
  await expect(page.locator('.project-card__title').filter({ hasText: 'Browser SQL Reporting Demo' })).toHaveCount(1);
  await expect(page.locator('.project-card__title').filter({ hasText: 'Workflow & Permissions Demo' })).toHaveCount(1);
  await expect(page.locator('.project-card__title').filter({ hasText: 'Review Scheduling Demo' })).toHaveCount(1);
  await expect(page.locator('body')).not.toContainText('Active build sequence');
  await expect(page.locator('body')).not.toContainText('Warehouse / Analytics Engineering');
});

test('sidebar links navigate', async ({ page }) => {
  await page.goto('./');
  await expect(page.locator('[data-role="workspace-sidebar"]')).toBeVisible();
  await expect(page.locator('[data-role="sidebar-profile"]')).toContainText('University of Rostock');
  await page.getByRole('link', { name: /About/ }).first().click();
  await expect(page).toHaveURL(/about/);
  await expect(page.getByRole('heading', { level: 1, name: /About/ })).toBeVisible();
  await expect(page.locator('body')).toContainText('University of Rostock');
  await expect(page.locator('body')).not.toContainText('data warehousing and analytics engineering');
});

test('desktop sidebar can scroll to the theme toggle', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto('./');

  const sidebarFrame = page.locator('[data-role="sidebar-frame"]');
  const themeToggle = page.locator('[data-role="sidebar-theme-toggle"]');

  await expect(sidebarFrame).toBeVisible();
  await expect(themeToggle).toBeVisible();

  const scrollInfo = await sidebarFrame.evaluate((node) => {
    const element = node as HTMLElement;
    const before = element.scrollTop;
    element.scrollTop = element.scrollHeight;
    return {
      before,
      after: element.scrollTop,
      scrollHeight: element.scrollHeight,
      clientHeight: element.clientHeight,
    };
  });

  expect(scrollInfo.scrollHeight).toBeGreaterThanOrEqual(scrollInfo.clientHeight);

  if (scrollInfo.scrollHeight > scrollInfo.clientHeight + 1) {
    expect(scrollInfo.after).toBeGreaterThan(scrollInfo.before);
  }

  await expect(themeToggle).toBeVisible();
});

test('sidebar profile card can scroll when its content exceeds the available height', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 560 });
  await page.goto('./');

  const profileCard = page.locator('[data-role="sidebar-profile"]');
  await expect(profileCard).toBeVisible();

  const scrollInfo = await profileCard.evaluate((node) => {
    const element = node as HTMLElement;
    const before = element.scrollTop;
    element.scrollTop = element.scrollHeight;

    return {
      before,
      after: element.scrollTop,
      scrollHeight: element.scrollHeight,
      clientHeight: element.clientHeight,
      overflowY: getComputedStyle(element).overflowY,
    };
  });

  expect(scrollInfo.overflowY).toBe('auto');

  if (scrollInfo.scrollHeight > scrollInfo.clientHeight + 1) {
    expect(scrollInfo.after).toBeGreaterThan(scrollInfo.before);
  }
});

test('theme toggle works and persists', async ({ page }) => {
  await page.goto('./');
  const html = page.locator('html');
  const before = await html.getAttribute('class');
  const themeToggle = page.locator('[data-role="sidebar-theme-toggle"]');
  await themeToggle.focus();
  await page.keyboard.press('Enter');
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

test('homepage does not leave a large empty scroll tail after the final section', async ({ page }) => {
  await page.goto('./');

  const tailSpace = await page.evaluate(() => {
    const projectCards = Array.from(document.querySelectorAll('[data-role="project-card"]'));
    const lastCard = projectCards[projectCards.length - 1];

    if (!lastCard) return Number.POSITIVE_INFINITY;

    const rect = lastCard.getBoundingClientRect();
    const absoluteBottom = rect.bottom + window.scrollY;
    return document.documentElement.scrollHeight - absoluteBottom;
  });

  expect(tailSpace).toBeLessThan(260);
});
