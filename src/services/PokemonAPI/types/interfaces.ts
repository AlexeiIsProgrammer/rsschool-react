export interface GetPokemonsArgs {
  limit?: number;
}
export interface GetPokemonArgs {
  id: string;
}

export type PokemonURL = {
  url: string;
  name: string;
};
export interface PokemonsResponse {
  count: null | number;
  next: string;
  previous: null | number;
  results: PokemonURL[];
}

export type Pokemon = {
  name: string;
  sprites: {
    front_default: 'string';
  };
  height: number;
  weight: number;
};
