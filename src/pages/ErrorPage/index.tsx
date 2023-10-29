import React from 'react';
import { useRouteError } from 'react-router-dom';
import { ErrorDescription, ErrorTitle, ErrorWrapper } from './styles';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <ErrorWrapper>
      <ErrorTitle>Oops!</ErrorTitle>
      <ErrorDescription>{error.statusText || error.message}</ErrorDescription>
    </ErrorWrapper>
  );
}
