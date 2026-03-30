import { test, expect } from '@playwright/test';

const projectPages = [
  {
    path: 'projects/erasmus-staff-mobility-portal',
    title: 'Erasmus Staff Mobility Portal',
  },
  {
    path: 'projects/german-learning-app',
    title: 'German Learning App',
  },
  {
    path: 'projects/linuxhost-tsn-plugin',
    title: 'Linux Host TSN / NETCONF Plugin',
  },
  {
    path: 'projects/browser-sql-reporting-demo',
    title: 'Browser SQL Reporting Demo',
  },
  {
    path: 'projects/workflow-permissions-demo',
    title: 'Workflow & Permissions Demo',
  },
  {
    path: 'projects/review-scheduling-demo',
    title: 'Review Scheduling Demo',
  },
];

test('about page loads', async ({ page }) => {
  await page.goto('./about');
  await expect(page.getByRole('heading', { level: 1, name: /About Nico/i })).toBeVisible();
});

for (const project of projectPages) {
  test(`project page loads: ${project.path}`, async ({ page }) => {
    await page.goto(`./${project.path}`);
    await expect(page.getByRole('heading', { level: 1, name: project.title })).toBeVisible();
    await expect(page.locator('body')).not.toContainText('planned artifacts');
    await expect(page.locator('body')).not.toContainText('reserved evidence slots');
    await expect(page.locator('body')).not.toContainText('ready to ship');
    await expect(page.locator('body')).not.toContainText('next milestone');
    await expect(page.locator('body')).not.toContainText('current implementation state');
  });
}
