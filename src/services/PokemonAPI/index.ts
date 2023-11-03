import { REHYDRATE } from 'redux-persist';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Define a service using a base URL and expected endpoints
import { GetPokemonArgs, GetPokemonsArgs, Pokemon, PokemonsResponse } from './types/interfaces';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
    if (action.type === REHYDRATE && action.key === 'root') {
      return action.payload;
    }
  },
  endpoints: (builder) => ({
    getPokemons: builder.query<PokemonsResponse, GetPokemonsArgs>({
      query: ({ limit = 1000, name = '', page = 1 }) => ({
        url: 'https://fcc6971121ab81f7.mokky.dev/pokemon/',
        params: {
          limit,
          name: `*${name}`,
          page,
        },
      }),
    }),
    getPokemon: builder.query<Pokemon, GetPokemonArgs>({
      query: ({ id }) => ({
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
      }),
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonQuery } = pokemonApi;
