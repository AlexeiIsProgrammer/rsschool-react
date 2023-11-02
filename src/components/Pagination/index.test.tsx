import { describe, expect, it } from 'vitest';
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
          <Pagination setPage={() => {}} page={1} count={10} offset={2} />
        </Context.Provider>
      </Theme>
    );

    const prevButton = screen.getByText('Prev');
    const nextButton = screen.getByText('Next');

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('should click next button', () => {
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
          <Pagination setPage={() => {}} page={1} count={300} offset={2} />
        </Context.Provider>
      </Theme>
    );

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);
  });

  it('should click prev button', () => {
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
          <Pagination setPage={() => {}} page={1} count={10} offset={2} />
        </Context.Provider>
      </Theme>
    );

    const prevButton = screen.getByText('Prev');
    expect(prevButton).toBeInTheDocument();

    fireEvent.click(prevButton);
  });
});
