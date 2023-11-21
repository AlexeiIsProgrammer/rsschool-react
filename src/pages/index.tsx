'use client';

import React from 'react';
import { Provider } from 'react-redux';
import '../fonts/index.scss';
import App from '../app';
import Theme from '../theme';
import { store } from '../store';

export default function Page() {
  return (
    <Theme>
      <Provider store={store}>
        <App />
      </Provider>
    </Theme>
  );
}
