import React, { Component } from 'react';
import Berry from '../Berry';
import { BerriesListProps, BerriesListState } from './types/types';
import searchBerries from '../../utils/sort';
import SearchInput from '../SearchInput';
import { ContainerWrapper, Row } from '../../styles';

export default class BerriesList extends Component<BerriesListProps, BerriesListState> {
  constructor(props: BerriesListProps) {
    super(props);

    this.state = { query: '' };
  }

  render() {
    const { berries } = this.props;
    const { query } = this.state;

    const findedBerries = searchBerries(query, berries);

    return (
      <ContainerWrapper>
        <SearchInput setQuery={(val: string) => this.setState({ query: val })} />
        <Row>
          {findedBerries.map((berry) => (
            <Berry key={berry.name} berry={berry} />
          ))}
        </Row>
      </ContainerWrapper>
    );
  }
}
