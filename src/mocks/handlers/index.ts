import { HttpResponse, http } from 'msw';

export const pokemonsHandlers = [
  http.get('https://fcc6971121ab81f7.mokky.dev/pokemon/', async () => {
    const pokemons = {
      meta: {
        total_pages: 30,
      },
      items: [],
    };

    return HttpResponse.json(pokemons, { status: 200 });
  }),
  http.get('https://pokeapi.co/api/v2/pokemon/1', async () => {
    const pokemon = {
      name: 'ivysaur',
      sprites: {
        front_default: '',
      },
      height: 300,
      weight: 20,
    };

    return HttpResponse.json(pokemon, { status: 200 });
  }),
];

export const handlers = [...pokemonsHandlers];
