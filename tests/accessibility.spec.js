// tests/accessibility.spec.js
// Smoke test: runs basic accessibility checks on key pages (login, dashboard, messaging).
// Uses Playwright's built-in locators and role checks. Can be extended with axe-core later.

const { test, expect } = require('@playwright/test');

test.describe('@smoke Accessibility checks', () => {
  const baseURL = process.env.BASE_URL || 'http://localhost:5173';
  const email = process.env.USER_EMAIL || 'demo@example.com';
  const password = process.env.USER_PASSWORD || 'changeme';

  test('login page has accessible labels', async ({ page }) => {
    await page.goto(`${baseURL}/login`);
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /log in|sign in/i })).toBeVisible();
  });

  test('dashboard has landmark roles', async ({ page }) => {
    // login first
    await page.goto(`${baseURL}/login`);
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/password/i).fill(password);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.getByRole('button', { name: /log in|sign in/i }).click(),
    ]);

    // verify main landmarks
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
  });

  test('messaging page has accessible compose form', async ({ page }) => {
    // login
    await page.goto(`${baseURL}/login`);
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/password/i).fill(password);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.getByRole('button', { name: /log in|sign in/i }).click(),
    ]);

    // go to messages
    await page.getByRole('link', { name: /messages|inbox|chat/i }).click();

    // check accessible form elements
    await expect(page.getByRole('textbox', { name: /message|compose/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /send/i })).toBeVisible();
  });
});
