import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Pagination from '.';
import { Context } from '../../context';
import ErrorPage from '../../pages/ErrorPage';
import Theme from '../../theme';

const mockSearchParams = (params: string) => {
  const mockParams = new URLSearchParams(params);
  vi.spyOn(global, 'URLSearchParams').mockImplementation((search) => {
    return search ? new URLSearchParams(search) : mockParams;
  });
};

describe('Pagination', () => {
  beforeEach(() => {
    mockSearchParams('page=1');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render message about empty array', () => {
    render(
      <Theme>
        <Context.Provider
          value={{
            pokemons: [{ name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
            query: '',
            setQuery: () => {},
            setPokemons: () => {},
          }}
        >
          <Pagination setPage={() => {}} page={1} total_pages={10} />
        </Context.Provider>
      </Theme>
    );

    const prevButton = screen.getByText('Prev');
    const nextButton = screen.getByText('Next');

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('should click next button', () => {
    const setPage = vi.fn();

    render(
      <Theme>
        <Context.Provider
          value={{
            pokemons: [{ name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }],
            query: '',
            setQuery: () => {},
            setPokemons: () => {},
          }}
        >
          <Pagination setPage={setPage} page={1} total_pages={300} />
        </Context.Provider>
      </Theme>
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);

    expect(setPage).toHaveBeenCalledWith(2);
    expect(setPage).toHaveBeenCalled();
  });

  it('should click prev button', () => {
    const setPage = vi.fn();

    render(
      <Theme>
        <Context.Provider
          value={{
            pokemons: [{ name: 'Ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }],
            query: '',
            setQuery: () => {},
            setPokemons: () => {},
          }}
        >
          <Pagination setPage={setPage} page={2} total_pages={10} />
        </Context.Provider>
      </Theme>
    );

    const prevButton = screen.getByText('Prev');
    expect(prevButton).toBeInTheDocument();

    fireEvent.click(prevButton);

    expect(setPage).toHaveBeenCalledWith(1);
    expect(setPage).toHaveBeenCalled();
  });

  it('Make sure the component updates URL query parameter when page changes', () => {
    const setPage = vi.fn();

    const routes = [
      {
        path: '/',
        element: (
          <Context.Provider
            value={{
              pokemons: [
                { name: 'Ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
                { name: 'Bulba', url: 'https://pokeapi.co/api/v2/pokemon/3/' },
                { name: 'Kulba', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
                { name: 'Tuplea', url: 'https://pokeapi.co/api/v2/pokemon/5/' },
                { name: 'Butterfree', url: 'https://pokeapi.co/api/v2/pokemon/6/' },
              ],
              query: '',
              setQuery: () => {},
              setPokemons: () => {},
            }}
          >
            <Pagination setPage={setPage} page={2} total_pages={10} />
          </Context.Provider>
        ),
        errorElement: <ErrorPage />,
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

    const nextButton = screen.getByText('Next');

    expect(router.state.location.search).toEqual('?page=1');

    fireEvent.click(nextButton);

    expect(router.state.location.search).toBe('?page=2');

    expect(setPage).toHaveBeenCalledWith(2);
  });
});
