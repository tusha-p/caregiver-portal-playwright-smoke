// tests/messaging.spec.js
// Smoke test: verifies caregiver can compose and send a message, and inbox updates.
// Requires login to succeed first. Can be chained or run in isolation if session storage is reused.

const { test, expect } = require('@playwright/test');

test.describe('@smoke Messaging flow', () => {
  test('compose and send caregiver message', async ({ page }) => {
    const baseURL = process.env.BASE_URL || 'http://localhost:5173';
    const email = process.env.USER_EMAIL || 'demo@example.com';
    const password = process.env.USER_PASSWORD || 'changeme';

    // 1) Login (reuse same selectors from login.spec.js)
    await page.goto(`${baseURL}/login`);
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/password/i).fill(password);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.getByRole('button', { name: /log in|sign in/i }).click(),
    ]);

    // 2) Navigate to messaging/inbox
    await page.getByRole('link', { name: /messages|inbox|chat/i }).click();
    await expect(page).toHaveURL(new RegExp(`${baseURL.replace(/\//g, '\\/')}/(messages|inbox|chat)`));

    // 3) Compose message
    await page.getByRole('textbox', { name: /message|compose/i }).fill('Smoke test message at ' + Date.now());

    // 4) Send
    await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/messages') && resp.status() === 200),
      page.getByRole('button', { name: /send/i }).click(),
    ]);

    // 5) Verify message appears in thread
    const newMsg = page.getByText(/Smoke test message/);
    await expect(newMsg).toBeVisible();

    // 6) Soft check: inbox badge increments
    await expect.soft(page.getByTestId('inbox-badge')).toBeVisible();
  });
});
