import { Component } from 'react';
import PokemonsList from '../components/PokemonsList';
import FallbackUIButton from '../components/FallbackUIButton';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import { ContainerWrapper } from '../styles';
import PokemonsAPI from '../API/Pokemons';
import { AppState } from './types/types';
import SearchInput from '../components/SearchInput';

class App extends Component<NonNullable<unknown>, AppState> {
  constructor(props: NonNullable<unknown>) {
    super(props);
    this.state = { loading: false, error: '', pokemons: [], query: '' };
  }

  componentDidMount(): void {
    this.fetchPokemons();
  }

  fetchPokemons = async () => {
    this.setState({ loading: true });
    this.setState({ error: '' });

    const pokemonsResponse = await PokemonsAPI.getPokemons();

    if (pokemonsResponse) {
      if (pokemonsResponse instanceof Error) {
        this.setState({ error: pokemonsResponse.message });
      } else {
        this.setState({ pokemons: pokemonsResponse.results });
      }
    }
    this.setState({ loading: false });
  };

  render() {
    let content: JSX.Element;

    const { loading, error, pokemons, query } = this.state;

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
            <SearchInput setQuery={(val: string) => this.setState({ query: val })} />
            <PokemonsList pokemons={pokemons} query={query} />
            <FallbackUIButton />
          </ContainerWrapper>
        );
        break;
    }

    return content;
  }
}

export default App;
