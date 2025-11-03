import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

interface User {
  id: string;
  username: string;
  role: string;
  roles: string[];
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Sayfa yüklendiğinde token kontrol et
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        // userData'nın geçerli bir JSON string olup olmadığını kontrol et
        if (!userData || userData === 'undefined' || userData === 'null' || userData.trim() === '' || !userData.startsWith('{')) {
          // Geçersiz değerler için localStorage'ı temizle
          localStorage.removeItem('user');
          localStorage.removeItem('accessToken');
        } else {
          const parsedUser = JSON.parse(userData);
          // Parse edilen verinin geçerli bir obje olup olmadığını kontrol et
          if (parsedUser && typeof parsedUser === 'object' && parsedUser.id) {
            setUser(parsedUser);
          } else {
            // Geçersiz obje - temizle
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
          }
        }
      } catch (error) {
        // JSON parse hatası - localStorage'ı temizle
        console.warn('Invalid user data in localStorage, clearing...', error);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      console.log('AuthContext - Login attempt:', { username });
      const result = await authAPI.login({ username, password });
      console.log('AuthContext - Login success, saving to localStorage');
      
      localStorage.setItem('accessToken', result.accessToken);
      localStorage.setItem('user', JSON.stringify(result.user));
      setUser(result.user);
      
      console.log('AuthContext - User set:', result.user);
    } catch (error) {
      console.error('AuthContext - Login error:', error);
      // Hata mesajını yukarıya fırlat
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Her durumda localStorage'ı temizle
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isLoading,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};