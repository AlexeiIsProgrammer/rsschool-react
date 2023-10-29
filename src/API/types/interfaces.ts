export interface PokemonsResponse {
  count: null | number;
  next: string;
  previous: null | number;
  results: PokemonURL[];
}

export type PokemonURL = {
  url: string;
  name: string;
};

export type Pokemon = {
  name: string;
  sprites: {
    front_default: 'string';
  };
};
