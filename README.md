# 🏛️ Enterprise Design System - MUI v5 & TypeScript

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Material UI (v4)](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

## 🎯 Strategic Overview
As a **Head of IT and Product Manager**, I architected this UI Kit as a **Shared Library System** using **Git Submodules**. This approach ensures that multiple enterprise platforms—ranging from logistics dashboards to customer portals—remain synchronized with a single, centralized Design System.

This repository is designed to be integrated as a core module within larger host applications, providing a standardized set of UI components and shared logic.

---

## ✨ Engineering Highlights
* **Submodule-First Design:** Optimized for cross-project integration, allowing updates to be pushed to multiple platforms simultaneously through Git version control.
* **Modular UI Layer (`mui-v4`):** A customized library of components (Buttons, Pickers, Forms) tailored for data-intensive logistics workflows.
* **Custom Theming & Typography:** Centralized theme management and specialized typography systems (`mui-v4/Typography.ts`) to ensure brand consistency.
* **Complex Autocomplete & API Integration:** Advanced search components in `mui-v4/context` utilizing global API Context with **AbortController** and **Debouncing** for high-performance data fetching.
* **Shared Logic Layer (`common`):** Centralized repository for common hooks, utilities, and self-hosted assets like **TinyMCE**.
* **Automation-Driven:** Features a `scripts/submodule.sh` and `postinstall.js` to automate the setup and synchronization process between the host app and this library.

---

## 📂 Project Structure
```text
.
├── common/             # Shared logic, common hooks, and self-hosted assets (TinyMCE)
├── mui-v4/             # Core UI Design System
│   ├── @types/         # Global type definitions
│   ├── constants/      # Design UIKit constants
│   ├── context/        # Context providers (API Context, ...)
│   └── uikit/          # Library of 20+ specialized UI components (Picker, Stepper, etc.)
├── scripts/            # Automation scripts (Git submodules management)
├── postinstall.js      # Automated post-installation setup
└── README.md