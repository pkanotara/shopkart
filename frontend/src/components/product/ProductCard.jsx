import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar } from 'react-icons/fi';
import { formatCurrency, calculateDiscount } from '../../utils/helpers';
import { useCart } from '../../hooks/useCart';
import toast from 'react-hot-toast';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      await addItem(product, 1);
      toast.success('Added to cart');
    } catch (error) {
      toast.error(error.message || 'Failed to add to cart');
    }
  };

  const discount = product.comparePrice
    ? calculateDiscount(product.comparePrice, product.price)
    : 0;

  return (
    <Link
      to={`/products/${product._id}`}
      className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
    >
      {/* Image */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.images[0] || 'https://via.placeholder.com/400'}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
            {discount}% OFF
          </div>
        )}

        {/* Stock Badge */}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-md font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
          {product.category?.name || 'Uncategorized'}
        </p>

        {/* Title */}
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 h-12">
          {product.title}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center text-yellow-400">
            <FiStar className="fill-current" />
            <span className="ml-1 text-sm text-gray-700 font-medium">
              {product.rating?.toFixed(1) || '0.0'}
            </span>
          </div>
          <span className="ml-2 text-xs text-gray-500">
            ({product.numReviews || 0} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>
            {product.comparePrice && (
              <span className="ml-2 text-sm text-gray-500 line-through">
                {formatCurrency(product.comparePrice)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full btn-primary flex items-center justify-center space-x-2"
        >
          <FiShoppingCart />
          <span>Add to Cart</span>
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;