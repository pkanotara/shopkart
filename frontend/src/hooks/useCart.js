import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  fetchCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  addToCartLocal,
  updateCartItemLocal,
  removeFromCartLocal,
  selectCartTotal,
  selectCartItemCount,
} from '../store/slices/cartSlice';
import { useAuth } from './useAuth';

export const useCart = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const { items, loading, error } = useSelector((state) => state.cart);
  const total = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);

  const getCart = useCallback(async () => {
    if (isAuthenticated) {
      return dispatch(fetchCart()).unwrap();
    }
  }, [dispatch, isAuthenticated]);

  const addItem = useCallback(
    async (product, quantity = 1) => {
      if (isAuthenticated) {
        return dispatch(addToCart({ productId: product._id, quantity })).unwrap();
      } else {
        dispatch(addToCartLocal({ product, quantity }));
      }
    },
    [dispatch, isAuthenticated]
  );

  const updateItem = useCallback(
    async (itemId, quantity) => {
      if (isAuthenticated) {
        return dispatch(updateCartItem({ itemId, quantity })).unwrap();
      } else {
        dispatch(updateCartItemLocal({ itemId, quantity }));
      }
    },
    [dispatch, isAuthenticated]
  );

  const removeItem = useCallback(
    async (itemId) => {
      if (isAuthenticated) {
        return dispatch(removeFromCart(itemId)).unwrap();
      } else {
        dispatch(removeFromCartLocal(itemId));
      }
    },
    [dispatch, isAuthenticated]
  );

  const clearAllItems = useCallback(async () => {
    if (isAuthenticated) {
      return dispatch(clearCart()).unwrap();
    } else {
      dispatch(clearCartLocal());
    }
  }, [dispatch, isAuthenticated]);

  return {
    items,
    loading,
    error,
    total,
    itemCount,
    getCart,
    addItem,
    updateItem,
    removeItem,
    clearCart: clearAllItems,
  };
};