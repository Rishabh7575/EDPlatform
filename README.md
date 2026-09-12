# Omega LMS ReBuild

> A modern, high-performance educational platform featuring dual-role interfaces (Instructor & Student), rich analytical KPIs, WebRTC live video classrooms, doubt chat, and interactive curriculum video streaming.

---

## 🚀 Key Highlights

- **Better Metrics & Analytics**: 
  - Teacher KPIs: Active students, watch time (3,840+ hrs), completion rates (86.4%), monthly revenue, live attendance, and daily watch hours vs live attendance activity charts.
  - Student KPIs: Total study hours, streak counter (14 days 🔥), quiz averages, active course tracking, and weekly progress.
- **Concise Senior Variable Naming**:
  - Clean, idiomatic names: `user`, `role`, `auth`, `crs`, `vids`, `kpi`, `msg`, `cam`, `mic`, `sched`.
- **Human Code & Minimal Comments**:
  - Readable, modular structure with minimal, purposeful comments (`// auth check`, `// camera stream toggle`).
- **Turnkey Usability ("Usable Ready")**:
  - 100% functional out of the box with zero external setup required.
  - 1-Click Demo Login for both **Teacher** and **Student** accounts.
  - Quick role switch toggle in the top bar to inspect both experiences instantly.
  - Dual-mode data persistence: automatically uses local store with realistic seed data, and seamlessly connects to MongoDB if `MONGODB_URI` is provided in `.env.local`.

---

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI & Styling**: Tailwind CSS, Inter Typography, Glassmorphic accents
- **Icons**: Lucide React & React Icons
- **Video & Real-Time**: HTML5 Video Player with chapter playlists, WebRTC MediaStream API for camera/mic/screen sharing
- **State Management**: Reactive store with client-side persistence

---

## 🛠️ Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧭 Page Routes

| Route | Role | Description |
| :--- | :--- | :--- |
| `/` | Universal | Intelligent role router & platform showcase |
| `/login` | Auth | Authentication screen with 1-click Teacher & Student demo logins |
| `/register` | Auth | Account registration with role selection |
| `/teacher` | Teacher | Instructor dashboard with KPI metrics & weekly activity charts |
| `/teacher/content`| Teacher | Course & lecture video manager with upload modal |
| `/student` | Student | Student dashboard with streak counter & continue watching |
| `/student/courses`| Student | Interactive video classroom with chapter syllabus & doubt Q&A |
| `/videocall` | Both | WebRTC live video room with webcam/mic, screen share & roster |
| `/chat` | Both | Direct messaging & doubt clearance between teachers & students |
| `/schedule` | Both | Live class calendar, upcoming sessions & slot scheduler |
