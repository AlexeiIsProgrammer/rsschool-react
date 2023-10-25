import React, { Component } from 'react';
import { Search, SearchInputWrapper } from './styles';
import { Button } from '../../styles';

type SearchInputState = {
  inputValue: string;
};

type SearchInputProps = {
  setQuery: (val: string) => void;
};

export default class SearchInput extends Component<SearchInputProps, SearchInputState> {
  constructor(props: SearchInputProps) {
    super(props);
    this.state = { inputValue: '' };
  }

  componentDidMount(): void {
    const localQuery = localStorage.getItem('query');

    if (localQuery) {
      const { setQuery } = this.props;
      this.setState({ inputValue: localQuery });
      setQuery(localQuery);
    }
  }

  toLocalStorage = () => {
    const { inputValue } = this.state;

    localStorage.setItem('query', inputValue);
  };

  onSearch = () => {
    const { setQuery } = this.props;
    const { inputValue } = this.state;

    setQuery(inputValue);
    this.toLocalStorage();
  };

  render() {
    const { inputValue } = this.state;

    return (
      <SearchInputWrapper>
        <Search
          placeholder="Search your Berry"
          onChange={(e) => this.setState({ inputValue: e.target.value })}
          value={inputValue}
        />
        <Button onClick={this.onSearch}>Search</Button>
      </SearchInputWrapper>
    );
  }
}
