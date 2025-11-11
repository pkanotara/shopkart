import React from 'react';
import { formatCurrency } from '../../utils/helpers';

const OrderSummary = ({ items, subtotal, tax, shippingCost, total }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

      {/* Items List */}
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item._id} className="flex items-center gap-3">
            <img
              src={item.productId.images[0] || 'https://via.placeholder.com/60'}
              alt={item.productId.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {item.productId.title}
              </p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-medium">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      {/* Pricing Details */}
      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax (18% GST)</span>
          <span className="font-medium">{formatCurrency(tax)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shippingCost === 0 ? 'FREE' : formatCurrency(shippingCost)}
          </span>
        </div>

        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-semibold text-lg text-primary-600">
              {formatCurrency(total)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;