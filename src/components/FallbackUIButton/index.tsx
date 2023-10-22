import React, { Component } from 'react';

import { Button } from 'antd';
import { FallbackUIButtonState } from './types/types';

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
        content = (
          <Button onClick={() => this.setState({ isError: true })} type="dashed">
            Get an error
          </Button>
        );
        break;
    }

    return content;
  }
}
