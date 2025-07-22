import React from 'react';
import { render, screen } from '@testing-library/react';
import TimelineNavbar from '../../src/components/TimelineNavbar';

jest.mock('gsap', () => {
  const gsap = {
    fromTo: () => { },
    to: () => { },
    registerPlugin: () => { },
  };
  return { ...gsap, default: gsap };
});

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