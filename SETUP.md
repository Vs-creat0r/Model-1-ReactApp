# React App with MongoDB Integration

This project is structured with separate frontend and backend folders for better organization and scalability.

## Project Structure

```
├── frontend/           # React application (Vite + TypeScript)
│   ├── src/
│   │   ├── pages/     # Page components (Home, SignIn, About, Contact)
│   │   ├── components/ # Reusable components (Header, Footer)
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts # Configured with proxy to backend API
│   └── tsconfig.json
│
└── backend/            # Node.js/Express API server
    ├── src/
    │   ├── models/    # Mongoose schemas (User)
    │   ├── routes/    # API routes (authRoutes)
    │   ├── controllers/ # Route handlers (authController)
    │   ├── config/    # Configuration files (database connection)
    │   └── server.ts  # Main Express server
    ├── package.json
    ├── tsconfig.json
    ├── .env           # Environment variables
    └── .gitignore

```

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Docker (for MongoDB) or a MongoDB connection string

## Setup Instructions

### 1. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 2. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 3. Start MongoDB

#### Option A: Using Docker (Recommended)
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

#### Option B: Using Local MongoDB
Make sure MongoDB is running on `localhost:27017`

#### Option C: Using MongoDB Atlas (Cloud)
Update the `MONGODB_URI` in `backend/.env` with your MongoDB Atlas connection string.

### 4. Configure Backend Environment

Edit `backend/.env` with your settings:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/react-app-db
NODE_ENV=development
JWT_SECRET=your_secret_key_here_change_this_in_production
```

### 5. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5000`

### 6. Start the Frontend Development Server

Open a new terminal:
```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

## API Endpoints

### Authentication Routes
- **POST** `/api/auth/signup` - Create a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **POST** `/api/auth/signin` - Sign in user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- **GET** `/api/health` - Health check

## Features

✅ **Frontend**
- React 19 with TypeScript
- Vite for fast development
- React Router for navigation
- Axios for API calls
- SignIn/SignUp pages with form validation

✅ **Backend**
- Express.js REST API
- MongoDB with Mongoose ODM
- JWT authentication
- Password hashing with bcryptjs
- CORS support

✅ **Database**
- MongoDB for data storage
- User model with email validation
- Secure password hashing

## Data Flow

1. User fills SignIn/SignUp form in React
2. Frontend sends POST request to backend API
3. Backend validates input and checks MongoDB
4. User data is stored securely in MongoDB
5. Backend returns JWT token
6. Frontend stores token in localStorage
7. User can use token for authenticated requests

## Testing the Signin Workflow

1. Open `http://localhost:5173` in your browser
2. Navigate to Sign In page
3. Click "Sign Up" to create an account
4. Enter your name, email, and password
5. Your data will be saved to MongoDB
6. Sign in with your credentials
7. Check MongoDB Compass to verify data is stored

## Viewing Data in MongoDB Compass

1. Download MongoDB Compass from [mongodb.com](https://www.mongodb.com/products/tools/compass)
2. Connect with: `mongodb://localhost:27017`
3. Navigate to `react-app-db` → `users` collection
4. View all user records with their hashed passwords

## Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm run build
npm start
```

## Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `NODE_ENV` - Environment (development/production)
- `JWT_SECRET` - Secret key for JWT tokens

## Security Notes

⚠️ **Important for Production:**
- Change `JWT_SECRET` in `.env`
- Use strong passwords
- Enable HTTPS
- Use environment variables properly
- Add rate limiting
- Implement proper error handling
- Add input validation

## Troubleshooting

**MongoDB Connection Error:**
- Check if MongoDB is running: `docker ps` (for Docker)
- Verify `MONGODB_URI` in `.env`
- Check firewall settings

**Frontend can't reach backend:**
- Verify backend is running on `http://localhost:5000`
- Check Vite proxy configuration in `vite.config.ts`
- Check CORS settings in `backend/src/server.ts`

**Port already in use:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9
```

## Next Steps

- Add email verification
- Implement password reset
- Add user profile management
- Create protected routes with JWT
- Add more API endpoints
- Deploy to production (Render, Railway, Vercel, etc.)
