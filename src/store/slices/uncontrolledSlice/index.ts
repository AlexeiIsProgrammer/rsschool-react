import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormState, FormValues } from '../types/interfaces';

const initialState: FormState = {
  form: [],
};

export const uncontrolledSlice = createSlice({
  name: 'uncontrolled',
  initialState,
  reducers: {
    setUncontrolledValues(state, action: PayloadAction<FormValues>) {
      state.form.push(action.payload);
    },
  },
});

export const { setUncontrolledValues } = uncontrolledSlice.actions;

export default uncontrolledSlice.reducer;
