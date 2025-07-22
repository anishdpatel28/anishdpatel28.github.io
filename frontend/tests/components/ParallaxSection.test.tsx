import React from 'react';
import { render, screen } from '@testing-library/react';
import ParallaxSection from '../../src/components/ParallaxSection';

describe('ParallaxSection', () => {
  it('renders children', () => {
    render(<ParallaxSection>Test Content</ParallaxSection>);
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies background image and color', () => {
    render(
      <ParallaxSection backgroundImage="test.jpg" backgroundColor="#123456">Test</ParallaxSection>
    );
    const bgDiv = screen.getByText('Test').parentElement?.parentElement?.querySelector('div[style*="test.jpg"]');
    expect(bgDiv).toBeInTheDocument();
    expect(bgDiv).toHaveStyle('background-color: #123456');
  });

  it('supports custom height and id', () => {
    const { container } = render(
      <ParallaxSection id="parallax-test" height="50vh">Test</ParallaxSection>
    );
    const section = container.querySelector('#parallax-test');
    expect(section).toHaveStyle('height: 50vh');
  });
}); 