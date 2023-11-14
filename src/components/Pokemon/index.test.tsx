import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '../../test';
import App from '../../app';

describe('Pokemon', () => {
  it('Validate that card is displaying the relevant data', async () => {
    renderWithProviders(<App />);

    expect(await screen.findByText('bulbasaur')).toHaveTextContent('bulbasaur');
    expect(await screen.findByRole('link')).toHaveAttribute('href', '/search/1?details=1&page=1');
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    renderWithProviders(<App />);

    const button = await screen.findByText('Open the pokemon');
    fireEvent.click(button);

    waitFor(async () => {
      expect(await screen.findByText(/IVYSAUR/)).toHaveTextContent(/IVYSAUR/);
    });
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    renderWithProviders(<App />);

    // Check your browser

    //
  });
});
