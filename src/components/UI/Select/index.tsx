import React, { SelectHTMLAttributes, forwardRef, useState } from 'react';
import styles from './Select.module.scss';

type Props = {
  // eslint-disable-next-line react/require-default-props
  autocompletable?: boolean;
  data: { name: string; value: string }[];
} & SelectHTMLAttributes<HTMLSelectElement>;

const Select = forwardRef<HTMLSelectElement, Props>(({ data, autocompletable, ...props }, ref) => {
  const [search, setSearch] = useState('Belarus');
  const [currentValue, setCurrentSelectValue] = useState('Belarus');
  const [isOpened, setIsOpened] = useState(false);

  const changeInputHandle = (value: string) => {
    setSearch(value);
  };

  return autocompletable ? (
    <div className={styles['auto-select']}>
      <select style={{ display: 'none' }} ref={ref} {...props}>
        <option value={currentValue}>Current</option>
      </select>
      <input
        onClick={() => setIsOpened(!isOpened)}
        className={styles['auto-select__input']}
        type="text"
        value={search}
        onChange={(e) => changeInputHandle(e.target.value)}
      />
      <div
        style={{
          display: isOpened ? 'block' : 'none',
        }}
        className={styles['auto-select__container']}
      >
        <ul className={styles['auto-select__list']}>
          {data
            .filter(({ name }) => name.toLowerCase().includes(search.toLowerCase()))
            .map(({ name, value }) => (
              <li
                className={styles['auto-select__item']}
                onClick={() => {
                  setCurrentSelectValue(value);
                  changeInputHandle(value);

                  setIsOpened(false);
                }}
                key={value}
              >
                {name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  ) : (
    <select ref={ref} {...props}>
      {data.map(({ value, name }) => (
        <option key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
});

export default Select;
