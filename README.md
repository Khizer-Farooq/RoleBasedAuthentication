# Role-Based Authentication System

A full-stack authentication and role-based authorization application built with React and Node.js/Express. This project demonstrates modern authentication practices with JWT tokens, password hashing, and role-based access control (RBAC).

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Architecture](#architecture)

## 🎯 Project Overview

This application provides a secure authentication system with role-based access control. Users can register, log in with JWT tokens, and access protected resources based on their assigned roles. The system is designed with a clear separation between the frontend (React) and backend (Express/Node.js) with a MongoDB database.

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite** - Modern build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **ESLint** - Code quality and linting

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.2** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM and schema validation
- **JWT (jsonwebtoken)** - Token-based authentication
- **bcryptjs** - Password hashing and encryption
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **Nodemon** - Auto-reload development server

## 📁 Project Structure

```
RoleAuthentication/
├── Frontend (Root directory)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.jsx          # Login page component
│   │   │   ├── Register.jsx       # User registration page
│   │   │   └── Dashboard.jsx      # Protected dashboard (role-based)
│   │   ├── App.jsx                # Main app routing
│   │   ├── main.jsx               # React entry point
│   │   ├── App.css                # App styles
│   │   └── index.css              # Global styles
│   ├── public/                    # Static assets
│   ├── index.html                 # HTML entry point
│   ├── vite.config.js             # Vite configuration
│   ├── eslint.config.js           # ESLint configuration
│   ├── package.json               # Frontend dependencies
│   └── README.md                  # This file
│
└── Backend/
    ├── server.js                  # Express server entry point
    ├── package.json               # Backend dependencies
    ├── config/
    │   └── db.js                  # MongoDB connection configuration
    ├── models/
    │   └── User.js                # User schema (name, email, password, role)
    ├── controllers/
    │   └── authController.js      # Authentication logic (register, login)
    ├── services/
    │   └── authService.js         # Business logic for auth operations
    ├── middleware/
    │   ├── authMiddleware.js      # JWT token verification
    │   └── roleMiddleware.js      # Role-based authorization
    └── routes/
        └── authRoutes.js          # API routes for authentication
```

## ✨ Features

### Authentication
- ✅ **User Registration** - Create new user accounts with email validation
- ✅ **Secure Login** - Password verification using bcryptjs (10+ salt rounds)
- ✅ **JWT Tokens** - Token-based stateless authentication
- ✅ **Token Validation** - JWT verification on protected routes
- ✅ **Secure Password Hashing** - bcryptjs for password encryption

### Authorization
- ✅ **Role-Based Access Control (RBAC)** - Control access based on user roles
- ✅ **Protected Routes** - Middleware-protected API endpoints
- ✅ **Role Verification** - Authorization checks before accessing resources

### Frontend
- ✅ **Multi-page Application** - Login, Register, and Dashboard pages
- ✅ **Client-side Routing** - React Router for navigation
- ✅ **HTTP Requests** - Axios for API communication
- ✅ **Responsive Design** - Tailwind CSS styling
- ✅ **Token Storage** - Manage JWT tokens from login

### Backend
- ✅ **RESTful API** - Standard HTTP methods and status codes
- ✅ **CORS Support** - Cross-origin requests handling
- ✅ **Database Integration** - MongoDB with Mongoose ODM
- ✅ **Error Handling** - Proper HTTP status codes and error messages
- ✅ **Environment Configuration** - Secrets stored in .env file

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud - Atlas)
- npm or yarn package manager

### Frontend Setup

```bash
# Navigate to project root
cd RoleAuthentication

# Install frontend dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss
```

### Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install backend dependencies
npm install
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `Backend/` directory with the following variables:

```env
# Database Configuration
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>

# Server Configuration
PORT=5000

# JWT Configuration
ACCESS_TOKEN_SECRET=your-secret-key-for-jwt

# Additional
NODE_ENV=development
```

**Important:** Never commit the `.env` file. Add it to `.gitignore`:

```
Backend/.env
.env
```

### Database Configuration

The MongoDB connection is configured in `Backend/config/db.js`. Update with your MongoDB URI:

```javascript
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
```

## 🚀 Running the Project

### Development Mode

#### Option 1: Run Both Frontend and Backend Separately

**Terminal 1 - Frontend:**
```bash
# From project root (RoleAuthentication/)
npm run dev

# Starts Vite dev server (typically on http://localhost:5173)
```

**Terminal 2 - Backend:**
```bash
# From Backend directory
npm start

# Starts Express server (typically on http://localhost:5000)
```

#### Option 2: Parallel Development

Use a process manager like `concurrently` to run both simultaneously:

```bash
npm install -D concurrently

# Add to root package.json scripts:
"dev": "concurrently \"npm run dev\" \"cd Backend && npm start\""
```

### Production Build

```bash
# Build frontend for production
npm run build

# Build output in dist/ folder
npm run preview  # Preview production build locally
```

## 🔌 API Endpoints

### Authentication Endpoints

**Base URL:** `http://localhost:5000/api/auth`

#### Register User
```http
POST /register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePassword123!",
  "role": "user"
}

Response (201):
{
  "message": "User registered successfully",
  "user": { "id": "...", "email": "...", "role": "..." }
}
```

#### Login User
```http
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePassword123!"
}

Response (200):
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": "...", "email": "...", "role": "..." }
}
```

#### Protected Routes
All protected routes require the JWT token in the Authorization header:

```http
GET /protected-route
Authorization: Bearer <jwt-token>
```

## 🏗️ Architecture

### Authentication Flow

```
1. User Registration
   └─ Frontend sends name, email, password → Backend
      └─ Backend hashes password (bcryptjs)
         └─ Backend stores user in MongoDB
            └─ Response with success message

2. User Login
   └─ Frontend sends email, password → Backend
      └─ Backend finds user by email
         └─ Backend compares password hash
            └─ Backend generates JWT token
               └─ Frontend stores token (localStorage/sessionStorage)
                  └─ Response with token and user data

3. Protected Request
   └─ Frontend includes token in Authorization header
      └─ Backend authMiddleware verifies token
         └─ Backend roleMiddleware checks user role
            └─ Access granted/denied based on role
```

### Middleware Flow

1. **authMiddleware** - Validates JWT token from Authorization header
   - Extracts "Bearer <token>"
   - Verifies token with JWT_SECRET
   - Attaches user info to request object

2. **roleMiddleware** - Checks if user has required role
   - Accepts allowed roles as parameters
   - Returns 403 Forbidden if user role not in allowed list
   - Proceeds to next handler if authorized

## 🔐 Security Features

- ✅ **Password Hashing** - bcryptjs with 10+ salt rounds
- ✅ **JWT Tokens** - Stateless authentication with expiration
- ✅ **CORS** - Configured to allow frontend requests
- ✅ **Role-Based Access** - Protected endpoints with role checks
- ✅ **Environment Secrets** - Sensitive data in .env (not in code)
- ✅ **Error Handling** - Generic messages (don't leak implementation details)
- ✅ **Token Validation** - Every protected route verifies JWT

## 📝 Development Tips

- **Hot Reload** - Vite provides instant frontend reload on file changes
- **Nodemon** - Backend auto-restarts on file changes in development
- **MongoDB Compass** - GUI tool to visualize and manage MongoDB data
- **Postman/Thunder Client** - Test API endpoints with different payloads
- **Browser DevTools** - Inspect token in localStorage/sessionStorage

## 🐛 Troubleshooting

**CORS Errors:**
- Ensure backend is running on `http://localhost:5000`
- Verify CORS is enabled in `Backend/server.js`
- Check frontend API base URL in axios configuration

**Database Connection Failed:**
- Verify MongoDB URI in `.env` file
- Check internet connection (for MongoDB Atlas)
- Ensure MongoDB whitelist includes your IP address

**JWT Token Invalid:**
- Verify `ACCESS_TOKEN_SECRET` in `.env`
- Check token is in correct format: `Bearer <token>`
- Ensure token hasn't expired

**Port Already in Use:**
- Change `PORT` in `.env` (default: 5000)
- Or kill the process using that port

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Mongoose](https://mongoosejs.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [React Router](https://reactrouter.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

## 📄 License

ISC License

---

**Last Updated:** May 2026  
**Status:** In Development
