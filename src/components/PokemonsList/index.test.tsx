import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonsList from '.';
import Theme from '../../theme';
import { Context } from '../../context';

describe('App', () => {
  it('should render message about empty array', () => {
    render(
      <Theme>
        <Context.Provider
          value={{
            pokemons: [],
            query: '',
            setQuery: () => {},
            setPokemons: () => {},
          }}
        >
          <PokemonsList />
        </Context.Provider>
      </Theme>
    );

    const expectedText = 'There are no items';

    const value = screen.getByText(expectedText);

    expect(value).toHaveTextContent(expectedText);
  });
  it('should render cards', () => {
    render(
      <Theme>
        <PokemonsList />
      </Theme>
    );
  });
});
