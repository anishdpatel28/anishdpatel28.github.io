import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import AnalyticsDialog from '../../src/components/AnalyticsDialog';

jest.mock('../../src/services/posthog');
jest.mock('../../src/services/api');

const mockAnalytics = {
  page_views: 42,
  time_spent_home: 1800,
  time_spent_about: 600,
  time_spent_skills: 300,
  time_spent_projects: 900,
  time_spent_resume: 150,
  time_spent_contact: 75,
  most_viewed_section: 'home',
  average_session_duration: 960
};

describe('AnalyticsDialog', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('renders analytics dialog when open', () => {
    render(
      <AnalyticsDialog
        open={true}
        onClose={mockOnClose}
        analytics={mockAnalytics}
        mode="dark"
      />
    );

    expect(screen.getByText('Page Analytics')).toBeInTheDocument();
    expect(screen.getByText('Page Views: 42')).toBeInTheDocument();
    expect(screen.getByText(/Time spent per section/i)).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(
      <AnalyticsDialog
        open={false}
        onClose={mockOnClose}
        analytics={mockAnalytics}
        mode="dark"
      />
    );

    expect(screen.queryByText('Page Analytics')).not.toBeInTheDocument();
  });

  it('displays formatted time correctly', () => {
    render(
      <AnalyticsDialog
        open={true}
        onClose={mockOnClose}
        analytics={mockAnalytics}
        mode="dark"
      />
    );

    expect(screen.getByText(/Average session duration: 16m 0s/i)).toBeInTheDocument();
  });

  it('displays most viewed section correctly', () => {
    render(
      <AnalyticsDialog
        open={true}
        onClose={mockOnClose}
        analytics={mockAnalytics}
        mode="dark"
      />
    );

    expect(screen.getByText(/Most viewed section: Home/i)).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();

    render(
      <AnalyticsDialog
        open={true}
        onClose={mockOnClose}
        analytics={mockAnalytics}
        mode="dark"
      />
    );

    const closeButton = screen.getByText('Close');
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('handles null analytics gracefully', () => {
    render(
      <AnalyticsDialog
        open={true}
        onClose={mockOnClose}
        analytics={null}
        mode="dark"
      />
    );

    expect(screen.getByText('Page Views: 0')).toBeInTheDocument();
    expect(screen.getByText(/Most viewed section: Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Average session duration: 0s/i)).toBeInTheDocument();
  });
}); 