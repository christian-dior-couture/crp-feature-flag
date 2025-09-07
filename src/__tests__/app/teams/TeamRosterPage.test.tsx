import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TeamRosterPage from '@/app/teams/TeamRosterPage';

describe('TeamRosterPage', () => {
  it('renders the main heading and the New Team button', () => {
    render(<TeamRosterPage />);
    expect(screen.getByText('Teams')).toBeInTheDocument();
    expect(screen.getByText('New Team')).toBeInTheDocument();
  });
  
  it('renders the info alert about Okta sync', () => {
    render(<TeamRosterPage />);
    expect(screen.getByText(/Sync Okta groups/)).toBeInTheDocument();
  });

  it('renders the team names from the initial data', () => {
    render(<TeamRosterPage />);
    expect(screen.getByText('Frontend Wizards')).toBeInTheDocument();
    expect(screen.getByText('API Guardians')).toBeInTheDocument();
  });
});
