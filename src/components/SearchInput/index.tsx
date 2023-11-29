import React, { useEffect, useState } from 'react';
import { Button } from '../../styles';
import { Search, SearchInputWrapper } from './styles';
import { useAppDispatch } from '../../hooks';
import { setQuery } from '../../store/slices/SearchSlice';

export default function SearchInput() {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const localQuery = localStorage.getItem('query');

    if (localQuery !== null) {
      setInputValue(localQuery);

      dispatch(setQuery(localQuery));
    }
  }, []);

  const onSearch = () => {
    dispatch(setQuery(inputValue));

    localStorage.setItem('query', inputValue);
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
