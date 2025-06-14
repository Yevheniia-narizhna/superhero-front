# 🦸 Superhero CRUD App

A full-stack web application for managing a database of superheroes.  
Users can create, edit, delete and view superhero profiles with images.

## 🚀 Live Demo

- **Frontend (React, Vercel)**: [https://superhero-front.vercel.app/]
- **Backend (Node.js, Render)**: [https://superhero-back-zbf0.onrender.com]

## 🧠 Features

- List superheroes with pagination (5 per page)
- View full details of a superhero
- Create/update/delete superhero profiles
- Upload and manage images
- Responsive UI

## 🛠️ Tech Stack

- Frontend: React, Redux Toolkit
- Backend: Node.js, MongoDB
- Deployment: Vercel (frontend), Render (backend)

## 📦 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Yevheniia-narizhna/superhero-front.git
```

# Run Backend Locally

cd backend
npm install
npm run dev

# Run Frontend Locally

cd frontend
npm install
npm run dev

🧪 Testing

npm test

📌 Assumptions
Only one image is shown in the superhero list view

Images are stored and served from the backend via multipart/form-data

Pagination defaults to 5 items per page
