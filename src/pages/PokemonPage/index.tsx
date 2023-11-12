import { useEffect, useState } from 'react';
import { AiFillCaretLeft } from 'react-icons/ai';
import { useParams, useSearchParams } from 'react-router-dom';
import Alert from '../../components/Alert';
import { PokemonDetailsOpen, PokemonDetailsWrapper } from './styles';
import { useGetPokemonQuery } from '../../services/PokemonAPI';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { pokemonSelector } from '../../store/selectors/PokemonSelector';
import { setIsImage } from '../../store/slices/PokemonSlice';
import PokemonCard from '../../components/PokemonCard';

export default function PokemonPage() {
  const { pokemonId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isClosed, setIsClosed] = useState(
    searchParams.get('details') === '0' || searchParams.get('details') === null
  );

  const dispatch = useAppDispatch();
  const { isActive } = useAppSelector(pokemonSelector);

  const { data, isLoading, error } = useGetPokemonQuery({
    id: pokemonId || '',
  });

  useEffect(() => {
    setIsClosed(isActive);
  }, [isActive]);

  useEffect(() => {
    dispatch(setIsImage(data?.sprites.front_default || ''));
  }, [data]);

  useEffect(() => {
    if (isActive) {
      dispatch(setIsImage(data?.sprites.front_default || ''));
    }
  }, [isActive]);

  useEffect(() => {
    if (searchParams.get('details') === '0') setIsClosed(true);
  }, [searchParams]);

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
