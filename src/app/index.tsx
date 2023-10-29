import { useEffect, useState } from 'react';
import PokemonsAPI from '../API/Pokemons';
import Alert from '../components/Alert';
import FallbackUIButton from '../components/FallbackUIButton';
import PokemonsList from '../components/PokemonsList';
import Spinner from '../components/Spinner';
import { ContainerWrapper } from '../styles';
import { Pokemon } from '../API/types/interfaces';

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

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

  return content;
}

export default App;
