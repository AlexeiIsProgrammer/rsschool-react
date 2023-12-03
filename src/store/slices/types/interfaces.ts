export interface FormValues {
  name: string;
  age: number;
  email: string;
  password: string;
  repeatPassword: string;
  gender: string;
  picture: FileList | null | string;
  privacy: boolean;
  country: string;
}

export interface FormState {
  form: FormValues[];
}
