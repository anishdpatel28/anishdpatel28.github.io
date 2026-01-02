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

  it('renders the first project title', () => {
    renderWithTheme(<ProjectsCarousel />);
    expect(screen.getAllByText(/Pacman Search Algorithms/i)[0]).toBeInTheDocument();
  });

  it('navigates to the next project on right arrow click', () => {
    renderWithTheme(<ProjectsCarousel />);
    const rightArrow = screen.getAllByRole('button').find(btn => btn.querySelector('svg'));
    fireEvent.click(rightArrow!);
    expect(screen.getAllByText(/Multi-Agent Search/i)[0]).toBeInTheDocument();
  });

  it('navigates to the previous project on left arrow click', () => {
    renderWithTheme(<ProjectsCarousel />);
    const leftArrow = screen.getAllByRole('button').find(btn => btn.querySelector('svg'));
    fireEvent.click(leftArrow!);
    expect(screen.getAllByText(/Ghostbusters: Probabilistic Inference/i)[0]).toBeInTheDocument();
  });

  it('shows technologies for the current project', () => {
    renderWithTheme(<ProjectsCarousel />);
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('Graph Algorithms')).toBeInTheDocument();
  });
});
