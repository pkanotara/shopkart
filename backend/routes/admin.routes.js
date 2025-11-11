import express from 'express';
import {
  getDashboardStats,
  getAllOrders,
  getAllUsers,
  updateUserRole
} from '../controllers/admin.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/role.middleware.js';

const router = express.Router();

router.use(protect, isAdmin); // All routes require admin role

router.get('/stats', getDashboardStats);
router.get('/orders', getAllOrders);
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);

export default router;