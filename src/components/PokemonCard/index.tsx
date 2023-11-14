import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { AiFillCloseCircle } from 'react-icons/ai';

import Spinner from '../Spinner';

import { PokemonDetails, PokemonDetailsClose, PokemonImage, PokemonName } from './styles';
import PokemonCardProps from './types/types';

function PokemonCard({ pokemon, loading }: PokemonCardProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const closeModalHandle = () => {
    searchParams.set('details', '0');
    setSearchParams(searchParams);
  };

  return (
    <>
      <PokemonDetailsClose title="close" onClick={closeModalHandle}>
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
            <PokemonImage src={pokemon.sprites.front_default} alt={pokemon.name} />
          </>
        )}
      </PokemonDetails>
    </>
  );
}

export default PokemonCard;
