import { test, expect } from '@playwright/test';

test('skills section renders categories and skill names', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.locator('#skills').scrollIntoViewIfNeeded();
  await expect(page.locator('#skills').locator('text=Languages')).toBeVisible();
  await expect(page.locator('#skills').locator('text=C#')).toBeVisible();
});

test('skills section shows no error state', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('text=Failed to load skills')).not.toBeVisible();
});
