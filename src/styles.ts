import styled from 'styled-components';

export const Button = styled.button`
  outline: none;
  padding: 10px 30px;
  border: 1px solid #000;
  color: #fff;
  background-color: blue;
  cursor: pointer;

  transition: 0.2s ease all;

  &:hover {
    border-type: dashed;
  }
`;

export const SearchingList = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  overflow-y: auto;
  overflow-x: hidden;

  row-gap: 16px;
  column-gap: 24px;
`;

// width: calc(${(props) => (props.$span * 100) / 12}% - 24px);

export const ListItem = styled.div<{ $span: number }>``;

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
