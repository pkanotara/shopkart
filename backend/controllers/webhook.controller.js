import Order from '../models/Order.js';
import PaymentRecord from '../models/PaymentRecord.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';

// @desc    Handle Stripe webhooks
// @route   POST /api/webhook/stripe
// @access  Public (Stripe)
export const handleStripeWebhook = async (req, res) => {
  try {
    // Get event data directly from request body
    const event = req.body;

    console.log('📨 Received webhook event:', event.type);

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object);
        break;

      case 'payment_intent.payment_failed':
        await handlePaymentFailed(event.data.object);
        break;

      case 'payment_intent.canceled':
        await handlePaymentCanceled(event.data.object);
        break;

      default:
        console.log(`ℹ️ Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('❌ Webhook handler error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
};

// Handle successful payment
async function handlePaymentSuccess(paymentIntent) {
  try {
    const orderId = paymentIntent.metadata.orderId;

    console.log(`✅ Processing successful payment for order: ${orderId}`);

    // Update order
    const order = await Order.findById(orderId);
    if (order) {
      order.paymentStatus = 'paid';
      order.orderStatus = 'confirmed';
      await order.save();

      // Update payment record
      await PaymentRecord.findOneAndUpdate(
        { stripePaymentIntentId: paymentIntent.id },
        {
          status: 'succeeded',
          paymentMethod: paymentIntent.payment_method,
          paymentMethodDetails: paymentIntent.charges?.data[0]?.payment_method_details
        }
      );

      // Reduce product stock
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity }
        });
      }

      // Clear user's cart
      await Cart.findOneAndUpdate(
        { userId: order.userId },
        { items: [] }
      );

      console.log(`✅ Payment succeeded for order ${order.orderNumber}`);
    } else {
      console.error(`❌ Order not found: ${orderId}`);
    }
  } catch (error) {
    console.error('❌ Error handling payment success:', error);
  }
}

// Handle failed payment
async function handlePaymentFailed(paymentIntent) {
  try {
    const orderId = paymentIntent.metadata.orderId;

    console.log(`❌ Processing failed payment for order: ${orderId}`);

    // Update order
    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: 'failed'
    });

    // Update payment record
    await PaymentRecord.findOneAndUpdate(
      { stripePaymentIntentId: paymentIntent.id },
      {
        status: 'failed',
        errorMessage: paymentIntent.last_payment_error?.message
      }
    );

    console.log(`❌ Payment failed for order ${orderId}`);
  } catch (error) {
    console.error('❌ Error handling payment failure:', error);
  }
}

// Handle canceled payment
async function handlePaymentCanceled(paymentIntent) {
  try {
    const orderId = paymentIntent.metadata.orderId;

    console.log(`⚠️ Processing canceled payment for order: ${orderId}`);

    // Update order
    await Order.findByIdAndUpdate(orderId, {
      paymentStatus: 'failed',
      orderStatus: 'cancelled'
    });

    // Update payment record
    await PaymentRecord.findOneAndUpdate(
      { stripePaymentIntentId: paymentIntent.id },
      { status: 'canceled' }
    );

    console.log(`⚠️ Payment canceled for order ${orderId}`);
  } catch (error) {
    console.error('❌ Error handling payment cancellation:', error);
  }
}