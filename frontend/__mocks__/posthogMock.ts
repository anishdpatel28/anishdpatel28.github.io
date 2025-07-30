const posthogService = {
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

export default posthogService; 