# 🚀 TaskFlow – Team Task Management System

![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![Express](https://img.shields.io/badge/Framework-Express.js-lightgrey)
![React](https://img.shields.io/badge/Frontend-React-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

A **modern full-stack team collaboration and task management platform** built with the **MERN architecture** (MongoDB, Express, React, Node.js).

TaskFlow enables teams to **organize projects, assign tasks, track progress, collaborate through comments, and monitor productivity through dashboards**.

Designed with **secure authentication, role-based access control, scalable database architecture, and a clean responsive interface**.

---

# 📌 Table of Contents

* [Overview](#overview)
* [Key Features](#key-features)
* [System Architecture](#system-architecture)
* [Technology Stack](#technology-stack)
* [Database Design](#database-design)
* [Project Structure](#project-structure)
* [Installation Guide](#installation-guide)
* [Environment Variables](#environment-variables)
* [API Overview](#api-overview)
* [Security Features](#security-features)
* [Performance Optimizations](#performance-optimizations)
* [Milestone Progress](#milestone-progress)
* [Future Enhancements](#future-enhancements)
* [Screenshots](#screenshots)
* [Contributing](#contributing)
* [License](#license)

---

# 📖 Overview

**TaskFlow** is a **team task management and collaboration system** that allows organizations to manage teams and track project workflows effectively.

The platform provides:

* Secure **user authentication**
* **Team-based project collaboration**
* **Task assignment and tracking**
* **Kanban-style workflow management**
* **Real-time collaboration through comments**
* **Activity tracking and analytics dashboards**

TaskFlow is designed to be **scalable, secure, and modular**, making it suitable for both **small teams and large organizations**.

---

# ✨ Key Features

## 🔐 Authentication System

* Secure user registration
* Login using email and password
* Password hashing using **bcrypt**
* Token-based authentication with **JWT**
* Protected API routes using middleware

---

## 👥 Role-Based Access Control

The system supports three user roles:

| Role        | Permissions                      |
| ----------- | -------------------------------- |
| Admin       | System monitoring and management |
| Team Leader | Create teams and assign tasks    |
| Member      | Work on assigned tasks           |

Access control is enforced through **middleware authorization checks**.

---

## 👨‍👩‍👧‍👦 Team Management

Team leaders can:

* Create teams
* Invite members
* Remove members
* View team details
* Prevent duplicate memberships

---

## 📋 Task Management

Features include:

* Task creation
* Task assignment to members
* Priority levels
* Deadlines
* Status updates

Supported task statuses:

```
Pending → In Progress → Completed
```

---

## 📊 Kanban Task Board

Tasks are visualized using a **Kanban board layout**, improving workflow visibility.

Columns:

* Pending
* In Progress
* Completed

---

## 💬 Task Commenting System

Allows team members to:

* Comment on tasks
* Discuss issues
* Share updates
* Maintain conversation history

---

## 📝 Activity Logging

The system tracks important activities such as:

* Task creation
* Status updates
* Comments
* Member changes

This ensures **accountability and transparency**.

---

## 📊 Dashboards

### User Dashboard

Displays:

* Total tasks
* Completed tasks
* Pending tasks
* Overdue tasks

### Admin Dashboard

Displays system insights:

* Total users
* Total teams
* Total tasks
* Activity statistics

---

## 🔍 Search and Filtering

Users can filter tasks by:

* Status
* Deadline
* Assigned user
* Keywords

---

## 📎 File Attachments

Tasks support secure file uploads with:

* File type validation
* File size limits
* Secure storage handling

---

# 🏗 System Architecture

TaskFlow follows a **three-layer architecture**.

```

Client Layer (React Frontend)
↓
REST API Layer (Node.js + Express)
↓
Database Layer (MongoDB)

```

### Frontend Layer

Responsible for:

* User interface
* Dashboard visualization
* Task interaction
* API communication

### Backend Layer

Handles:

* Business logic
* Authentication
* Authorization
* API management
* Database operations

### Database Layer

MongoDB stores all application data using **document-based collections**.

---

# 🛠 Technology Stack

## Frontend

| Technology     | Purpose      |
| -------------- | ------------ |
| React.js       | UI framework |
| Axios          | API requests |
| React Router   | Routing      |
| CSS / Tailwind | Styling      |

---

## Backend

| Technology | Purpose              |
| ---------- | -------------------- |
| Node.js    | Runtime environment  |
| Express.js | Backend framework    |
| JWT        | Authentication       |
| bcrypt     | Password hashing     |
| Multer     | File upload handling |

---

## Database

| Technology | Purpose         |
| ---------- | --------------- |
| MongoDB    | NoSQL database  |
| Mongoose   | ODM for MongoDB |

---

## Development Tools

* Git
* GitHub
* Postman
* VS Code

---

# 🗄 Database Design

## Users

```
User
name
email
password
role
createdAt
```

---

## Teams

```
Team
name
description
leaderId
createdAt
```

---

## Team Members

```
TeamMember
teamId
userId
role
```

---

## Tasks

```
Task
title
description
priority
deadline
status
assignedTo
teamId
```

---

## Comments

```
Comment
taskId
userId
message
createdAt
```

---

## Activity Logs

```
ActivityLog
userId
taskId
action
timestamp
```

---

# 📂 Project Structure

```

taskflow
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
│
├── frontend
│   ├── public
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.js
│
├── .env
├── package.json
└── README.md

```

---

# ⚙ Installation Guide

## 1️⃣ Clone Repository

```
git clone https://github.com/YOUR_GITHUB_USERNAME/TaskFlow-SmTeam-Task---Collaboration-Manager.git
cd TaskFlow-SmTeam-Task---Collaboration-Manager
```

---

## 2️⃣ Install Backend Dependencies

```
cd backend
npm install
```

---

## 3️⃣ Install Frontend Dependencies

```
cd ../frontend
npm install
```

---

## 4️⃣ Configure Environment Variables

Create `.env` inside **backend**.

Example:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 5️⃣ Start Backend

```
npm run dev
```

---

## 6️⃣ Start Frontend

```
cd frontend
npm start
```

---

# 🔗 API Overview

## Authentication

```
POST /api/auth/register
POST /api/auth/login
```

---

## Teams

```
POST /api/teams/create
GET /api/teams
POST /api/teams/add-member
DELETE /api/teams/remove-member
```

---

## Tasks

```
POST /api/tasks/create
GET /api/tasks
PATCH /api/tasks/update-status
DELETE /api/tasks/delete
```

---

## Comments

```
POST /api/comments/add
GET /api/comments/:taskId
```

---

# 🔒 Security Features

TaskFlow includes multiple security mechanisms:

* bcrypt password hashing
* JWT authentication
* Protected API routes
* Role-based authorization
* Input validation and sanitization
* Secure file uploads
* MongoDB query protection

---

# ⚡ Performance Optimizations

* MongoDB indexing
* API pagination
* Optimized queries
* Efficient REST architecture

---

# 📈 Milestone Progress

| Milestone            | Status         |
| -------------------- | -------------- |
| Project Setup        | ✅              |
| MongoDB Connection   | ✅              |
| Database Schema      | ✅              |
| User Registration    | ✅              |
| Login Authentication | ✅              |
| JWT Middleware       | ✅              |
| Role-Based Access    | ✅              |
| Remaining Features   | 🚧 In Progress |

---

# 🔮 Future Enhancements

Planned improvements:

* Real-time notifications
* Email invitations
* Mobile application
* AI task prioritization
* Integration with Slack / Jira
* Dark mode UI

---

# 🖼 Screenshots

Add screenshots of your application here.

Example:

```
/screenshots/dashboard.png
/screenshots/kanban-board.png
```

---

# 🤝 Contributing

Contributions are welcome!

Steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

---

# 📜 License

This project is licensed under the **MIT License**.

---

# 👨‍💻 Author

**Kranthi Veer**

GitHub
https://github.com/kranthiveer25

---

⭐ If you found this project helpful, consider giving it a **star on GitHub**.

