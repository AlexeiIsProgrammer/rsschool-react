import React, { InputHTMLAttributes, forwardRef } from 'react';
import styles from './Input.module.scss';

type Props = {
  // eslint-disable-next-line react/require-default-props
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(({ error, ...props }, ref) => {
  return (
    <div className={styles.input}>
      <input {...props} ref={ref} />
      <span className={styles.input__error}>{error}</span>
    </div>
  );
});

export default Input;
