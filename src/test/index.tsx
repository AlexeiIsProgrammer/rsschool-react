import { Provider } from 'react-redux';
import { RenderOptions, render, renderHook } from '@testing-library/react';
import { PreloadedState } from '@reduxjs/toolkit';
import { PersistGate } from 'redux-persist/integration/react';
import { PropsWithChildren } from 'react';
import { persistor, setupStore } from '../store';
import type { RootState, AppStore } from '../store';
import Theme from '../theme';

const defaultState: PreloadedState<RootState> = {
  searchReducer: {
    itemsPerPage: [],
    query: '',
    viewMode: '0',
    isLoading: false,
    error: new Error('Preload Error'),
  },
};

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = defaultState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Theme>
        <Provider store={store}>
          <PersistGate persistor={persistor}>{children}</PersistGate>
        </Provider>
      </Theme>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export function renderHookWithProviders<Result, Props = undefined>(
  callback: (initialProps: Props) => Result,
  {
    preloadedState = defaultState,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <Theme>
        <Provider store={store}>
          <PersistGate persistor={persistor}>{children}</PersistGate>
        </Provider>
      </Theme>
    );
  }

  return {
    store,
    ...renderHook<Result, Props>(callback, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  };
}
