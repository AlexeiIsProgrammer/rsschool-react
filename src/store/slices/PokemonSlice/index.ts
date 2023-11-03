import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PokemonState } from './types/interfaces';

const initialState: PokemonState = {
  name: '',
  image: '',
  isActive: false,

  isLoading: false,
  error: '',
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonInfo(
      state,
      action: PayloadAction<{ name: string; image: string; isActive: boolean }>
    ) {
      if (action) {
        state.name = action.payload.name;
        state.image = action.payload.image;
        state.isActive = action.payload.isActive;
      }
    },
    setIsActive(state, action: PayloadAction<boolean>) {
      if (action) {
        state.isActive = action.payload;
      }
    },
  },
});

export const { setPokemonInfo, setIsActive } = pokemonSlice.actions;

export default pokemonSlice.reducer;
