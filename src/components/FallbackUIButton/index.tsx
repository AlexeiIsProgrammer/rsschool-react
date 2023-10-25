import React, { Component } from 'react';

import { FallbackUIButtonState } from './types/types';
import { Button } from '../../styles';

export default class FallbackUIButton extends Component<
  NonNullable<unknown>,
  FallbackUIButtonState
> {
  constructor(props: NonNullable<unknown>) {
    super(props);
    this.state = { isError: false };
  }

  render() {
    const { isError } = this.state;

    let content: JSX.Element;

    switch (true) {
      case isError:
        throw new Error('Test error throwing');

      default:
        content = <Button onClick={() => this.setState({ isError: true })}>Get an error</Button>;
        break;
    }

    return content;
  }
}
