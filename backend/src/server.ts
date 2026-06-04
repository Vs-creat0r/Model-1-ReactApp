import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Verify data endpoint - Check if data is stored in MongoDB
app.get('/api/verify-data', async (req, res) => {
  try {
    const User = (await import('./models/User.js')).default;
    const userCount = await User.countDocuments();
    const allUsers = await User.find();
    
    if (userCount > 0) {
      return res.json({
        dataStored: true,
        message: `✅ DATA IS STORED! Found ${userCount} users in MongoDB`,
        totalUsers: userCount,
        users: allUsers.map(u => ({
          id: u._id,
          name: u.name,
          email: u.email,
          createdAt: u.createdAt,
          passwordHashed: u.password.substring(0, 10) + '...' // Show it's hashed
        }))
      });
    } else {
      return res.json({
        dataStored: false,
        message: '❌ NO DATA STORED - MongoDB is empty',
        totalUsers: 0,
        users: []
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      dataStored: false,
      message: `❌ ERROR: ${error.message}`,
      error: error.message
    });
  }
});

// Show database status
app.get('/api/db-status', async (req, res) => {
  try {
    const User = (await import('./models/User.js')).default;
    const count = await User.countDocuments();
    
    return res.json({
      mongodbConnected: true,
      database: 'react-app-db',
      collection: 'users',
      totalDocuments: count,
      status: count > 0 ? '✅ DATA STORED' : '❌ NO DATA',
      message: count > 0 
        ? `Database has ${count} user(s)` 
        : 'Database is empty - create users to see data'
    });
  } catch (error: any) {
    return res.status(500).json({
      mongodbConnected: false,
      error: error.message
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
