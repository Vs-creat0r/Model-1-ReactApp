import { Request, Response } from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Create new user (simplified for testing - no duplicate check)
    const user = await User.create({ 
      name: name || 'Test User',
      email: email || `user_${Date.now()}@test.com`,
      password: password || 'password123'
    });

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    );

    console.log('✅ User created:', user.email);

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (error: any) {
    console.error('❌ SignUp error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error creating user'
    });
  }
};

export const signIn = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Simplified signin - find user or create if doesn't exist
    let user = await User.findOne({ email });

    // If user doesn't exist, create one for testing
    if (!user) {
      console.log('👤 User not found, creating new user:', email);
      user = await User.create({
        name: email.split('@')[0] || 'Test User',
        email: email,
        password: password || 'password123'
      });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    );

    console.log('✅ User signed in:', user.email);

    return res.status(200).json({
      success: true,
      message: 'Signed in successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });
  } catch (error: any) {
    console.error('❌ SignIn error:', error.message);
    return res.status(500).json({
      success: false,
      message: error.message || 'Error signing in'
    });
  }
};

export const verifyUser = async (req: Request, res: Response) => {
  try {
    const email = req.query.email || req.body.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required to verify MongoDB storage.'
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.json({
        success: true,
        stored: true,
        message: `✅ Data is stored in MongoDB for ${email}`,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      });
    }

    return res.json({
      success: true,
      stored: false,
      message: `❌ Data is not stored in MongoDB for ${email}`
    });
  } catch (error: any) {
    console.error('❌ Verify error:', error.message);
    return res.status(500).json({
      success: false,
      stored: false,
      message: error.message || 'Error verifying MongoDB storage.'
    });
  }
};
