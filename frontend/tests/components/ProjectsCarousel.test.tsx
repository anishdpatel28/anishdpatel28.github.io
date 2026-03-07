import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

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

jest.mock('gsap', () => ({
  default: {
    to: jest.fn(),
    fromTo: jest.fn(),
    set: jest.fn()
  }
}));

import ProjectsCarousel from '../../src/components/ProjectsCarousel';
import { ThemeContext } from '../../src/App';

describe('ProjectsCarousel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithTheme = (component: React.ReactElement) => {
    const themeContextValue = {
      mode: 'dark' as const,
      toggleTheme: jest.fn()
    };

    return render(
      <BrowserRouter>
        <ThemeContext.Provider value={themeContextValue}>
          {component}
        </ThemeContext.Provider>
      </BrowserRouter>
    );
  };

  it('renders project titles', () => {
    renderWithTheme(<ProjectsCarousel />);
    expect(screen.getAllByText(/Sentiment Analysis for Portfolio Optimization/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Pacman AI Projects/i)[0]).toBeInTheDocument();
  });

  it('renders navigation arrows', () => {
    renderWithTheme(<ProjectsCarousel />);
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(2);
  });

  it('renders project cards with categories', () => {
    renderWithTheme(<ProjectsCarousel />);
    expect(screen.getAllByText('AI/ML').length).toBeGreaterThanOrEqual(1);
  });
});
