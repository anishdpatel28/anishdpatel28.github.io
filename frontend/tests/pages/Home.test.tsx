import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../src/pages/Home';

jest.mock('@/services/api', () => ({
  pageAnalyticsAPI: {
    updateSectionTime: jest.fn().mockResolvedValue(undefined),
    incrementPageViews: jest.fn().mockResolvedValue(undefined),
    getAnalytics: jest.fn().mockResolvedValue({}),
    captureEggClick: jest.fn().mockResolvedValue(undefined),
  },
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Home', () => {
  it('renders the hero section', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/Hey, I'm/i)).toBeInTheDocument();
    expect(screen.getByText(/Fullstack Web Developer/i)).toBeInTheDocument();
  });

  it('renders the about section', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/About Me/i)).toBeInTheDocument();
    expect(screen.getByText(/Education/i)).toBeInTheDocument();
    expect(screen.getByText(/Work Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Core Skills/i)).toBeInTheDocument();
    expect(screen.getByText(/Certifications/i)).toBeInTheDocument();
  });

  it('renders the skills section', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/Skills & Technologies/i)).toBeInTheDocument();
    expect(screen.getByText(/Programming Languages/i)).toBeInTheDocument();
    expect(screen.getByText(/Frameworks & Libraries/i)).toBeInTheDocument();
    expect(screen.getByText(/Tools & Technologies/i)).toBeInTheDocument();
  });

  it('renders the projects section', () => {
    renderWithRouter(<Home />);
    expect(screen.getAllByText(/Pacman Search Algorithms/i)[0]).toBeInTheDocument();
  });

  it('renders the resume section', () => {
    renderWithRouter(<Home />);
    expect(screen.getAllByText(/Resume/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/View Resume/i)).toBeInTheDocument();
    expect(screen.getByText(/Download PDF/i)).toBeInTheDocument();
  });

  it('renders the contact section', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    const githubButtons = screen.getAllByLabelText('GitHub');
    expect(githubButtons.some(el => el.tagName === 'BUTTON')).toBe(true);
  });
});
