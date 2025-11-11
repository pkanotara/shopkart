# Deployment Guide

## 🚀 Quick Deployment Setup

### Required Environment Variables

#### Backend (.env)
```env
# Required
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_ACCESS_SECRET=your_32_char_secret_key
JWT_REFRESH_SECRET=your_32_char_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_or_pk_live_your_key
STRIPE_SECRET_KEY=sk_test_or_sk_live_your_key
FRONTEND_URL=https://your-frontend-domain.com

# Optional
BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100