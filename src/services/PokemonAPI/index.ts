import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'; // Define a service using a base URL and expected endpoints
import { HYDRATE } from 'next-redux-wrapper';
import { GetPokemonArgs, GetPokemonsArgs, Pokemon, PokemonsResponse } from './types/interfaces';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
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

export const {
  useGetPokemonsQuery,
  useGetPokemonQuery,
  util: { getRunningQueriesThunk },
} = pokemonApi;

export const { getPokemons, getPokemon } = pokemonApi.endpoints;
