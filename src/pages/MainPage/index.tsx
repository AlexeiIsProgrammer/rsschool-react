import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Main.module.scss';
import { useAppSelector } from '../../hooks';
import { uncontrolledSelector } from '../../store/selectors/UncontrolledSelectors';
import MainItem from '../../components/MainItem';
import { reactHookFormSelector } from '../../store/selectors/ReactHookFormSelectors';

export default function MainPage() {
  const { form: uncontrolledForm } = useAppSelector(uncontrolledSelector);
  const { form: reactHookForm } = useAppSelector(reactHookFormSelector);

  return (
    <>
      <div className={styles.links}>
        <Link to="react-hook-form">React Hook Form</Link>
        <Link to="uncontrolled">Uncontrolled</Link>
      </div>
      <div className={styles.forms}>
        <div className={styles['forms__form-list']}>
          {reactHookForm.map((data, index, arr) => (
            <MainItem
              key={data.picture?.toString() || index}
              isActive={arr.length - 1 === index}
              data={data}
            />
          ))}
        </div>
        <div className={styles['forms__form-list']}>
          {uncontrolledForm.map((data, index, arr) => (
            <MainItem
              key={data.picture?.toString() || index}
              isActive={arr.length - 1 === index}
              data={data}
            />
          ))}
        </div>
      </div>
    </>
  );
}
