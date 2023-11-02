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
import SearchInput from '../SearchInput';
import searchPokemons from '../../utils/sort';
import InputRange from '../InputRange';

function Searching() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { pokemons, setPokemons, query, setQuery } = useContext(Context);

  const [requestedPokemons, setRequestedPokemons] = useState<PokemonURL[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = +(searchParams.get('page') || 1) - 1;

  const [offset, setOffset] = useState(1);
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
          setPokemons(searchPokemons(localQuery, pokemonsResponse.results));
        }
      }
    }

    setLoading(false);
  };

  const inputRangeHandle = (e: React.FormEvent<HTMLInputElement> | number) => {
    setPage(0);
    if (typeof e === 'number') {
      setOffset(e);
    } else {
      setOffset(+e.currentTarget.value);
    }
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
    setOffset(1);
  }, [query]);

  useEffect(() => {
    setPokemons(searchPokemons(query, requestedPokemons));
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
      content = (
        <>
          <SearchingSizeContainer>
            <PokemonsList page={page} offset={offset} />
          </SearchingSizeContainer>
          <Pagination setPage={setPage} page={page} offset={offset} count={pokemons.length} />
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

        <InputRange value={offset} count={pokemons.length} onChange={inputRangeHandle} />

        {content}
        <FallbackUIButton />
      </ContainerWrapper>
    </SearchingContainer>
  );
}

export default Searching;
