import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

console.log('API Base URL:', API_BASE_URL);

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const pageViewsAPI = {
  getPageViews: async (): Promise<number> => {
    console.log('Making GET request to:', `${API_BASE_URL}/page-views/`);
    const response = await api.get('/page-views/');
    console.log('GET response:', response.data);
    return response.data.count;
  },
  
  incrementPageViews: async (): Promise<void> => {
    console.log('Making POST request to:', `${API_BASE_URL}/page-views/increment/`);
    const response = await api.post('/page-views/increment/');
    console.log('POST response:', response.data);
  },
};

api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.config.url, response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.config?.url, error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
); 