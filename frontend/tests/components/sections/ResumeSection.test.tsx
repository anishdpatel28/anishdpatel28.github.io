import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResumeSection from '../../../src/components/sections/ResumeSection';

jest.mock('../../../src/services/posthog');
jest.mock('../../../src/services/api');

describe('ResumeSection', () => {
  it('renders resume section title and description', () => {
    render(
      <ResumeSection mode="dark" />
    );

    expect(screen.getByText(/Resume & Experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Download my resume to learn more/i)).toBeInTheDocument();
  });

  it('renders view resume button with correct link', () => {
    render(
      <ResumeSection mode="dark" />
    );

    const viewButton = screen.getByText(/View Resume/i).closest('a');
    expect(viewButton).toBeInTheDocument();
    expect(viewButton).toHaveAttribute('href', 'https://drive.google.com/file/d/19BGb6xdeRADI9lLYGqFvN8jCOlfzvm3h/view');
    expect(viewButton).toHaveAttribute('target', '_blank');
  });

  it('renders download PDF button with correct link', () => {
    render(
      <ResumeSection mode="dark" />
    );

    const downloadButton = screen.getByText(/Download PDF/i).closest('a');
    expect(downloadButton).toBeInTheDocument();
    expect(downloadButton).toHaveAttribute('href', 'https://drive.google.com/uc?export=download&id=19BGb6xdeRADI9lLYGqFvN8jCOlfzvm3h');
    expect(downloadButton).toHaveAttribute('target', '_blank');
  });
}); 