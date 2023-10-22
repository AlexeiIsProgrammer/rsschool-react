import React, { Component } from 'react';
import { Col, Card } from 'antd';
import { BerryProps } from './types/types';

class Berry extends Component<BerryProps> {
  render() {
    const {
      berry: { url, name },
    } = this.props;

    return (
      <Col span={6}>
        <Card title={name} size="small">
          <a href={url}>To berry</a>
        </Card>
      </Col>
    );
  }
}

export default Berry;
