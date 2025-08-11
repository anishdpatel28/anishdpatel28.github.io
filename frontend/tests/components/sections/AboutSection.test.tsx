import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutSection from '../../../src/components/sections/AboutSection';

jest.mock('../../../src/services/posthog');
jest.mock('../../../src/services/api');

describe('AboutSection', () => {
  it('renders about content correctly', () => {
    render(
      <AboutSection mode="dark" />
    );

    expect(screen.getByText(/About Me/i)).toBeInTheDocument();
    expect(screen.getByText(/Computer Science student at RPI/i)).toBeInTheDocument();
  });

  it('renders education section', () => {
    render(
      <AboutSection mode="dark" />
    );

    expect(screen.getByText(/Education/i)).toBeInTheDocument();
    expect(screen.getByText(/Rensselaer Polytechnic Institute/i)).toBeInTheDocument();
    expect(screen.getByText(/B\.S\. in Computer Science/i)).toBeInTheDocument();
  });

  it('renders work experience section', () => {
    render(
      <AboutSection mode="dark" />
    );

    expect(screen.getByText(/Work Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/SWE Intern/i)).toBeInTheDocument();
  });

  it('renders skills and certifications sections', () => {
    render(
      <AboutSection mode="dark" />
    );

    expect(screen.getByText(/Core Skills/i)).toBeInTheDocument();
    expect(screen.getByText(/Certifications/i)).toBeInTheDocument();
    expect(screen.getByText(/Oracle Certified/i)).toBeInTheDocument();
  });
}); 