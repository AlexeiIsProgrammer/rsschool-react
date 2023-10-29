import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PokemonsAPI from '../../API/Pokemons';
import { PokemonURL } from '../../API/types/interfaces';
import { PAGINATION_LIMIT } from '../../constants';
import { ContainerWrapper } from '../../styles';
import Alert from '../Alert';
import FallbackUIButton from '../FallbackUIButton';
import PokemonsList from '../PokemonsList';
import Spinner from '../Spinner';
import { SearchingContainer, SearchingSizeContainer } from './styles';
import Pagination from '../Pagination';

function Searching() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [pokemons, setPokemons] = useState<PokemonURL[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = +(searchParams.get('page') || 1) - 1;

  const [page, setPage] = useState(pageParam);
  const [count, setCount] = useState(10);

  useEffect(() => {
    searchParams.set('page', (page + 1).toString());
    setSearchParams(searchParams);
  }, [page]);

  const fetchPokemons = async () => {
    setLoading(true);
    setError('');

    const pokemonsResponse = await PokemonsAPI.getPokemons(
      PAGINATION_LIMIT,
      page * PAGINATION_LIMIT
    );

    if (pokemonsResponse) {
      if (pokemonsResponse instanceof Error) {
        setError(pokemonsResponse.message);
      } else {
        if (pokemonsResponse.count !== null) setCount(pokemonsResponse.count);
        setPokemons(pokemonsResponse.results);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  let content: JSX.Element;

  switch (true) {
    case loading:
      content = <Spinner />;
      break;
    case error !== '':
      content = <Alert message="Error !!!" description={error} type="error" />;
      break;
    default:
      content = <PokemonsList pokemons={pokemons} />;
      break;
  }

  return (
    <SearchingContainer
      onClick={() => {
        if (searchParams.get('details') && searchParams.get('details') === '1') {
          searchParams.set('details', '0');
          setSearchParams(searchParams);
        }
      }}
    >
      <ContainerWrapper>
        <SearchingSizeContainer>{content}</SearchingSizeContainer>
        <Pagination setPage={setPage} page={page} count={count} />
        <FallbackUIButton />
      </ContainerWrapper>
    </SearchingContainer>
  );
}

export default Searching;
