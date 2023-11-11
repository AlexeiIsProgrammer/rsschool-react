import axios from 'axios';
import { Pokemon, PokemonsResponse } from './types/interfaces';

export default class PokemonsAPI {
  private static customURL = 'https://fcc6971121ab81f7.mokky.dev/pokemon';

  private static baseURL = 'https://pokeapi.co/api/v2/pokemon/';

  static async getPokemons(
    page: number = 0,
    limit: number = 2000,
    name: string = ''
  ): Promise<PokemonsResponse | Error | undefined> {
    try {
      const response = await axios.get<PokemonsResponse>(this.customURL, {
        params: {
          limit,
          page,
          name: `*${name}`,
        },
      });
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
