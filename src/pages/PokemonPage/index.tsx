import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import PokemonsAPI from '../../API/Pokemons';
import Spinner from '../../components/Spinner';
import Alert from '../../components/Alert';
import { Pokemon } from '../../API/types/interfaces';
import {
  PokemonDetails,
  PokemonDetailsClose,
  PokemonDetailsOpen,
  PokemonDetailsWrapper,
  PokemonImage,
  PokemonName,
} from './styles';

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

  const closeModalHandle = () => {
    setSearchParams({ details: '0' });
  };

  const openModalHandle = () => {
    setSearchParams({ details: '1' });
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
      {loading ? (
        <Spinner />
      ) : (
        <>
          {isClosed && <PokemonDetailsOpen onClick={openModalHandle}>{'<<'}</PokemonDetailsOpen>}
          {!isClosed && (
            <>
              <PokemonDetailsClose onClick={closeModalHandle}>x</PokemonDetailsClose>

              <PokemonDetails>
                <PokemonName>{pokemon.name}</PokemonName>
                <PokemonImage src={pokemon.sprites.front_default} alt="pokich" />
              </PokemonDetails>
            </>
          )}
        </>
      )}
    </PokemonDetailsWrapper>
  );
}
