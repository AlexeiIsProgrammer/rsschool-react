import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

import InputRangeProps from './types/types';
import { InputRangeContainer, InputRangeValue, InputRangeWrapper } from './styles';
import { DEBOUNCE_DELAY, MAX_POKEMONS_PER_PAGE } from '../../constants';

export default function InputRange({ onChange, count, value }: InputRangeProps) {
  const [rangeValue, setRangeValue] = useState(1);
  const [debounceValue] = useDebounce(rangeValue, DEBOUNCE_DELAY);

  useEffect(() => {
    setRangeValue(value);
  }, [value]);

  useEffect(() => {
    onChange(debounceValue);
  }, [debounceValue]);

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setRangeValue(+e.currentTarget.value);
  };

  return (
    <InputRangeContainer>
      <InputRangeValue
        type="number"
        value={rangeValue}
        onChange={onInputChange}
        max={count < MAX_POKEMONS_PER_PAGE ? count : MAX_POKEMONS_PER_PAGE}
        min={1}
      />
      <InputRangeWrapper
        type="range"
        value={rangeValue}
        onChange={onInputChange}
        min={1}
        max={count < MAX_POKEMONS_PER_PAGE ? count : MAX_POKEMONS_PER_PAGE}
      />
    </InputRangeContainer>
  );
}
