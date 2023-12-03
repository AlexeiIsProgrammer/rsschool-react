import { ObjectSchema, boolean, mixed, number, object, ref, string } from 'yup';

import { FormValues } from '../store/slices/types/interfaces';
import { SUPPORTED_FORMATS } from '../constants';

export const schema: ObjectSchema<FormValues> = object({
  name: string()
    .required()
    .test(
      'Must be uppercase',
      'Name must be with first letter in uppercase',
      (value) => value.length !== 0 && value[0] === value[0].toUpperCase()
    ),
  age: number().required().positive('Age must be a positive'),
  email: string().email().required(),
  password: string()
    .required()
    .test('Must have numbers', 'Password must contain 1 number', (value) =>
      Boolean(value.match(/\d/))
    )
    .test('Must have lowercased letter', 'Password must contain 1 lowercased letter', (value) =>
      value.split('').some((symb) => symb !== symb.toUpperCase())
    )
    .test('Must have uppercased letter', 'Password must contain 1 uppercased letter', (value) =>
      value.split('').some((symb) => symb !== symb.toLowerCase())
    )
    .test('Must be special character', 'Password must contain 1 special character', (value) =>
      Boolean(value.match(/[!@#$%^&*(),.?":{}|<>]/g))
    ),
  repeatPassword: string().oneOf([ref('password')], 'Passwords must match'),
  gender: string().nullable().required(),
  privacy: boolean().required(),
  picture: mixed<FileList>()
    .required('A file is required')
    .test('fileslength', 'Choose the file', (value) => Boolean(value))
    .test('filesize', 'INCORRECT filesize', (value) => {
      return value && value[0] && value[0].size < 2_000_000;
    })
    .test(
      'fileFormat',
      'Unsupported Format',
      (value) => value && value[0] && SUPPORTED_FORMATS.includes(value[0].type)
    ),
});
