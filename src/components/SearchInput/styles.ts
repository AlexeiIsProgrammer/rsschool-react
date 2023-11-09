import { styled } from 'styled-components';

export const Search = styled.input`
  outline: none;
  padding: 10px;
  border: 2px solid ${(props) => props.theme.colors.orange};
  color: ${(props) => props.theme.colors.black};

  flex: 1;

  transition: 0.2s ease all;

  &:hover {
    border-style: groove;
  }

  &:focus {
    border-style: dashed;
  }
`;

export const SearchInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;
