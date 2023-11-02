import styled, { keyframes } from 'styled-components';

const scaling = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.5);
  }
  100% {
    transform: translate(-50%, -50%) scale(0);
  }
`;

const endScaling = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
  }
`;

const borderLighting = keyframes`
    0% {    
        box-shadow: inset 0px 0px 0px 0px white;
    }
    12.5% {
        box-shadow: inset 0px 0px 1000px 20px white;
    }
    25% {
        box-shadow: inset 0px 0px 500px 0px white;
    }
    37.5% {
        box-shadow: inset 0px 0px 1000px 20px white;
    }
    50% {    
        box-shadow: inset 0px 0px 500px 0px white;
    }
    62.5% {    
        box-shadow: inset 0px 0px 1000px 20px white;
    }
    75% {
        box-shadow: inset 0px 0px 500px 0px white;
    }
    100% {
        box-shadow: inset 0px 0px 1000px 20px white;
    }
`;

const wrapperAnimation = keyframes`
  0% {
    visibility: hidden;
    opacity: 0;
  }
  10% {
    visibility: visible;
    opacity: 1;
  }
  90% {
    visibility: visible;
    opacity: 1;
  }
    100% {
      visibility: hidden;
      opacity: 0;
    }
`;

export const TextAnimationWrapper = styled.div`
  position: fixed;
  z-index: 100;

  animation: ${wrapperAnimation} 6s ease forwards;
`;

export const TextAnimationShadow = styled.div`
  z-index: 99;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 100vw;
  height: 100vh;

  background-color: black;
  opacity: 0.8;
`;

export const TextAnimationContainer = styled.div`
  z-index: 100;

  animation: ${borderLighting} 4.2s ease 1s forwards;

  width: 100vw;
  height: 100vh;

  position: fixed;
`;

export const TextAnimationBlock = styled.p<{ $order: number }>`
  padding: 0;
  margin: 0;

  font-size: 100px;
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  transform: scale(0) translate(-50%, -50%);

  position: fixed;
  top: 50%;
  left: 50%;

  animation: ${(props) => (props.$order === 3 ? endScaling : scaling)}
    ${(props) => (props.$order === 3 ? '.5' : '1')}s linear ${(props) => props.$order + 1}s forwards;
`;
