import { OnePokemon } from '../API/types/interfaces';

export default function searchPokemons(query: string, berries: OnePokemon[]): OnePokemon[] {
  return berries.filter((berry) => berry.name.includes(query));
}
