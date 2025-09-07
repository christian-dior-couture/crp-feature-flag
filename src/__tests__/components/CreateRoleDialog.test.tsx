import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateRoleDialog from '@/components/teams/CreateRoleDialog';

describe('CreateRoleDialog', () => {
    const mockOnClose = jest.fn();
    const mockOnCreate = jest.fn();

    it('renders the dialog with permission checkboxes', () => {
        render(<CreateRoleDialog open={true} onClose={mockOnClose} onCreate={mockOnCreate} />);
        expect(screen.getByText('Create Custom Role')).toBeInTheDocument();
        expect(screen.getByLabelText('Role Name')).toBeInTheDocument();
        // Check for a resource and a permission
        expect(screen.getByText('Projects')).toBeInTheDocument();
        expect(screen.getByLabelText('create')).toBeInTheDocument();
    });

    it('selects permissions and calls onCreate', () => {
        render(<CreateRoleDialog open={true} onClose={mockOnClose} onCreate={mockOnCreate} />);
        fireEvent.change(screen.getByLabelText('Role Name'), { target: { value: 'Test Role' } });
        fireEvent.click(screen.getByLabelText('view')); // From Projects
        
        fireEvent.click(screen.getByText('Create Role'));
        
        expect(mockOnCreate).toHaveBeenCalledWith(expect.objectContaining({
            name: 'Test Role',
            permissions: expect.arrayContaining(['view:projects'])
        }));
    });
});
