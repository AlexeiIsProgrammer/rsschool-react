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
import SearchInput from '../SearchInput';
import searchPokemons from '../../utils/sort';
import InputRange from '../InputRange';

function Searching() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const [pokemons, setPokemons] = useState<PokemonURL[]>([]);
  const [searchedPokemons, setSearchedPokemons] = useState<PokemonURL[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = +(searchParams.get('page') || 1) - 1;

  const [offset, setOffset] = useState(1);
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
  }, [offset]);

  useEffect(() => {
    searchParams.set('page', (page + 1).toString());
    setSearchParams(searchParams);
  }, [page]);

  useEffect(() => {
    setSearchedPokemons(searchPokemons(query, pokemons));
    setPage(0);
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
    case searchedPokemons.length === 0:
      content = <Alert message="Array is empty" description="Find something else.." type="info" />;
      break;
    default:
      content = (
        <>
          <SearchingSizeContainer>
            <PokemonsList
              offset={offset}
              setPage={setPage}
              pokemons={searchedPokemons.slice(page * offset, page * offset + offset)}
            />
          </SearchingSizeContainer>
          <Pagination
            setPage={setPage}
            page={page}
            offset={offset}
            count={searchedPokemons.length}
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
        <SearchInput setQuery={(val: string) => setQuery(val)} />

        <InputRange value={offset} count={searchedPokemons.length} onChange={inputRangeHandle} />

        {content}
        <FallbackUIButton />
      </ContainerWrapper>
    </SearchingContainer>
  );
}

export default Searching;
