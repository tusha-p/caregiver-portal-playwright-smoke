// tests/login.spec.js
// Smoke test: verifies login works and a basic post-login element is visible.
// Requires env vars: BASE_URL, USER_EMAIL, USER_PASSWORD
// Run: BASE_URL="https://app.your-caregiver-portal.com" USER_EMAIL="user@demo.com" USER_PASSWORD="pass" npm test

const { test, expect } = require('@playwright/test');

test.describe('@smoke Login flow', () => {
  test('logs in and sees dashboard', async ({ page }) => {
    const baseURL = process.env.BASE_URL || 'http://localhost:5173';
    const email = process.env.USER_EMAIL || 'demo@example.com';
    const password = process.env.USER_PASSWORD || 'changeme';

    // 1) Go to login page
    await page.goto(`${baseURL}/login`);

    // 2) Fill credentials (UPDATE SELECTORS to match your app)
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/password/i).fill(password);

    // 3) Submit
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.getByRole('button', { name: /log in|sign in/i }).click(),
    ]);

    // 4) Assert dashboard/home is visible (UPDATE SELECTOR)
    const dashboardHeading = page.getByRole('heading', { name: /dashboard|home|inbox/i });
    await expect(dashboardHeading).toBeVisible();

    // 5) Basic sanity: user menu/avatar or inbox badge exists (SOFT assertion; won’t fail suite on its own)
    await expect.soft(page.getByRole('button', { name: /account|profile|user/i })).toBeVisible();
    await expect.soft(page.getByTestId('inbox-badge')).toBeVisible();

    // 6) Optional: URL contains expected path
    await expect(page).toHaveURL(new RegExp(`${baseURL.replace(/\//g, '\\/')}/(dashboard|home|inbox)`));
  });
});
