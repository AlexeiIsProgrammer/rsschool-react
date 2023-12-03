import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FormState, FormValues } from '../types/interfaces';

const initialState: FormState = {
  form: [],
};

export const reactHookFormSlice = createSlice({
  name: 'reactHookForm',
  initialState,
  reducers: {
    setReactHookFormValues(state, action: PayloadAction<FormValues>) {
      state.form.push(action.payload);
    },
  },
});

export const { setReactHookFormValues } = reactHookFormSlice.actions;

export default reactHookFormSlice.reducer;
