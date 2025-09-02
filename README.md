# Caregiver Portal Playwright Smoke

A lightweight **Playwright smoke/regression suite** that validates critical caregiver portal workflows — login, messaging, document upload, and basic accessibility.  
Designed to provide **fast feedback** in startup environments where **caregiver communication and documentation reliability are essential**.

## 🚀 What’s Inside
- **Login Flow** → verify authentication works  
- **Messaging Flow** → compose/send caregiver message, confirm inbox update  
- **Document Upload** → upload file, verify appears in activity feed  
- **Accessibility Check** → confirm ARIA roles & key attributes exist  
- **Multi-Device Runs** → desktop + mobile (Chromium + Pixel 7 emulation)  

## 🛠️ Tech Stack
- Playwright Test (JavaScript)  
- HTML reports, screenshots, video traces on failure  
- CI/CD ready (GitHub Actions config coming soon)  

## ▶️ Quick Start
```bash
# install dependencies
npm install

# run smoke suite
npm test

# open HTML report
npm run report
