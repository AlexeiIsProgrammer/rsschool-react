import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import Theme from '../../theme';
import { Context } from '../../context';
import PokemonCard from '.';
import ErrorPage from '../../pages/ErrorPage';
import PokemonPage from '../../pages/PokemonPage';
import App from '../../app';

const pokemon = {
  name: 'Ivysaur',
  sprites: {
    front_default: '',
  },
  height: 200,
  weight: 100,
};

describe('Pokemon page', () => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: { pokemon },
        }),
    })
  ) as unknown as typeof global.fetch;

  const globalRoutes = [
    {
      path: '/',
      element: (
        <Context.Provider
          value={{
            pokemons: [{ name: 'Ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }],
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

  it('Check that a loading indicator is displayed while fetching data', async () => {
    const routes = [
      {
        path: '/',
        element: (
          <Context.Provider
            value={{
              pokemons: [{ name: 'Ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }],
              query: '',
              setQuery: () => {},
              setPokemons: () => {},
            }}
          >
            <PokemonCard pokemon={pokemon} loading />
          </Context.Provider>
        ),
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    render(
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    );

    expect(await screen.getByTitle('spinner')).toBeInTheDocument();
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const routes = [
      {
        path: '/',
        element: (
          <Context.Provider
            value={{
              pokemons: [{ name: 'Ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }],
              query: '',
              setQuery: () => {},
              setPokemons: () => {},
            }}
          >
            <PokemonCard pokemon={pokemon} loading={false} />
          </Context.Provider>
        ),
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    render(
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    );

    expect(await screen.findByText(/IVYSAUR/)).toBeInTheDocument();
  });

  it('Ensure that clicking the close button hides the component', async () => {
    const router = createMemoryRouter(globalRoutes, {
      initialEntries: ['/'],
    });

    render(
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    );

    const openPokemonButton: HTMLButtonElement = await screen.findByText('Open the pokemon');
    fireEvent.click(openPokemonButton);

    const preElement = await screen.findByText(/BULBASAUR/);

    expect(preElement).toBeInTheDocument();

    const closeButton = await screen.findByTitle('close');

    await act(async () => {
      fireEvent.click(closeButton);
    });

    waitFor(async () => {
      const postElement = await screen.findByText(/BULBASAUR/);

      expect(postElement).not.toBeInTheDocument();
    });
  });
});
