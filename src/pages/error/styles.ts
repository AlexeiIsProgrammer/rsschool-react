import styled from 'styled-components';

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  background-color: ${(props) => props.theme.colors.black};

  gap: 20px;
`;
export const ErrorTitle = styled.h1`
  color: ${(props) => props.theme.colors.white};
  text-align: center;
  font-size: 40px;
`;
export const ErrorDescription = styled.p`
  text-align: center;
  color: gray;
  font-size: 24px;
`;
