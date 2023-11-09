import { describe, expect, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import App from '.';

describe('App', () => {
  it('should render uncontrolled', () => {
    render(<App />);

    expect(screen.getByText('Uncontrolled')).toBeInTheDocument();
  });
});
