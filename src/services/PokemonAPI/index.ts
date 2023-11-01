import { REHYDRATE } from 'redux-persist';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Define a service using a base URL and expected endpoints
import { GetPokemonArgs, GetPokemonsArgs, Pokemon, PokemonsResponse } from './types/interfaces';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
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
      query: ({ limit = 1000 }) => ({
        url: 'pokemon/',
        params: {
          limit,
        },
      }),
    }),
    getPokemon: builder.query<Pokemon, GetPokemonArgs>({
      query: ({ id }) => ({
        url: `pokemon/${id}`,
      }),
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonQuery } = pokemonApi;
