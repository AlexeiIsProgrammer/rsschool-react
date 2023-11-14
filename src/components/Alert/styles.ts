import { styled } from 'styled-components';

export const AlertWrapper = styled.div<{ $type?: string }>`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid
    ${(props) => (props.$type === 'error' ? props.theme.colors.red : props.theme.colors.blue)};
  background-color: ${(props) =>
    props.$type === 'error' ? props.theme.colors.red : props.theme.colors.lightblue};
  padding: 10px;
`;
export const AlertMessage = styled.div`
  text-align: left;
  color: #fff;
  font-size: 30px;
`;
export const AlertDescription = styled(AlertMessage)`
  font-size: 20px;
  word-break: break-word;
  overflow: auto;
`;
