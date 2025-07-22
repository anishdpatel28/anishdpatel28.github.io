import axios from 'axios';

const mockGet = jest.fn();
const mockPost = jest.fn();
const mockUse = jest.fn();

jest.mock('axios');
(axios.create as jest.Mock).mockReturnValue({
  get: mockGet,
  post: mockPost,
  interceptors: { response: { use: mockUse } },
});

jest.mock('../../src/services/env', () => ({
  API_BASE_URL: 'http://localhost:8000/api',
}));

jest.mock('../../src/services/posthog', () => ({
  __esModule: true,
  default: {
    captureAnalyticsViewed: jest.fn(),
    capturePageView: jest.fn(),
    captureSectionTime: jest.fn(),
    captureEggClicked: jest.fn(),
  },
}));

import posthogService from '../../src/services/posthog';
import { pageAnalyticsAPI, pageViewsAPI } from '../../src/services/api';

describe('pageAnalyticsAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getAnalytics calls GET /page-views/ and tracks analytics viewed', async () => {
    mockGet.mockResolvedValueOnce({ data: { foo: 'bar' } });
    const data = await pageAnalyticsAPI.getAnalytics();
    expect(mockGet).toHaveBeenCalledWith('/page-views/');
    expect(posthogService.captureAnalyticsViewed).toHaveBeenCalled();
    expect(data).toEqual({ foo: 'bar' });
  });

  it('incrementPageViews calls POST /page-views/increment/ and tracks page view', async () => {
    mockPost.mockResolvedValueOnce({ data: { page_views: 42 } });
    await pageAnalyticsAPI.incrementPageViews();
    expect(mockPost).toHaveBeenCalledWith('/page-views/increment/');
    expect(posthogService.capturePageView).toHaveBeenCalledWith({ total_page_views: 42 });
  });

  it('updateSectionTime calls POST /page-views/update-time/ and tracks section time', async () => {
    mockPost.mockResolvedValueOnce({});
    await pageAnalyticsAPI.updateSectionTime('home', 10);
    expect(mockPost).toHaveBeenCalledWith('/page-views/update-time/', { section: 'home', time_spent: 10 });
    expect(posthogService.captureSectionTime).toHaveBeenCalledWith('home', 10);
  });

  it('captureEggClick calls POST /page-views/egg-click/ and tracks egg clicked', async () => {
    mockPost.mockResolvedValueOnce({});
    await pageAnalyticsAPI.captureEggClick();
    expect(mockPost).toHaveBeenCalledWith('/page-views/egg-click/');
    expect(posthogService.captureEggClicked).toHaveBeenCalled();
  });
});

describe('pageViewsAPI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('getPageViews returns the number from analytics', async () => {
    jest.spyOn(pageAnalyticsAPI, 'getAnalytics').mockResolvedValueOnce({ page_views: 123 });
    const views = await pageViewsAPI.getPageViews();
    expect(views).toBe(123);
  });

  it('getPageViews returns 0 if analytics.page_views is not a number', async () => {
    jest.spyOn(pageAnalyticsAPI, 'getAnalytics').mockResolvedValueOnce({ page_views: undefined });
    const views = await pageViewsAPI.getPageViews();
    expect(views).toBe(0);
  });

  it('incrementPageViews calls pageAnalyticsAPI.incrementPageViews', async () => {
    const spy = jest.spyOn(pageAnalyticsAPI, 'incrementPageViews').mockResolvedValueOnce(undefined);
    await pageViewsAPI.incrementPageViews();
    expect(spy).toHaveBeenCalled();
  });
}); 