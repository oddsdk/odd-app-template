import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Webnative SDK Demo/)
});

test('get register link', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173');

  // Click the register link.
  await page.getByRole('link', { name: 'Connect this device' }).click();

  // Expects the URL to contain register.
  await expect(page).toHaveURL(/.*register/);
});
