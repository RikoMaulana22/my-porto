import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/authController';

const router = Router();

// @route   /api/auth
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;