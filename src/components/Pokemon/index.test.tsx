import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '../../test';
import Pokemon from '.';
import App from '../../app';

describe('Pokemon', () => {
  it('Validate that card is displaying the relevant data', async () => {
    renderWithProviders(
      <Pokemon pokemon={{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }} />
    );

    expect(await screen.findByText('bulbasaur')).toHaveTextContent('bulbasaur');
    expect(await screen.findByRole('link')).toHaveAttribute(
      'href',
      '/search/1?details=1&page=null'
    );
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    renderWithProviders(<App />);

    const button: HTMLButtonElement = await screen.findByText('Open the pokemon');
    fireEvent.click(button);
    const detailedInfoAfter = await screen.findByText(/BULBASAUR/);

    expect(detailedInfoAfter).toBeInTheDocument();
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const button: HTMLButtonElement = await screen.findByText('Open the pokemon');
    fireEvent.click(button);
  });
});
