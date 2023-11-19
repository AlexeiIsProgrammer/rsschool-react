import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  PokemonAnimationWrapper,
  TextAnimationBlock,
  TextAnimationContainer,
  TextAnimationShadow,
  TextAnimationWrapper,
} from './styles';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { pokemonSelector } from '../../../store/selectors/PokemonSelector';
import { setPokemonInfo } from '../../../store/slices/PokemonSlice';

export default function TextAnimation() {
  const router = useRouter();

  const [timer, setTimer] = useState<NodeJS.Timeout | number>(0);

  const dispatch = useAppDispatch();
  const { name, image, isActive } = useAppSelector(pokemonSelector);

  const innerTimeout = useCallback(() => {
    dispatch(setPokemonInfo({ name: '', image: '', isActive: false }));
  }, []);

  useEffect(() => {
    if (name !== '') {
      setTimeout(() => {
        setTimer(setTimeout(innerTimeout, 5000));
      }, 500);
    }
  }, [name]);

  return (
    isActive && (
      <TextAnimationWrapper
        onClick={() => {
          dispatch(setPokemonInfo({ name: '', image: '', isActive: false }));

          router.push({
            query: {
              details: '1',
            },
          });

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
