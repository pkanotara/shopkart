import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderById } from '../store/slices/orderSlice';
import Loader from '../components/common/Loader';
import { formatCurrency, formatDateTime, getOrderStatusColor, getPaymentStatusColor } from '../utils/helpers';
import { FiMapPin, FiPackage, FiCreditCard } from 'react-icons/fi';

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentOrder: order, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrderById(id));
  }, [dispatch, id]);

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!order) {
    return (
      <div className="container-custom py-16 text-center">
        <p className="text-gray-500">Order not found</p>
        <Link to="/orders" className="btn-primary inline-block mt-4">
          Back to Orders
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        <div className="mb-6">
          <Link to="/orders" className="text-primary-600 hover:text-primary-700">
            ← Back to Orders
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
              <p className="text-gray-600">Order #{order.orderNumber}</p>
            </div>
            <div className="flex gap-3">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getOrderStatusColor(order.orderStatus)}`}>
                {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
              </span>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Order Info */}
            <div>
              <div className="flex items-start space-x-3 mb-4">
                <FiPackage className="text-gray-400 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Order Information</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Placed on {formatDateTime(order.createdAt)}
                  </p>
                  {order.deliveredAt && (
                    <p className="text-sm text-gray-600">
                      Delivered on {formatDateTime(order.deliveredAt)}
                    </p>
                  )}
                  {order.trackingNumber && (
                    <p className="text-sm text-gray-600">
                      Tracking: <span className="font-medium">{order.trackingNumber}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <div className="flex items-start space-x-3">
                <FiMapPin className="text-gray-400 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Shipping Address</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {order.shippingAddress.street}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                    {order.shippingAddress.country}
                  </p>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div>
              <div className="flex items-start space-x-3">
                <FiCreditCard className="text-gray-400 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Payment Information</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Payment Intent: {order.paymentIntentId}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item._id} className="flex items-center gap-4 pb-4 border-b last:border-b-0">
                <img
                  src={item.image || 'https://via.placeholder.com/100'}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <Link
                    to={`/products/${item.productId}`}
                    className="font-medium text-gray-900 hover:text-primary-600"
                  >
                    {item.title}
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: {formatCurrency(item.price)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax (18% GST)</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{order.shippingCost === 0 ? 'FREE' : formatCurrency(order.shippingCost)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-primary-600">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;