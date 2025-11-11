import Stripe from 'stripe';
import dotenv from 'dotenv';

// Ensure dotenv is loaded
dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error('❌ ERROR: STRIPE_SECRET_KEY is not defined in environment variables');
  console.log('Available environment variables:', Object.keys(process.env).filter(key => key.includes('STRIPE')));
  process.exit(1);
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
});

console.log('✅ Stripe initialized successfully');

export default stripe;