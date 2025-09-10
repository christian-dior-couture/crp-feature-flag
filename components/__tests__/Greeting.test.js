import { render, screen } from '@testing-library/react';
import Greeting from '../Greeting';

describe('Greeting Component', () => {
  it('renders a greeting with the provided name', () => {
    render(<Greeting name="Bolt" />);

    const greetingElement = screen.getByText(/Hello, Bolt!/i);

    expect(greetingElement).toBeInTheDocument();
  });

  it('renders a greeting with a different name', () => {
    render(<Greeting name="User" />);
    
    const greetingElement = screen.getByText('Hello, User!');

    expect(greetingElement).toBeInTheDocument();
  });
});
