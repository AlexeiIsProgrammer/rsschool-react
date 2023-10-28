import React, { Component } from 'react';
import Berry from '../Pokemon';
import { PokemonsListProps, PokemonsListState } from './types/types';
import SearchInput from '../SearchInput';
import { ContainerWrapper, Row } from '../../styles';
import searchPokemons from '../../utils/sort';

export default class PokemonsList extends Component<PokemonsListProps, PokemonsListState> {
  constructor(props: PokemonsListProps) {
    super(props);

    this.state = { query: '' };
  }

  render() {
    const { pokemons } = this.props;
    const { query } = this.state;

    const findedPokemons = searchPokemons(query, pokemons);

    return (
      <ContainerWrapper>
        <SearchInput setQuery={(val: string) => this.setState({ query: val })} />
        <Row>
          {findedPokemons.map((pokemon) => (
            <Berry key={pokemon.name} pokemon={pokemon} />
          ))}
        </Row>
      </ContainerWrapper>
    );
  }
}
