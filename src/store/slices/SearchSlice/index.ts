import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SearchState } from './types/interfaces';
import { PokemonURL } from '../../../services/PokemonAPI/types/interfaces';

const initialState: SearchState = {
  query: '',
  itemsPerPage: [],
  viewMode: '0',

  isLoading: false,
  error: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setViewMode(state, action: PayloadAction<string>) {
      if (action) {
        state.viewMode = action.payload;
      }
    },
    setQuery(state, action: PayloadAction<string>) {
      if (action) {
        state.query = action.payload;
      }
    },
    setPageItems(state, action: PayloadAction<{ query: string; itemsPerPage: PokemonURL[] }>) {
      if (action) {
        state.query = action.payload.query;
        state.itemsPerPage = action.payload.itemsPerPage;
      }
    },
  },
});

export const { setViewMode, setPageItems, setQuery } = searchSlice.actions;

export default searchSlice.reducer;
