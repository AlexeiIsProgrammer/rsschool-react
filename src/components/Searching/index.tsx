import { useEffect, useState } from 'react';
import PokemonsAPI from '../../API/Pokemons';
import { PokemonURL } from '../../API/types/interfaces';
import { ContainerWrapper } from '../../styles';
import Alert from '../Alert';
import FallbackUIButton from '../FallbackUIButton';
import PokemonsList from '../PokemonsList';
import Spinner from '../Spinner';
import { SearchingContainer } from './styles';

function Searching() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [pokemons, setPokemons] = useState<PokemonURL[]>([]);

  const fetchPokemons = async () => {
    setLoading(true);
    setError('');

    const pokemonsResponse = await PokemonsAPI.getPokemons();

    if (pokemonsResponse) {
      if (pokemonsResponse instanceof Error) {
        setError(pokemonsResponse.message);
      } else {
        setPokemons(pokemonsResponse.results);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  let content: JSX.Element;

  switch (true) {
    case loading:
      content = <Spinner />;
      break;
    case error !== '':
      content = <Alert message="Error !!!" description={error} type="error" />;
      break;
    default:
      content = (
        <ContainerWrapper>
          <PokemonsList pokemons={pokemons} />
          <FallbackUIButton />
        </ContainerWrapper>
      );
      break;
  }

  return <SearchingContainer>{content}</SearchingContainer>;
}

export default Searching;
