import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FeatureFlagsListPage from '@/app/flags/FeatureFlagsListPage';
import { useAppConfiguration } from '@/context/AppConfigurationContext';

jest.mock('@/context/AppConfigurationContext');
const mockUseAppConfiguration = useAppConfiguration as jest.Mock;

describe('FeatureFlagsListPage', () => {
  beforeEach(() => {
    mockUseAppConfiguration.mockReturnValue({
      project: 'WebApp',
      environment: 'production',
    });
  });

  afterEach(() => { jest.clearAllMocks(); });

  it('opens the create flag dialog when "New Flag" is clicked', () => {
    render(<FeatureFlagsListPage />);
    fireEvent.click(screen.getByText('New Flag'));
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Create Feature Flag')).toBeInTheDocument();
  });

  it('opens the delete confirmation dialog when delete icon is clicked', () => {
    render(<FeatureFlagsListPage />);
    const deleteButton = screen.getByLabelText('delete new-signup-flow');
    fireEvent.click(deleteButton);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/Delete "new-signup-flow"\?/)).toBeInTheDocument();
  });
});
