import { Pokemon } from '../../../API/types/interfaces';

export type PokemonsListProps = {
  pokemons: Pokemon[];
};

export type PokemonsListState = {
  query: string;
};
