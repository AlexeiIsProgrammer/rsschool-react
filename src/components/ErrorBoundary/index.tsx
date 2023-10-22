import { Component, ErrorInfo } from 'react';
import { Alert } from 'antd';
import { ErrorBoundaryProps, ErrorBoundaryState } from './types/types';

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
      return <Alert message={error} description={errorInfo} type="error" />;
    }

    return children;
  }
}

export default ErrorBoundary;
