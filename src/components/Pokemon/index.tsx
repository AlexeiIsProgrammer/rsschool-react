import React from 'react';
import { PokemonProps } from './types/types';
import { Col } from '../../styles';
import { Card, CardHeader, CardLink } from './styles';

function Pokemon({ pokemon }: PokemonProps) {
  const { url, name } = pokemon;

  return (
    <Col $span={3}>
      <Card>
        <CardHeader>{name}</CardHeader>
        <CardLink href={url}>To pokemon</CardLink>
      </Card>
    </Col>
  );
}

export default Pokemon;
