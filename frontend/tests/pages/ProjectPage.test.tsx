import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

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
    people: { set: jest.fn() }
  }
}));

jest.mock('../../src/services/api', () => ({
  pageAnalyticsAPI: {
    incrementPageViews: jest.fn().mockResolvedValue({}),
    updateSectionTime: jest.fn().mockResolvedValue({}),
    getAnalytics: jest.fn().mockResolvedValue({ page_views: 0, section_times: {} }),
    captureEggClick: jest.fn().mockResolvedValue(undefined)
  }
}));

jest.mock('gsap', () => ({
  default: {
    to: jest.fn(),
    fromTo: jest.fn(),
    set: jest.fn()
  }
}));

import ProjectPage from '../../src/pages/ProjectPage';
import { ThemeContext } from '../../src/App';

describe('ProjectPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.defineProperty(window, 'scrollTo', {
      value: jest.fn(),
      writable: true
    });
  });

  const renderWithRouter = (projectId: string) => {
    const themeContextValue = {
      mode: 'dark' as const,
      toggleTheme: jest.fn()
    };

    const router = createMemoryRouter(
      [{ path: '/projects/:projectId', element: <ProjectPage /> }],
      { initialEntries: [`/projects/${projectId}`] }
    );

    return render(
      <ThemeContext.Provider value={themeContextValue}>
        <RouterProvider router={router} />
      </ThemeContext.Provider>
    );
  };

  it('renders the pacman AI project page', () => {
    renderWithRouter('pacman-ai');
    expect(screen.getByText('Pacman AI Projects')).toBeInTheDocument();
  });

  it('displays project technologies', () => {
    renderWithRouter('pacman-ai');
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Graph Algorithms')).toBeInTheDocument();
  });

  it('displays project features', () => {
    renderWithRouter('pacman-ai');
    expect(screen.getByText('Key Features')).toBeInTheDocument();
    const features = screen.getAllByText(/Alpha-Beta Pruning/i);
    expect(features.length).toBeGreaterThan(0);
  });

  it('displays back to home button', () => {
    renderWithRouter('pacman-ai');
    expect(screen.getByText('Back to Home')).toBeInTheDocument();
  });

  it('renders sentiment analysis project page', () => {
    renderWithRouter('sentiment-analysis');
    expect(screen.getByText('Sentiment Analysis for Portfolio Optimization')).toBeInTheDocument();
  });

  it('renders college marketplace project page', () => {
    renderWithRouter('college-marketplace');
    expect(screen.getByText('College Marketplace')).toBeInTheDocument();
  });

  it('renders scary racing game project page', () => {
    renderWithRouter('scary-racing-game');
    expect(screen.getByText('Scary Racing Game')).toBeInTheDocument();
  });
});
