import { Pokemon } from '../../../API/types/interfaces';

export type PokemonsListProps = {
  pokemons: Pokemon[];
  query: string;
};
