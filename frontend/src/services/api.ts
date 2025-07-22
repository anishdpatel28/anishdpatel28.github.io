import axios from 'axios';
import posthogService from './posthog';
import { API_BASE_URL } from './env';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const pageAnalyticsAPI = {
  getAnalytics: async (): Promise<Record<string, unknown>> => {
    const response = await api.get('/page-views/');
    posthogService.captureAnalyticsViewed();
    return response.data;
  },
  
  incrementPageViews: async (): Promise<void> => {
    const response = await api.post('/page-views/increment/');
    posthogService.capturePageView({
      total_page_views: response.data.page_views
    });
  },

  updateSectionTime: async (section: string, timeSpent: number): Promise<void> => {
    await api.post('/page-views/update-time/', {
      section,
      time_spent: timeSpent
    });
    posthogService.captureSectionTime(section, timeSpent);
  },

  captureEggClick: async (): Promise<void> => {
    await api.post('/page-views/egg-click/');
    posthogService.captureEggClicked();
  },
};

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