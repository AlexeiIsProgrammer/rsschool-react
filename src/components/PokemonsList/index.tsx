import { useContext } from 'react';
import { ContainerWrapper, SearchingList } from '../../styles';
import Pokemon from '../Pokemon';
import Alert from '../Alert';
import { Context } from '../../context';

export default function PokemonsList() {
  const { pokemons } = useContext(Context);

  return (
    <ContainerWrapper>
      {pokemons.length === 0 ? (
        <Alert message="Array is empty" description="Find something else.." type="info" />
      ) : (
        <SearchingList $offset={offset}>
          {pokemons.map((pokemon) => (
            <Pokemon key={pokemon.name} pokemon={pokemon} />
          ))}
        </SearchingList>
      )}
    </ContainerWrapper>
  );
}
