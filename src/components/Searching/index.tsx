import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Context } from '../../context';
import { ContainerWrapper } from '../../styles';
import Alert from '../Alert';
import FallbackUIButton from '../FallbackUIButton';
import InputRange from '../InputRange';
import Pagination from '../Pagination';
import PokemonsList from '../PokemonsList';
import SearchInput from '../SearchInput';
import Spinner from '../Spinner';
import { SearchingContainer, SearchingSizeContainer } from './styles';
import { useFetchedPokemons } from '../../hooks/useFetchedPokemons';

function Searching() {
  const { query, setQuery, pokemons } = useContext(Context);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = +(searchParams.get('page') || 1);

  const [offset, setOffset] = useState(1);
  const [page, setPage] = useState(pageParam);

  const { loading, error, totalPages } = useFetchedPokemons(offset, page);

  const inputRangeHandle = (e: React.FormEvent<HTMLInputElement> | number) => {
    setPage(1);
    if (typeof e === 'number') {
      setOffset(e);
    } else {
      setOffset(+e.currentTarget.value);
    }
  };

  useEffect(() => {
    const localQuery = localStorage.getItem('query');

    if (localQuery) {
      setQuery(localQuery);
    }
  }, []);

  useEffect(() => {
    setSearchParams({ page: page.toString() });
  }, [page]);

  useEffect(() => {
    setPage(1);
    setOffset(1);
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
        <>
          <SearchingSizeContainer>
            <PokemonsList offset={offset} />
          </SearchingSizeContainer>
          <Pagination setPage={setPage} page={page} total_pages={totalPages} />
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

        <InputRange value={offset} count={totalPages} onChange={inputRangeHandle} />

        {content}
        <FallbackUIButton />
      </ContainerWrapper>
    </SearchingContainer>
  );
}

export default Searching;
