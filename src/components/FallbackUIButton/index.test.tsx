import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Theme from '../../theme';
import FallbackUIButton from '.';

function Wrapper() {
  return (
    <Theme>
      <FallbackUIButton />
    </Theme>
  );
}

describe('FallbackUIButton', () => {
  it('should render FallbackUIButton', async () => {
    render(<Wrapper />);
    const button: HTMLButtonElement = await screen.findByText('Get an error');
    expect(button).toBeInTheDocument();
  });

  it('should click FallbackUIButton and throw error', async () => {
    let message = '';

    try {
      render(<Wrapper />);

      const button: HTMLButtonElement = await screen.findByText('Get an error');
      fireEvent.click(button);
    } catch (e) {
      if (e instanceof Error) {
        message = e.message;
      }
    }

    expect(message).toBe('Test error throwing');
  });
});
