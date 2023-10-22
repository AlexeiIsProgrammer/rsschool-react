import React, { Component } from 'react';
import { Input } from 'antd';

const { Search } = Input;

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

  onSearch = (value: string) => {
    const { setQuery } = this.props;
    setQuery(value);
    this.toLocalStorage();
  };

  render() {
    const { inputValue } = this.state;

    return (
      <Search
        style={{ marginBottom: '10px' }}
        placeholder="Search your Berry"
        onSearch={this.onSearch}
        onChange={(e) => this.setState({ inputValue: e.target.value })}
        value={inputValue}
        enterButton="Search"
        size="large"
      />
    );
  }
}
