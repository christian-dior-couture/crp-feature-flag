import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProjectsDashboardPage from '@/app/ProjectsDashboardPage';
import { useAppConfiguration } from '@/context/AppConfigurationContext';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('@/context/AppConfigurationContext');
const mockUseAppConfiguration = useAppConfiguration as jest.Mock;

describe('ProjectsDashboardPage', () => {
  beforeEach(() => {
    mockUseAppConfiguration.mockReturnValue({
      projects: ['WebApp', 'MobileApp'],
      setProject: jest.fn(),
      addProject: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<ProjectsDashboardPage />);
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('WebApp')).toBeInTheDocument();
    expect(screen.getByText('MobileApp')).toBeInTheDocument();
  });

  it('opens create project dialog', () => {
    render(<ProjectsDashboardPage />);
    fireEvent.click(screen.getByText('Create Project'));
    expect(screen.getByRole('dialog')).toBeVisible();
  });

  it('navigates on "Go to Project" click', () => {
    const setProjectMock = jest.fn();
    const pushMock = jest.fn();
    mockUseAppConfiguration.mockReturnValue({ ...mockUseAppConfiguration(), setProject: setProjectMock });
    jest.spyOn(require('next/navigation'), 'useRouter').mockImplementation(() => ({ push: pushMock }));

    render(<ProjectsDashboardPage />);
    fireEvent.click(screen.getAllByText('Go to Project')[0]);
    expect(setProjectMock).toHaveBeenCalledWith('WebApp');
    expect(pushMock).toHaveBeenCalledWith('/flags');
  });
});
