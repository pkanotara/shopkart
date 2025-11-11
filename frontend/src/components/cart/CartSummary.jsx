import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import { useAuth } from '../../hooks/useAuth';

const CartSummary = ({ subtotal, tax, shippingCost, total, onCheckout }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    
    if (onCheckout) {
      onCheckout();
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Tax (18% GST)</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>{shippingCost === 0 ? 'FREE' : formatCurrency(shippingCost)}</span>
        </div>

        {subtotal > 0 && subtotal < 500 && (
          <p className="text-sm text-gray-500 italic">
            Add {formatCurrency(500 - subtotal)} more for free shipping
          </p>
        )}

        <div className="border-t pt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span className="text-primary-600">{formatCurrency(total)}</span>
          </div>
        </div>
      </div>

      <button onClick={handleCheckout} className="w-full btn-primary">
        Proceed to Checkout
      </button>

      <p className="text-xs text-gray-500 text-center mt-3">
        Taxes and shipping calculated at checkout
      </p>
    </div>
  );
};

export default CartSummary;