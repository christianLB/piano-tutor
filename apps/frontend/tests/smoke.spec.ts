import { test, expect } from '@playwright/test';

const routes = [
  { path: '/', expectText: /Piano Tutor|Analyse|Score/i },
  { path: '/analyse', expectText: /Analyse/i },
  { path: '/scores', expectText: /Scores|ID|Title/i },
  { path: '/score', expectText: /Score/i },
];

test.describe('smoke routes', () => {
  for (const r of routes) {
    test(`GET ${r.path} should render`, async ({ page }) => {
      await page.goto(r.path);
      await expect(page).toHaveTitle(/Piano Tutor|Piano/i);
      await expect(page.locator('body')).toContainText(r.expectText);
    });
  }
});
