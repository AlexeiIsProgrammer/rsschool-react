import styled from 'styled-components';

export const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  background-color: #45474b;

  gap: 20px;
`;
export const ErrorTitle = styled.h1`
  color: #f5f7f8;
  text-align: center;
  font-size: 40px;
`;
export const ErrorDescription = styled.h2`
  text-align: center;
  color: gray;
  font-size: 24px;
`;
