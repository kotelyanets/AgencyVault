# 🛡️ AgencyVault

> **O Cofre Digital Seguro para Profissionais.**  
> A multi-tenant B2B credential management SaaS built for accounting firms and agencies.

<img src="https://via.placeholder.com/1200x600?text=AgencyVault+Dashboard" alt="AgencyVault dashboard placeholder" />

---

## 🚀 Overview

Accounting firms and agencies handle highly sensitive client credentials daily (Tax Authority portals, Social Security, banking access, vendor platforms).  
AgencyVault replaces unsafe storage methods (spreadsheets, chat messages, paper notes) with a secure, auditable, and structured digital vault.

The platform is designed to help teams:

- Centralize credential management by client
- Protect secrets with strong encryption
- Track every critical action through audit logs
- Work inside an agency workspace model (multi-tenant foundation)

---

## ✨ Key Features

- **🔐 Strong Encryption (AES-256-GCM):** Credentials are encrypted in server actions with Node.js `crypto` before storage.
- **🏢 Workspace-Based Data Organization:** Users and clients are linked to workspaces in the data model.
- **👤 Role Model Ready:** Built-in role enum (`ADMIN`, `MANAGER`, `MEMBER`) at schema level.
- **🧾 Immutable-Style Audit Logging:** Credential creation and reveal actions are logged with user and timestamp context.
- **📊 Operational Dashboard:** Quick visibility into client totals, credential totals, and recent activity.
- **🎨 Professional UI:** Dark-themed interface built with Tailwind CSS, `shadcn/ui`, and Framer Motion.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router, Server Actions)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** [Prisma 7.5](https://www.prisma.io/) (`prisma.config.ts`)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) (Credentials provider + JWT session)
- **Password Hashing:** `bcryptjs`
- **Styling:** Tailwind CSS + [shadcn/ui](https://ui.shadcn.com/)

---

## 🔐 Security Architecture

AgencyVault currently secures credentials using authenticated encryption:

1. A credential is submitted through a server action.
2. The plaintext password is received by a server action (over HTTPS in production) and encrypted using **AES-256-GCM**.
3. A random IV is generated per encryption operation.
4. The encrypted payload (`iv:authTag:ciphertext`) is persisted in PostgreSQL.
5. Decryption occurs only during authorized reveal operations, which are audit-logged.

> **Important:** Use a strong `NEXTAUTH_SECRET` and a valid 64-character hex `ENCRYPTION_KEY` in production.

---

## 📦 Getting Started

### Prerequisites

- Node.js 18+
- npm
- PostgreSQL database (Neon is a good option)

### 1) Clone & Install

```bash
git clone https://github.com/kotelyanets/AgencyVault.git
cd AgencyVault
npm install
```

### 2) Environment Variables

Create a `.env` (or `.env.local`) file in the project root with:

```env
DATABASE_URL="postgresql://user:password@host:5432/database"
ENCRYPTION_KEY="your-64-char-hex-encryption-key-here"
NEXTAUTH_SECRET="replace-with-a-strong-random-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 3) Database Setup

```bash
npx prisma db push
npx prisma generate
```

### 4) Run the App

```bash
npm run dev
```

Then open `http://localhost:3000`.

### 5) Optional Seed (Development)

To create a default workspace and admin user, visit:

`http://localhost:3000/api/seed`

Seeded credentials:

- **Email:** `admin@agencyvault.com`
- **Password:** `password123`

---

## 🧩 Available Scripts

```bash
npm run dev    # Start development server
npm run build  # Create production build
npm run start  # Start production server
npm run lint   # Run ESLint
```

---

## 🗂️ Main Routes

- `/` — Landing page
- `/dashboard` — Main dashboard
- `/dashboard/clientes` — Client management
- `/dashboard/auditoria` — Audit logs
- `/api/auth/[...nextauth]` — Authentication endpoints
- `/api/seed` — Development seed endpoint

---

## ⚠️ Current Project Notes

- Automated tests are not currently configured in this repository.
- Lint/build status can be affected by existing project issues and external network restrictions (e.g., Google Fonts fetch in restricted environments).

---

## ⚖️ License

This repository includes a `LICENSE` file.  
Refer to `LICENSE` for full terms.
