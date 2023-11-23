import React, { PropsWithChildren } from 'react';
import { PreloadedState } from '@reduxjs/toolkit';
import { RenderOptions, render, renderHook } from '@testing-library/react';
import { Provider } from 'react-redux';
import type { AppStore, RootState } from '../store';
import { setupStore } from '../store';
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
        <Provider store={store}>{children}</Provider>
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
        <Provider store={store}>{children}</Provider>
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
