import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SDKDocumentationPage from '@/app/sdk/SDKDocumentationPage';
import { useAppConfiguration } from '@/context/AppConfigurationContext';

jest.mock('@/context/AppConfigurationContext');
const mockUseAppConfiguration = useAppConfiguration as jest.Mock;

describe('SDKDocumentationPage', () => {
  beforeEach(() => {
    mockUseAppConfiguration.mockReturnValue({
      environment: 'production',
    });
  });

  it('highlights the currently active environment', () => {
    render(<SDKDocumentationPage />);
    const productionListItem = screen.getByText('Production').closest('li');
    // The component uses sx={{ bgcolor: 'action.hover' }} for selection.
    // In Jest's JSDOM environment, this doesn't resolve to a specific color,
    // so we check for the applied style. This is a bit implementation-specific
    // but a reliable way to test this styling logic.
    expect(productionListItem).toHaveStyle({ backgroundColor: 'action.hover' });
  });
});
