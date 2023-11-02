import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { AiFillCaretLeft, AiFillCloseCircle } from 'react-icons/ai';
import Spinner from '../../components/Spinner';
import Alert from '../../components/Alert';
import {
  PokemonDetails,
  PokemonDetailsClose,
  PokemonDetailsOpen,
  PokemonDetailsWrapper,
  PokemonImage,
  PokemonName,
} from './styles';
import { useGetPokemonQuery } from '../../services/PokemonAPI';
import { useAppSelector } from '../../hooks';
import { pokemonSelector } from '../../store/selectors/PokemonSelector';

export default function PokemonPage() {
  const { pokemonId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isClosed, setIsClosed] = useState(
    searchParams.get('details') === '0' || searchParams.get('details') === null
  );

  const { isActive } = useAppSelector(pokemonSelector);

  const { data, isLoading, error } = useGetPokemonQuery({
    id: pokemonId || '',
  });

  useEffect(() => {
    setIsClosed(isActive);
  }, [isActive]);

  useEffect(() => {
    if (searchParams.get('details') === '0') setIsClosed(true);
  }, [searchParams]);

  const closeModalHandle = () => {
    searchParams.set('details', '0');
    setSearchParams(searchParams);

    setIsClosed(true);
  };

  const openModalHandle = () => {
    searchParams.set('details', '1');
    setSearchParams(searchParams);

    setIsClosed(false);
  };

  if (error) {
    return <Alert type="error" message={error.toString()} description={error.toString()} />;
  }

  if (data === undefined) {
    return (
      <Alert type="error" message="Pokemon is not exists" description="Where is your pokemon?" />
    );
  }

  return (
    <PokemonDetailsWrapper $isClosed={isClosed}>
      {isClosed && (
        <PokemonDetailsOpen onClick={openModalHandle}>
          <AiFillCaretLeft />
        </PokemonDetailsOpen>
      )}
      {!isClosed && (
        <>
          <PokemonDetailsClose onClick={closeModalHandle}>
            <AiFillCloseCircle color="white" />
          </PokemonDetailsClose>

          <PokemonDetails>
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                <PokemonName>{data.name.toUpperCase()}</PokemonName>
                <PokemonName>Height: {data.height}</PokemonName>
                <PokemonName>Weight: {data.weight}</PokemonName>
                <PokemonImage src={data.sprites.front_default} alt="pokich" />
              </>
            )}
          </PokemonDetails>
        </>
      )}
    </PokemonDetailsWrapper>
  );
}
