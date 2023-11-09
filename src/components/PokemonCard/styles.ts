import styled from 'styled-components';

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

export const PokemonDetailsClose = styled.span`
  cursor: pointer;
  font-size: 30px;
  position: absolute;
  top: 10px;
  left: 10px;
`;
