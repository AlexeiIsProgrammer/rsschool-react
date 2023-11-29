import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { ContainerWrapper } from '../../styles';
import Alert from '../Alert';
import FallbackUIButton from '../FallbackUIButton';
import InputRange from '../InputRange';
import Pagination from '../Pagination';
import PokemonsList from '../PokemonsList';
import SearchInput from '../SearchInput';
import Spinner from '../Spinner';
import { SearchingContainer, SearchingSizeContainer } from './styles';

import {
  getPokemons,
  getRunningQueriesThunk,
  useGetPokemonsQuery,
} from '../../services/PokemonAPI';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { searchSelector } from '../../store/selectors/SearchSelector';
import { setPageItems } from '../../store/slices/SearchSlice';
import { wrapper } from '../../store';

function Searching() {
  const dispatch = useAppDispatch();
  const { query, itemsPerPage } = useAppSelector(searchSelector);
  const router = useRouter();

  const pageParam = +(router?.query?.page || 1);

  const [offset, setOffset] = useState(1);
  const [page, setPage] = useState(pageParam);

  const { data, isFetching, error } = useGetPokemonsQuery({
    name: query,
    page,
    limit: offset,
  });

  const inputRangeHandle = (e: React.FormEvent<HTMLInputElement> | number) => {
    setPage(1);
    if (typeof e === 'number') {
      setOffset(e);
    } else {
      setOffset(+e.currentTarget.value);
    }
  };

  useEffect(() => {
    if (data) {
      dispatch(
        setPageItems({
          query,
          itemsPerPage: data.items,
        })
      );
    }
  }, [data]);

  useEffect(() => {
    router.push({
      query: {
        page: page.toString(),
      },
    });
  }, [page]);

  useEffect(() => {
    setPage(1);
    setOffset(1);
  }, [query]);

  const conditions = [
    { condition: isFetching, component: <Spinner /> },
    {
      condition: error !== undefined,
      component: <Alert message="Error !!!" description={error?.toString() || ''} type="error" />,
    },
    {
      condition: !itemsPerPage.length,
      component: <Alert message="Array is empty" description="Find something else.." type="info" />,
    },
    {
      condition: itemsPerPage.length,
      component: (
        <>
          <SearchingSizeContainer>
            <PokemonsList offset={offset} />
          </SearchingSizeContainer>
          <Pagination setPage={setPage} page={page} total_pages={data?.meta.total_pages || 0} />
        </>
      ),
    },
  ];

  const activeComponent = conditions.find(({ condition }) => condition)?.component;

  return (
    <SearchingContainer
      onClick={() => {
        if (router.query.details && router.query.details === '1') {
          router.push({
            query: {
              details: '0',
            },
          });
        }
      }}
    >
      <ContainerWrapper>
        <SearchInput />

        <InputRange
          value={offset}
          count={data?.meta.total_pages || 0}
          onChange={inputRangeHandle}
        />

        {activeComponent}
        <FallbackUIButton />
      </ContainerWrapper>
    </SearchingContainer>
  );
}

export default Searching;

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const id = context.params?.id;

  if (typeof id === 'string') {
    store.dispatch(getPokemons.initiate({ id }));
  }

  await Promise.all(store.dispatch(getRunningQueriesThunk()));

  return {
    props: {},
  };
});
