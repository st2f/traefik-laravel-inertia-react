# Laravel + Inertia + React (TypeScript) — Docker, Traefik & Full CI/CD

[![Inertia build & deploy](https://github.com/st2f/traefik-laravel-inertia-react/actions/workflows/main.yml/badge.svg)](https://github.com/st2f/traefik-laravel-inertia-react/actions/workflows/main.yml)

This project is a small demo application used to explore **modern full-stack workflows**.
It includes a complete production-style environment:

* **Docker + Traefik** for local and cloud deployments
* **GitHub Actions CI/CD** with parallel jobs
* **Self-hosted runners** [(Dockerized)](https://github.com/st2f/runner)
* **Automated testing**: unit, integration, E2E
* **Playwright tests running against a real remote test server**

The app itself is intentionally simple:
✅ *Create, edit, and preview Markdown articles stored in a database.*

![Screenshot from 2025-06-08 18-10-10](https://github.com/user-attachments/assets/81054c24-4a2c-4008-9377-a21381cbfa4a)

![Screenshot from 2025-06-08 18-07-32](https://github.com/user-attachments/assets/aa92b1df-adce-49ac-b352-ba7537fef581)


---

## ✅ Continuous Integration & Quality Pipeline

The CI/CD pipeline reproduces a real-world workflow with quality gates before deployment.

### ✅ Code Quality Checks

* **ESLint** (TypeScript & React)
* **PHPStan** (Laravel)
* **npm audit** for security vulnerabilities
* **GitGuardian** for secret scanning

GitGuardian enforces security by allowing a pull request to proceed only if no secrets or credentials are detected in the code:
<img width="851" height="531" alt="PR-check" src="https://github.com/user-attachments/assets/cdb74b0a-1f82-47d7-a427-73792797c832" />

---

## ✅ Unit & Integration Tests

### **Vitest (React / TypeScript)**

✅ CI coverage <img width="2096" height="1426" src="https://github.com/user-attachments/assets/acb8960d-700e-4ae8-9e7a-427f457cd7db" />

✅ Local UI runner <img width="2598" height="1644" src="https://github.com/user-attachments/assets/7d135a5e-0022-4583-aa4e-53679401d3e3" />

### **Laravel Feature / Unit tests**

The project uses the default test suite from **Laravel Breeze + Inertia**: <img width="1612" height="1176" src="https://github.com/user-attachments/assets/d7867451-25dd-44db-aca3-c7ef90304936" />

---

## ✅ End-to-End Tests

All E2E tests run with **Playwright**, simulating real user interactions.

- ✅ **Smoke tests** are tagged and executed only on specific branches (fast feedback).
- ✅ Full E2E tests run on `main`.
- ✅ Tests target a **real remote test server** behind Traefik.

<img width="2136" height="1478" src="https://github.com/user-attachments/assets/b332eb87-f44f-43d5-af57-169f9d70658a" />

---

## ✅ Workflow Example

The project uses matrix builds and parallel jobs to speed up CI:

<img width="2704" height="612" src="https://github.com/user-attachments/assets/95f621a8-cfad-4402-8f61-6dc2e5125c05" />

---


