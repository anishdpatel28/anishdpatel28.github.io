import React from 'react';
import { render, screen, fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import Navbar from '../../src/components/Navbar';

jest.mock('gsap', () => {
  const gsap = {
    fromTo: () => { },
    to: () => { },
    registerPlugin: () => { },
  };
  return { ...gsap, default: gsap };
});

describe('Navbar', () => {
  it('renders the logo', () => {
    render(<Navbar />);
    expect(screen.getByText(/Anish Patel/i)).toBeInTheDocument();
  });

  it('renders all nav items', () => {
    render(<Navbar />);
    ['Home', 'About', 'Projects', 'Resume', 'Contact'].forEach(label => {
      expect(screen.getAllByText(label)[0]).toBeInTheDocument();
    });
  });

  it('opens and closes the mobile menu', async () => {
    render(<Navbar />);
    const menuButton = screen.getByLabelText(/menu/i);
    fireEvent.click(menuButton);
    expect(screen.getByText('Menu')).toBeInTheDocument();
    const closeButtons = screen.getAllByRole('button', { name: '' });
    fireEvent.click(closeButtons[closeButtons.length - 1]);
    await waitForElementToBeRemoved(() => screen.queryByText('Menu'));
  });
}); 