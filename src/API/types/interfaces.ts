export interface PokemonsResponse {
  meta: {
    total_pages: number;
  };
  items: PokemonURL[];
}

export type PokemonURL = {
  url: string;
  name: string;
};

export type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
};
