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

export const reactHookFormSlice = createSlice({
  name: 'reactHookForm',
  initialState,
  reducers: {
    clearReactHookFormValues(state, action: PayloadAction<FormState>) {
      if (action) {
        state = action.payload;
      }
    },
    setReactHookFormValues(state, action: PayloadAction<FormState>) {
      if (action) {
        state = action.payload;
      }
    },
  },
});

export const { clearReactHookFormValues, setReactHookFormValues } = reactHookFormSlice.actions;

export default reactHookFormSlice.reducer;
