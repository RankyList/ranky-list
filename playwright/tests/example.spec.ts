import { test, expect } from '@playwright/test';

test.describe('Pages', () => {
  test('Homepage', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/RankyList/);
  });
});
