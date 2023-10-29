import axios from 'axios';
import { Pokemon, PokemonsResponse } from './types/interfaces';

export default class PokemonsAPI {
  private static baseURL = 'https://pokeapi.co/api/v2/pokemon/';

  static async getPokemons(): Promise<PokemonsResponse | Error | undefined> {
    try {
      const response = await axios.get(this.baseURL);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return e;
      }
    }
  }

  static async getOnePokemon(id: string): Promise<Pokemon | Error | undefined> {
    try {
      const response = await axios.get(`${this.baseURL}${id}`);
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return e;
      }
    }
  }
}
