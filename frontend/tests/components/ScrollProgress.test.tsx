jest.mock('gsap', () => {
  const gsap = {
    fromTo: () => { },
    to: () => { },
    registerPlugin: () => { },
  };
  return { ...gsap, default: gsap };
});
jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { getAll: () => [] },
}));

import React from 'react';
import { render } from '@testing-library/react';
import ScrollProgress from '../../src/components/ScrollProgress';

describe('ScrollProgress', () => {
  it('renders the progress bar', () => {
    const { container } = render(<ScrollProgress />);
    const bar = container.querySelector('div[style*="scaleX(0)"]');
    expect(bar).toBeInTheDocument();
  });

  it('has correct initial style', () => {
    const { container } = render(<ScrollProgress />);
    const bar = container.querySelector('div[style*="scaleX(0)"]');
    expect(bar).toBeInTheDocument();
  });
}); 