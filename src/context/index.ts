import { createContext } from 'react';
import { PokemonURL } from '../API/types/interfaces';

type ContextType = {
  pokemons: PokemonURL[];
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setPokemons: React.Dispatch<React.SetStateAction<PokemonURL[]>>;
};

const defaultValue: ContextType = {
  pokemons: [],
  query: '',
  setQuery: () => {},
  setPokemons: () => {},
};

export const Context = createContext<ContextType>(defaultValue);
