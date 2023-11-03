import { useSearchParams } from 'react-router-dom';
import { ListItem } from '../../styles';
import { Card, CardHeader, CardLink } from './styles';
import { PokemonProps } from './types/types';
import { useAppDispatch } from '../../hooks';
import { setPokemonInfo } from '../../store/slices/PokemonSlice';
import { useGetPokemonQuery } from '../../services/PokemonAPI';

function Pokemon({ pokemon }: PokemonProps) {
  const { url, name } = pokemon;

  const [searchParams] = useSearchParams();
  const id = url.split('/').at(-2);

  const { data } = useGetPokemonQuery({
    id: id || '',
  });

  const dispatch = useAppDispatch();

  const clickLinkHandle = () => {
    dispatch(setPokemonInfo({ name, image: data?.sprites.front_default || '', isActive: true }));
  };

  return (
    <ListItem $span={3}>
      <Card>
        <CardHeader>{name}</CardHeader>
        <CardLink
          onClick={clickLinkHandle}
          to={`search/${id}?details=1&page=${searchParams.get('page')}`}
        >
          Open the pokemon
        </CardLink>
      </Card>
    </ListItem>
  );
}

export default Pokemon;
