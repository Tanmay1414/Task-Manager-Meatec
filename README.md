# Task Manager – Full Stack Application

A complete task-tracking system featuring secure authentication and full CRUD workflows, built on a modern web stack.

## 🚀 Tech Overview

### 🛠 Backend
- Next.js 15 (API Routes)
- Prisma + MongoDB
- JWT authentication with bcryptjs hashing
- TypeScript across the stack

### 🎨 Frontend
- React 19 + Vite
- Redux Toolkit & React Router
- Tailwind CSS styling
- React Hook Form + Zod validation
- Axios for API communication

### 📌 Live Deployments
| Layer | URL |
| --- | --- |
| Frontend | https://task-manager-meatec-grxh.vercel.app/dashboard |
| Backend API | https://task-manager-meatec.vercel.app/ |

## ⚙️ Requirements
- Node.js 18+
- npm or yarn
- MongoDB (local instance or Atlas cluster)

## 🔧 Local Setup

### 1️⃣ Clone & enter the project
```bash
git clone https://github.com/Tanmay1414/Task-Manager-Meatec
cd Task-Manager
```

### 2️⃣ Backend configuration
```bash
cd backend
npm install
```
Create `backend/.env`:
```env
DATABASE_URL="mongodb://localhost:27017/taskmanager?directConnection=true"
JWT_SECRET="replace-this-with-a-strong-secret"
JWT_EXPIRES_IN="7d"
BCRYPT_SALT_ROUNDS="10"
```
Generate Prisma client and push the schema:
```bash
npm run prisma:generate
npm run db:push
```
Start the API ( http://localhost:3000 ):
```bash
npm run dev
```

### 3️⃣ Frontend configuration
```bash
cd ../frontend
npm install
```
Create `frontend/.env`:
```env
VITE_API_URL=http://localhost:3000
```
Start the UI ( http://localhost:5173 ):
```bash
npm run dev
```

## 🧪 Basic Testing Flow
1. Register a new account  
2. Login with the same credentials  
3. Create / Edit / Delete tasks  
4. Logout  
All task data is persisted to MongoDB.

## 🗂 Project Structure
```
Task-Manager/
├─ backend/      # Next.js API + Prisma + Auth
└─ frontend/     # React UI + Redux + Routing
```

## 🔍 Troubleshooting
| Issue | Fix |
| --- | --- |
| Backend DB error | Ensure MongoDB is running & `DATABASE_URL` is correct |
| Frontend can’t fetch | Confirm backend on port 3000 & `VITE_API_URL` value |
| Prisma issues | `npm run prisma:generate` then `npm run db:push` |

## 🔐 Production Tips
- Never commit `.env` files
- Use a strong, rotated `JWT_SECRET`
- Prefer MongoDB Atlas over local DBs
- Serve both layers over HTTPS and add rate limiting

## 📄 License
This project is private and proprietary.

