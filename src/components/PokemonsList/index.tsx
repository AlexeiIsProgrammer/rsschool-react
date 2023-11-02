import { ContainerWrapper, SearchingList } from '../../styles';
import Pokemon from '../Pokemon';
import Alert from '../Alert';
import { useAppSelector } from '../../hooks';
import { searchSelector } from '../../store/selectors/SearchSelector';
import PokemonsListProps from './types/types';

export default function PokemonsList({ offset }: PokemonsListProps) {
  const { itemsPerPage } = useAppSelector(searchSelector);

  return (
    <ContainerWrapper>
      {itemsPerPage.length === 0 ? (
        <Alert message="Array is empty" description="Find something else.." type="info" />
      ) : (
        <SearchingList $offset={offset}>
          {itemsPerPage.map((pokemon) => (
            <Pokemon key={pokemon.name} pokemon={pokemon} />
          ))}
        </SearchingList>
      )}
    </ContainerWrapper>
  );
}
