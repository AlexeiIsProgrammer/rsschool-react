import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  PokemonAnimationWrapper,
  TextAnimationBlock,
  TextAnimationContainer,
  TextAnimationShadow,
  TextAnimationWrapper,
} from './styles';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { pokemonSelector } from '../../../store/selectors/PokemonSelector';
import { setIsActive, setPokemonInfo } from '../../../store/slices/PokemonSlice';

export default function TextAnimation() {
  const [isFirstTime, setIsFirstTime] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const [timer, setTimer] = useState<NodeJS.Timeout | number>(0);

  const dispatch = useAppDispatch();
  const { name, image, isActive } = useAppSelector(pokemonSelector);

  const innerTimeout = useCallback(() => {
    dispatch(setPokemonInfo({ name: '', image: '', isActive: false }));
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
          dispatch(setPokemonInfo({ name: '', image: '', isActive: false }));

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
          <TextAnimationBlock $order={3}>
            <PokemonAnimationWrapper>
              <span>{name}!</span>
              <img width={200} src={image} alt="name" />
            </PokemonAnimationWrapper>
          </TextAnimationBlock>
        </TextAnimationContainer>
      </TextAnimationWrapper>
    )
  );
}
