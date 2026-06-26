<div align="center">

<img src="https://img.shields.io/badge/🎓-Smart%20Campus-blue?style=for-the-badge" alt="Smart Campus"/>

# 🏫 Smart Campus Utility App

**A modern, full-stack campus management platform for students and administrators.**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

---

*Manage academics, productivity, campus notices, AI assistance, analytics, and much more — all from one platform.*

</div>

---

## 📖 Overview

**Smart Campus Utility App** is a full-stack web application designed to simplify campus life for both students and administrators. It provides a modern dashboard where students can manage timetables, assignments, attendance, CGPA, notes, goals, achievements, and more — alongside a secure **Admin Dashboard** for campus management.

---

## ✨ Features

### 👨‍🎓 Student Features

| Module | Features |
|--------|----------|
| 🔐 **Auth** | Secure login, registration & session management |
| 📊 **Dashboard** | Overview, quick stats & academic summary |
| 📅 **Academics** | Timetable, attendance tracker, CGPA calculator, reports |
| ✅ **Productivity** | Assignments, tasks, notes, goal tracker, activity history |
| 🌍 **Community** | Campus notices, notifications, achievements, leaderboard |
| 🤖 **AI Tools** | AI assistant & smart suggestions |
| 📈 **Analytics** | Attendance & performance insights |
| 👤 **Profile** | Personal info, account settings, theme toggle |

### 👨‍💼 Admin Features

| Feature | Description |
|---------|-------------|
| 👥 User management | View, manage, and delete users |
| 📢 Notice management | Add and delete campus notices |
| 📊 System monitoring | View user statistics & admin dashboard |
| 🛡 Protected access | Role-based admin authorization |

---

## 🛠 Tech Stack

```
Frontend    →  React 19 + Vite 7 + Tailwind CSS 4 + Lucide React
Backend     →  Supabase (Auth + PostgreSQL)
Deployment  →  Vercel
```

---

## 📂 Project Structure

```
smart-campus-client/
│
├── public/
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/           # React context providers
│   ├── pages/             # Route-level page components
│   ├── config/            # App configuration
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/kaushal4445/SMART_CAMPUS_UTILITY_APP-ReadynestWeek2.git

# 2. Navigate to the project directory
cd smart-campus-client

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

### Other Commands

```bash
npm run build      # Build for production
npm run preview    # Preview the production build
```

---

## 🔐 Authentication

The app uses **Supabase Authentication** with the following features:

- ✅ User registration & login
- ✅ Protected routes
- ✅ Session management
- ✅ Secure logout

---

## 🔐 Admin Access

> **The Smart Campus Utility App includes a protected Admin Panel that can only be accessed by authorized admin users.**

---

### 🗝 Admin Login Credentials

> ⚠️ **These credentials are provided for demonstration and testing purposes only.**
> In a production environment, admin credentials should be secured and never exposed publicly.

```text
Email:    koko@gmail.com
Password: 852852
```

---

### 🚪 Accessing the Admin Panel

Follow these steps to access the Admin Dashboard:

**Step 1** — Log in using the admin credentials provided above.

**Step 2** — Open the **sidebar menu** from the left navigation.

**Step 3** — Navigate to:

```
Account
   └── Admin
```

**Step 4** — Click on **Admin** to open the Admin Dashboard.

---

### 🔄 Authorization Behavior

| User Type | Access | Behavior |
|-----------|--------|----------|
| ✅ **Admin user** | Granted | Full access to the Admin Dashboard |
| ❌ **Non-admin user** | Denied | Automatically redirected to the Dashboard |

- ✅ Users logged in with the admin account **can access** the Admin Dashboard.
- ❌ Non-admin users **cannot access** the Admin Dashboard.
- 🔄 If a non-admin user clicks the **Admin** option in the sidebar, they will be **automatically redirected** to the **Dashboard** page.
- 🔒 Admin access is verified through **Supabase authentication** and the `admins` table.

**Authorization Flow:**

```
User Login
    │
    ▼
Supabase Auth ──► Session Created
    │
    ▼
Check `admins` Table
    │
    ├── ✅ Admin Found ──► AdminRoute Guard ──► Admin Dashboard ✅
    │
    └── ❌ Not Admin ───► Redirect to /dashboard 🔄
```

---

### ⚙️ Admin Features

The Admin Dashboard provides the following capabilities:

| Feature | Description |
|---------|-------------|
| 👥 **User Management** | View all registered users, manage accounts, delete users |
| 📢 **Notice Management** | Create new campus notices, delete existing notices |
| 📊 **System Analytics** | View platform-wide usage statistics and insights |
| 🏫 **Campus Data Management** | Manage campus-related data and configurations |
| 📡 **Application Monitoring** | Monitor system health and application status |
| 🛡 **Protected Admin Access** | Role-based access control via Supabase + `AdminRoute` |

---

### 🔒 Security Implementation

Admin authorization is enforced through multiple layers:

```
┌─────────────────────────────────────────────┐
│           Security Architecture             │
├─────────────────────────────────────────────┤
│  1. Supabase Authentication  (Identity)     │
│  2. admins table lookup      (Role Check)   │
│  3. AdminRoute component     (Route Guard)  │
│  4. Protected API calls      (Backend RLS)  │
└─────────────────────────────────────────────┘
```

> ⚠️ **Production Warning:** In a real production environment:
> - Never expose admin credentials publicly
> - Store secrets in environment variables (`.env`)
> - Implement full Role-Based Access Control (RBAC)
> - Enable Supabase Row Level Security (RLS)
> - Use multi-factor authentication (MFA) for admin accounts

---

## 🌟 Major Modules

<details>
<summary><strong>📊 Dashboard</strong></summary>

- Student overview
- Quick statistics
- Academic summary

</details>

<details>
<summary><strong>📚 Academics</strong></summary>

- Timetable management
- Attendance tracking
- CGPA calculator
- Reports

</details>

<details>
<summary><strong>✅ Productivity</strong></summary>

- Assignment tracker
- Task management
- Notes
- Goal tracker
- Activity history

</details>

<details>
<summary><strong>🌍 Community</strong></summary>

- Campus notices
- Notifications
- Achievements
- Leaderboard

</details>

<details>
<summary><strong>🤖 AI Tools</strong></summary>

- AI assistant
- Smart suggestions

</details>

<details>
<summary><strong>📈 Analytics</strong></summary>

- Attendance analytics
- Performance analytics
- Dashboard insights

</details>

---

## 🔮 Planned Features

- [ ] 📱 Mobile application
- [ ] 📧 Email notifications
- [ ] 💬 Campus chat
- [ ] 📅 Event management
- [ ] 📍 Live bus tracking
- [ ] 📚 Library management
- [ ] 💳 Fee payment integration
- [ ] 🎥 Online classroom integration
- [ ] 🌙 Advanced theme customization

---

## 📸 App Screens

- Landing Page
- Login & Register
- Dashboard
- Timetable
- Attendance
- Assignments
- Notes
- Goals
- Analytics
- Notifications
- Leaderboard
- AI Assistant
- Admin Dashboard

---

## 👨‍💻 Developer

**Kaushal**

[![GitHub](https://img.shields.io/badge/GitHub-kaushal4445-181717?style=flat-square&logo=github)](https://github.com/kaushal4445)

---

## 🌐 Deployment

This project is deployed on **Vercel** for fast, reliable hosting with automatic CI/CD on every push.

---

<div align="center">

### ⭐ If you find this project helpful, please give it a star!

It motivates further development and improvements.

---

Made with ❤️ using **React**, **Vite**, **Tailwind CSS** & **Supabase**

</div>
