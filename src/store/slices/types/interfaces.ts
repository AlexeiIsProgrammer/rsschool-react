export interface FormValues {
  name: string;
  age: number;
  email: string;
  password: string;
  repeatPassword: string;
  gender: string;
  picture: string;
  privacy: boolean;
}

export interface FormState {
  form: FormValues;
}
