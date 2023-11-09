import styled from 'styled-components';

export const Button = styled.button`
  outline: none;
  padding: 10px 30px;
  border: 1px solid ${(props) => props.theme.colors.orange};
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.orange};
  cursor: pointer;

  transition: 0.2s ease all;

  &:hover {
    background-color: ${(props) => props.theme.colors.lightblack};
  }

  &:disabled {
    opacity: 0.7;
    background-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black};
    cursor: not-allowed;
  }
`;

export const SearchingList = styled.div<{ $offset: number }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$offset < 5 ? '1fr' : props.$offset < 15 ? '1fr 1fr' : '1fr 1fr 1fr'};

  row-gap: 16px;
  column-gap: 18px;
`;

export const ListItem = styled.div<{ $span: number }>``;

export const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
