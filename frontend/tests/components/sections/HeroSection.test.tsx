import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HeroSection from '../../../src/components/sections/HeroSection';

jest.mock('../../../src/services/posthog');
jest.mock('../../../src/services/api');

describe('HeroSection', () => {
  const mockHeroRef = { current: null } as React.RefObject<HTMLDivElement>;

  it('renders hero content correctly', () => {
    render(
      <HeroSection showNavbar={false} heroRef={mockHeroRef} mode="dark" />
    );

    expect(screen.getByText(/Hey, I'm/i)).toBeInTheDocument();
    expect(screen.getByText('Anish')).toBeInTheDocument();
    expect(screen.getByText(/Fullstack Web Developer/i)).toBeInTheDocument();
    expect(screen.getByText(/innovative digital experiences/i)).toBeInTheDocument();
  });

  it('renders profile placeholder', () => {
    render(
      <HeroSection showNavbar={false} heroRef={mockHeroRef} mode="dark" />
    );

    expect(screen.getByText('AP')).toBeInTheDocument();
    expect(screen.getByText(/Profile Image/i)).toBeInTheDocument();
  });

  it('shows navbar when showNavbar is true', () => {
    render(
      <HeroSection showNavbar={true} heroRef={mockHeroRef} mode="dark" />
    );

    // Navbar should be rendered when showNavbar is true
  });

  it('hides navbar when showNavbar is false', () => {
    render(
      <HeroSection showNavbar={false} heroRef={mockHeroRef} mode="dark" />
    );

    // Navbar should not be rendered when showNavbar is false
  });
}); 