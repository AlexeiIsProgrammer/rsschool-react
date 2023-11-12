import React from 'react';
import { AlertDescription, AlertMessage, AlertWrapper } from './styles';
import { AlertProps } from './types/types';

function Alert({ type, message, description }: AlertProps) {
  return (
    <AlertWrapper $type={type}>
      <AlertMessage>{message}</AlertMessage>
      <AlertDescription>{description}</AlertDescription>
    </AlertWrapper>
  );
}

export default Alert;
