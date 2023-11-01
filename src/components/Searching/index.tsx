import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ContainerWrapper } from '../../styles';
import Alert from '../Alert';
import FallbackUIButton from '../FallbackUIButton';
import Pagination from '../Pagination';
import PokemonsList from '../PokemonsList';
import Spinner from '../Spinner';
import { SearchingContainer, SearchingSizeContainer } from './styles';

import { PAGINATION_LIMIT } from '../../constants';
import { useGetPokemonsQuery } from '../../services/PokemonAPI';
import searchPokemons from '../../utils/sort';
import SearchInput from '../SearchInput';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { searchSelector } from '../../store/selectors/SearchSelector';
import { setPageItems } from '../../store/slices/SearchSlice';

function Searching() {
  const dispatch = useAppDispatch();
  const { query, itemsPerPage } = useAppSelector(searchSelector);

  const { data, isLoading, error } = useGetPokemonsQuery({});

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = +(searchParams.get('page') || 1) - 1;
  const [page, setPage] = useState(pageParam);

  useEffect(() => {
    if (data) {
      dispatch(
        setPageItems({
          query,
          itemsPerPage: searchPokemons(query, data.results).slice(
            page * PAGINATION_LIMIT,
            page * PAGINATION_LIMIT + PAGINATION_LIMIT
          ),
        })
      );
    }
  }, [data]);

  useEffect(() => {
    searchParams.set('page', (page + 1).toString());
    setSearchParams(searchParams);
  }, [page]);

  useEffect(() => {
    setPage(0);
  }, [query]);

  useEffect(() => {
    dispatch(
      setPageItems({
        query,
        itemsPerPage: searchPokemons(query, data?.results || []).slice(
          page * PAGINATION_LIMIT,
          page * PAGINATION_LIMIT + PAGINATION_LIMIT
        ),
      })
    );
  }, [query, page]);

  let content: JSX.Element;

  switch (true) {
    case isLoading:
      content = <Spinner />;
      break;
    case error !== undefined:
      content = <Alert message="Error !!!" description={error?.toString() || ''} type="error" />;
      break;
    case itemsPerPage.length === 0:
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
          count={searchPokemons(query, data?.results || []).length}
        />
        <FallbackUIButton />
      </ContainerWrapper>
    </SearchingContainer>
  );
}

export default Searching;
