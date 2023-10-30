import { ContainerWrapper, SearchingList } from '../../styles';
import Pokemon from '../Pokemon';
import { PokemonsListProps } from './types/types';
import Alert from '../Alert';

export default function PokemonsList({ pokemons }: PokemonsListProps) {
  return (
    <ContainerWrapper>
      {pokemons.length === 0 ? (
        <Alert message="Array is empty" description="Find something else.." type="info" />
      ) : (
        <SearchingList>
          {pokemons.map((pokemon) => (
            <Pokemon key={pokemon.name} pokemon={pokemon} />
          ))}
        </SearchingList>
      )}
    </ContainerWrapper>
  );
}
