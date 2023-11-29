import Link from 'next/link';
import { styled } from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;

  border: 1px solid ${(props) => props.theme.colors.orange};
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 10px;

  &:hover {
    color: ${(props) => props.theme.colors.lightblack};
    background: ${(props) => props.theme.colors.orange};
  }
`;
export const CardHeader = styled.span`
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  background-color: ${(props) => props.theme.colors.white};
  border-bottom: 1px solid ${(props) => props.theme.colors.black};
  padding: 5px;
  border-radius: 10px 10px 0px 0px;
`;
export const CardLink = styled(Link)`
  text-align: center;
  width: 100%;
  display: inline-block;
  padding: 5px;
  text-decoration: none;
  color: ${(props) => props.theme.colors.black};

  &:active,
  &:visited {
    color: ${(props) => props.theme.colors.black};
  }
`;
