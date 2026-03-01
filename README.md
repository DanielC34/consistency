# Momentum

Momentum is a mobile-first, full-stack habit consistency tracker built with Next.js 14. Unlike traditional streak-based trackers, Momentum emphasizes **identity-based habits** and **weekly momentum scores** to foster long-term behavioral change.

## The Problem
Most habit trackers focus solely on daily streaks. When a user misses a single day, the "broken streak" often leads to a "what-the-hell effect," causing them to abandon the habit entirely. Momentum solves this by:
- Shifting focus to **Weekly Momentum** (percentage of targets met per week).
- Reinforcing **Identity Tags** (e.g., "Athlete", "Builder") to connect habits to a larger sense of self.
- Providing a **Global Momentum Score** that aggregates progress across all active habits.

## Architecture
The application follows a modern full-stack Next.js architecture:
- **Frontend**: React 19 with Tailwind CSS for a responsive, "glassmorphic" UI.
- **State Management**: React Context for theme and local component state for habits.
- **Database**: MongoDB with Mongoose for persistent storage of habits and completion logs.
- **API**: Next.js App Router API routes (`/api/habits`) for CRUD operations.
- **Visuals**: Custom CSS `conic-gradient` for lightweight, performant circular progress indicators.

## Tech Stack
- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State**: [Zustand](https://zustand-demo.pmnd.rs/) (available for future scalability)

## Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/consistency.git
cd consistency
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your MongoDB connection string:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/momentum
```

### 4. Run Development Server
```bash
npm run dev
```
The app will be available at `http://localhost:3080`.

## API Structure Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/habits` | Retrieve all active habits and their logs. |
| `POST` | `/api/habits` | Create a new habit with name, identity tag, and weekly target. |
| `PATCH` | `/api/habits/[id]` | Log a completion for the current day for a specific habit. |

## Folder Structure

```text
├── app/                  # Next.js App Router (Pages & API)
│   ├── api/              # Backend route handlers
│   ├── layout.tsx        # Root layout with ThemeProvider
│   └── page.tsx          # Main Dashboard
├── components/           # Reusable UI components
│   ├── HabitCard.tsx     # Individual habit visualization
│   ├── MomentumCard.tsx  # Global progress summary
│   └── AddHabitModal.tsx # Habit creation form
├── lib/                  # Server-side utilities
│   ├── db.ts             # MongoDB connection logic
│   └── models/           # Mongoose schemas
├── types/                # TypeScript interfaces
└── public/               # Static assets
```

## Future Improvements
- **Social Accountability**: "Identity Groups" to see momentum scores of friends.
- **Advanced Analytics**: Monthly heatmaps and trend analysis.
- **Push Notifications**: Gentle nudges when momentum falls below a certain threshold.
- **Data Export**: Export habit history to JSON/CSV.
- **Zustand Migration**: Moving dashboard state to a global store for faster optimistic updates.

---
Built with focus on consistency, not perfection.
