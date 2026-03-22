# 🛡️ AgencyVault

**The Secure Credential Manager for Modern Agencies & Accounting Firms.**

AgencyVault is a premium, high-security B2B SaaS platform designed specifically for professionals who manage sensitive client credentials. Built with a focus on **security**, **traceability**, and **professionalism**, it empowers teams to securely share, monitor, and store passwords using state-of-the-art encryption.

---

## ✨ Key Features

- **🔐 Bank-Grade Encryption**: Every password is encrypted client-side using **AES-256-GCM** with an Initialisation Vector (IV) before it ever touches the database. 
- **📈 Dashboard Overview**: A real-time hub showcasing total clients, credentials, and a live security activity feed.
- **👁️ Secure Reveal Toggles**: One-click password reveal with automatic audit logging for every view action.
- **📝 Full Audit History**: A dedicated transparency log that tracks who viewed or modified which credential and when.
- **👥 Member-Based Access**: Role-based access control protecting your sensitive agency data.
- **🎨 Premium B2B UI**: A sleek, dark-themed interface built with **shadcn/ui** and **Framer Motion** for a luxurious user experience.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn UI
- **Database**: PostgreSQL (Prisma ORM)
- **Authentication**: NextAuth.js
- **Security**: Node.js `crypto` (AES-256-GCM) + `bcryptjs` for passwords.

---

## 🚀 Getting Started

### 1. Prerequisite
- Node.js installed.
- Access to a PostgreSQL database (e.g., Neon).

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/kotelyanets/AgencyVault.git

# Install dependencies
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="your-postgresql-url"
ENCRYPTION_KEY="64-char-hexadecimal-key"
NEXTAUTH_SECRET="your-next-auth-secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Database Setup
```bash
# Push schema to database
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

### 5. Running and Seeding
```bash
# Start development server
npm run dev

# Visit http://localhost:3000/api/seed to create the admin user
# User: admin@agencyvault.com / Password: password123
```

---

## ⚖️ License & Proprietary Notice

**This product is proprietary and owned exclusively by the developer.**

This software is provided for private commercial use under a monthly subscription model ("monthly pay"). You are not authorized to redistribute, modify, or resell this software without express written permission.

Copyright © 2024. All rights reserved.
