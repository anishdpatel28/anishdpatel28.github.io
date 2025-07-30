export const pageAnalyticsAPI = {
  incrementPageViews: jest.fn().mockResolvedValue({}),
  updateSectionTime: jest.fn().mockResolvedValue({}),
  getAnalytics: jest.fn().mockResolvedValue({
    page_views: 0,
    section_times: {}
  })
}; 