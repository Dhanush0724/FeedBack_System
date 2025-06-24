# 📝 Lightweight Feedback System

A simple and secure internal tool to enable structured, ongoing feedback between managers and employees in an organization.

---

## 🔧 Tech Stack

| Layer        | Technology            |
|--------------|------------------------|
| Frontend     | Angular                |
| Backend      | Python (FastAPI)       |
| Database     | SQLite                 |
| Styling      | plain CSS               |
| Auth         | JWT-based Authentication |
| Containerization | Docker               |

---

## ✅ Core Features

### 👥 Authentication & Roles
- Role-based access: **Manager** and **Employee**
- Login functionality using JWT tokens
- Restricted access:
  - Managers can only view/edit their team
  - Employees can only view their own feedback

### 📝 Feedback Management
- Structured feedback with:
  - **Strengths**
  - **Areas of improvement**
  - **Overall sentiment** (positive / neutral / negative)
- Managers can submit, edit, and view feedback
- Employees can acknowledge feedback
- Feedback history available

### 📊 Dashboard
- **Managers:** Team feedback stats, sentiment trends
- **Employees:** Timeline of feedback

---

## 💡 Bonus Features (Implemented)
- Export feedback as **PDF**

---

## 📦 Setup Instructions

### 🔁 1. Clone the repository


git clone https://github.com/Dhanush0724/FeedBack_System.git

cd FeedBack_System

🖥️ Frontend Setup (Angular)

cd frontend
# Install dependencies
# npm install 
 if any error in dependency conflict check
use this = npm install --legacy-peer-deps

# Start the development server
# ng serve
 --📍 App runs at: http://localhost:4200

# 🐍 Backend Setup (FastAPI)

cd backend

🐳 Run Backend via Docker
Ensure Docker is installed and running:

# Build Docker image
docker build -t feedback-backend .

# Run container
docker run -d -p 8000:8000 feedback-backend

In Case if you don't want to use docker

Install dependencies
pip install -r requirements.txt

Start the FastAPI server
uvicorn main:app --reload
📍 Backend runs at: http://localhost:8000

# make sure you are running both backend and frontend at two seperate terminal for smooth communication

# 🎨 Design Decisions
FastAPI was chosen for its speed, type safety, and ease of building APIs with Python.

Angular provides structure, modularity, and strong form handling with built-in guards for routing and role-based UI display.

JWT-based authentication ensures a secure, stateless session management system.

SQLite is used for development simplicity. The backend can be easily adapted to PostgreSQL for production.

Role-based access control (RBAC) ensures secure and private feedback viewing/editing.

The system is Dockerized for consistent backend setup across environments.

📽️ Demo
🔗 Live App: [Your deployment link here]

📹 App Demo (≤5 min): [YouTube/Loom Link]

📹 Code Walkthrough (≤10 min): [YouTube/Loom Link]
