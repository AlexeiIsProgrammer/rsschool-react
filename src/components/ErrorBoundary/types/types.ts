import { ReactNode } from 'react';

export type ErrorBoundaryState = {
  hasError: boolean;
  error: string;
  errorInfo: string;
};
export type ErrorBoundaryProps = {
  children: ReactNode;
};
