export interface PokemonsResponse {
  count: null | number;
  next: string;
  previous: null | number;
  results: OnePokemon[];
}

export interface PokemonResponse {
  count: null | number;
  next: string;
  previous: null | number;
  results: OnePokemon[];
}

export type OnePokemon = {
  url: string;
  name: string;
};
