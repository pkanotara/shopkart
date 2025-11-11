import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../store/slices/orderSlice';
import Loader from '../components/common/Loader';
import { formatCurrency, formatDateTime, getOrderStatusColor, getPaymentStatusColor } from '../utils/helpers';
import { FiPackage } from 'react-icons/fi';

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, loading, pagination } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(fetchOrders({ page: 1, limit: 20 }));
  }, [dispatch]);

  if (loading) {
    return <Loader fullScreen />;
  }

  if (orders.length === 0) {
    return (
      <div className="container-custom py-16">
        <div className="text-center">
          <FiPackage className="mx-auto text-gray-400 mb-4" size={80} />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
          <Link to="/products" className="btn-primary inline-block">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order Number</p>
                    <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">Order Date</p>
                    <p className="font-medium text-gray-900">{formatDateTime(order.createdAt)}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="font-semibold text-gray-900">{formatCurrency(order.total)}</p>
                  </div>

                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getOrderStatusColor(order.orderStatus)}`}>
                      {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                    </span>
                  </div>

                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.slice(0, 3).map((item) => (
                    <div key={item._id} className="flex items-center gap-4">
                      <img
                        src={item.image || 'https://via.placeholder.com/80'}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × {formatCurrency(item.price)}
                        </p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}

                  {order.items.length > 3 && (
                    <p className="text-sm text-gray-600">
                      + {order.items.length - 3} more item(s)
                    </p>
                  )}
                </div>

                <div className="mt-6 flex justify-end">
                  <Link
                    to={`/orders/${order._id}`}
                    className="btn-outline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center space-x-2">
              {[...Array(pagination.pages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => dispatch(fetchOrders({ page: index + 1 }))}
                  className={`px-4 py-2 border rounded-md ${
                    index + 1 === pagination.page
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;