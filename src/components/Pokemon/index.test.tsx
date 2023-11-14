import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '../../test';
import Pokemon from '.';
import App from '../../app';

describe('Pokemon', () => {
  const pokemon = {
    name: 'bulbasaur',
    sprites: {
      front_default: '',
    },
    height: 200,
    weight: 100,
  };

  const pokemonList = {
    meta: {
      total_pages: 2,
    },
    items: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
  };

  const fakeFetch: typeof fetch = async () => {
    return { json: async () => pokemonList } as Response;
  };

  const fakePokemonFetch: typeof fetch = async () => {
    return { json: async () => pokemon } as Response;
  };

  it('Validate that card is displaying the relevant data', async () => {
    vi.spyOn(window, 'fetch').mockImplementation(fakeFetch);
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
    vi.spyOn(window, 'fetch').mockImplementation(fakeFetch);

    renderWithProviders(<App />);

    waitFor(async () => {
      const button: HTMLButtonElement = await screen.findByText('Open the pokemon');
      fireEvent.click(button);
      const detailedInfoAfter = await screen.findByText(/BULBASAUR/);

      expect(detailedInfoAfter).toBeInTheDocument();
    });
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    vi.spyOn(window, 'fetch')
      .mockImplementationOnce(fakeFetch)
      .mockImplementationOnce(fakePokemonFetch);

    renderWithProviders(<App />);

    waitFor(async () => {
      const button: HTMLButtonElement = await screen.findByText('Open the pokemon');
      fireEvent.click(button);

      expect(fakeFetch).toBeCalled();
    });
  });
});
