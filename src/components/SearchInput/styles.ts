import { styled } from 'styled-components';

export const Search = styled.input`
  outline: none;
  padding: 10px;
  border: 4px solid #000;
  color: #000;

  flex: 1;

  transition: 0.2s ease all;

  &:hover {
    border-style: dashed;
  }

  &:focus {
    border-style: groove;
  }
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;
