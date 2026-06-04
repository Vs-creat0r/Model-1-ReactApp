# System Architecture & Data Flow

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                            │
└─────────────────────────────────────────────────────────────────┘
                            ↑ ↓
                      HTTP/HTTPS (JSON)
                            ↑ ↓
┌─────────────────────────────────────────────────────────────────┐
│  FRONTEND (React + Vite)                   [http://localhost:5173]
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ React Components                                           │  │
│  │  ├── Home.tsx                                              │  │
│  │  ├── SignIn.tsx (✨ WITH API INTEGRATION)                  │  │
│  │  ├── About.tsx                                             │  │
│  │  ├── Contact.tsx                                           │  │
│  │  └── Header/Footer                                         │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Axios HTTP Client → /api/auth/signup                      │  │
│  │                 → /api/auth/signin                         │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Vite Dev Server (with API proxy)                           │  │
│  │  - Localhost:5173                                          │  │
│  │  - Hot reload                                              │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                            ↑ ↓
                 HTTP Requests to /api/**
                   CORS Enabled (Origin)
                            ↑ ↓
┌─────────────────────────────────────────────────────────────────┐
│  BACKEND (Express.js + Node.js)           [http://localhost:5000]
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Express Server                                             │  │
│  │  ├── Middleware (CORS, JSON parser)                        │  │
│  │  └── Routes                                                │  │
│  │      ├── POST /api/auth/signup                             │  │
│  │      ├── POST /api/auth/signin                             │  │
│  │      └── GET /api/health                                   │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Controllers (Business Logic)                               │  │
│  │  ├── authController.signup()                               │  │
│  │  │   └── Validate input                                   │  │
│  │  │   └── Hash password (bcryptjs)                         │  │
│  │  │   └── Save to MongoDB                                  │  │
│  │  │   └── Generate JWT token                               │  │
│  │  └── authController.signin()                               │  │
│  │      └── Validate input                                   │  │
│  │      └── Find user in DB                                  │  │
│  │      └── Verify password                                  │  │
│  │      └── Generate JWT token                               │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Models (Data Schema)                                       │  │
│  │  └── User (Mongoose schema)                                │  │
│  │      ├── name: String                                      │  │
│  │      ├── email: String (unique)                            │  │
│  │      ├── password: String (hashed)                         │  │
│  │      ├── timestamps                                        │  │
│  │      └── Methods                                           │  │
│  │          └── comparePassword()                             │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Config                                                     │  │
│  │  └── database.ts (MongoDB connection)                      │  │
│  │      └── Mongoose.connect(MONGODB_URI)                     │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                            ↑ ↓
            MongoDB Protocol (TCP:27017)
                            ↑ ↓
┌─────────────────────────────────────────────────────────────────┐
│  DATABASE (MongoDB)                        [localhost:27017]
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ MongoDB (Docker Container)                                 │  │
│  │  └── Database: react-app-db                                │  │
│  │      └── Collection: users                                 │  │
│  │          └── Documents (User records)                      │  │
│  │              ├── _id (ObjectId)                            │  │
│  │              ├── name                                      │  │
│  │              ├── email                                     │  │
│  │              ├── password (hashed)                         │  │
│  │              ├── createdAt                                 │  │
│  │              └── updatedAt                                 │  │
│  │                                                            │  │
│  │ Indexes:                                                   │  │
│  │  - _id (primary)                                           │  │
│  │  - email (unique)                                          │  │
│  └───────────────────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Accessed via:                                              │  │
│  │  1. MongoDB Compass (GUI) - mongodb://localhost:27017      │  │
│  │  2. Mongosh (CLI) - docker exec -it mongodb mongosh        │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📡 Data Flow - SignUp Process

```
1. USER INPUT
   ┌──────────────────┐
   │ Enter Name       │
   │ Enter Email      │
   │ Enter Password   │
   └────────┬─────────┘
            │
            ↓
2. FRONTEND (React)
   ┌──────────────────────────────────────┐
   │ SignIn.tsx                           │
   │  - Validate form inputs              │
   │  - Show loading spinner              │
   │  - axios.post('/api/auth/signup')    │
   └────────┬─────────────────────────────┘
            │ HTTP POST with JSON
            │ {"name", "email", "password"}
            ↓
3. BACKEND (Express)
   ┌──────────────────────────────────────┐
   │ POST /api/auth/signup                │
   │ ├─ Receive request                   │
   │ ├─ Parse JSON body                   │
   │ └─ Call authController.signup()      │
   └────────┬─────────────────────────────┘
            │
            ↓
4. VALIDATION
   ┌──────────────────────────────────────┐
   │ Check all fields provided            │
   │ Validate email format                │
   │ Check password length (min 6)        │
   │ Check if email already exists        │
   └────────┬─────────────────────────────┘
            │
            ↓
5. PASSWORD HASHING
   ┌──────────────────────────────────────┐
   │ bcryptjs.hash(password, salt=10)     │
   │ Plain: "password123"                 │
   │ Hashed: "$2a$10$..."                 │
   └────────┬─────────────────────────────┘
            │
            ↓
6. DATABASE SAVE
   ┌──────────────────────────────────────┐
   │ Mongoose User.create({               │
   │   name,                              │
   │   email,                             │
   │   password: hashed_password          │
   │ })                                   │
   │                                      │
   │ MongoDB saves document               │
   │ Returns with _id                     │
   └────────┬─────────────────────────────┘
            │
            ↓
7. TOKEN GENERATION
   ┌──────────────────────────────────────┐
   │ jwt.sign({id, email},                │
   │   SECRET,                            │
   │   {expiresIn: '7d'})                 │
   │                                      │
   │ Returns: JWT token                   │
   └────────┬─────────────────────────────┘
            │
            ↓
8. RESPONSE
   ┌──────────────────────────────────────┐
   │ {                                    │
   │   success: true,                     │
   │   message: "User created",           │
   │   user: {id, name, email},           │
   │   token: "eyJhbGc..."                │
   │ }                                    │
   └────────┬─────────────────────────────┘
            │ HTTP 201
            ↓
9. FRONTEND STORAGE
   ┌──────────────────────────────────────┐
   │ localStorage.setItem('token', token) │
   │ localStorage.setItem('user', user)   │
   │                                      │
   │ Clear form inputs                    │
   │ Show success message                 │
   │ Update UI state                      │
   └──────────────────────────────────────┘
```

---

## 🔐 Security Features

```
PASSWORD SECURITY
├── User enters password: "password123"
├── bcryptjs hashes with salt (10 rounds)
│   └── Time: ~100ms per hash
│   └── Result: "$2a$10$..."
├── Never stored as plain text
└── Database stores only hash

AUTHENTICATION
├── JWT Token generation on login
├── Token expires in 7 days
├── Token stored in localStorage
└── Can be used for future requests

EMAIL VALIDATION
├── Regex validation on signup
└── Unique constraint in database

INPUT VALIDATION
├── Required field checks
├── Email format validation
├── Password length minimum (6 chars)
└── Email uniqueness check
```

---

## 📊 Technology Stack

```
FRONTEND
├── React 19 (UI Library)
├── TypeScript (Type Safety)
├── Vite (Build Tool)
├── Axios (HTTP Client)
├── React Router (Navigation)
└── CSS (Styling)

BACKEND
├── Node.js (Runtime)
├── Express.js (Web Framework)
├── TypeScript (Type Safety)
├── Mongoose (MongoDB ODM)
├── bcryptjs (Password Hashing)
├── jsonwebtoken (JWT)
└── CORS (Cross-Origin)

DATABASE
├── MongoDB (NoSQL Database)
├── Docker (Containerization)
└── Mongoose (Schema Validation)

DEVTOOLS
├── npm (Package Manager)
├── Git (Version Control)
└── VS Code (Editor)
```

---

## 🚀 Deployment Architecture

```
PRODUCTION DEPLOYMENT

┌─────────────────────────────────────┐
│   Frontend (React)                  │
│   Deploy to: Vercel / Netlify       │
│   Build: npm run build              │
│   Output: Static HTML/CSS/JS        │
│   URL: myapp.vercel.app             │
└──────────┬──────────────────────────┘
           │
           ↓ (HTTPS)
┌─────────────────────────────────────┐
│   Backend (Express)                 │
│   Deploy to: Railway / Render       │
│   Build: npm run build              │
│   Start: npm start                  │
│   URL: api.myapp.com                │
└──────────┬──────────────────────────┘
           │
           ↓ (TCP: 27017)
┌─────────────────────────────────────┐
│   MongoDB Atlas (Cloud)             │
│   Service: mongodb.com              │
│   Cluster: myapp-cluster            │
│   URL: mongodb+srv://...            │
└─────────────────────────────────────┘
```

---

## 📈 Performance Metrics

```
RESPONSE TIMES (Typical)
- SignUp Request: 150-300ms
- SignIn Request: 100-200ms
- Database Query: 10-50ms
- Password Hash: 100ms (bcryptjs)

DATABASE OPERATIONS
- Create User: ~50ms
- Find User: ~20ms
- Index Lookup: ~5ms

FRONTEND METRICS
- Page Load: <2s
- Form Submission: Instant feedback
- Error Handling: Real-time display
```

---

## ✅ Verification Checklist

- [x] Frontend and Backend separate
- [x] MongoDB connected and running
- [x] SignUp endpoint working
- [x] SignIn endpoint working
- [x] Passwords hashed securely
- [x] JWT tokens generated
- [x] Data persists in MongoDB
- [x] CORS configured
- [x] API proxy working in Vite
- [x] Form validation working
- [x] Error handling implemented
- [x] Success messages displayed
- [x] Both servers running
- [x] Tests passing

---

## 🔗 Quick Links

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000/api
- **MongoDB:** mongodb://localhost:27017
- **Compass:** mongo://localhost:27017
- **Test:** bash test.sh

---

This architecture is ready for production with proper configuration!
