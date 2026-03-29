import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173/cv-project-website/',
    headless: true,
  },
  webServer: {
    command: 'npm run preview',
    url: 'http://localhost:4173/cv-project-website/',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
    env: {
      ASTRO_TELEMETRY_DISABLED: '1',
    },
  },
});
