# Task Manager App

A full-stack Task Management Application with: - Node.js + Express
backend API - React (Vite) frontend - Infinite animated carousel for
displaying tasks - Full CRUD functionality - Filtering and priority
indication - Responsive design

---

## Setup and Installation Instructions

### Run Backend

cd backend npm install npm run dev

Explanation: - npm install installs backend dependencies. - npm run dev
starts the server using nodemon (auto-restarts on changes). - Backend
runs on http://localhost:4000

---

### Run Frontend

cd frontend npm install npm run dev

Explanation: - npm install installs frontend dependencies. - npm run dev
starts the Vite React application (auto reload on changes). - Frontend
runs on http://localhost:5173

---

## How to Run Both Frontend and Backend

Use two terminals.

Terminal 1: cd backend npm install npm run dev

Terminal 2: cd frontend npm install npm run dev

Backend must run before using the frontend.

---

## API Documentation

Base URL: http://localhost:4000/api/tasks

Task Model:

{ id: number, title: string, description: string, completed: boolean,
createdAt: Date, priority: "low" \| "medium" \| "high" }

---

### GET /api/tasks

Returns all tasks.

---

### POST /api/tasks

Creates a new task.

Body: { "title": "Task title", "description": "Task description",
"priority": "medium" }

Validation middleware ensures required fields are correct.

---

### PUT /api/tasks/:id

Updates task title, description, or priority.

---

### DELETE /api/tasks/:id

Deletes a task by id.

---

### PATCH /api/tasks/:id/toggle

Toggles completed status.

---

## Assumptions and Design Decisions

- Tasks are stored in memory (no database).
- Infinite carousel implemented using React hooks and
  requestAnimationFrame.
- Clean component structure.
- Validation handled with middleware.
- Responsive UI for mobile and desktop.
- Proper error handling on frontend and backend.

---

## Time Spent

Backend development: 3 hours Frontend development: 4 hours Design: 1
hour Testing & debugging: 2 hours

Total: 10 hours
