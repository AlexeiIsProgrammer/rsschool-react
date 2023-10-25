import React, { Component } from 'react';
import { BerryProps } from './types/types';
import { Col } from '../../styles';
import { Card, CardHeader, CardLink } from './styles';

class Berry extends Component<BerryProps> {
  render() {
    const {
      berry: { url, name },
    } = this.props;

    return (
      <Col $span={3}>
        <Card>
          <CardHeader>{name}</CardHeader>
          <CardLink href={url}>To berry</CardLink>
        </Card>
      </Col>
    );
  }
}

export default Berry;
