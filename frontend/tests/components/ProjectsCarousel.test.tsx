import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectsCarousel from '../../src/components/ProjectsCarousel';

describe('ProjectsCarousel', () => {
  it('renders the first project title', () => {
    render(<ProjectsCarousel />);
    expect(screen.getAllByText(/E-Commerce Platform/i)[0]).toBeInTheDocument();
  });

  it('navigates to the next project on right arrow click', () => {
    render(<ProjectsCarousel />);
    const rightArrow = screen.getAllByRole('button').find(btn => btn.querySelector('svg'));
    fireEvent.click(rightArrow!);
    expect(screen.getAllByText(/AI Analytics Dashboard/i)[0]).toBeInTheDocument();
  });

  it('navigates to the previous project on left arrow click', () => {
    render(<ProjectsCarousel />);
    const leftArrow = screen.getAllByRole('button').find(btn => btn.querySelector('svg'));
    fireEvent.click(leftArrow!);
    expect(screen.getAllByText(/Mobile Finance App/i)[0]).toBeInTheDocument();
  });

  it('shows technologies for the current project', () => {
    render(<ProjectsCarousel />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });
}); 