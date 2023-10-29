import { Component, ErrorInfo } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types/types';
import Alert from '../Alert';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: '', errorInfo: '' };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error: error.message, errorInfo: errorInfo.componentStack || '' });
  }

  render() {
    const { children } = this.props;
    const { hasError, error, errorInfo } = this.state;
    if (hasError) {
      return (
        <>
          <Alert message={error} description={errorInfo} type="error" />
          <Alert
            message="Guess, it can be an additional UI, right?"
            description="There are some UI's to show you how can I manipulate these methods 😛😛😛"
            type="info"
          />
        </>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
