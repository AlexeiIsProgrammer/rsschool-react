import React from 'react';
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import Theme from '../theme';
import { store } from '../store';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Theme>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Theme>
  );
}
