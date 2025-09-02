// tests/documentUpload.spec.js
// Smoke test: verifies caregiver can upload a document and see it listed in activity feed.
// Requires login to succeed first.

const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('@smoke Document upload flow', () => {
  test('upload document and verify in activity feed', async ({ page }) => {
    const baseURL = process.env.BASE_URL || 'http://localhost:5173';
    const email = process.env.USER_EMAIL || 'demo@example.com';
    const password = process.env.USER_PASSWORD || 'changeme';

    // 1) Login
    await page.goto(`${baseURL}/login`);
    await page.getByLabel(/email/i).fill(email);
    await page.getByLabel(/password/i).fill(password);
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      page.getByRole('button', { name: /log in|sign in/i }).click(),
    ]);

    // 2) Navigate to documents/upload section
    await page.getByRole('link', { name: /documents|files|upload/i }).click();
    await expect(page).toHaveURL(new RegExp(`${baseURL.replace(/\//g, '\\/')}/(documents|files|upload)`));

    // 3) Upload file (sample.txt in project root)
    const filePath = path.resolve(__dirname, '../sample.txt');
    await page.setInputFiles('input[type="file"]', filePath);

    // 4) Submit/upload
    await Promise.all([
      page.waitForResponse(resp => resp.url().includes('/upload') && resp.status() === 200),
      page.getByRole('button', { name: /upload|submit/i }).click(),
    ]);

    // 5) Verify file appears in activity feed
    const uploadedFile = page.getByText(/sample\.txt/i);
    await expect(uploadedFile).toBeVisible();

    // 6) Soft check: metadata like upload timestamp or uploader name visible
    await expect.soft(page.getByText(/uploaded by/i)).toBeVisible();
  });
});
