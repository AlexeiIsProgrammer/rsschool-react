import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.lightblack};
  border: 2px solid ${(props) => props.theme.colors.black};
  gap: 10px;
`;

export const PaginationCounter = styled.span`
  font-size: 36px;
  padding: 4px 10px;
  color: ${(props) => props.theme.colors.white};
  flex: 1;
  text-align: center;
  background-color: ${(props) => props.theme.colors.orange};
`;
