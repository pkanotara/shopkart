import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Loader from '../components/common/Loader';
import { FiShoppingBag } from 'react-icons/fi';

const Cart = () => {
  const { items, loading, getCart } = useCart();

  useEffect(() => {
    getCart();
  }, []);

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.18; // 18% GST
  const shippingCost = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + shippingCost;

  if (loading) {
    return <Loader fullScreen />;
  }

  if (items.length === 0) {
    return (
      <div className="container-custom py-16">
        <div className="text-center">
          <FiShoppingBag className="mx-auto text-gray-400 mb-4" size={80} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Link to="/products" className="btn-primary inline-block">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Cart Items ({items.length})
              </h2>
              
              <div className="divide-y">
                {items.map((item) => (
                  <CartItem key={item._id} item={item} />
                ))}
              </div>
            </div>

            <Link
              to="/products"
              className="inline-block mt-4 text-primary-600 hover:text-primary-700 font-medium"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary
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

export default Cart;