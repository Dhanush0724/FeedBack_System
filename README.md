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

# Now check the frontend link to access application running on : http://localhost:4200

## ⚙️ Optional (If Docker Not Available)

If you don't want to use Docker, you can skip the Docker part and continue with the manual setup:

### ✅ Install Dependencies  
```bash
pip install -r requirements.txt
🚀 Start the FastAPI Server
uvicorn main:app --reload

📍 Backend runs at: http://localhost:8000

💡 Note: Make sure you are running both the backend and frontend in two separate terminals for smooth communication.
```
## 🎨 Design Decisions

- **FastAPI** was chosen for its speed, type safety, and ease of building APIs with Python.
- **Angular** provides structure, modularity, and strong form handling with built-in guards for routing and role-based UI display.
- **JWT-based authentication** ensures a secure, stateless session management system.
- **SQLite** is used for development simplicity. The backend can be easily adapted to **PostgreSQL** for production.
- **Role-Based Access Control (RBAC)** ensures secure and private feedback viewing/editing.
- The system is **Dockerized** for consistent backend setup across environments.

---

### 📽️ Demo

📹 **Video Demo of the Application:**  
[https://www.loom.com/share/96afbdecef6a4e5b9ba88b17bb3700c0?sid=bb780aa2-f805-43e7-a47c-1f828258dbf3](https://www.loom.com/share/96afbdecef6a4e5b9ba88b17bb3700c0?sid=bb780aa2-f805-43e7-a47c-1f828258dbf3)

📹 **Video Walkthrough of the Codebase:**  
[https://www.loom.com/share/4a47cb4ca1f74c51aac37069dc0770b5?sid=c545d024-e9b2-467d-b9f5-1251a2098033](https://www.loom.com/share/4a47cb4ca1f74c51aac37069dc0770b5?sid=c545d024-e9b2-467d-b9f5-1251a2098033)
