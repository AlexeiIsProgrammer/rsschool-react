import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PokemonState } from './types/interfaces';

const initialState: PokemonState = {
  name: '',
  isActive: false,

  isLoading: false,
  error: '',
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemonName(state, action: PayloadAction<string>) {
      if (action) {
        state.name = action.payload;
      }
    },
    setIsActive(state, action: PayloadAction<boolean>) {
      if (action) {
        state.isActive = action.payload;
      }
    },
  },
});

export const { setPokemonName, setIsActive } = pokemonSlice.actions;

export default pokemonSlice.reducer;
