# Quick Start Guide - React App with MongoDB

## ✅ What's Been Done

1. **Project Structure**
   - ✅ Reorganized into `frontend/` and `backend/` folders
   - ✅ Proper separation of concerns

2. **Backend Setup (Node.js + Express)**
   - ✅ Express.js API server
   - ✅ TypeScript configuration
   - ✅ MongoDB connection with Mongoose
   - ✅ User authentication endpoints (SignUp & SignIn)
   - ✅ Password hashing with bcryptjs
   - ✅ JWT token generation

3. **Frontend Setup (React + Vite)**
   - ✅ Updated SignIn/SignUp page with forms
   - ✅ Axios integration for API calls
   - ✅ Form validation and error handling
   - ✅ State management with React hooks
   - ✅ Token storage in localStorage

4. **Database**
   - ✅ MongoDB running in Docker container
   - ✅ User model with schema validation
   - ✅ Email uniqueness constraint
   - ✅ Password hashing before storage

## 🚀 Currently Running Servers

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000
- **MongoDB:** localhost:27017

## 📝 How to Test

### Option 1: Using the Web Interface

1. **Open Frontend:** http://localhost:5173
2. **Navigate to Sign In page**
3. **Create Account:**
   - Click "Sign Up"
   - Enter your name when prompted
   - Enter your email
   - Enter a password (min 6 characters)
   - Click "Sign Up"
   - You should see success message
4. **Sign In:**
   - Use the same email and password
   - Click "Log In"
   - You should see "Sign in successful!" message
   - Token will be stored in browser localStorage

### Option 2: Using cURL (Command Line)

**Create a user:**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Sign in:**
```bash
curl -X POST http://localhost:5000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response example:**
```json
{
  "success": true,
  "message": "Signed in successfully",
  "user": {
    "id": "64f7a1b2c3d4e5f6g7h8i9j0",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## 🗄️ Verify Data in MongoDB

### Option 1: MongoDB Compass (GUI)
1. Download: https://www.mongodb.com/products/tools/compass
2. Connect to: `mongodb://localhost:27017`
3. Database: `react-app-db`
4. Collection: `users`
5. View all user records

### Option 2: Command Line
```bash
# Connect to MongoDB container
docker exec -it mongodb mongosh

# Use the database
use react-app-db

# View all users
db.users.find().pretty()

# Find specific user
db.users.findOne({email: "john@example.com"})

# Count users
db.users.countDocuments()
```

## 📁 Project Structure Overview

```
Model-1-ReactApp/
├── frontend/                    # React + Vite app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── SignIn.tsx      # ✨ Updated with API calls
│   │   │   ├── Home.tsx
│   │   │   ├── About.tsx
│   │   │   └── Contact.tsx
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json            # Added axios dependency
│   ├── vite.config.ts          # Configured with API proxy
│   └── index.html
│
├── backend/                     # Express + MongoDB API
│   ├── src/
│   │   ├── models/
│   │   │   └── User.ts         # Mongoose User schema
│   │   ├── routes/
│   │   │   └── authRoutes.ts   # Auth endpoints
│   │   ├── controllers/
│   │   │   └── authController.ts # SignUp & SignIn logic
│   │   ├── config/
│   │   │   └── database.ts     # MongoDB connection
│   │   └── server.ts           # Express app setup
│   ├── dist/                   # Compiled JavaScript (auto-generated)
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env                    # Environment variables
│   └── .gitignore
│
├── SETUP.md                    # Detailed setup documentation
└── QUICK_START.md              # This file
```

## 🔑 Key Features Implemented

### Frontend (React)
- ✅ Form handling with useState hooks
- ✅ Axios HTTP requests to backend
- ✅ Error and success message display
- ✅ Loading states during API calls
- ✅ Token storage in localStorage
- ✅ User data persistence

### Backend (Express)
- ✅ POST `/api/auth/signup` - Register new users
- ✅ POST `/api/auth/signin` - Authenticate users
- ✅ GET `/api/health` - Health check endpoint
- ✅ CORS enabled for frontend communication
- ✅ Input validation
- ✅ Password hashing (bcryptjs)
- ✅ JWT token generation
- ✅ Error handling and responses

### Database (MongoDB)
- ✅ User collection with schema
- ✅ Email unique constraint
- ✅ Password field excluded from queries by default
- ✅ Timestamps (createdAt, updatedAt)
- ✅ Data validation

## 📊 API Response Examples

### Successful SignUp
```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": "...mongodb_id...",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "token": "...jwt_token..."
}
```

### Error Response (Email exists)
```json
{
  "success": false,
  "message": "Email already exists"
}
```

### Error Response (Invalid credentials)
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

## 🛠️ Environment Configuration

**Backend (.env file):**
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/react-app-db
NODE_ENV=development
JWT_SECRET=your_secret_key_here_change_this_in_production
```

## 🔒 Security Features

- ✅ Passwords hashed with bcryptjs (10 salt rounds)
- ✅ JWT tokens for authentication
- ✅ Email validation with regex
- ✅ CORS configured for origin validation
- ✅ Password field excluded from user queries
- ⚠️ TODO: Add rate limiting
- ⚠️ TODO: Add email verification
- ⚠️ TODO: Add refresh tokens
- ⚠️ TODO: HTTPS in production

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
lsof -i :5000

# Kill the process if needed
kill -9 <PID>

# Verify MongoDB is running
docker ps | grep mongodb
```

### Frontend can't reach backend
- Check that backend is running on port 5000
- Verify CORS setting in `backend/src/server.ts`
- Check browser console for errors
- Verify API proxy in `frontend/vite.config.ts`

### MongoDB connection error
```bash
# Check MongoDB container
docker ps | grep mongodb

# If not running, restart it
docker start mongodb

# Or create new container
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Port already in use
```bash
# Kill all Node processes
pkill -f node

# Or kill specific port
lsof -ti:5173 | xargs kill -9
lsof -ti:5000 | xargs kill -9
```

## 📚 Next Steps

1. **Add Protected Routes:**
   - Create middleware to verify JWT token
   - Add authenticated routes
   - Implement logout functionality

2. **Enhance User Features:**
   - User profile page
   - Update profile
   - Change password
   - Delete account

3. **Production Deployment:**
   - Deploy frontend to Vercel
   - Deploy backend to Railway/Render
   - Use MongoDB Atlas instead of local MongoDB
   - Set up environment variables
   - Enable HTTPS

4. **Additional Features:**
   - Email verification
   - Password reset
   - Two-factor authentication
   - Social login (Google, GitHub)
   - User roles and permissions

## 📞 Support

For issues or questions:
1. Check the SETUP.md file for detailed instructions
2. Review console logs for error messages
3. Verify all services are running
4. Check MongoDB for data

---

**Status:** ✅ All setup complete! Ready for testing and development.
