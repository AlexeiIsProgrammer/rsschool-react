import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import PokemonCard from '.';
import { renderWithProviders } from '../../test';
import App from '../../app';

describe('Pokemon card', () => {
  const pokemon = {
    name: 'Ivysaur',
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

  vi.spyOn(window, 'fetch')
    .mockImplementationOnce(fakeFetch)
    .mockImplementationOnce(fakePokemonFetch);

  it('Check that a loading indicator is displayed while fetching data', async () => {
    renderWithProviders(<PokemonCard pokemon={pokemon} loading />);

    waitFor(async () => {
      const spinner = await screen.getByText('spinner');

      expect(spinner).toBeInTheDocument();
    });
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    renderWithProviders(<PokemonCard pokemon={pokemon} loading={false} />, {
      preloadedState: {
        searchReducer: {
          query: '',
          itemsPerPage: [],
          viewMode: '1',
          isLoading: false,
          error: '',
        },
      },
    });

    expect(await screen.findByText(/IVYSAUR/)).toBeInTheDocument();
  });

  it('Ensure that clicking the close button hides the component', async () => {
    renderWithProviders(<App />);

    waitFor(async () => {
      const openPokemonButton: HTMLButtonElement = await screen.findByText('Open the pokemon');
      fireEvent.click(openPokemonButton);

      const nameElement = await screen.findByText('IVYSAUR');

      expect(nameElement).toBeInTheDocument();

      const closeButton = await screen.findByTitle('close');

      fireEvent.click(closeButton);

      const openButton = await screen.findByTitle('open');

      expect(openButton).toBeInTheDocument();
    });
  });
});
