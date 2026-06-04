import express from 'express';
import { signUp, signIn, verifyUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/verify', verifyUser);

export default router;
