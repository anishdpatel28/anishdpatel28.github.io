import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const pageViewsAPI = {
  getPageViews: async (): Promise<number> => {
    const response = await api.get('/page-views/');
    return response.data.count;
  },
  
  incrementPageViews: async (): Promise<void> => {
    await api.post('/page-views/increment/');
  },
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
); 