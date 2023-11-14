export interface GetPokemonsArgs {
  limit?: number;
  page?: number;
  name?: string;
}
export interface GetPokemonArgs {
  id: string;
}

export type PokemonURL = {
  url: string;
  name: string;
};
export interface PokemonsResponse {
  meta: {
    total_pages: number;
  };
  items: PokemonURL[];
}

export type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
  };
  height: number;
  weight: number;
};
