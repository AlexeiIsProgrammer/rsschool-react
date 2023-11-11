import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { Context } from '../../context';
import ErrorPage from '../../pages/ErrorPage';
import PokemonPage from '../../pages/PokemonPage';
import Theme from '../../theme';
import Searching from '../Searching';

describe('Pokemon', () => {
  const pokemon = {
    name: 'Ivysaur',
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
            pokemons: [{ name: 'Ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }],
            query: '',
            setQuery: () => {},
            setPokemons: () => {},
          }}
        >
          <Searching />
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
    expect(await screen.findByText('Ivysaur')).toHaveTextContent('Ivysaur');
    expect(await screen.findByRole('link')).toHaveAttribute('href', '/search/2?details=1&page=1');
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    const { container } = render(
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    );

    await waitFor(() => {
      const detailedInfo = container.querySelector('.sc-idOjMB'); // Classname for detailed info container

      expect(detailedInfo).not.toBeInTheDocument();
    });

    const button: HTMLButtonElement = await screen.findByText('Open the pokemon');
    fireEvent.click(button);

    await waitFor(() => {
      const detailedInfo = container.querySelector('.sc-idOjMB'); // Classname for detailed info container

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
