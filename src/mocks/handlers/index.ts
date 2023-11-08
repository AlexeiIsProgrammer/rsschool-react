import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/pokemon', () => {
    return HttpResponse.json({ name: 'Bulbasaur' });
  }),
];
