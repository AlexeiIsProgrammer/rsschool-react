import { AiFillCaretLeft } from 'react-icons/ai';
import { useParams, useSearchParams } from 'react-router-dom';
import Alert from '../../components/Alert';
import PokemonCard from '../../components/PokemonCard';

import { PokemonDetailsOpen, PokemonDetailsWrapper } from './styles';
import { useFetchedPokemon } from '../../hooks/useFetchedPokemon';

export default function PokemonPage() {
  const { pokemonId } = useParams();
  const { pokemon, loading, error } = useFetchedPokemon(pokemonId || '');
  const [searchParams, setSearchParams] = useSearchParams();

  const isClosed = searchParams.get('details') === '0' || searchParams.get('details') === null;

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
        <PokemonDetailsOpen title="open" onClick={openModalHandle}>
          <AiFillCaretLeft />
        </PokemonDetailsOpen>
      ) : (
        <PokemonCard pokemon={pokemon} loading={loading} />
      )}
    </PokemonDetailsWrapper>
  );
}
