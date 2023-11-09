import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      white: string;
      black: string;
      lightblack: string;
      orange: string;
      blue: string;
      lightblue: string;
      red: string;
      transparent: string;
    };
    gap: {
      small: string;
      medium: string;
      large: string;
    };
    padding: {
      zero: string;
      small: string;
      medium: string;
      large: string;
    };
    margin: {
      auto: string;
      zero: string;
      medium: string;
      large: string;
    };
    iconSize: {
      large: string;
      small: string;
    };
    fonts: string[];
    borderRadius: {
      medium: string;
    };
    width: {
      full: string;
      maxContent: string;
    };
    maxWidth: {
      medium: string;
    };
    height: {
      full: string;
      fullScreen: string;
      auto: string;
    };
    maxHeight: {
      select: string;
    };
    overflow: {
      auto: string;
      hidden: string;
      ellipsis: string;
    };
    transition: {
      slow: string;
      fast: string;
    };
    fontSizes: {
      em: {
        small: string;
        medium: string;
        large: string;
      };
      rem: {
        small: string;
        normal: string;
        medium: string;
        large: string;
      };
    };
    fontWeights: {
      bold: string;
    };
    textAlign: {
      center: string;
    };
  }
}
