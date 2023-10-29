import { ListItem } from '../../styles';
import { Card, CardHeader, CardLink } from './styles';
import { PokemonProps } from './types/types';

function Pokemon({ pokemon }: PokemonProps) {
  const { url, name } = pokemon;
  const id = url.split('/').at(-2);

  return (
    <ListItem $span={3}>
      <Card>
        <CardHeader>{name}</CardHeader>
        <CardLink to={`search/${id}?details=1`}>To pokemon</CardLink>
      </Card>
    </ListItem>
  );
}

export default Pokemon;
