import express from 'express';
import { handleStripeWebhook } from '../controllers/webhook.controller.js';

const router = express.Router();

// Stripe webhook - accepts JSON body
router.post('/stripe', handleStripeWebhook);

export default router;