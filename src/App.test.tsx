import { describe, expect, it } from 'vitest';
import { screen, render } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('should render hello world', () => {
    render(<App />);
    const heading = 'Hello world!';

    expect(
      screen.getByRole('heading', {
        level: 1,
      })
    ).toHaveTextContent(heading);
  });
});
