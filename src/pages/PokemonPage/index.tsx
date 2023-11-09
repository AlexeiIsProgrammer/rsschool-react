import { useEffect, useState } from 'react';
import { AiFillCaretLeft } from 'react-icons/ai';
import { useParams, useSearchParams } from 'react-router-dom';
import PokemonsAPI from '../../API/Pokemons';
import { Pokemon } from '../../API/types/interfaces';
import Alert from '../../components/Alert';
import PokemonCard from '../../components/PokemonCard';

import { PokemonDetailsOpen, PokemonDetailsWrapper } from './styles';

export default function PokemonPage() {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { pokemonId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const isClosed = searchParams.get('details') === '0' || searchParams.get('details') === null;

  const fetchPokemon = async () => {
    setLoading(true);
    setError('');

    const pokemonsResponse = await PokemonsAPI.getOnePokemon(pokemonId || '');

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
  }, [pokemonId]);

  const openModalHandle = () => {
    searchParams.set('details', '1');
    setSearchParams(searchParams);
  };

  if (error) {
    return <Alert type="error" message={error} description={error} />;
  }

  if (pokemon === null) {
    return (
      <Alert type="error" message="Pokemon is not exists" description="Where is your pokemon?" />
    );
  }

  return (
    <PokemonDetailsWrapper $isClosed={isClosed}>
      {isClosed ? (
        <PokemonDetailsOpen onClick={openModalHandle}>
          <AiFillCaretLeft />
        </PokemonDetailsOpen>
      ) : (
        <PokemonCard pokemon={pokemon} loading={loading} />
      )}
    </PokemonDetailsWrapper>
  );
}
