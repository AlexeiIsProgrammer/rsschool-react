import { PokemonURL } from '../../../API/types/interfaces';

export interface GetPokemonsArgs {
  limit?: number;
}
export interface PokemonsResponse {
  count: null | number;
  next: string;
  previous: null | number;
  results: PokemonURL[];
}
