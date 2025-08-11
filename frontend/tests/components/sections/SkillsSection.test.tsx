import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkillsSection from '../../../src/components/sections/SkillsSection';

jest.mock('../../../src/services/posthog');
jest.mock('../../../src/services/api');

describe('SkillsSection', () => {
  it('renders skills section title', () => {
    render(
      <SkillsSection mode="dark" />
    );

    expect(screen.getByText(/Skills & Technologies/i)).toBeInTheDocument();
  });

  it('renders programming languages section', () => {
    render(
      <SkillsSection mode="dark" />
    );

    expect(screen.getByText(/Programming Languages/i)).toBeInTheDocument();
    expect(screen.getByAltText('Python')).toBeInTheDocument();
    expect(screen.getByAltText('JavaScript')).toBeInTheDocument();
    expect(screen.getByAltText('Java')).toBeInTheDocument();
  });

  it('renders frameworks section', () => {
    render(
      <SkillsSection mode="dark" />
    );

    expect(screen.getByText(/Frameworks & Libraries/i)).toBeInTheDocument();
    expect(screen.getByAltText('React')).toBeInTheDocument();
    expect(screen.getByAltText('Django')).toBeInTheDocument();
    expect(screen.getByAltText('NodeJS')).toBeInTheDocument();
  });

  it('renders tools section', () => {
    render(
      <SkillsSection mode="dark" />
    );

    expect(screen.getByText(/Tools & Technologies/i)).toBeInTheDocument();
    expect(screen.getByAltText('Docker')).toBeInTheDocument();
    expect(screen.getByAltText('Git')).toBeInTheDocument();
    expect(screen.getByAltText('PostgreSQL')).toBeInTheDocument();
  });
}); 