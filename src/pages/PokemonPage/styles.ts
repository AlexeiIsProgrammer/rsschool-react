import styled from 'styled-components';

export const PokemonDetailsWrapper = styled.div<{ $isClosed: boolean }>`
  position: fixed;
  right: 0px;
  top: 0px;
  bottom: 0;
  box-sizing: border-box;
  padding: 16px;
  height: 100vh;
  background-color: ${(props) => props.theme.colors.lightblack};
  max-width: ${(props) => (props.$isClosed ? '50px' : 'calc(100vw - 500px)')};
  transition: 0.5s ease max-width;
  width: 100%;
`;

export const PokemonDetailsOpen = styled.span`
  cursor: pointer;
  font-size: 30px;
  position: absolute;
  top: 50%;
  left: 10px;

  transform: translateY(-50%);
`;
