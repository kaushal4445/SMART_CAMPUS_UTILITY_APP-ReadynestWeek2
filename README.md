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

## 🛡 Admin Panel

The app includes a protected **Admin Dashboard** accessible only to authorized users.

### Accessing the Admin Panel

1. Log in with admin credentials
2. Open the sidebar menu
3. Navigate to **Account → Admin**

> Non-admin users attempting to access this route are automatically redirected to the Dashboard.

### Admin Authorization Flow

```
Login → Supabase Auth → Check admins table → AdminRoute guard → Dashboard
                                                      ↓
                                         Redirect to /dashboard (non-admins)
```

### Demo Credentials

> ⚠️ **For testing and demonstration only.**

```
Email:    koko@gmail.com
Password: 852852
```

> In production, never expose credentials publicly. Use environment variables, RBAC, and Supabase Row Level Security (RLS).

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
