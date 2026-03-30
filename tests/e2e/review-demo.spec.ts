import { expect, test } from "@playwright/test";

test("review scheduling demo updates progress and next-review timing", async ({ page }) => {
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

  await page.goto("./projects/review-scheduling-demo");

  await expect(page.getByRole("heading", { level: 1, name: "Review Scheduling Demo" })).toBeVisible();
  await expect(page.locator("#review-demo-progress")).toHaveText("0 / 5 reviewed");
  await expect(page.locator("#review-demo-answer")).toBeHidden();
  await expect(page.locator('[data-review-rating="easy"]')).toBeDisabled();

  await page.getByRole("button", { name: "Show answer" }).click();
  await expect(page.locator("#review-demo-answer")).toBeVisible();
  await expect(page.locator("#review-demo-answer")).toContainText("application");

  await page.locator('[data-review-rating="easy"]').click();
  await expect(page.locator("#review-demo-progress")).toHaveText("1 / 5 reviewed");
  await expect(page.locator("#review-demo-remaining")).toHaveText("4 cards due");
  await expect(page.locator('[data-review-next-label="bewerbung"]')).toHaveText("In 5 days");
  await expect(page.locator("#review-demo-log-count")).toContainText("1 review logged");
  await expect(page.locator("#review-demo-log .review-log-item").first()).toContainText("die Bewerbung");

  await page.getByRole("button", { name: "Show answer" }).click();
  await page.locator('[data-review-rating="hard"]').click();
  await expect(page.locator("#review-demo-progress")).toHaveText("2 / 5 reviewed");
  await expect(page.locator('[data-review-next-label="vereinbaren"]')).toHaveText("Tomorrow");

  await page.getByRole("button", { name: "Reset session" }).click();
  await expect(page.locator("#review-demo-progress")).toHaveText("0 / 5 reviewed");
  await expect(page.locator("#review-demo-log-count")).toContainText("No reviews yet");

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});

test("review scheduling demo stays usable on mobile and supports theme changes", async ({ page }) => {
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
  await page.goto("./projects/review-scheduling-demo");

  await expect(page.getByRole("heading", { level: 1, name: "Review Scheduling Demo" })).toBeVisible();
  await expect(page.locator("#review-demo-card")).toBeVisible();
  await expect(page.locator("#review-demo-deck")).toBeVisible();

  const pageOverflows = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  expect(pageOverflows).toBeFalsy();

  const html = page.locator("html");
  const before = await html.getAttribute("class");
  await page.getByRole("button", { name: /Toggle theme/i }).click();
  const after = await html.getAttribute("class");
  expect(before).not.toEqual(after);

  await page.getByRole("button", { name: "Show answer" }).click();
  await page.locator('[data-review-rating="medium"]').click();
  await expect(page.locator("#review-demo-progress")).toHaveText("1 / 5 reviewed");

  expect(pageErrors).toEqual([]);
  expect(consoleErrors).toEqual([]);
});
