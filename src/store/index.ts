import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';

import reactHookFormReducer from './slices/reactHookFormSlice';
import uncontrolledReducer from './slices/uncontrolledSlice';

const rootReducer = combineReducers({
  reactHookFormReducer,
  uncontrolledReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type AppStore = ReturnType<typeof setupStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
