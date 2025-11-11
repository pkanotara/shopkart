import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { login, register, logout, getCurrentUser } from '../store/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const handleLogin = useCallback(
    async (credentials) => {
      return dispatch(login(credentials)).unwrap();
    },
    [dispatch]
  );

  const handleRegister = useCallback(
    async (userData) => {
      return dispatch(register(userData)).unwrap();
    },
    [dispatch]
  );

  const handleLogout = useCallback(async () => {
    return dispatch(logout()).unwrap();
  }, [dispatch]);

  const fetchCurrentUser = useCallback(async () => {
    return dispatch(getCurrentUser()).unwrap();
  }, [dispatch]);

  const isAdmin = user?.role === 'admin';
  const isVendor = user?.role === 'vendor';
  const isUser = user?.role === 'user';

  return {
    user,
    isAuthenticated,
    loading,
    error,
    isAdmin,
    isVendor,
    isUser,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
    fetchCurrentUser,
  };
};