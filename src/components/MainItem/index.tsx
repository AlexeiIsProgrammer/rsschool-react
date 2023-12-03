import React from 'react';
import { FormValues } from '../../store/slices/types/interfaces';
import styles from './MainItem.module.scss';

export default function MainItem({ data, isActive }: { data: FormValues; isActive: boolean }) {
  return (
    <div className={`${styles.item} ${isActive ? styles.item_last : ''}`}>
      <h3>Name: {data.name}</h3>
      <p>Age: {data.age}</p>
      <p>Gender: {data.gender}</p>
      <p>E-Mail: {data.email}</p>
      <p>Country: {data.country}</p>
      <p>Agree?: {data.privacy ? 'Yes' : 'No'}</p>
      <p>Pass: {data.password}</p>
      <img
        src={data?.picture}
        style={{
          width: '100%',
        }}
        alt={data.name}
      />
    </div>
  );
}
