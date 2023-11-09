import { PokemonURL } from '../../../API/types/interfaces';

export type PokemonsListProps = {
  pokemons: PokemonURL[];
  offset: number;
};
