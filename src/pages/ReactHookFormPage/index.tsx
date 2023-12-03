import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Select from '../../components/UI/Select';
import { useAppDispatch } from '../../hooks';
import { Button } from '../../styles';
import styles from './ReactHookFormPage.module.scss';
import { toBase64 } from '../../utils';
import { schema } from '../../schema';
import { setReactHookFormValues } from '../../store/slices/reactHookFormSlice';
import CustomInput from '../../components/UI/CustomInput';
import { FormValues } from '../../store/slices/types/interfaces';

export default function ReactHookFormPage() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const formSubmitHandle = async (data) => {
    const pic = await toBase64(data?.picture[0]);

    dispatch(
      setReactHookFormValues({
        ...data,
        picture: pic,
      })
    );

    reset();

    navigate('/');
  };

  return (
    <div className={styles['hook-form']}>
      <h1>React Hook Form</h1>
      <form onSubmit={handleSubmit(formSubmitHandle)} className={styles['hook-form__container']}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <CustomInput type="text" placeholder="Name" error={errors?.name?.message} {...field} />
          )}
        />
        <Controller
          name="age"
          control={control}
          render={({ field }) => (
            <CustomInput type="number" placeholder="Age" error={errors?.age?.message} {...field} />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <CustomInput
              placeholder="Email"
              error={errors?.email?.message}
              type="email"
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <CustomInput
              placeholder="Password"
              error={errors?.password?.message}
              type="password"
              {...field}
            />
          )}
        />
        <Controller
          name="repeatPassword"
          control={control}
          render={({ field }) => (
            <CustomInput
              placeholder="Repeat password"
              error={errors?.repeatPassword?.message}
              type="password"
              {...field}
            />
          )}
        />

        <Select
          data={[
            { name: 'male', value: 'male' },
            { name: 'female', value: 'female' },
            { name: 'pokemon', value: 'pokemon' },
          ]}
          {...register('gender')}
        />
        <div>
          <span>Policy</span>

          <Controller
            name="privacy"
            control={control}
            render={({ field }) => (
              <CustomInput
                placeholder="Policy"
                error={errors?.privacy?.message}
                type="checkbox"
                {...field}
              />
            )}
          />
        </div>

        <div>
          <input placeholder="Picture" type="file" {...register('picture')} />
          {errors.picture && errors.picture?.message}
        </div>

        <Select
          autocompletable
          data={[
            { name: 'Belarus', value: 'Belarus' },
            { name: 'Ukraine', value: 'Ukraine' },
            { name: 'Russia', value: 'Russia' },
            { name: 'USA', value: 'USA' },
          ]}
          {...register('country')}
        />
        <Button disabled={!errors} type="submit">
          Click
        </Button>
      </form>
    </div>
  );
}
