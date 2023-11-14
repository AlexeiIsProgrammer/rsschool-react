import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Context } from '../../context';
import ErrorPage from '../../pages/ErrorPage';
import PokemonPage from '../../pages/PokemonPage';
import Theme from '../../theme';
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

  const routes = [
    {
      path: '/',
      element: (
        <Context.Provider
          value={{
            pokemons: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
            query: '',
            setQuery: () => {},
            setPokemons: () => {},
          }}
        >
          <App />
        </Context.Provider>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'search/:pokemonId',
          element: <PokemonPage />,
        },
      ],
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
  });

  it('Ensure that the card component renders the relevant card data', async () => {
    vi.spyOn(window, 'fetch').mockImplementation(fakeFetch);

    render(
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    );

    expect(await screen.findByText('bulbasaur')).toHaveTextContent('bulbasaur');
    expect(await screen.findByRole('link')).toHaveAttribute('href', '/search/1?details=1&page=1');
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    vi.spyOn(window, 'fetch').mockImplementation(fakeFetch);

    render(
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    );

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

    render(
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    );
    waitFor(async () => {
      const button: HTMLButtonElement = await screen.findByText('Open the pokemon');
      fireEvent.click(button);

      expect(fakeFetch).toBeCalled();
    });
  });
});
