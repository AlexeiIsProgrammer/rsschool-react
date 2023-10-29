import { PokemonURL } from '../API/types/interfaces';

export default function searchPokemons(query: string, pokemons: PokemonURL[]): PokemonURL[] {
  return pokemons.filter((pokemon) => pokemon.name.includes(query));
}
