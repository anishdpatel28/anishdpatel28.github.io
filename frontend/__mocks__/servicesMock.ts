// Mock for posthog service
export const posthogService = {
  capturePageView: jest.fn(),
  captureSectionTime: jest.fn(),
  captureAnalyticsViewed: jest.fn(),
  captureEggClicked: jest.fn(),
  identify: jest.fn(),
  setUserProperties: jest.fn(),
  getDistinctId: jest.fn(() => 'test-user-id'),
  capture: jest.fn(),
  people: {
    set: jest.fn()
  }
};

// Mock for api service
export const pageAnalyticsAPI = {
  incrementPageViews: jest.fn().mockResolvedValue({}),
  updateSectionTime: jest.fn().mockResolvedValue({}),
  getAnalytics: jest.fn().mockResolvedValue({
    page_views: 0,
    section_times: {}
  })
};

// Mock for env service
export const API_BASE_URL = 'http://localhost:8000/api';

// Default export for posthog
export default posthogService; 