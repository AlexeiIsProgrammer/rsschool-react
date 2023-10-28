import { Pokemon } from '../../API/types/interfaces';

export type AppState = {
  pokemons: Pokemon[];
  loading: boolean;
  error: string;
};
