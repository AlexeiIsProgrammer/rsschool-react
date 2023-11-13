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

  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: { pokemon },
        }),
    })
  ) as unknown as typeof global.fetch;

  const routes = [
    {
      path: '/',
      element: (
        <Context.Provider
          value={{
            pokemons: [{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }],
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

  beforeEach(async () => {
    render(
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    );
  });

  it('Ensure that the card component renders the relevant card data', async () => {
    expect(await screen.findByText('bulbasaur')).toHaveTextContent('bulbasaur');
    expect(await screen.findByRole('link')).toHaveAttribute('href', '/search/1?details=1&page=1');
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    render(
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    );

    waitFor(async () => {
      const detailedInfo = await screen.findByText(/BULBASAUR/);

      expect(detailedInfo).not.toBeInTheDocument();
    });

    const button: HTMLButtonElement = await screen.findByText('Open the pokemon');
    fireEvent.click(button);

    await waitFor(async () => {
      const detailedInfo = await screen.findByText(/BULBASAUR/);

      expect(detailedInfo).toBeInTheDocument();
    });
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const button: HTMLButtonElement = await screen.findByText('Open the pokemon');
    fireEvent.click(button);

    waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });
});
