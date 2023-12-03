import React from 'react';
import ErrorBoundary from '../../components/ErrorBoundary';
import LayoutProps from './types/types';

export default function Layout({ component }: LayoutProps) {
  return <ErrorBoundary>{component}</ErrorBoundary>;
}
