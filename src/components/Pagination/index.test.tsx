import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import Theme from '../../theme';
import { Context } from '../../context';
import Pagination from '.';

describe('Pagination', () => {
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
});
