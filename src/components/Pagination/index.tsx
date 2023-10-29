import { PAGINATION_LIMIT } from '../../constants';
import { Button } from '../../styles';
import { PaginationCounter, PaginationWrapper } from './styles';
import PaginationProps from './types/types';

export default function Pagination({ count, page, setPage }: PaginationProps) {
  const prevPageHandle = () => {
    setPage(page - 1);
  };

  const nextPageHandle = () => {
    setPage(page + 1);
  };

  return (
    <PaginationWrapper>
      <Button disabled={page === 0} onClick={prevPageHandle}>
        Prev
      </Button>
      <PaginationCounter>{page + 1}</PaginationCounter>
      <Button disabled={(page + 1) * PAGINATION_LIMIT >= count} onClick={nextPageHandle}>
        Next
      </Button>
    </PaginationWrapper>
  );
}
