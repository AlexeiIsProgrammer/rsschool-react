import { OnePokemon } from '../../../API/types/interfaces';

export type PokemonsListProps = {
  pokemons: OnePokemon[];
};

export type PokemonsListState = {
  query: string;
};
