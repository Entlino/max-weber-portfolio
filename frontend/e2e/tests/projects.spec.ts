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

test('clicking a filter shows only matching projects', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.locator('#projects').scrollIntoViewIfNeeded();
  await page.locator('#projects').locator('button', { hasText: 'React' }).click();
  await page.waitForTimeout(800);
  // TrackFlow uses React — should still be visible
  await expect(page.locator('#projects').locator('text=TrackFlow')).toBeVisible();
  // FinLedger uses Python/Vue.js — should not be visible after React filter
  await expect(page.locator('#projects').locator('text=FinLedger')).not.toBeVisible();
});
