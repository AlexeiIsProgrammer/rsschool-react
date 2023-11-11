import { useSearchParams } from 'react-router-dom';
import { FIRST_PAGE } from '../../constants';
import { Button } from '../../styles';
import { PaginationCounter, PaginationWrapper } from './styles';
import PaginationProps from './types/types';

export default function Pagination({ total_pages, page, setPage }: PaginationProps) {
  const [, setSearchParams] = useSearchParams({
    page: page.toString(),
  });

  const prevPageHandle = () => {
    setPage(page - 1);
    setSearchParams({ page: `${page - 1}` });
  };

  const nextPageHandle = () => {
    setPage(page + 1);
    setSearchParams({ page: `${page + 1}` });
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
