import React from 'react';
import { ErrorDescription, ErrorTitle, ErrorWrapper } from './styles';

export default function ErrorPage() {
  return (
    <ErrorWrapper>
      <ErrorTitle>Oops!</ErrorTitle>
      <ErrorDescription>Something went wrong...</ErrorDescription>
    </ErrorWrapper>
  );
}
