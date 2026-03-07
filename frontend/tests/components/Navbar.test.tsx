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

import Navbar from '../../src/components/Navbar';

describe('Navbar', () => {
  it('renders all section icons', () => {
    render(<Navbar />);
    ['Home', 'About', 'Skills', 'Projects', 'Resume', 'Contact'].forEach(name => {
      expect(screen.getByLabelText(`Navigate to ${name}`)).toBeInTheDocument();
    });
  });

  it('highlights the home section by default', () => {
    render(<Navbar />);
    const homeButton = screen.getByLabelText('Navigate to Home');
    expect(homeButton).toBeInTheDocument();
  });
}); 