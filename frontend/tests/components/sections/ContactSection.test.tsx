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

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
  });

  it('has correct aria labels for accessibility', () => {
    render(
      <ContactSection mode="dark" />
    );

    const emailButton = screen.getByLabelText('Email');
    const linkedinButton = screen.getByLabelText('LinkedIn');
    const githubButton = screen.getByLabelText('GitHub');

    expect(emailButton).toBeInTheDocument();
    expect(linkedinButton).toBeInTheDocument();
    expect(githubButton).toBeInTheDocument();
  });
}); 