import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { formatCurrency } from '../../utils/helpers';
import { useCart } from '../../hooks/useCart';
import toast from 'react-hot-toast';

const CartItem = ({ item }) => {
  const { updateItem, removeItem } = useCart();

  const handleUpdateQuantity = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    if (newQuantity > item.productId.stock) {
      toast.error('Not enough stock available');
      return;
    }

    try {
      await updateItem(item._id, newQuantity);
    } catch (error) {
      toast.error(error.message || 'Failed to update quantity');
    }
  };

  const handleRemove = async () => {
    try {
      await removeItem(item._id);
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error(error.message || 'Failed to remove item');
    }
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      {/* Product Image */}
      <Link to={`/products/${item.productId._id}`} className="flex-shrink-0">
        <img
          src={item.productId.images[0] || 'https://via.placeholder.com/100'}
          alt={item.productId.title}
          className="w-20 h-20 object-cover rounded-md"
        />
      </Link>

      {/* Product Details */}
      <div className="flex-1">
        <Link
          to={`/products/${item.productId._id}`}
          className="font-medium text-gray-900 hover:text-primary-600 line-clamp-2"
        >
          {item.productId.title}
        </Link>
        <p className="text-sm text-gray-500 mt-1">
          Price: {formatCurrency(item.price)}
        </p>
        <p className="text-sm text-gray-500">
          Stock: {item.productId.stock} available
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleUpdateQuantity(item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="p-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiMinus size={16} />
        </button>
        <span className="w-12 text-center font-medium">{item.quantity}</span>
        <button
          onClick={() => handleUpdateQuantity(item.quantity + 1)}
          disabled={item.quantity >= item.productId.stock}
          className="p-1 rounded border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiPlus size={16} />
        </button>
      </div>

      {/* Total Price */}
      <div className="text-right min-w-[100px]">
        <p className="font-semibold text-gray-900">
          {formatCurrency(item.price * item.quantity)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={handleRemove}
        className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
        title="Remove item"
      >
        <FiTrash2 size={20} />
      </button>
    </div>
  );
};

export default CartItem;