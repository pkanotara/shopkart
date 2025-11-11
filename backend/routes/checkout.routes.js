import express from 'express';
import {
  createPaymentIntent,
  getPaymentIntent
} from '../controllers/checkout.controller.js';
import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/create-payment-intent', protect, createPaymentIntent);
router.get('/payment-intent/:id', protect, getPaymentIntent);

export default router;