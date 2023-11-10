import React, { forwardRef } from 'react';

const Select = forwardRef<HTMLSelectElement>((props, ref) => {
  return (
    <select ref={ref} {...props}>
      <option value="male">male</option>
      <option value="female">female</option>
      <option value="pokemon">pokemon</option>
    </select>
  );
});

export default Select;
