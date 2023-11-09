import { styled } from 'styled-components';

export const SpinnerWrapper = styled.span`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%) rotate(0deg);

  border: 2px solid #ff3d00;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  &::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
    left: 4px;
    top: 4px;
    border: 2px solid #fff;
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }

  @keyframes rotation {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;
