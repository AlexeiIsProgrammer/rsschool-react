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

export default function PokemonPage() {
  const { pokemonId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const { data, isLoading, error } = useGetPokemonQuery({
    id: pokemonId || '',
  });

  const isClosed = searchParams.get('details') === '0' || searchParams.get('details') === null;

  const closeModalHandle = () => {
    searchParams.set('details', '0');
    setSearchParams(searchParams);
  };

  const openModalHandle = () => {
    searchParams.set('details', '1');
    setSearchParams(searchParams);
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
