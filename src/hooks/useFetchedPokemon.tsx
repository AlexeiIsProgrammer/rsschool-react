import { useEffect, useState } from 'react';
import PokemonsAPI from '../API/Pokemons';
import { Pokemon } from '../API/types/interfaces';

export const useFetchedPokemon = (id: string) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');

      const pokemonsResponse = await PokemonsAPI.getOnePokemon(id);

      if (pokemonsResponse) {
        if (pokemonsResponse instanceof Error) {
          setError(pokemonsResponse.message);
        } else {
          setPokemon(pokemonsResponse);
        }
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  return { pokemon, error, loading };
};
