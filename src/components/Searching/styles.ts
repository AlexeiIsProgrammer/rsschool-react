import styled from 'styled-components';

export const SearchingContainer = styled.div`
  position: relative;
  box-sizing: border-box;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.lightblack};
  padding: 16px;

  max-width: 500px;
`;

export const SearchingSizeContainer = styled.div`
  height: 60vh;

  overflow-y: auto;
  overflow-x: hidden;
`;
