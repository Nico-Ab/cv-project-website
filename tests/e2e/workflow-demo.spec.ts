import { expect, test } from "@playwright/test";

test("workflow permissions demo enforces role-based actions and updates audit history", async ({ page }) => {
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  await page.goto("./projects/workflow-permissions-demo");

  await expect(page.getByRole("heading", { level: 1, name: "Workflow & Permissions Demo" })).toBeVisible();
  await expect(page.locator("#workflow-demo-status")).toHaveText(/Draft/i);

  await page.getByRole("button", { name: "Submit case" }).click();
  await expect(page.locator("#workflow-demo-feedback")).toContainText(/signed agreement/i);
  await expect(page.locator("#workflow-demo-status")).toHaveText(/Draft/i);

  await page.getByRole("button", { name: "Upload signed agreement" }).click();
  await expect(page.locator('[data-workflow-doc-state="signed_agreement"]')).toHaveText(/Pending review/i);

  await page.getByRole("button", { name: "Submit case" }).click();
  await expect(page.locator("#workflow-demo-status")).toHaveText(/Submitted/i);

  await page.locator('[data-workflow-role-switch="officer"]').click();
  await expect(page.locator("#workflow-demo-current-role")).toHaveText("Officer");

  await page.getByRole("button", { name: "Forward to admin" }).click();
  await expect(page.locator("#workflow-demo-feedback")).toContainText(/must be approved/i);
  await expect(page.locator("#workflow-demo-status")).toHaveText(/Submitted/i);

  await page.getByRole("button", { name: "Approve pending documents" }).click();
  await expect(page.locator('[data-workflow-doc-state="budget_form"]')).toHaveText(/Approved/i);
  await expect(page.locator('[data-workflow-doc-state="signed_agreement"]')).toHaveText(/Approved/i);

  await page.getByRole("button", { name: "Forward to admin" }).click();
  await expect(page.locator("#workflow-demo-status")).toHaveText(/Ready for decision/i);

  await page.locator('[data-workflow-role-switch="admin"]').click();
  await expect(page.locator("#workflow-demo-current-role")).toHaveText("Admin");

  await page.getByRole("button", { name: "Approve case" }).click();
  await expect(page.locator("#workflow-demo-status")).toHaveText(/Approved/i);

  await page.getByRole("button", { name: "Archive case" }).click();
  await expect(page.locator("#workflow-demo-status")).toHaveText(/Archived/i);
  await expect(page.locator("#workflow-demo-log-count")).toContainText("9 entries");
  await expect(page.locator("#workflow-demo-log .workflow-log-item").first()).toContainText(/Archived case/i);

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

test("workflow permissions demo stays readable on mobile and supports theme changes", async ({ page }) => {
  const pageErrors: string[] = [];
  const consoleErrors: string[] = [];

  page.on("pageerror", (error) => {
    pageErrors.push(error.message);
  });

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./projects/workflow-permissions-demo");

  await expect(page.getByRole("heading", { level: 1, name: "Workflow & Permissions Demo" })).toBeVisible();
  await expect(page.locator(".workflow-role-switch")).toBeVisible();
  await expect(page.locator("#workflow-demo-actions")).toBeVisible();
  await expect(page.locator("#workflow-demo-docs")).toBeVisible();

  const pageOverflows = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(pageOverflows).toBeFalsy();

  const html = page.locator("html");
  const before = await html.getAttribute("class");
  await page.getByRole("button", { name: /Toggle theme/i }).click();
  const after = await html.getAttribute("class");
  expect(before).not.toEqual(after);

  await page.locator('[data-workflow-role-switch="officer"]').click();
  await expect(page.locator("#workflow-demo-current-role")).toHaveText("Officer");

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});
