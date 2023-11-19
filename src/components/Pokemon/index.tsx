import { ListItem } from '../../styles';
import { Card, CardHeader, CardLink } from './styles';
import { PokemonProps } from './types/types';
import { useAppDispatch } from '../../hooks';
import { setPokemonInfo } from '../../store/slices/PokemonSlice';

function Pokemon({ pokemon }: PokemonProps) {
  const { url, name } = pokemon;
  const id = url.split('/').at(-2);

  const dispatch = useAppDispatch();

  const clickLinkHandle = () => {
    dispatch(setPokemonInfo({ name, image: '', isActive: true }));
  };

  return (
    <ListItem $span={3}>
      <Card>
        <CardHeader>{name}</CardHeader>
        <CardLink
          onClick={clickLinkHandle}
          href={{
            pathname: '/search/[id]',
            query: {
              id,
              details: '1',
            },
          }}
        >
          Open the pokemon
        </CardLink>
      </Card>
    </ListItem>
  );
}

export default Pokemon;
