import { test, expect } from '@playwright/test';

test('hero shows developer name and title', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('h1', { hasText: 'Max Weber' })).toBeVisible();
  await expect(page.locator('text=Senior Application Developer')).toBeVisible();
});

test('View My Work button scrolls to projects', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.locator('text=View My Work').click();
  await expect(page.locator('#projects')).toBeInViewport({ ratio: 0.1 });
});

test('GitHub and LinkedIn links are present', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('a', { hasText: 'GitHub' }).first()).toBeVisible();
  await expect(page.locator('a', { hasText: 'LinkedIn' })).toBeVisible();
});
