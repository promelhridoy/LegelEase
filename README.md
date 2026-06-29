# ⚖️ LegalEase – Online Lawyer Hiring Platform

LegalEase is a premium digital marketplace that bridges the gap between legal seekers (clients/businesses) and expert lawyers. Built on top of Next.js, this platform democratizes access to legal aid by enabling users to discover, filter, and hire verified legal professionals seamlessly, while providing a robust dashboard to manage their digital practice.

🔗 **Live Application URL:** [https://legalease-red.vercel.app/]  
🖥️ **Client/Frontend Repository:** [https://github.com/promelhridoy/LegelEase]  
⚙️ **Server/Backend Repository:** [https://github.com/promelhridoy/LegelEase-server]

---

## 📖 Table of Contents
* [Key Features](#-key-features)
* [Tech Stack & Architecture](#%EF%B8%8F-tech-stack--architecture)
* [Design & UI Features](#-design--ui-features)
* [Core Functionalities](#-core-functionalities)
* [Next.js Folder Structure](#-next-js-folder-structure)
* [Installation & Environment Setup](#-installation--environment-setup)
* [Credentials for Testing](#-credentials-for-testing)

---

## ✨ Key Features

### 🛡️ Secure Authentication & Role-Based Workflows
* **Multi-Method Login:** Secure registration and authentication using Email/Password and Google OAuth (BetterAuth / NextAuth integrated).
* **JWT Security & Session Handling:** Secure session data handling verified across API endpoints for role-specific access control.
* **Next.js App Router Dashboards:** Highly optimized, layout-nested dashboard side-navigation tailored to three distinct roles:
  * **User (Client):** Track hiring history, manage profile updates, and fully manage personal comments (Edit/Delete).
  * **Lawyer:** Manage specialized services, rates, bios, and instantly accept/reject incoming client consultation requests.
  * **Admin:** Control tower to oversee users, dynamic role modifications, real-time transaction tracking, and high-level platform analytics.

### 🔍 Advanced Search & Discovery
* **Dynamic Search & Multi-Filtering:** Real-time global search on the lawyers browse page by name, specialization, fee range, and availability status.
* **Framer Motion Animations:** Premium feel via subtle hero-text fade-ins, staggered grid reveals on scroll, and interaction-driven hover scaling.

### 💳 Transaction Flow & Feedback
* **Stripe Payment Integration:** Safe end-to-end payment processing directly from the User Hiring History panel once a lawyer accepts a request.
* **Verified Feedback System:** Robust comment verification that checks hiring records, ensuring only true clients can post reviews on lawyer profiles.

---

## 🛠️ Tech Stack & Architecture

* **Framework:** Next.js (App Router)
* **Styling & UI:** Tailwind CSS, DaisyUI
* **Animations:** Framer Motion
* **Database & Cloud:** MongoDB (via custom Backend Server) & imgBB API (for professional image hosting)
* **Payment Gateway:** Stripe API
* **Icons & Utils:** React Icons, Axios

---

## 📂 Next.js Folder Structure

Based on the highly modular Next.js App Router architecture:

```text
src/
├── app/                  # App Router Core
│   ├── about/            # About static views
│   ├── api/              # Internal Next.js API endpoints / route handlers
│   ├── auth/             # Authentication handling (Login/Registration)
│   ├── dashboard/        # Role-based secure nested dashboard routes
│   ├── lawyers/          # Browse Lawyers & individual Lawyer Details pages
│   ├── globals.css       # Main Global Tailwind styles
│   ├── layout.js         # Master Layout structure
│   ├── loading.jsx       # Global suspense loading configuration
│   ├── not-found.js      # Custom elegant 404 Error boundary
│   └── page.js           # Interactive home landing view
├── components/           # Reusable UI Atoms and Molecules (Navbar, Footer, Skeletons)
└── lib/                  # Shared helper functions, API configurations, and custom utility tools



## Credentials for Testing (Admin Access)

To evaluate the full administrative capabilities of LegalEase, please use the following credentials:

Admin Email: [promelhridoy@gmail.com]

Admin Password: [Admin990!]

Developed with 💙 by Promel Hossain Hridoy