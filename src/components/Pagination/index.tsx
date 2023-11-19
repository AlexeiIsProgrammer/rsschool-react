import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { FIRST_PAGE } from '../../constants';
import { Button } from '../../styles';
import { PaginationCounter, PaginationWrapper } from './styles';
import PaginationProps from './types/types';

export default function Pagination({ total_pages, page, setPage }: PaginationProps) {
  const router = useRouter();
  useEffect(() => {
    router.push({
      query: {
        page: page.toString(),
      },
    });
  }, []);

  const prevPageHandle = () => {
    setPage(page - 1);
    router.push({
      query: {
        page: (page - 1).toString(),
      },
    });
  };

  const nextPageHandle = () => {
    setPage(page + 1);
    router.push({
      query: {
        page: (page + 1).toString(),
      },
    });
  };

  return (
    <PaginationWrapper>
      <Button disabled={page === FIRST_PAGE} onClick={prevPageHandle}>
        Prev
      </Button>
      <PaginationCounter>{page}</PaginationCounter>
      <Button disabled={page === total_pages} onClick={nextPageHandle}>
        Next
      </Button>
    </PaginationWrapper>
  );
}
