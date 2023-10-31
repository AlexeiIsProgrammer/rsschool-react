import { PokemonURL } from '../../../../API/types/interfaces';

export interface SearchState {
  query: string;
  itemsPerPage: PokemonURL[];
  viewMode: string;

  isLoading: boolean;
  error: string;
}
