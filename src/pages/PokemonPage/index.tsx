import React, { useEffect, useState } from 'react';
import PokemonsAPI from '../../API/Pokemons';
import Spinner from '../../components/Spinner';
import Alert from '../../components/Alert';
import { Pokemon } from '../../API/types/interfaces';

export default function PokemonPage() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchPokemon = async () => {
    setLoading(true);
    setError('');

    const pokemonsResponse = await PokemonsAPI.getOnePokemon('1');

    if (pokemonsResponse) {
      if (pokemonsResponse instanceof Error) {
        setError(pokemonsResponse.message);
      } else {
        setPokemon(pokemonsResponse);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert type="error" message={error} description={error} />;
  }

  if (pokemon === null) {
    return <Alert type="error" message="Pokemon is null" description="Where is your pokemon?" />;
  }

  return (
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt="pokich" />
    </div>
  );
}
