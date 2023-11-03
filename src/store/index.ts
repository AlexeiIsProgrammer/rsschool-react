import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { pokemonApi } from '../services/PokemonAPI';
import searchReducer from './slices/SearchSlice';
import pokemonReducer from './slices/PokemonSlice';

const rootReducer = combineReducers({
  searchReducer,
  pokemonReducer,
  [pokemonApi.reducerPath]: pokemonApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['pokemonApi', 'pokemonReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(pokemonApi.middleware),
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(pokemonApi.middleware),
    preloadedState,
  });
}

export const persistor = persistStore(store);

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
