import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormState, FormValues } from '../types/interfaces';

const initialState: FormState = {
  form: {
    name: '',
    age: 0,
    email: '',
    password: '',
    repeatPassword: '',
    gender: 'male',
    picture: '',
    privacy: false,
  },
};

export const uncontrolledSlice = createSlice({
  name: 'uncontrolled',
  initialState,
  reducers: {
    clearUncontrolledValues(state) {
      state.form = {
        name: '',
        age: 0,
        email: '',
        password: '',
        repeatPassword: '',
        gender: 'male',
        picture: '',
        privacy: false,
      };
    },
    setUncontrolledValues(state, action: PayloadAction<FormValues>) {
      if (action) {
        state.form = action.payload;
      }
    },
  },
});

export const { clearUncontrolledValues, setUncontrolledValues } = uncontrolledSlice.actions;

export default uncontrolledSlice.reducer;
