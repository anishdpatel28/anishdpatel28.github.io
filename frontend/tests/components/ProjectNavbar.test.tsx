import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
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

import ProjectNavbar from '../../src/components/ProjectNavbar';
import { ThemeContext } from '../../src/App';

describe('ProjectNavbar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProviders = (component: React.ReactElement) => {
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

  it('renders home and projects buttons', () => {
    renderWithProviders(<ProjectNavbar />);
    expect(screen.getByLabelText('Navigate to Home')).toBeInTheDocument();
    expect(screen.getByLabelText('Browse projects')).toBeInTheDocument();
  });

  it('opens projects dropdown menu on click', () => {
    renderWithProviders(<ProjectNavbar />);
    const projectsButton = screen.getByLabelText('Browse projects');
    fireEvent.click(projectsButton);
    expect(screen.getByText('All Projects')).toBeInTheDocument();
  });

  it('displays all projects in the dropdown', () => {
    renderWithProviders(<ProjectNavbar />);
    const projectsButton = screen.getByLabelText('Browse projects');
    fireEvent.click(projectsButton);
    expect(screen.getByRole('menuitem', { name: /All Projects/i })).toBeInTheDocument();
  });
});
