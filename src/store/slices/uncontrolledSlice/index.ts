import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormState } from '../types/interfaces';

const initialState: FormState = {
  name: '',
  age: 0,
  email: '',
  password: '',
  repeatPassword: '',
  gender: 'male',
  picture: '',
  privacy: false,
};

export const uncontrolledSlice = createSlice({
  name: 'uncontrolled',
  initialState,
  reducers: {
    clearUncontrolledValues(state, action: PayloadAction<FormState>) {
      if (action) {
        state = action.payload;
      }
    },
    setUncontrolledValues(state, action: PayloadAction<FormState>) {
      if (action) {
        state = action.payload;
      }
    },
  },
});

export const { clearUncontrolledValues, setUncontrolledValues } = uncontrolledSlice.actions;

export default uncontrolledSlice.reducer;
