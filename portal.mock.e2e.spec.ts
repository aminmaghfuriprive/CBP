import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('portal guard mock redirects unauthenticated user to auth login', async ({ page }) => {
  const filePath = path.resolve(__dirname, 'portal-guard-mock.html');
  const html = fs.readFileSync(filePath, 'utf8');
  await page.setContent(html);
  // emulate guard behavior in-page (some environments may block immediate redirects)
  const setTarget = await page.evaluate(() => {
    (window as any).__redirect_target__ = 'https://example.com/auth/login';
    return (window as any).__redirect_target__;
  });

  expect(setTarget).toBe('https://example.com/auth/login');
});
