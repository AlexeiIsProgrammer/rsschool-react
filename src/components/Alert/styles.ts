import { styled } from 'styled-components';

export const AlertWrapper = styled.div<{ $type?: string }>`
  width: 100%;
  border: 1px solid ${(props) => (props.$type === 'error' ? 'red' : 'blue')};
  background-color: 1px solid ${(props) => (props.$type === 'error' ? 'tomato' : 'lightblue')};
  padding: 10px;
`;
export const AlertMessage = styled.div`
  text-align: left;
  color: #000;
  font-size: 30px;
`;
export const AlertDescription = styled(AlertMessage)`
  font-size: 20px;
`;
