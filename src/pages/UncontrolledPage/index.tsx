import { useNavigate } from 'react-router-dom';
import { createRef, useState } from 'react';
import { ValidationError } from 'yup';
import Input from '../../components/UI/Input';
import Select from '../../components/UI/Select';
import { useAppDispatch } from '../../hooks';
import { setUncontrolledValues } from '../../store/slices/uncontrolledSlice';
import { Button } from '../../styles';
import { FormValues } from '../../store/slices/types/interfaces';

import styles from './Uncontrolled.module.scss';
import { toBase64 } from '../../utils';
import { schema } from '../../schema';

export default function UncontrolledPage() {
  const nameRef = createRef<HTMLInputElement>();
  const ageRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const repeatPasswordRef = createRef<HTMLInputElement>();
  const genderRef = createRef<HTMLSelectElement>();
  const pictureRef = createRef<HTMLInputElement>();
  const privacyRef = createRef<HTMLInputElement>();
  const countryRef = createRef<HTMLSelectElement>();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [objError, setObjError] = useState({
    name: '',
    age: '',
    email: '',
    password: '',
    repeatPassword: '',
    gender: '',
    picture: '',
    privacy: '',
    country: '',
  });

  const formSubmitHandle = async (e) => {
    e.preventDefault();
    const currentValues: FormValues = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value) || 0,
      email: emailRef.current?.value || '',
      password: passwordRef.current?.value || '',
      repeatPassword: repeatPasswordRef.current?.value || '',
      gender: genderRef.current?.value || 'male',
      picture: pictureRef.current?.files || null,
      privacy: privacyRef.current?.checked || false,
      country: countryRef.current?.value || 'Belarus',
    };

    try {
      await schema.validate(currentValues, { abortEarly: false });

      const pic = await toBase64(currentValues?.picture[0]);

      dispatch(
        setUncontrolledValues({
          ...currentValues,
          picture: pic,
        })
      );

      navigate('/');

      setObjError({
        name: '',
        age: '',
        email: '',
        password: '',
        repeatPassword: '',
        gender: '',
        picture: '',
        privacy: '',
        country: '',
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const validationObj = {};

        error.inner.forEach((err) => {
          if (err.path === 'password') {
            if (validationObj[err.path]) {
              validationObj[err.path].push(err.message);
            } else {
              validationObj[err.path] = [err.message];
            }
          } else {
            validationObj[err.path] = err.message;
          }
        });

        setObjError(validationObj);
      }
    }
  };

  return (
    <div className={styles.uncontrolled}>
      <h1>Uncontrolled FORM</h1>
      <form onSubmit={formSubmitHandle} className={styles.uncontrolled__container}>
        <Input placeholder="Name" error={objError.name} ref={nameRef} />
        <Input placeholder="Age" error={objError.age} type="number" ref={ageRef} />
        <Input placeholder="Email" error={objError.email} type="email" ref={emailRef} />
        <Input
          placeholder="Pass"
          name="password"
          error={objError.password}
          type="password"
          ref={passwordRef}
        />
        <Input
          placeholder="Repeat pass"
          error={objError.repeatPassword}
          type="password"
          ref={repeatPasswordRef}
        />
        <Select
          data={[
            { name: 'male', value: 'male' },
            { name: 'female', value: 'female' },
            { name: 'pokemon', value: 'pokemon' },
          ]}
          ref={genderRef}
        />
        <div>
          <span>Policy</span>
          <Input placeholder="Policy" error={objError.privacy} type="checkbox" ref={privacyRef} />
        </div>
        <Input placeholder="Picture" error={objError.picture} type="file" ref={pictureRef} />
        <Select
          autocompletable
          data={[
            { name: 'Belarus', value: 'Belarus' },
            { name: 'Ukraine', value: 'Ukraine' },
            { name: 'Russia', value: 'Russia' },
            { name: 'USA', value: 'USA' },
          ]}
          ref={countryRef}
        />
        <Button>Click</Button>
      </form>
    </div>
  );
}
