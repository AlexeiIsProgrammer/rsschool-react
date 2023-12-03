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

  &:disabled {
    cursor: default;
    opacity: 0.7;
    color: black;
    background-color: gray;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  row-gap: 16px;
  column-gap: 24px;
`;

export const Col = styled.div<{ $span: number }>`
  width: calc(${(props) => (props.$span * 100) / 12}% - 24px);
`;

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;
