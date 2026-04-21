import { test, expect } from '@playwright/test';

test('contact form fields are visible', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await expect(page.locator('#name')).toBeVisible();
  await expect(page.locator('#email')).toBeVisible();
  await expect(page.locator('#message')).toBeVisible();
});

test('invalid email shows validation error', async ({ page }) => {
  await page.goto('/');
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.fill('#name', 'Test User');
  await page.fill('#email', 'not-valid-email');
  await page.fill('#message', 'This is a long enough test message');
  await page.locator('#contact button[type="submit"]').click();
  await expect(page.locator('text=valid email')).toBeVisible();
});

test('empty name shows validation error', async ({ page }) => {
  await page.goto('/');
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.fill('#email', 'test@example.com');
  await page.fill('#message', 'This is a long enough test message');
  await page.locator('#contact button[type="submit"]').click();
  await expect(page.locator('text=Name is required')).toBeVisible();
});
