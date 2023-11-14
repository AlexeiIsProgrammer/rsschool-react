import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import PokemonsList from '.';
import { Context } from '../../context';
import Theme from '../../theme';

describe('Pokemons List', () => {
  it('Check that an appropriate message is displayed if no cards are present', () => {
    const routes = [
      {
        path: '/',
        element: (
          <Context.Provider
            value={{
              pokemons: [],
              query: '',
              setQuery: () => {},
              setPokemons: () => {},
            }}
          >
            <PokemonsList offset={2} />
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

    const expectedText = 'Array is empty';

    const value = screen.getByText(expectedText);

    expect(value).toHaveTextContent(expectedText);
  });

  it('Verify that the component renders the specified number of cards', () => {
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
            <PokemonsList offset={2} />
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

    const expectedText = 'Ivysaur';

    const value = screen.getByText(expectedText);

    expect(value).toHaveTextContent(expectedText);
  });
});
