import express from 'express';
import {
  getOrders,
  getOrder,
  updateOrderStatus
} from '../controllers/order.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { isAdmin } from '../middleware/role.middleware.js';
import { validate } from '../middleware/validation.middleware.js';
import { updateOrderStatusSchema } from '../validators/order.validator.js';

const router = express.Router();

router.use(protect); // All routes are protected

router.get('/', getOrders);
router.get('/:id', getOrder);
router.put(
  '/:id/status',
  isAdmin,
  validate(updateOrderStatusSchema),
  updateOrderStatus
);

export default router;