import React, { Component } from 'react';
import { PokemonProps } from './types/types';
import { Col } from '../../styles';
import { Card, CardHeader, CardLink } from './styles';

class Pokemon extends Component<PokemonProps> {
  render() {
    const {
      pokemon: { url, name },
    } = this.props;

    return (
      <Col $span={3}>
        <Card>
          <CardHeader>{name}</CardHeader>
          <CardLink href={url}>To pokemon</CardLink>
        </Card>
      </Col>
    );
  }
}

export default Pokemon;
