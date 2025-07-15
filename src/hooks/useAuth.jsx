import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/AuthService';

export function useAuth() {
  const [user, setUser] = useState(authService.getUser());
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    try {
      const { user } = await authService.login(email, password);
      setUser(user);
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data || 'Login failed' };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const isAuthenticated = () => !!authService.getToken();

  return { user, login, logout, isAuthenticated, loading };
}
