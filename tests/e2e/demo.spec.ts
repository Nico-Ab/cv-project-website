import { expect, test } from "@playwright/test";

test("browser SQL reporting demo loads and runs read-only queries", async ({ page }) => {
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

  await page.goto("./projects/browser-sql-reporting-demo");

  await expect(page.getByRole("heading", { level: 1, name: "Browser SQL Reporting Demo" })).toBeVisible();
  await expect(page.locator("#sql-demo-status")).toContainText(/Ready/i, { timeout: 15000 });

  await page.getByRole("button", { name: /Cases by faculty/i }).click();
  await expect(page.locator("#sql-demo-metrics")).toContainText(/rows/i);
  await expect(page.locator("#sql-demo-results")).toBeVisible();
  await expect(page.locator("#sql-demo-head th")).toHaveCount(3);
  await expect(page.locator("#sql-demo-body tr")).toHaveCount(5);

  await page.locator("#sql-demo-editor").fill("SELECT full_name, faculty FROM staff_members ORDER BY full_name LIMIT 3;");
  await page.getByRole("button", { name: "Run query" }).click();
  await expect(page.locator("#sql-demo-body tr")).toHaveCount(3);
  await expect(page.locator("#sql-demo-body")).toContainText("Anna Petrova");

  await page.locator("#sql-demo-editor").fill("SELECT * FROM mobility_cases WHERE status = 'cancelled';");
  await page.getByRole("button", { name: "Run query" }).click();
  await expect(page.locator("#sql-demo-empty")).toBeVisible();
  await expect(page.locator("#sql-demo-empty")).toContainText(/returned no (rows|result set)/i);
  await expect(page.locator("#sql-demo-results")).toBeHidden();

  await page.locator("#sql-demo-editor").fill("SELECT * FROM definitely_missing_table;");
  await page.getByRole("button", { name: "Run query" }).click();
  await expect(page.locator("#sql-demo-error")).toBeVisible();
  await expect(page.locator("#sql-demo-error")).toContainText(/no such table/i);

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

test("browser SQL reporting demo stays readable on mobile and respects theme controls", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("./projects/browser-sql-reporting-demo");

  await expect(page.locator("#sql-demo-status")).toContainText(/Ready/i, { timeout: 15000 });
  await expect(page.getByRole("heading", { level: 1, name: "Browser SQL Reporting Demo" })).toBeVisible();
  await expect(page.locator(".sql-demo-presets")).toBeVisible();
  await expect(page.locator("#sql-demo-editor")).toBeVisible();
  await expect(page.locator(".case-stack")).toBeVisible();

  const pageOverflows = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(pageOverflows).toBeFalsy();

  const html = page.locator("html");
  const before = await html.getAttribute("class");
  await page.getByRole("button", { name: /Toggle theme/i }).click();
  const after = await html.getAttribute("class");

  expect(before).not.toEqual(after);
});
