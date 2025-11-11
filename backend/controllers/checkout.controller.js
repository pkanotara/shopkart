import stripe from '../config/stripe.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import PaymentRecord from '../models/PaymentRecord.js';

// @desc    Create payment intent
// @route   POST /api/checkout/create-payment-intent
// @access  Private
export const createPaymentIntent = async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Cart is empty'
      });
    }

    // Validate products and calculate total
    let subtotal = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product not found: ${item.productId}`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.title}`
        });
      }

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;

      orderItems.push({
        productId: product._id,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        image: product.images[0]
      });
    }

    // Calculate tax and shipping
    const tax = subtotal * 0.18; // 18% GST for India
    const shippingCost = subtotal > 500 ? 0 : 50; // Free shipping above ₹500
    const total = subtotal + tax + shippingCost;

    // Create order first (with pending status)
    const order = await Order.create({
      userId: req.user._id,
      items: orderItems,
      shippingAddress,
      subtotal,
      tax,
      shippingCost,
      total,
      paymentIntentId: 'temp', // Will be updated with actual payment intent ID
      paymentStatus: 'pending',
      orderStatus: 'pending'
    });

    // Create Stripe Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Convert to paise (smallest currency unit)
      currency: 'inr',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        orderId: order._id.toString(),
        userId: req.user._id.toString(),
        userEmail: req.user.email
      },
      description: `Order ${order.orderNumber}`
    });

    // Update order with payment intent ID
    order.paymentIntentId = paymentIntent.id;
    await order.save();

    // Create payment record
    await PaymentRecord.create({
      orderId: order._id,
      stripePaymentIntentId: paymentIntent.id,
      amount: total,
      currency: 'inr',
      status: 'pending'
    });

    res.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        orderId: order._id,
        orderNumber: order.orderNumber,
        amount: total
      }
    });
  } catch (error) {
    console.error('Payment Intent Error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get payment intent status
// @route   GET /api/checkout/payment-intent/:id
// @access  Private
export const getPaymentIntent = async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);

    res.json({
      success: true,
      data: {
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};