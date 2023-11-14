import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import Theme from '../../theme';
import { Context } from '../../context';
import SearchInput from '.';

describe('SearchInput', () => {
  it('should render component', async () => {
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
          <SearchInput />
        </Context.Provider>
      </Theme>
    );

    expect(await screen.findByPlaceholderText('Search your Pokemon')).toBeInTheDocument();
    expect(await screen.findByText('Search')).toBeInTheDocument();
  });
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
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
          <SearchInput />
        </Context.Provider>
      </Theme>
    );

    const input = await screen.findByPlaceholderText('Search your Pokemon');
    const button = await screen.findByText('Search');

    fireEvent.input(input, {
      target: { value: 'bulbasaur' },
    });

    fireEvent.click(button);

    expect(localStorage.getItem('query')).toBe('bulbasaur');
  });
  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    localStorage.setItem('query', 'ivysaur');

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
          <SearchInput />
        </Context.Provider>
      </Theme>
    );

    const input: HTMLInputElement = await screen.findByPlaceholderText('Search your Pokemon');

    expect(input.value).toBe('ivysaur');
  });
});
