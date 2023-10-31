import React, { Component } from 'react';
import Berry from '../Pokemon';
import { PokemonsListProps } from './types/types';
import { ContainerWrapper, Row } from '../../styles';
import searchPokemons from '../../utils/sort';

export default class PokemonsList extends Component<PokemonsListProps> {
  render() {
    const { pokemons, query } = this.props;

    const findedPokemons = searchPokemons(query, pokemons);

    return (
      <ContainerWrapper>
        <Row>
          {findedPokemons.map((pokemon) => (
            <Berry key={pokemon.name} pokemon={pokemon} />
          ))}
        </Row>
      </ContainerWrapper>
    );
  }
}
