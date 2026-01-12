import { MOCK_USERS } from '@/lib/mockData';
import { LoginCredentials, AuthUser } from '@/types';

const AUTH_STORAGE_KEY = 'auth_user';

export const login = (credentials: LoginCredentials): AuthUser | null => {
  const user = MOCK_USERS.find(
    u => u.email === credentials.email && u.password === credentials.password
  );

  if (user) {
    const authUser: AuthUser = {
      email: user.email,
      name: user.name
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authUser));
    return authUser;
  }

  return null;
};

export const logout = (): void => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const getAuthUser = (): AuthUser | null => {
  if (typeof window === 'undefined') return null;
  
  const user = localStorage.getItem(AUTH_STORAGE_KEY);
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!localStorage.getItem(AUTH_STORAGE_KEY);
};
