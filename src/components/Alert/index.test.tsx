import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Theme from '../../theme';
import Alert from '.';

describe('Alert', () => {
  it('should render Alert', async () => {
    render(
      <Theme>
        <Alert type="error" message="Error" description="Big error" />
      </Theme>
    );

    const message = await screen.findByText('Error');
    expect(message).toHaveTextContent('Error');

    const description = await screen.findByText('Big error');
    expect(description).toHaveTextContent('Big error');
  });

  it("should render Alert when it's info", async () => {
    render(
      <Theme>
        <Alert type="info" message="Info" description="Info message" />
      </Theme>
    );

    const message = await screen.findByText('Info');
    expect(message).toHaveTextContent('Info');

    const description = await screen.findByText('Info message');
    expect(description).toHaveTextContent('Info message');
  });
});
