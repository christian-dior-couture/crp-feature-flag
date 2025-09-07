import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateFeatureFlagDialog from '@/components/flags/CreateFeatureFlagDialog';

describe('CreateFeatureFlagDialog', () => {
  const mockOnClose = jest.fn();
  const mockOnCreate = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  it('proceeds to step 2 after filling details', () => {
    render(<CreateFeatureFlagDialog open={true} onClose={mockOnClose} onCreate={mockOnCreate} />);
    fireEvent.change(screen.getByLabelText(/Flag Name/), { target: { value: 'test-flag' } });
    fireEvent.change(screen.getByLabelText(/Description/), { target: { value: 'A test description' } });
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Variations')).toBeInTheDocument();
  });
});
