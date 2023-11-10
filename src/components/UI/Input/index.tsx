import React, { forwardRef } from 'react';

const Input = forwardRef<HTMLInputElement>((props, ref) => {
  return <input {...props} ref={ref} />;
});

export default Input;
