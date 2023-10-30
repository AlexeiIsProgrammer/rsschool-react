import React, { Component } from 'react';
import { AlertDescription, AlertMessage, AlertWrapper } from './styles';
import { AlertProps } from './types/types';

class Alert extends Component<AlertProps> {
  render() {
    const { type, message, description } = this.props;

    return (
      <AlertWrapper $type={type}>
        <AlertMessage>{message}</AlertMessage>
        <AlertDescription>{description}</AlertDescription>
      </AlertWrapper>
    );
  }
}

export default Alert;
