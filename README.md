# 📝 Lightweight Feedback System

A simple and secure internal tool to enable structured, ongoing feedback between managers and employees in an organization.

---

## 🔧 Tech Stack

| Layer        | Technology            |
|--------------|------------------------|
| Frontend     | Angular 17             |
| Backend      | Python (FastAPI)       |
| Database     | SQLite (for dev) / PostgreSQL (optional for production) |
| Styling      | Tailwind CSS or plain CSS |
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

## 💡 Bonus Features (Implemented/Planned)
- Export feedback as **PDF**
- **Markdown support** for comments
- **Feedback acknowledgment** system
- Employee comments on feedback
- (Planned) Anonymous peer feedback, notifications, tags

---

## 📦 Setup Instructions

### 🔁 1. Clone the repository

```bash
git clone https://github.com/yourusername/lightweight-feedback-system.git
cd lightweight-feedback-system
🖥️ Frontend Setup (Angular)
bash
Always show details

Copy
cd frontend

# Install dependencies
npm install

# Start the development server
ng serve
📍 App runs at: http://localhost:4200

🐍 Backend Setup (FastAPI)
bash
Always show details

Copy
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload
📍 Backend runs at: http://localhost:8000

🐳 Run Backend via Docker
Ensure Docker is installed and running:

bash
Always show details

Copy
cd backend

# Build Docker image
docker build -t feedback-backend .

# Run container
docker run -d -p 8000:8000 feedback-backend
🗂 Project Structure
perl
Always show details

Copy
lightweight-feedback-system/
├── frontend/                  # Angular frontend app
│   ├── src/
│   └── ...
├── backend/                   # FastAPI backend app
│   ├── main.py
│   ├── models.py
│   ├── auth.py
│   ├── crud.py
│   ├── database.py
│   ├── Dockerfile
│   └── requirements.txt
🎨 Design Decisions
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
