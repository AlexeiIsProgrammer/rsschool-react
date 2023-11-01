import styled from 'styled-components';

export const InputRangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
export const InputRangeValue = styled.input`
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  text-align: center;

  & {
    -moz-appearance: textfield;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;
export const InputRangeWrapper = styled.input`
  padding: 4px 10px;
  -webkit-appearance: none;
  background: none;

  width: 100%;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #ff4500;
    cursor: ew-resize;
    box-shadow: 0 0 2px 0 #555;
    transition: background 0.3s ease-in-out;
    background-color: ${(props) => props.theme.colors.black};
  }

  &::-webkit-slider-runnable-track {
    background-color: ${(props) => props.theme.colors.orange};
    border-radius: 20px;
  }
`;
