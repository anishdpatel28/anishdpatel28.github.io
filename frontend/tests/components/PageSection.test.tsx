import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageSection from '../../src/components/PageSection';

describe('PageSection', () => {
  it('renders children correctly', () => {
    render(
      <PageSection>
        <div>Test content</div>
      </PageSection>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies custom id', () => {
    const { container } = render(
      <PageSection id="test-section">
        <div>Test content</div>
      </PageSection>
    );

    expect(container.firstChild).toHaveAttribute('id', 'test-section');
  });

  it('applies custom background', () => {
    const { container } = render(
      <PageSection background="linear-gradient(135deg, #ff0000 0%, #0000ff 100%)">
        <div>Test content</div>
      </PageSection>
    );

    const section = container.firstChild as HTMLElement;
    expect(section).toHaveStyle('background: linear-gradient(135deg, #ff0000 0%, #0000ff 100%)');
  });

  it('applies custom className', () => {
    const { container } = render(
      <PageSection className="custom-class">
        <div>Test content</div>
      </PageSection>
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('uses default minHeight of 100vh', () => {
    const { container } = render(
      <PageSection>
        <div>Test content</div>
      </PageSection>
    );

    const section = container.firstChild as HTMLElement;
    expect(section).toHaveStyle('min-height: 100vh');
  });

  it('applies custom minHeight', () => {
    const { container } = render(
      <PageSection minHeight="50vh">
        <div>Test content</div>
      </PageSection>
    );

    const section = container.firstChild as HTMLElement;
    expect(section).toHaveStyle('min-height: 50vh');
  });
}); 