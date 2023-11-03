import { Button } from '../../styles';
import { PaginationCounter, PaginationWrapper } from './styles';
import PaginationProps from './types/types';

export default function Pagination({ total_pages, page, setPage }: PaginationProps) {
  const prevPageHandle = () => {
    setPage(page - 1);
  };

  const nextPageHandle = () => {
    setPage(page + 1);
  };

  return (
    <PaginationWrapper>
      <Button disabled={page === 1} onClick={prevPageHandle}>
        Prev
      </Button>
      <PaginationCounter>{page}</PaginationCounter>
      <Button disabled={page === total_pages} onClick={nextPageHandle}>
        Next
      </Button>
    </PaginationWrapper>
  );
}
