import { useEffect, useState } from 'react';
import { Button } from '../../styles';
import { Search, SearchInputWrapper } from './styles';
import { SearchInputProps } from './types/types';

export default function SearchInput({ setQuery }: SearchInputProps) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const localQuery = localStorage.getItem('query');

    if (localQuery) {
      setInputValue(localQuery);
      setQuery(localQuery);
    }
  }, []);

  const onSearch = () => {
    setQuery(inputValue);
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
