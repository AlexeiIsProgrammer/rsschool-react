import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Main.module.scss';
import { useAppSelector } from '../../hooks';
import { uncontrolledSelector } from '../../store/selectors/UncontrolledSelectors';

export default function MainPage() {
  const { form: uncontrolledForm } = useAppSelector(uncontrolledSelector);

  return (
    <>
      <div className={styles.links}>
        <Link to="react-hook-form">React Hook Form</Link>
        <Link to="uncontrolled">Uncontrolled</Link>
      </div>
      <div className={styles.forms}>
        <div className={styles['forms__form-list']} />
        <div className={styles['forms__form-list']}>
          {uncontrolledForm.map((data, index, arr) => (
            <div
              key={data.picture?.toString() || index}
              className={`${styles.forms__form} ${
                arr.length - 1 === index ? styles.forms__form_last : ''
              }`}
            >
              <h3>Name: {data.name}</h3>
              <p>Age: {data.age}</p>
              <p>Gender: {data.gender}</p>
              <p>E-Mail: {data.email}</p>
              <p>Country: {data.country}</p>
              <p>Agree?: {data.privacy ? 'Yes' : 'No'}</p>
              <p>Pass: {data.password}</p>
              <img
                src={data.picture}
                style={{
                  width: '100%',
                }}
                alt={data.name}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
