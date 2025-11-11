# ShopKart - MERN Stack E-Commerce Platform

A complete, production-grade e-commerce web application built with the MERN stack and integrated with Stripe Payment Gateway for secure online transactions.

## 🚀 Features

### User Features
- 🔐 **Authentication & Authorization**
  - JWT-based access and refresh token system
  - Role-based access control (User, Vendor, Admin)
  - Secure password hashing with bcrypt

- 🛍️ **Product Management**
  - Browse products with advanced filters
  - Search functionality
  - Category-based filtering
  - Product reviews and ratings

- 🛒 **Shopping Cart**
  - Add/remove/update cart items
  - Persistent cart (localStorage + server sync)
  - Cart syncs after login

- 💳 **Checkout & Payments**
  - Seamless checkout flow
  - Stripe Payment Intents API integration
  - Stripe Elements UI (PaymentElement)
  - Support for 3D Secure authentication
  - Automatic SCA handling

- 📦 **Order Management**
  - Order history
  - Order tracking
  - Order status updates

### Admin Features
- 📊 **Dashboard Analytics**
  - Sales revenue tracking
  - Best-selling products
  - User statistics
  - Monthly revenue charts

- 🎛️ **Product Management**
  - CRUD operations for products
  - Category management
  - Stock management

- 📋 **Order Management**
  - View all orders
  - Update order status
  - Manage refunds

## 🛠️ Tech Stack

### Frontend
- **React 18+** - UI library
- **React Router v6** - Client-side routing
- **Redux Toolkit** - State management
- **TailwindCSS** - Styling
- **Axios** - HTTP client
- **@stripe/react-stripe-js** - Stripe integration
- **React Hot Toast** - Notifications
- **Formik + Yup** - Form handling and validation

### Backend
- **Node.js 18+** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Stripe Node SDK** - Payment processing
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Joi** - Input validation
- **Helmet** - Security headers
- **Express Rate Limit** - Rate limiting

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or MongoDB Atlas account)
- Stripe account (for payment integration)

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/pkanotara/mern-ecommerce-stripe.git
cd mern-ecommerce-stripe
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:

```env
NODE_ENV=development
PORT=5000

MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority

JWT_ACCESS_SECRET=your_super_secret_access_key_min_32_characters_long
JWT_REFRESH_SECRET=your_super_secret_refresh_key_min_32_characters_long
JWT_ACCESS_EXPIRE=15m
JWT_REFRESH_EXPIRE=7d

STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key

FRONTEND_URL=http://localhost:5173

BCRYPT_ROUNDS=10
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_API_BASE_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
VITE_APP_NAME=ShopHub
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔑 Stripe Configuration

### 1. Get Stripe API Keys

1. Sign up at [Stripe](https://stripe.com)
2. Go to Developers → API Keys
3. Copy your **Publishable Key** and **Secret Key**
4. Add them to your environment variables

**Note:** This application does NOT require webhook secrets for local development. Webhooks are configured to accept events directly without signature verification (suitable for development/testing).

### 2. Test Cards

Use these test card numbers in development:

| Card Number | Description |
|-------------|-------------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0027 6000 3184 | Requires 3D Secure authentication |
| 4000 0000 0000 0002 | Card declined |
| 4000 0000 0000 9995 | Insufficient funds |

- Use any future expiry date (e.g., 12/34)
- Use any 3-digit CVC (e.g., 123)
- Use any ZIP code (e.g., 12345)

## 📁 Project Structure

```
mern-ecommerce-stripe/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   ├── stripe.js
│   │   └── constants.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   └── PaymentRecord.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── product.controller.js
│   │   ├── cart.controller.js
│   │   ├── checkout.controller.js
│   │   ├── order.controller.js
│   │   ├── webhook.controller.js
│   │   └── admin.controller.js
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── validators/
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── common/
    │   │   ├── product/
    │   │   ├── cart/
    │   │   ├── checkout/
    │   │   └── admin/
    │   ├── pages/
    │   │   ├── auth/
    │   │   ├── admin/
    │   │   └── ...
    │   ├── store/
    │   │   └── slices/
    │   ├── hooks/
    │   ├── utils/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Products
- `GET /api/products` - Get all products (with filters, search, pagination)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin/Vendor)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `POST /api/products/:id/reviews` - Add review

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:itemId` - Update cart item
- `DELETE /api/cart/items/:itemId` - Remove item
- `DELETE /api/cart` - Clear cart

### Checkout
- `POST /api/checkout/create-payment-intent` - Create Stripe PaymentIntent

### Orders
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/orders` - All orders
- `GET /api/admin/users` - All users
- `PUT /api/admin/users/:id/role` - Update user role

### Webhook
- `POST /api/webhook/stripe` - Stripe webhook handler

## 🚢 Deployment

### Backend (Railway/Render/Heroku)

1. Push code to GitHub
2. Create new project on your hosting platform
3. Connect GitHub repository
4. Set environment variables:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_ACCESS_SECRET=your_secret
   JWT_REFRESH_SECRET=your_secret
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   FRONTEND_URL=https://your-frontend-url.com
   ```
5. Deploy

### Frontend (Vercel/Netlify)

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Deploy the `dist` folder to Vercel/Netlify
3. Set environment variables:
   ```
   VITE_API_URL=https://your-backend-url.com/api
   VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   ```
4. Configure redirects for React Router (for Netlify, create `_redirects` file)

### Production Considerations

**For production use with webhooks:**

If you want to use Stripe webhooks in production with signature verification:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://your-backend-url.com/api/webhook/stripe`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `payment_intent.canceled`
4. Copy the signing secret
5. Update webhook controller to verify signatures (see Stripe documentation)

**Current implementation:** Works without webhook signature verification for easier development and testing.

## 🔒 Security Features

- JWT token authentication with refresh tokens
- Password hashing with bcrypt (10 rounds)
- HTTP-only cookies for refresh tokens
- Input validation and sanitization
- Protection against NoSQL injection
- XSS protection
- CORS configuration
- Rate limiting on authentication endpoints
- Helmet for security headers

## 📝 Environment Variables

### Backend Required Variables:
```env
MONGODB_URI=<your_mongodb_connection_string>
JWT_ACCESS_SECRET=<min_32_chars_random_string>
JWT_REFRESH_SECRET=<min_32_chars_random_string>
STRIPE_SECRET_KEY=<sk_test_...>
STRIPE_PUBLISHABLE_KEY=<pk_test_...>
```

### Frontend Required Variables:
```env
VITE_API_URL=<backend_api_url>
VITE_STRIPE_PUBLISHABLE_KEY=<pk_test_...>
```

## 🧪 Testing Payment Flow

1. Add products to cart
2. Proceed to checkout
3. Enter shipping address
4. Use test card: `4242 4242 4242 4242`
5. Enter any future expiry (12/34) and CVC (123)
6. Complete payment
7. Order will be created and confirmed automatically

## 📞 Support

For support, create an issue in the repository.

## 📝 License

This project is licensed under the MIT License.

## 👤 Author

**pkanotara**
- GitHub: [@pkanotara](https://github.com/pkanotara)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

**Built with ❤️ using MERN Stack & Stripe**

**Note:** This application is configured for easy development without webhook signature verification. For production use with enhanced security, consider implementing Stripe webhook signature verification.
