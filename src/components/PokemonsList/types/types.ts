import { PokemonURL } from '../../../API/types/interfaces';

export type PokemonsListProps = {
  pokemons: PokemonURL[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  offset: number;
};
