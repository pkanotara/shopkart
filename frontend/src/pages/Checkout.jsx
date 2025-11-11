import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useDispatch } from 'react-redux';
import { createPaymentIntent } from '../store/slices/orderSlice';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import AddressForm from '../components/checkout/AddressForm';
import OrderSummary from '../components/checkout/OrderSummary';
import StripePayment from '../components/checkout/StripePayment';
import Loader from '../components/common/Loader';
import toast from 'react-hot-toast';
import { STRIPE_PUBLISHABLE_KEY } from '../utils/constants';

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, clearCart } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState(1); // 1: Address, 2: Payment
  const [shippingAddress, setShippingAddress] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18;
  const shippingCost = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shippingCost;

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const handleAddressSubmit = async (address) => {
    setShippingAddress(address);
    setLoading(true);

    try {
      const orderData = {
        items: items.map((item) => ({
          productId: item.productId._id,
          quantity: item.quantity,
        })),
        shippingAddress: address,
      };

      const response = await dispatch(createPaymentIntent(orderData)).unwrap();
      
      setClientSecret(response.clientSecret);
      setOrderId(response.orderId);
      setStep(2);
    } catch (error) {
      toast.error(error || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    await clearCart();
    navigate(`/order-success/${orderId}`);
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step >= 1 ? 'border-primary-600 bg-primary-600 text-white' : 'border-gray-300'
              }`}>
                1
              </div>
              <span className="ml-2 font-medium">Shipping</span>
            </div>

            <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-300'}`} />

            <div className={`flex items-center ${step >= 2 ? 'text-primary-600' : 'text-gray-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                step >= 2 ? 'border-primary-600 bg-primary-600 text-white' : 'border-gray-300'
              }`}>
                2
              </div>
              <span className="ml-2 font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {step === 1 && (
                <AddressForm
                  initialValues={user?.addresses?.find((addr) => addr.isDefault)}
                  onSubmit={handleAddressSubmit}
                  onBack={() => navigate('/cart')}
                />
              )}

              {step === 2 && clientSecret && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                  <StripePayment
                    clientSecret={clientSecret}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                    amount={total}
                  />
                </Elements>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={items}
              subtotal={subtotal}
              tax={tax}
              shippingCost={shippingCost}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;