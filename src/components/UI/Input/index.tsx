import React, { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.scss';

type Props = {
  // eslint-disable-next-line react/require-default-props
  error?: string | string[];
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(({ error, type, name, ...props }, ref) => {
  const passwordStates = {
    1: 'one',
    2: 'two',
    3: 'three',
  };

  return (
    <div className={styles.input}>
      <input {...props} ref={ref} />
      {error &&
        (name === 'password' ? (
          <>
            <div
              className={`${styles.input__error_secure} ${styles[passwordStates[error.length]]}`}
            >
              {[1, 2, 3, 4].map((err) => (
                <div className={styles.input__error_secure_item} key={err.toString()} />
              ))}
            </div>
            <span className={styles.input__error}>{error[0]}</span>
          </>
        ) : (
          <span className={styles.input__error}>{error}</span>
        ))}
    </div>
  );
});

export default Input;
