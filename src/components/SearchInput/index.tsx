import { useEffect, useState } from 'react';
import { Button } from '../../styles';
import { Search, SearchInputWrapper } from './styles';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setQuery } from '../../store/slices/SearchSlice';
import { searchSelector } from '../../store/selectors/SearchSelector';

export default function SearchInput() {
  const dispatch = useAppDispatch();
  const { query } = useAppSelector(searchSelector);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setInputValue(query);
  }, []);

  const onSearch = () => {
    dispatch(setQuery(inputValue));
  };

  return (
    <SearchInputWrapper>
      <Search
        placeholder="Search your Pokemon"
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <Button onClick={onSearch}>Search</Button>
    </SearchInputWrapper>
  );
}
