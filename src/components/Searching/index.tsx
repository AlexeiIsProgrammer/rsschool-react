import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { ContainerWrapper } from '../../styles';
import Alert from '../Alert';
import FallbackUIButton from '../FallbackUIButton';
import Pagination from '../Pagination';
import PokemonsList from '../PokemonsList';
import Spinner from '../Spinner';
import { SearchingContainer, SearchingSizeContainer } from './styles';

import { useGetPokemonsQuery } from '../../services/PokemonAPI';
import SearchInput from '../SearchInput';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { searchSelector } from '../../store/selectors/SearchSelector';
import { setPageItems } from '../../store/slices/SearchSlice';

import InputRange from '../InputRange';
import { PokemonURL } from '../../services/PokemonAPI/types/interfaces';
import searchPokemons from '../../utils/sort';

function Searching() {
  const dispatch = useAppDispatch();
  const { query, itemsPerPage } = useAppSelector(searchSelector);
  const { data, isLoading, error } = useGetPokemonsQuery({});

  const [searchedPokemons, setSearchedPokemons] = useState<PokemonURL[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = +(searchParams.get('page') || 1) - 1;

  const [offset, setOffset] = useState(1);
  const [page, setPage] = useState(pageParam);

  const inputRangeHandle = (e: React.FormEvent<HTMLInputElement> | number) => {
    setPage(0);
    if (typeof e === 'number') {
      setOffset(e);
    } else {
      setOffset(+e.currentTarget.value);
    }
  };

  useEffect(() => {
    if (data) {
      setSearchedPokemons(searchPokemons(query, data.results));
    }
  }, [data, query]);

  useEffect(() => {
    if (data) {
      dispatch(
        setPageItems({
          query,
          itemsPerPage: searchedPokemons.slice(page * offset, page * offset + offset),
        })
      );
    }
  }, [searchedPokemons, page, offset]);

  useEffect(() => {
    searchParams.set('page', (page + 1).toString());
    setSearchParams(searchParams);
  }, [page]);

  useEffect(() => {
    setPage(0);
    setOffset(1);
  }, [query]);

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
      content = (
        <>
          <SearchingSizeContainer>
            <PokemonsList offset={offset} />
          </SearchingSizeContainer>
          <Pagination
            setPage={setPage}
            page={page}
            offset={offset}
            count={searchedPokemons.length || 0}
          />
        </>
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
        <SearchInput />

        <InputRange
          value={offset}
          count={searchedPokemons.length || 0}
          onChange={inputRangeHandle}
        />

        {content}
        <FallbackUIButton />
      </ContainerWrapper>
    </SearchingContainer>
  );
}

export default Searching;
