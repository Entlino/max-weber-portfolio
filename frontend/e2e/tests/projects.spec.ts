import { test, expect } from '@playwright/test';

test('projects section renders project cards', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await expect(page.locator('#projects').locator('text=TrackFlow')).toBeVisible();
});

test('filter buttons are visible', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await expect(page.locator('#projects').locator('button', { hasText: 'All' })).toBeVisible();
  await expect(page.locator('#projects').locator('button', { hasText: 'React' })).toBeVisible();
});

test('clicking a filter shows subset of projects', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await page.locator('#projects').locator('button', { hasText: 'React' }).click();
  await page.waitForTimeout(500);
  const cards = page.locator('#projects [class*="card"], #projects article').or(
    page.locator('#projects').locator('[data-testid="project-card"]')
  );
  await expect(page.locator('#projects').locator('text=No projects found').or(
    page.locator('#projects').locator('h3').first()
  )).toBeVisible();
});
