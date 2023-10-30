import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PokemonsAPI from '../../API/Pokemons';
import { PokemonURL } from '../../API/types/interfaces';
import { ContainerWrapper } from '../../styles';
import Alert from '../Alert';
import FallbackUIButton from '../FallbackUIButton';
import PokemonsList from '../PokemonsList';
import Spinner from '../Spinner';
import { SearchingContainer, SearchingSizeContainer } from './styles';
import Pagination from '../Pagination';
import { PAGINATION_LIMIT } from '../../constants';
import SearchInput from '../SearchInput';
import searchPokemons from '../../utils/sort';

function Searching() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [pokemons, setPokemons] = useState<PokemonURL[]>([]);
  const [searchedPokemons, setSearchedPokemons] = useState<PokemonURL[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = +(searchParams.get('page') || 1) - 1;

  const [page, setPage] = useState(pageParam);

  const [query, setQuery] = useState<string>('');

  const fetchPokemons = async () => {
    setLoading(true);
    setError('');

    const pokemonsResponse = await PokemonsAPI.getPokemons();

    if (pokemonsResponse) {
      if (pokemonsResponse instanceof Error) {
        setError(pokemonsResponse.message);
      } else {
        setPokemons(pokemonsResponse.results);

        const localQuery = localStorage.getItem('query');

        if (localQuery) {
          setQuery(localQuery);
          setSearchedPokemons(searchPokemons(localQuery, pokemonsResponse.results));
        }
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    searchParams.set('page', (page + 1).toString());
    setSearchParams(searchParams);
  }, [page]);

  useEffect(() => {
    setSearchedPokemons(searchPokemons(query, pokemons));
    setPage(0);
  }, [query]);

  let content: JSX.Element;

  switch (true) {
    case loading:
      content = <Spinner />;
      break;
    case error !== '':
      content = <Alert message="Error !!!" description={error} type="error" />;
      break;
    case pokemons.length === 0:
      content = <Alert message="Array is empty" description="Find something else.." type="info" />;
      break;
    default:
      content = (
        <PokemonsList
          setPage={setPage}
          pokemons={searchedPokemons.slice(
            page * PAGINATION_LIMIT,
            page * PAGINATION_LIMIT + PAGINATION_LIMIT
          )}
        />
      );
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
        <SearchInput setQuery={(val: string) => setQuery(val)} />
        <SearchingSizeContainer>{content}</SearchingSizeContainer>
        <Pagination setPage={setPage} page={page} count={searchedPokemons.length} />
        <FallbackUIButton />
      </ContainerWrapper>
    </SearchingContainer>
  );
}

export default Searching;
