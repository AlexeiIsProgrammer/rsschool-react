import { useContext } from 'react';
import { ContainerWrapper, SearchingList } from '../../styles';
import Pokemon from '../Pokemon';
import Alert from '../Alert';
import { Context } from '../../context';
import { PokemonsListProps } from './types/types';

export default function PokemonsList({ offset, page }: PokemonsListProps) {
  const { pokemons } = useContext(Context);

  const slicedPokemons = pokemons.slice(offset * page, offset * page + offset);

  return (
    <ContainerWrapper>
      {slicedPokemons.length === 0 ? (
        <Alert message="Array is empty" description="Find something else.." type="info" />
      ) : (
        <SearchingList $offset={offset}>
          {slicedPokemons.map((pokemon) => (
            <Pokemon key={pokemon.name} pokemon={pokemon} />
          ))}
        </SearchingList>
      )}
    </ContainerWrapper>
  );
}
