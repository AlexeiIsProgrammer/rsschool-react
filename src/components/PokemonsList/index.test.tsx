import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import PokemonsList from '.';
import Theme from '../../theme';
import { Context } from '../../context';

describe('Pokemons List', () => {
  it('Check that an appropriate message is displayed if no cards are present', () => {
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
          <PokemonsList offset={2} />
        </Context.Provider>
      </Theme>
    );

    const expectedText = 'Array is empty';

    const value = screen.getByText(expectedText);

    expect(value).toHaveTextContent(expectedText);
  });

  it('Verify that the component renders the specified number of cards', () => {
    render(
      <Theme>
        <PokemonsList offset={2} />
      </Theme>
    );
  });
});
