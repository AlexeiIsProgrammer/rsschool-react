import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  TextAnimationBlock,
  TextAnimationContainer,
  TextAnimationShadow,
  TextAnimationWrapper,
} from './styles';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { pokemonSelector } from '../../../store/selectors/PokemonSelector';
import { setIsActive, setPokemonName } from '../../../store/slices/PokemonSlice';

export default function TextAnimation() {
  const [isFirstTime, setIsFirstTime] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const [timer, setTimer] = useState<NodeJS.Timeout | number>(0);

  const dispatch = useAppDispatch();
  const { name, isActive } = useAppSelector(pokemonSelector);

  const innerTimeout = useCallback(() => {
    dispatch(setIsActive(false));
    dispatch(setPokemonName(''));
  }, []);

  useEffect(() => {
    if (name !== '') {
      if (isFirstTime) {
        setIsFirstTime(false);
      } else {
        dispatch(setIsActive(true));
        setTimeout(() => {
          setTimer(setTimeout(innerTimeout, 5000));
        }, 500);
      }
    }
  }, [name]);

  return (
    isActive && (
      <TextAnimationWrapper
        onClick={() => {
          dispatch(setIsActive(false));
          dispatch(setPokemonName(''));

          searchParams.set('details', '1');
          setSearchParams(searchParams);

          clearTimeout(timer);
        }}
      >
        <TextAnimationShadow />
        <TextAnimationContainer>
          <TextAnimationBlock $order={0}>I</TextAnimationBlock>
          <TextAnimationBlock $order={1}>Choose</TextAnimationBlock>
          <TextAnimationBlock $order={2}>You</TextAnimationBlock>
          <TextAnimationBlock $order={3}>{name}!</TextAnimationBlock>
        </TextAnimationContainer>
      </TextAnimationWrapper>
    )
  );
}
