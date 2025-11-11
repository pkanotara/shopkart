import mongoose from 'mongoose';

const paymentRecordSchema = new mongoose.Schema({
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  stripePaymentIntentId: {
    type: String,
    required: true,
    unique: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: 'inr'
  },
  status: {
    type: String,
    enum: ['pending', 'succeeded', 'failed', 'canceled', 'refunded'],
    default: 'pending'
  },
  paymentMethod: {
    type: String
  },
  paymentMethodDetails: {
    type: Object
  },
  metadata: {
    type: Object
  },
  stripeCustomerId: String,
  receiptUrl: String,
  errorMessage: String
}, {
  timestamps: true
});

const PaymentRecord = mongoose.model('PaymentRecord', paymentRecordSchema);

export default PaymentRecord;