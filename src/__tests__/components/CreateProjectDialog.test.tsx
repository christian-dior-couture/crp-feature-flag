import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateProjectDialog from '@/components/projects/CreateProjectDialog';

describe('CreateProjectDialog', () => {
  const mockOnClose = jest.fn();
  const mockOnCreate = jest.fn();

  beforeEach(() => { jest.clearAllMocks(); });

  it('shows error if name is empty on create', () => {
    render(<CreateProjectDialog open={true} onClose={mockOnClose} onCreate={mockOnCreate} />);
    const createButton = screen.getByRole('button', { name: /create/i });
    fireEvent.click(createButton);
    
    // Assert that the input field is now marked as invalid
    const input = screen.getByLabelText(/Project Name/i);
    expect(input).toBeInvalid();

    // Assert that the helper text with the error message is visible
    expect(screen.getByText('Project name cannot be empty.')).toBeVisible();
    expect(mockOnCreate).not.toHaveBeenCalled();
  });

  it('calls onCreate with project name', () => {
    render(<CreateProjectDialog open={true} onClose={mockOnClose} onCreate={mockOnCreate} />);
    fireEvent.change(screen.getByLabelText(/Project Name/i), { target: { value: 'My New Project' } });
    fireEvent.click(screen.getByRole('button', { name: /create/i }));
    expect(mockOnCreate).toHaveBeenCalledWith('My New Project');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
