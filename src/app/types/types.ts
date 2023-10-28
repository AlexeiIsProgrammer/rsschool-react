import { OnePokemon } from '../../API/types/interfaces';

export type AppState = {
  pokemons: OnePokemon[];
  loading: boolean;
  error: string;
};
