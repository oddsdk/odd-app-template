import { test, expect } from '@playwright/test'

test('find and click register link', async ({ page }) => {
  await page.goto('/')

  // Click the register link.
  await page.getByRole('link', { name: 'Connect this device' }).click()

  // Expects the URL to contain register.
  await expect(page).toHaveURL(/.*register/)
})
