import { ContainerWrapper, SearchingList } from '../../styles';
import Pokemon from '../Pokemon';
import Alert from '../Alert';
import { useAppSelector } from '../../hooks';
import { searchSelector } from '../../store/selectors/SearchSelector';

export default function PokemonsList() {
  const { itemsPerPage } = useAppSelector(searchSelector);

  return (
    <ContainerWrapper>
      {itemsPerPage.length === 0 ? (
        <Alert message="Array is empty" description="Find something else.." type="info" />
      ) : (
        <SearchingList>
          {itemsPerPage.map((pokemon) => (
            <Pokemon key={pokemon.name} pokemon={pokemon} />
          ))}
        </SearchingList>
      )}
    </ContainerWrapper>
  );
}
