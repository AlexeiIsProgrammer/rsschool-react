import { useState, useContext, useEffect } from 'react';
import { Context } from '../context';
import PokemonsAPI from '../API/Pokemons';

export const useFetchedPokemons = (offset: number, page: number) => {
  const { setPokemons, query } = useContext(Context);

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError('');

      const pokemonsResponse = await PokemonsAPI.getPokemons(page, offset, query);

      if (pokemonsResponse) {
        if (pokemonsResponse instanceof Error) {
          setError(pokemonsResponse.message);
        } else {
          setPokemons(pokemonsResponse.items);
          setTotalPages(pokemonsResponse.meta.total_pages);
        }
      }

      setLoading(false);
    })();
  }, [offset, query, page]);

  return { error, loading, totalPages };
};
