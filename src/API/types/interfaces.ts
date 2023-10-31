export interface PokemonsResponse {
  count: null | number;
  next: string;
  previous: null | number;
  results: Pokemon[];
}

export interface PokemonResponse {
  count: null | number;
  next: string;
  previous: null | number;
  results: Pokemon[];
}

export type Pokemon = {
  url: string;
  name: string;
};
