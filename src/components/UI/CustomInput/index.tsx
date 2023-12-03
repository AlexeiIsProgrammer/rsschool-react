import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './CustomInput.module.scss';

type Props = {
  // eslint-disable-next-line react/require-default-props
  error?: string | string[];
} & InputHTMLAttributes<HTMLInputElement>;

const CustomInput = forwardRef<HTMLInputElement, Props>(({ error, name, ...props }, innerRef) => {
  const passwordStates = {
    'Password must contain 1 number': 'one',
    'Password must contain 1 lowercased letter': 'two',
    'Password must contain 1 uppercased letter': 'three',
    4: 'four',
  };

  return (
    <div className={styles.input}>
      <input autoComplete="off" {...props} ref={innerRef} />
      {name === 'password' ? (
        <>
          <div className={`${styles.input__error_secure} ${styles[passwordStates[error || 4]]}`}>
            {[1, 2, 3, 4].map((err) => (
              <div className={styles.input__error_secure_item} key={err.toString()} />
            ))}
          </div>
          <span className={styles.input__error}>{error}</span>
        </>
      ) : (
        <span className={styles.input__error}>{error}</span>
      )}
    </div>
  );
});

export default CustomInput;
