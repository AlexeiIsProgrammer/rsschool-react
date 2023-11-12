import { http, HttpResponse } from 'msw';

const handlers = [
  http.get('https://fcc6971121ab81f7.mokky.dev/pokemon/', () => {
    const pokemons = {
      meta: {
        total_pages: 30,
      },
      items: [{ name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }],
    };

    return HttpResponse.json(pokemons, { status: 200 });
  }),

  http.get('https://pokeapi.co/api/v2/pokemon/:id', () => {
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

export default handlers;
