# Caregiver Portal Playwright Smoke

[![Playwright Smoke Tests](https://github.com/tusha-p/caregiver-portal-playwright-smoke/actions/workflows/playwright.yml/badge.svg)](https://github.com/tusha-p/caregiver-portal-playwright-smoke/actions)

A lightweight **Playwright smoke/regression suite** that validates critical caregiver portal workflows — login, messaging, document upload, and basic accessibility.  
Designed to provide **fast feedback** in startup environments where **caregiver communication and documentation reliability are essential**.

---

## 🚀 Workflows Covered
- **Login Flow** → verify authentication works  
- **Messaging Flow** → compose/send caregiver message, confirm inbox update  
- **Document Upload** → upload file, verify appears in activity feed  
- **Accessibility Check** → confirm ARIA roles & key attributes exist  
- **Multi-Device Runs** → desktop + mobile (Chromium + Pixel 7 emulation)  

---

## 🛠️ Tech Stack
- [Playwright Test](https://playwright.dev/docs/test-intro) (JavaScript)  
- HTML reports, screenshots, and video traces on failure  
- CI/CD via GitHub Actions  

---

## ▶️ Quick Start
```bash
# install dependencies
npm install

# run smoke suite
BASE_URL="https://app.demo-caregiver.com" USER_EMAIL="user@demo.com" USER_PASSWORD="secret" npm test

# open HTML report
npm run report

