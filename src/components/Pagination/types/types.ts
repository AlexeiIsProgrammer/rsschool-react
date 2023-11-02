type PaginationProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  count: number;
  page: number;
  offset: number;
};

export default PaginationProps;
