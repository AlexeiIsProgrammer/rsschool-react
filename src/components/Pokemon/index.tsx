import React from 'react';
import { PokemonProps } from './types/types';
import { ListItem } from '../../styles';
import { Card, CardHeader, CardLink } from './styles';

function Pokemon({ pokemon }: PokemonProps) {
  const { url, name } = pokemon;
  const id = url.split('/').at(-2);

  return (
    <ListItem $span={3}>
      <Card>
        <CardHeader>{name}</CardHeader>
        <CardLink to={`search/${id}`}>To pokemon</CardLink>
      </Card>
    </ListItem>
  );
}

export default Pokemon;
