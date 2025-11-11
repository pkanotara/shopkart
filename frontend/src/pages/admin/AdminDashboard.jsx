import React, { useEffect, useState } from 'react';
import api from '../../utils/api';
import Loader from '../../components/common/Loader';
import { formatCurrency, formatDateTime, getOrderStatusColor } from '../../utils/helpers';
import { FiUsers, FiShoppingBag, FiDollarSign, FiPackage } from 'react-icons/fi';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/stats');
      setStats(response.data.data);
    } catch (error) {
      toast.error('Failed to fetch statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullScreen />;
  }

  if (!stats) {
    return <div className="container-custom py-8">Failed to load dashboard</div>;
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.overview.totalUsers,
      icon: <FiUsers size={32} />,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Orders',
      value: stats.overview.totalOrders,
      icon: <FiShoppingBag size={32} />,
      color: 'bg-green-500',
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(stats.overview.totalRevenue),
      icon: <FiDollarSign size={32} />,
      color: 'bg-purple-500',
    },
    {
      title: 'Total Products',
      value: stats.overview.totalProducts,
      icon: <FiPackage size={32} />,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} text-white p-3 rounded-lg`}>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="space-y-3">
              {stats.recentOrders.map((order) => (
                <div key={order._id} className="border-b pb-3 last:border-b-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">{order.orderNumber}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getOrderStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>{order.userId?.name || 'Unknown'}</span>
                    <span className="font-semibold text-gray-900">{formatCurrency(order.total)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{formatDateTime(order.createdAt)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Best Sellers */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Best Selling Products</h2>
            <div className="space-y-3">
              {stats.bestSellers.map((item) => (
                <div key={item._id._id} className="flex items-center gap-3 border-b pb-3 last:border-b-0">
                  <img
                    src={item._id.images?.[0] || 'https://via.placeholder.com/60'}
                    alt={item._id.title}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{item._id.title}</p>
                    <p className="text-sm text-gray-600">Sold: {item.totalSold}</p>
                  </div>
                  <p className="font-semibold text-gray-900">{formatCurrency(item.revenue)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Revenue Chart */}
        {stats.monthlyRevenue && stats.monthlyRevenue.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">Monthly Revenue (Last 6 Months)</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Month
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Orders
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {stats.monthlyRevenue.map((month, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {month._id.month}/{month._id.year}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {month.orders}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                        {formatCurrency(month.revenue)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;