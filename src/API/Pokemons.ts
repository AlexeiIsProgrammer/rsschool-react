import axios from 'axios';
import { PokemonResponse, PokemonsResponse } from './types/interfaces';

export default class PokemonsAPI {
  static async getPokemons(): Promise<PokemonsResponse | string | undefined> {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon');
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return e.message;
      }
    }
  }

  static async getOnePokemon(url: string): Promise<PokemonResponse | string | undefined> {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return e.message;
      }
    }
  }
}
