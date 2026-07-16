import { test, expect } from '@playwright/test';

// Smoke test: unauthenticated user visiting /portal/dashboard should redirect to /auth/login
// This test requires the dev server running at PLAYWRIGHT_BASE_URL (default http://localhost:3000)

test('portal unauthenticated redirect', async ({ page, baseURL }) => {
  const url = (baseURL || 'http://localhost:3000') + '/portal/dashboard';
  await page.goto(url);
  // Wait for possible client-side redirect
  await page.waitForTimeout(1000);
  expect(page.url()).toContain('/auth/login');
});
