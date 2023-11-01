import { PreloadedState } from '@reduxjs/toolkit';
import { RenderOptions, render, renderHook } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import type { AppStore, RootState } from '../store';
import { persistor, setupStore } from '../store';
import Theme from '../theme';

const defaultState: PreloadedState<RootState> = {
  searchReducer: {
    itemsPerPage: [],
    query: '',
    viewMode: '0',
    isLoading: false,
    error: '',
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
          <PersistGate persistor={persistor}>
            <MemoryRouter>{children}</MemoryRouter>
          </PersistGate>
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
          <PersistGate persistor={persistor}>
            <MemoryRouter>{children}</MemoryRouter>
          </PersistGate>
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
