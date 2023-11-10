import { createRef } from 'react';
import { number, object, string, ObjectSchema, boolean, ref } from 'yup';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import { useAppDispatch } from '../../hooks';
import { setUncontrolledValues } from '../../store/slices/uncontrolledSlice';
import { Button } from '../../styles';
import { FormValues } from '../../store/slices/types/interfaces';

export default function UncontrolledPage() {
  const nameRef = createRef<HTMLInputElement>();
  const ageRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const repeatPasswordRef = createRef<HTMLInputElement>();
  const genderRef = createRef<HTMLSelectElement>();
  const pictureRef = createRef<HTMLInputElement>();
  const privacyRef = createRef<HTMLInputElement>();

  const dispatch = useAppDispatch();

  const schema: ObjectSchema<FormValues> = object({
    name: string()
      .required()
      .test(
        'Must be uppercase',
        'Name must be with first letter in uppercase',
        (value) => value[0] === value[0].toUpperCase()
      ),
    age: number().required().positive('Age must be a positive'),
    email: string().email().required(),
    password: string()
      .required()
      .test('Must have numbers', 'Password must contain 1 number', (value) =>
        value.split('').some((symb) => '1234567890'.includes(symb))
      )
      .test('Must have uppercased letter', 'Password must contain 1 uppercased letter', (value) =>
        value.split('').some((symb) => symb === symb.toUpperCase())
      )
      .test('Must have lowercased letter', 'Password must contain 1 lowercased letter', (value) =>
        value.split('').some((symb) => symb === symb.toLowerCase())
      )
      .test('Must be special character', 'Password must contain 1 special character', (value) =>
        value.split('').some((symb) => symb === symb.toLowerCase())
      ),
    repeatPassword: string().oneOf([ref('password')], 'Passwords must match'),
    gender: string().nullable().required(),
    picture: string()
      .required()
      .test('test extension', 'val', (val) => {
        return ['png', 'jpeg'].includes(val.split('.').at(-1) || '');
      }),
    privacy: boolean(),
  });

  const formSubmitHandle = async () => {
    const currentValues: FormValues = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value) || 0,
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      repeatPassword: repeatPasswordRef.current?.value || '',
      gender: genderRef.current?.value || 'male',
      picture: pictureRef.current?.value || '',
      privacy: privacyRef.current?.checked || false,
    };

    await schema.validate(currentValues);

    dispatch(setUncontrolledValues(currentValues));
  };

  return (
    <div>
      <Input ref={nameRef} />
      <Input type="number" ref={ageRef} />
      <Input type="email" ref={emailRef} />
      <Input ref={passwordRef} />
      <Input ref={repeatPasswordRef} />
      <Select ref={genderRef} />
      <Input type="file" ref={pictureRef} />
      <Input type="checkbox" ref={privacyRef} />

      <Button onClick={formSubmitHandle}>Click</Button>
    </div>
  );
}
