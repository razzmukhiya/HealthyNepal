import axios from 'axios';
import { store } from '../redux/store';
import { logout } from '../redux/reducers/authSlice';

// Export the server URL
export const server = "http://localhost:8000/api/v2"; // Correct API URL for backend



// List of public routes that don't require authentication
const publicRoutes = [
  '/product/get-all-products',
  '/product/get-product/',
  '/user/login-user',
  '/user/signup',
  '/user/create-user',
  '/user/token',
  '/shop/login-shop',
  '/shop/create-shop'
];

const api = axios.create({
  baseURL: server,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Helper function to check if a route is public
const isPublicRoute = (url) => {
  return publicRoutes.some(route => url.includes(route));
};

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Check if it's a seller route
    const isSellerRoute = config.url.includes('/shop/');
    const token = isSellerRoute 
      ? localStorage.getItem('sellerAccessToken')
      : localStorage.getItem('userAccessToken');
    
    // Add token for all routes except public ones
    if (token && !isPublicRoute(config.url)) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Ensure credentials are included
    config.withCredentials = true;
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  async (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      response: error.response?.data
    });

    const originalRequest = error.config;

    // Don't retry for public routes
    if (isPublicRoute(originalRequest.url)) {
      return Promise.reject(error);
    }

    // Handle token expiration
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const isSellerRoute = originalRequest.url.includes('/shop/');
        const refreshToken = isSellerRoute 
          ? localStorage.getItem('sellerRefreshToken')
          : localStorage.getItem('userRefreshToken');

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Attempt to refresh the token
        const refreshUrl = isSellerRoute ? '/shop/token' : '/user/token';
        const response = await axios.post(`${server}${refreshUrl}`, {
          token: refreshToken,
        }, { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const { success, accessToken } = response.data;
        if (!success || !accessToken) {
          throw new Error('Failed to refresh token');
        }

        
        if (isSellerRoute) {
          localStorage.setItem('sellerAccessToken', accessToken);
        } else {
          localStorage.setItem('userAccessToken', accessToken);
        }

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        
        if (originalRequest.url.includes('/shop/')) {
          store.dispatch({ type: 'SellerLogout' });
        } else {
          store.dispatch(logout());
        }
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    const errorMessage = error.response?.data?.message || error.message;
    console.error('API Error:', errorMessage);

    return Promise.reject(error);
  }
);

// API endpoints
export const endpoints = {
  auth: {
    login: '/user/login-user',
    register: '/user/signup',
    logout: '/user/logout',
    refresh: '/user/token',
  },
  sellers: {
    list: '/sellers',
    active: '/sellers/active',
    inactive: '/sellers/inactive',
    requests: '/sellers/requests',
    update: (id) => `/sellers/${id}`,
    status: (id) => `/sellers/${id}/status`,
  },
  withdrawals: {
    list: '/withdrawals',
    pending: '/withdrawals/pending',
    update: (id) => `/withdrawals/${id}`,
    status: (id) => `/withdrawals/${id}/status`,
  },
  chat: {
    list: '/chat',
    messages: (sellerId) => `/chat/${sellerId}`,
    send: (sellerId) => `/chat/${sellerId}/send`,
    markRead: (sellerId) => `/chat/${sellerId}/read`,
  },
};

// Helper functions
export const handleApiError = (error) => {
  const message = error.response?.data?.message || error.message;
  return {
    error: true,
    message,
    status: error.response?.status,
  };
};

// Add Authorization header to all methods
const addAuthHeader = (config = {}) => {
  const token = localStorage.getItem('userAccessToken');
  if (token) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`
      }
    };
  }
  return config;
};

// API methods with auth headers
export const apiMethods = {
  get: async (url, config = {}) => {
    try {
      const response = await api.get(url, addAuthHeader(config));
      return { data: response.data, error: null };
    } catch (error) {
      return handleApiError(error);
    }
  },

  post: async (url, data = {}, config = {}) => {
    try {
      const response = await api.post(url, data, addAuthHeader(config));
      return { data: response.data, error: null };
    } catch (error) {
      return handleApiError(error);
    }
  },

  put: async (url, data = {}, config = {}) => {
    try {
      const response = await api.put(url, data, addAuthHeader(config));
      return { data: response.data, error: null };
    } catch (error) {
      return handleApiError(error);
    }
  },

  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await api.patch(url, data, addAuthHeader(config));
      return { data: response.data, error: null };
    } catch (error) {
      return handleApiError(error);
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await api.delete(url, addAuthHeader(config));
      return { data: response.data, error: null };
    } catch (error) {
      return handleApiError(error);
    }
  },

  upload: async (url, file, onProgress) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          if (onProgress) onProgress(percentCompleted);
        },
      });
      return { data: response.data, error: null };
    } catch (error) {
      return handleApiError(error);
    }
  },
};

export default api;
