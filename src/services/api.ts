// src/services/api.ts
const API_BASE_URL = 'http://localhost:3000';

interface LoginResponse {
  accessToken: string;
  user: {
    id: string;
    username: string;
    role: string;
    roles: string[];
  };
}

interface LoginAPIResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    user: {
      id: string;
      username: string;
      role: string;
      roles: string[];
    };
  };
  timestamp: string;
}

interface LoginRequest {
  username: string;
  password: string;
}

export const authAPI = {
  // Login
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      console.log('API Call - URL:', `${API_BASE_URL}/auth/login`);
      console.log('API Call - Credentials:', { username: credentials.username, password: '***' });
      
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Cookie'ler için gerekli
        body: JSON.stringify(credentials)
      });

      console.log('API Response Status:', response.status, response.statusText);

      if (!response.ok) {
        let errorMessage = 'Giriş başarısız!';
        try {
          const error = await response.json();
          errorMessage = error.message || error.error || 'Giriş başarısız!';
          console.error('API Error Response:', error);
        } catch (parseError) {
          // JSON parse edilemezse status text'i kullan
          errorMessage = `Sunucu hatası: ${response.status} ${response.statusText}`;
          console.error('API Error - Cannot parse JSON:', parseError);
        }
        throw new Error(errorMessage);
      }

      const data: LoginAPIResponse | LoginResponse = await response.json();
      console.log('API Success Response:', data);
      
      // Response formatını kontrol et ve normalize et
      if ('success' in data && data.success && data.data) {
        // Yeni format: { success, data: { accessToken, user } }
        return {
          accessToken: data.data.accessToken,
          user: data.data.user
        };
      } else if ('accessToken' in data && 'user' in data) {
        // Eski format: { accessToken, user }
        return data;
      } else {
        throw new Error('Geçersiz API yanıt formatı');
      }
    } catch (error: any) {
      // Network hatası veya diğer hatalar
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        console.error('Network Error - Backend bağlantısı yok:', error);
        throw new Error('Backend sunucusuna bağlanılamıyor. Lütfen backend\'in çalıştığından emin olun.');
      }
      // Diğer hatalar
      console.error('API Login Error:', error);
      throw error;
    }
  },

  // Register
  register: async (userData: {
    username: string;
    surname: string;
    password: string;
    eMail: string;
    role?: string;
  }) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return response.json();
  },

  // Refresh token
  refreshToken: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    return response.json();
  },

  // Logout
  logout: async () => {
    const token = localStorage.getItem('accessToken');
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      credentials: 'include'
    });

    localStorage.removeItem('accessToken');
    return response.json();
  }
};