export interface FormState {
  name: string;
  age: number;
  email: string;
  password: string;
  repeatPassword: string;
  gender: 'male' | 'female' | 'pokemon';
  picture: string;
  privacy: boolean;
}
