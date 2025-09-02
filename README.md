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
Run these commands to install dependencies, execute tests, and open reports:

- `npm install`  
- `BASE_URL="https://app.demo-caregiver.com" USER_EMAIL="user@demo.com" USER_PASSWORD="secret" npm test`  
- `npm run report`  

---

## 📈 Reports
- View HTML reports in `playwright-report/index.html`  
- GitHub Actions uploads reports as build artifacts  

![Sample Report Screenshot](docs/report-screenshot.png)  

---

## 📌 Why This Repo
Startups and mission-driven teams need **fast, reliable validation** of communication and documentation workflows.  
This repo demonstrates:  
- Hands-on **manual → automation translation** (smoke first, expand later)  
- **Web & mobile coverage** (Chromium + Pixel emulation)  
- Clear reports that provide rapid feedback loops for product and engineering  

---

## 🔮 Next Steps
- Add API regression packs (Postman/Newman)  
- Expand mobile coverage (iOS Safari, Android Chrome)  
- Integrate advanced accessibility testing (axe-core)  

