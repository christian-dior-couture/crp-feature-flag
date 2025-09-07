import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RolePermissionsPage from '@/app/teams/roles/RolePermissionsPage';

describe('RolePermissionsPage', () => {
  it('renders the main heading and predefined roles', () => {
    render(<RolePermissionsPage />);
    expect(screen.getByText('Roles & Permissions')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
    expect(screen.getByText('Editor')).toBeInTheDocument();
  });

  it('opens the create role dialog when "New Role" is clicked', () => {
    render(<RolePermissionsPage />);
    fireEvent.click(screen.getByText('New Role'));
    expect(screen.getByRole('dialog')).toBeVisible();
    expect(screen.getByText('Create Custom Role')).toBeInTheDocument();
  });
});
