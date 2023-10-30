import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PokemonsAPI from '../../API/Pokemons';

import { PokemonURL } from '../../API/types/interfaces';
import { Context } from '../../context';
import { ContainerWrapper } from '../../styles';
import Alert from '../Alert';
import FallbackUIButton from '../FallbackUIButton';
import Pagination from '../Pagination';
import PokemonsList from '../PokemonsList';
import Spinner from '../Spinner';
import { SearchingContainer, SearchingSizeContainer } from './styles';

import { PAGINATION_LIMIT } from '../../constants';
import searchPokemons from '../../utils/sort';
import SearchInput from '../SearchInput';

function Searching() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { pokemons, setPokemons, query, setQuery } = useContext(Context);

  const [requestedPokemons, setRequestedPokemons] = useState<PokemonURL[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = +(searchParams.get('page') || 1) - 1;

  const [page, setPage] = useState(pageParam);

  const fetchPokemons = async () => {
    setLoading(true);
    setError('');

    const pokemonsResponse = await PokemonsAPI.getPokemons();

    if (pokemonsResponse) {
      if (pokemonsResponse instanceof Error) {
        setError(pokemonsResponse.message);
      } else {
        setRequestedPokemons(pokemonsResponse.results);

        const localQuery = localStorage.getItem('query');

        if (localQuery !== null) {
          setQuery(localQuery);
          setPokemons(
            searchPokemons(localQuery, pokemonsResponse.results).slice(
              page * PAGINATION_LIMIT,
              page * PAGINATION_LIMIT + PAGINATION_LIMIT
            )
          );
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
    setPage(0);
  }, [query]);
  useEffect(() => {
    setPokemons(
      searchPokemons(query, requestedPokemons).slice(
        page * PAGINATION_LIMIT,
        page * PAGINATION_LIMIT + PAGINATION_LIMIT
      )
    );
  }, [query, page]);

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
      content = <PokemonsList />;
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
        <SearchInput />
        <SearchingSizeContainer>{content}</SearchingSizeContainer>
        <Pagination
          setPage={setPage}
          page={page}
          count={searchPokemons(query, requestedPokemons).length}
        />
        <FallbackUIButton />
      </ContainerWrapper>
    </SearchingContainer>
  );
}

export default Searching;
