import { test, expect } from '@playwright/test';

test('page loads and shows all nav links', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('text=Max Weber').first()).toBeVisible();
  for (const link of ['About', 'Skills', 'Projects', 'Contact']) {
    await expect(page.locator(`nav >> text=${link}`)).toBeVisible();
  }
});

test('nav links scroll to correct sections', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.locator('nav >> text=Skills').click();
  await expect(page.locator('#skills')).toBeInViewport({ ratio: 0.1 });
});
