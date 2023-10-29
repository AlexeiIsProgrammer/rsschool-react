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
  max-width: ${(props) => (props.$isClosed ? '50px' : 'calc(100vw - 400px)')};
  transition: 0.5s ease max-width;
  width: 100%;
`;

export const PokemonDetailsClose = styled.span`
  cursor: pointer;
  font-size: 30px;
  position: absolute;
  top: 10px;
  left: 10px;
`;

export const PokemonDetailsOpen = styled.span`
  cursor: pointer;
  font-size: 30px;
  position: absolute;
  top: 50%;
  left: 10px;

  transform: translateY(-50%);
`;

export const PokemonDetails = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;
export const PokemonName = styled.h1`
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  font-size: 40px;
`;
export const PokemonImage = styled.img`
  font-size: 30px;
  width: 200px;
  height: 200px;
`;
