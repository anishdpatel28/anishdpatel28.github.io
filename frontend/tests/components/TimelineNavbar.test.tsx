import React from 'react';
import { render, screen } from '@testing-library/react';

// Mock services
jest.mock('../../src/services/posthog', () => ({
  __esModule: true,
  default: {
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
  }
}));

jest.mock('../../src/services/api', () => ({
  pageAnalyticsAPI: {
    incrementPageViews: jest.fn().mockResolvedValue({}),
    updateSectionTime: jest.fn().mockResolvedValue({}),
    getAnalytics: jest.fn().mockResolvedValue({
      page_views: 0,
      section_times: {}
    })
  }
}));

jest.mock('gsap', () => {
  const gsap = {
    fromTo: () => { },
    to: () => { },
    registerPlugin: () => { },
  };
  return { ...gsap, default: gsap };
});

import TimelineNavbar from '../../src/components/TimelineNavbar';

describe('TimelineNavbar', () => {
  it('renders all section icons', () => {
    render(<TimelineNavbar />);
    ['home', 'about', 'skills', 'projects', 'resume', 'contact'].forEach(id => {
      expect(screen.getByLabelText(id)).toBeInTheDocument();
    });
  });

  it('highlights the home section by default', () => {
    render(<TimelineNavbar />);
    const homeButton = screen.getByLabelText('home');
    expect(homeButton).toHaveStyle('color: #e0e1dd');
  });
}); 