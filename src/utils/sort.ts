import { Pokemon } from '../API/types/interfaces';

export default function searchPokemons(query: string, pokemons: Pokemon[]): Pokemon[] {
  return pokemons.filter((pokemon) => pokemon.name.includes(query));
}
