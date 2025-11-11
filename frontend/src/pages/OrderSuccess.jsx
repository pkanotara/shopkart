import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiCheckCircle } from 'react-icons/fi';

const OrderSuccess = () => {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="mb-6">
          <FiCheckCircle className="mx-auto text-green-500" size={80} />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>

        {orderId && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Order ID</p>
            <p className="font-mono font-semibold text-gray-900">{orderId}</p>
          </div>
        )}

        <div className="space-y-3">
          {orderId && (
            <Link
              to={`/orders/${orderId}`}
              className="block w-full btn-primary"
            >
              View Order Details
            </Link>
          )}
          
          <Link
            to="/orders"
            className="block w-full btn-outline"
          >
            View All Orders
          </Link>
          
          <Link
            to="/products"
            className="block w-full text-primary-600 hover:text-primary-700 font-medium"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;