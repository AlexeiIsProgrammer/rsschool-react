import React from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import { ThemeComponentProps } from './types/types';

const theme: DefaultTheme = {
  colors: {
    white: '#F6F1EE',
    black: '#4F4A45',
    lightblack: '#6C5F5B',
    orange: '#ED7D31',
    blue: '#0C356A',
    lightblue: '#0174BE',
    red: '#FF5B22',
    transparent: 'transparent',
  },
  gap: {
    small: '10px',
    medium: '15px',
    large: '20px',
  },
  padding: {
    zero: '0px',
    small: '5px',
    medium: '10px',
    large: '20px',
  },
  margin: {
    auto: 'auto',
    zero: '0px',
    medium: '20px',
    large: '30px',
  },
  iconSize: {
    large: '128px',
    small: '64px',
  },
  fonts: ['Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', 'sans-serif'],
  borderRadius: {
    medium: '10px',
  },
  width: {
    full: '100%',
    maxContent: 'max-content',
  },
  maxWidth: {
    medium: '700px',
  },
  height: {
    full: '100%',
    fullScreen: '100vh',
    auto: 'auto',
  },
  maxHeight: {
    select: '300px',
  },
  overflow: {
    auto: 'auto',
    hidden: 'hidden',
    ellipsis: 'ellipsis',
  },
  transition: {
    slow: 'ease .5s',
    fast: 'ease .3s',
  },
  fontSizes: {
    em: {
      small: '1.5em',
      medium: '2em',
      large: '3em',
    },
    rem: {
      small: '2rem',
      normal: '3rem',
      medium: '4rem',
      large: '7rem',
    },
  },
  fontWeights: {
    bold: '600',
  },
  textAlign: {
    center: 'center',
  },
};

function Theme({ children }: ThemeComponentProps) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default Theme;
