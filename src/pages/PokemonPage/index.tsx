import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { AiFillCaretLeft, AiFillCloseCircle } from 'react-icons/ai';
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
    searchParams.set('details', '0');
    setSearchParams(searchParams);
  };

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
      {isClosed && (
        <PokemonDetailsOpen title="Open button" onClick={openModalHandle}>
          <AiFillCaretLeft />
        </PokemonDetailsOpen>
      )}
      {!isClosed && (
        <>
          <PokemonDetailsClose title="Close button" onClick={closeModalHandle}>
            <AiFillCloseCircle color="white" />
          </PokemonDetailsClose>

          <PokemonDetails>
            {loading ? (
              <Spinner />
            ) : (
              <>
                <PokemonName>{pokemon.name.toUpperCase()}</PokemonName>
                <PokemonName>Height: {pokemon.height}</PokemonName>
                <PokemonName>Weight: {pokemon.weight}</PokemonName>
                <PokemonImage src={pokemon.sprites.front_default} alt="pokich" />
              </>
            )}
          </PokemonDetails>
        </>
      )}
    </PokemonDetailsWrapper>
  );
}
