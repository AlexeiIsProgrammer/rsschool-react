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

export const reactHookFormSlice = createSlice({
  name: 'reactHookForm',
  initialState,
  reducers: {
    clearReactHookFormValues(state) {
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
    setReactHookFormValues(state, action: PayloadAction<FormValues>) {
      if (action) {
        state.form = action.payload;
      }
    },
  },
});

export const { clearReactHookFormValues, setReactHookFormValues } = reactHookFormSlice.actions;

export default reactHookFormSlice.reducer;
