import axios from 'axios';
import posthogService from './posthog';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const pageAnalyticsAPI = {
  getAnalytics: async (): Promise<Record<string, unknown>> => {
    const response = await api.get('/page-views/');
    // Track analytics viewed in PostHog
    posthogService.captureAnalyticsViewed();
    return response.data;
  },
  
  incrementPageViews: async (): Promise<void> => {
    const response = await api.post('/page-views/increment/');
    // Track page view in PostHog
    posthogService.capturePageView({
      total_page_views: response.data.page_views
    });
  },

  updateSectionTime: async (section: string, timeSpent: number): Promise<void> => {
    await api.post('/page-views/update-time/', {
      section,
      time_spent: timeSpent
    });
    // Track section time in PostHog
    posthogService.captureSectionTime(section, timeSpent);
  },

  captureEggClick: async (): Promise<void> => {
    await api.post('/page-views/egg-click/');
    // Track egg click in PostHog
    posthogService.captureEggClicked();
  },
};

// Legacy compatibility
export const pageViewsAPI = {
  getPageViews: async (): Promise<number> => {
    const analytics = await pageAnalyticsAPI.getAnalytics();
    return typeof analytics.page_views === 'number' ? analytics.page_views : 0;
  },
  
  incrementPageViews: async (): Promise<void> => {
    await pageAnalyticsAPI.incrementPageViews();
  },
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
); 