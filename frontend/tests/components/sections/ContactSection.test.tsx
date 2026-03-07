import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactSection from '../../../src/components/sections/ContactSection';

jest.mock('../../../src/services/posthog');
jest.mock('../../../src/services/api');

describe('ContactSection', () => {
  it('renders contact section title and description', () => {
    render(
      <ContactSection mode="dark" />
    );

    expect(screen.getByText(/Get In Touch/i)).toBeInTheDocument();
    expect(screen.getByText(/always interested in new opportunities/i)).toBeInTheDocument();
  });

  it('renders social media buttons', () => {
    render(
      <ContactSection mode="dark" />
    );

    expect(screen.getByLabelText('Send email to Anish Patel')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit LinkedIn profile (opens in new tab)')).toBeInTheDocument();
    expect(screen.getByLabelText('Visit GitHub profile (opens in new tab)')).toBeInTheDocument();
  });

  it('has correct aria labels for accessibility', () => {
    render(
      <ContactSection mode="dark" />
    );

    const emailButton = screen.getByLabelText('Send email to Anish Patel');
    const linkedinButton = screen.getByLabelText('Visit LinkedIn profile (opens in new tab)');
    const githubButton = screen.getByLabelText('Visit GitHub profile (opens in new tab)');

    expect(emailButton).toBeInTheDocument();
    expect(linkedinButton).toBeInTheDocument();
    expect(githubButton).toBeInTheDocument();
  });
}); 