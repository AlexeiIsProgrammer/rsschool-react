type PaginationProps = {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  total_pages: number;
  page: number;
};

export default PaginationProps;
