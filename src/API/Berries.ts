import axios from 'axios';
import { BerriesResponse, BerryResponse } from './types/interfaces';

export default class BerriesAPI {
  static async getBerries(): Promise<BerriesResponse | string | undefined> {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/berry');
      return response.data;
    } catch (e) {
      if (e instanceof Error) {
        return e.message;
      }
    }
  }

  static async getOneBerry(url: string): Promise<BerryResponse | string | undefined> {
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
