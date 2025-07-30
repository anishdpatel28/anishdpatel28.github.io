import React from 'react';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';

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
  it('renders the logo', () => {
    render(<Navbar />);
    expect(screen.getByText(/Anish Patel/i)).toBeInTheDocument();
  });

  it('renders all nav items', () => {
    render(<Navbar />);
    ['Home', 'About', 'Projects', 'Resume', 'Contact'].forEach(label => {
      expect(screen.getAllByText(label)[0]).toBeInTheDocument();
    });
  });

  it('opens and closes the mobile menu', async () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText(/menu/i);
    fireEvent.click(menuButton);
    expect(screen.getByText('Menu')).toBeInTheDocument();
    const closeButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(closeButtons[closeButtons.length - 1]);
    await waitForElementToBeRemoved(() => screen.queryByText('Menu'));
  });
}); 