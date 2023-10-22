import { Row } from 'antd';

import React, { Component } from 'react';
import Berry from '../Berry';
import { BerriesListProps } from './types/types';

export default class BerriesList extends Component<BerriesListProps> {
  render() {
    const { berries } = this.props;

    return (
      <Row gutter={[16, 24]}>
        {berries.map((berry) => (
          <Berry key={berry.name} berry={berry} />
        ))}
      </Row>
    );
  }
}
