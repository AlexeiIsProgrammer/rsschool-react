import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';

import { createWrapper } from 'next-redux-wrapper';

import { pokemonApi } from '../services/PokemonAPI';
import searchReducer from './slices/SearchSlice';
import pokemonReducer from './slices/PokemonSlice';

const rootReducer = combineReducers({
  searchReducer,
  pokemonReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(pokemonApi.middleware),
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });
