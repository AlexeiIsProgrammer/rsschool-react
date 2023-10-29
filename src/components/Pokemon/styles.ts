import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: nowrap;

  border: 1px solid #000;
  background-color: white;
  border-radius: 10px;
`;
export const CardHeader = styled.span`
  box-sizing: border-box;
  text-align: center;
  width: 100%;
  background-color: white;
  border-bottom: 1px solid #000;
  padding: 5px;
  border-radius: 10px 10px 0px 0px;
`;
export const CardLink = styled(Link)`
  text-align: center;
  width: 100%;
  display: inline-block;
  padding: 5px;
  text-decoration: none;
`;
