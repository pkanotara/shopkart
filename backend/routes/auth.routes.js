import express from 'express';
import {
  register,
  login,
  refreshToken,
  logout,
  getMe
} from '../controllers/auth.controller.js';
import { protect, verifyRefreshToken } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validation.middleware.js';
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema
} from '../validators/auth.validator.js';

const router = express.Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/refresh', validate(refreshTokenSchema), verifyRefreshToken, refreshToken);
router.post('/logout', protect, logout);
router.get('/me', protect, getMe);

export default router;