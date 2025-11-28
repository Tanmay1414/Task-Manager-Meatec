# Task Manager Application

A full-stack task management application built with Next.js (backend) and React + Vite (frontend), featuring user authentication and task CRUD operations.

## Tech Stack

**Live Demo**
- Frontend: [https://task-manager-ljtt.vercel.app](https://task-manager-ljtt.vercel.app)
- Backend (API): [https://task-manager-m7ub.vercel.app](https://task-manager-m7ub.vercel.app)

### Backend
- **Next.js 15** - React framework with API routes
- **Prisma** - ORM for MongoDB
- **MongoDB** - Database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **TypeScript** - Type safety

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **React Hook Form + Zod** - Form validation
- **Axios** - HTTP client

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)

## Setup Instructions

### 1. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally or use Docker:
   ```bash
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string

### 2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory:
   ```env
   # Database
   DATABASE_URL="mongodb://localhost:27017/taskmanager?directConnection=true"
   # For MongoDB Atlas, use: mongodb+srv://username:password@cluster.mongodb.net/taskmanager

   # JWT Configuration
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   JWT_EXPIRES_IN="7d"

   # Bcrypt Configuration
   BCRYPT_SALT_ROUNDS="10"
   ```

4. Generate Prisma client:
   ```bash
   npm run prisma:generate
   ```

5. Push the database schema:
   ```bash
   npm run db:push
   ```

6. (Optional) Open Prisma Studio to view your database:
   ```bash
   npm run prisma:studio
   ```

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:3000
   ```

## Running the Application

### Development Mode

1. **Start the Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
   The backend will run on `http://localhost:3000`

2. **Start the Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (Vite default port)

3. Open your browser and navigate to `http://localhost:5173`

### Production Build

1. **Build the Backend**:
   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Build the Frontend**:
   ```bash
   cd frontend
   npm run build
   npm run preview
   ```

## Testing the Application

### Manual Testing

1. **Register a New User**:
   - Navigate to the Register page
   - Enter a username and password
   - Submit the form
   - You should be redirected to the dashboard

2. **Login**:
   - Navigate to the Login page
   - Enter your credentials
   - You should be redirected to the dashboard

3. **Create a Task**:
   - Click "Add Task" or the "+" button
   - Enter task title and description
   - Submit the form
   - Task should appear in the list

4. **Update a Task**:
   - Click on a task to edit
   - Modify the title, description, or status
   - Save changes
   - Task should update in the list

5. **Delete a Task**:
   - Click the delete button on a task
   - Confirm deletion
   - Task should be removed from the list

6. **Logout**:
   - Click the logout button
   - You should be redirected to the login page

### API Testing with cURL

#### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```

#### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```

#### Get Tasks (requires JWT token)
```bash
curl -X GET http://localhost:3000/api/tasks \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Create Task
```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"New Task","description":"Task description","status":"PENDING"}'
```

#### Update Task
```bash
curl -X PUT http://localhost:3000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Updated Task","description":"Updated description","status":"COMPLETED"}'
```

#### Delete Task
```bash
curl -X DELETE http://localhost:3000/api/tasks/TASK_ID \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### API Testing with Postman

1. Import the following collection or create requests manually:

   **Base URL**: `http://localhost:3000`

   **Endpoints**:
   - `POST /api/auth/register` - Register new user
   - `POST /api/auth/login` - Login user
   - `GET /api/tasks` - Get all tasks (requires Auth header)
   - `POST /api/tasks` - Create task (requires Auth header)
   - `PUT /api/tasks/:id` - Update task (requires Auth header)
   - `DELETE /api/tasks/:id` - Delete task (requires Auth header)

2. For authenticated endpoints:
   - First, login to get a JWT token
   - Copy the token from the response
   - Add it to the Authorization header: `Bearer YOUR_TOKEN`

## Project Structure

```
.
├── backend/
│   ├── prisma/
│   │   └── schema.prisma          # Database schema
│   ├── src/
│   │   ├── app/
│   │   │   └── api/               # API routes
│   │   │       ├── auth/          # Authentication endpoints
│   │   │       └── tasks/          # Task endpoints
│   │   ├── lib/                    # Utility functions
│   │   │   ├── auth.ts            # JWT & password utilities
│   │   │   ├── prisma.ts          # Prisma client
│   │   │   └── middleware.ts      # Auth middleware
│   │   └── middleware.ts          # Next.js middleware
│   ├── package.json
│   └── .env                        # Environment variables
│
└── frontend/
    ├── src/
    │   ├── components/            # React components
    │   │   ├── auth/              # Login/Register forms
    │   │   ├── tasks/             # Task components
    │   │   └── layout/            # Layout components
    │   ├── pages/                 # Page components
    │   ├── store/                 # Redux store
    │   │   └── slices/            # Redux slices
    │   ├── routes/                # Routing configuration
    │   ├── services/              # API services
    │   └── utils/                 # Utility functions
    ├── package.json
    └── .env                        # Environment variables
```

## Troubleshooting

### Backend Issues

1. **Prisma Client not generated**:
   ```bash
   cd backend
   npm run prisma:generate
   ```

2. **Database connection error**:
   - Verify MongoDB is running
   - Check DATABASE_URL in `.env` file
   - For MongoDB Atlas, ensure your IP is whitelisted

3. **Port already in use**:
   - Change the port in `package.json` scripts or kill the process using port 3000

### Frontend Issues

1. **Cannot connect to backend**:
   - Verify backend is running on port 3000
   - Check `VITE_API_URL` in frontend `.env` file
   - Check CORS settings in backend middleware

2. **Build errors**:
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

## Available Scripts

### Backend
- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run prisma:studio` - Open Prisma Studio

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Environment Variables Summary

### Backend (.env)
- `DATABASE_URL` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `JWT_EXPIRES_IN` - Token expiration time (e.g., "7d")
- `BCRYPT_SALT_ROUNDS` - Bcrypt salt rounds (default: 10)

### Frontend (.env)
- `VITE_API_URL` - Backend API URL (default: http://localhost:3000)

## Security Notes

- Never commit `.env` files to version control
- Use strong, unique `JWT_SECRET` in production
- Use environment variables for all sensitive data
- Implement rate limiting in production
- Use HTTPS in production

## License

This project is private and proprietary.

