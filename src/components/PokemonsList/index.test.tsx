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
          <PokemonsList offset={2} page={2} />
        </Context.Provider>
      </Theme>
    );

    const expectedText = 'Array is empty';

    const value = screen.getByText(expectedText);

    expect(value).toHaveTextContent(expectedText);
  });
  it('should render cards', () => {
    render(
      <Theme>
        <PokemonsList offset={2} page={2} />
      </Theme>
    );
  });
});
