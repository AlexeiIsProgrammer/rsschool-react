import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { AiFillCaretLeft } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useGetPokemonQuery } from '../../services/PokemonAPI';
import { pokemonSelector } from '../../store/selectors/PokemonSelector';
import { setIsImage } from '../../store/slices/PokemonSlice';
import Alert from '../Alert';
import PokemonCard from '../PokemonCard';
import { PokemonDetailsOpen, PokemonDetailsWrapper } from './styles';

export default function PokemonPage() {
  const router = useRouter();
  const { id } = router.query;

  const [isClosed, setIsClosed] = useState(
    router.query.details === '0' || router.query.details === null
  );

  const dispatch = useAppDispatch();
  const { isActive } = useAppSelector(pokemonSelector);

  const { data, isLoading, error } = useGetPokemonQuery({
    id: id?.toString() || '',
  });

  useEffect(() => {
    setIsClosed(isActive);
  }, [isActive]);

  useEffect(() => {
    dispatch(setIsImage(data?.sprites?.front_default || ''));
  }, [data]);

  useEffect(() => {
    if (isActive) {
      dispatch(setIsImage(data?.sprites?.front_default || ''));
    }
  }, [isActive]);

  useEffect(() => {
    if (router.query.details === '0') setIsClosed(true);
  }, [router.query.details]);

  const openModalHandle = () => {
    router.replace({
      query: {
        ...router.query,
        details: '1',
      },
    });

    setIsClosed(false);
  };

  if (id === undefined) {
    return null;
  }

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
      {isClosed ? (
        <PokemonDetailsOpen title="open" onClick={openModalHandle}>
          <AiFillCaretLeft />
        </PokemonDetailsOpen>
      ) : (
        <PokemonCard pokemon={data} loading={isLoading} />
      )}
    </PokemonDetailsWrapper>
  );
}
