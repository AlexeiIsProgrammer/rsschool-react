import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import PokemonCard from '.';
import App from '../../app';
import { renderWithProviders } from '../../test';

const pokemon = {
  name: 'Ivysaur',
  sprites: {
    front_default: '',
  },
  height: 200,
  weight: 100,
};

describe('Pokemon card', () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: { pokemon },
        }),
    })
  ) as unknown as typeof global.fetch;

  it('Check that a loading indicator is displayed while fetching data', async () => {
    const { container } = renderWithProviders(<PokemonCard pokemon={pokemon} loading />, {
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

    waitFor(() => {
      const spinner = container.querySelector('.sc-bdfCDU.jUNipm'); // Classname for spinner

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
    const { container } = renderWithProviders(<App />, {
      preloadedState: {
        searchReducer: {
          query: '',
          itemsPerPage: [{ name: 'ivysaur', url: 'https://' }],
          viewMode: '1',
          isLoading: false,
          error: '',
        },
        pokemonReducer: {
          isActive: true,
          name: 'ivysaur',
          image: '',
          isLoading: false,
          error: '',
        },
      },
    });

    const openPokemonButton: HTMLButtonElement = await screen.findByText('Open the pokemon');
    fireEvent.click(openPokemonButton);

    waitFor(() => {
      const preElement = container.querySelector('.eCPjPQ');

      expect(preElement).toBeInTheDocument();
    });

    const closeButton = await screen.findByTitle('close');

    await act(async () => {
      fireEvent.click(closeButton);
    });

    const postElement = container.querySelector('.eCPjPQ');

    expect(postElement).not.toBeInTheDocument();
  });
});
