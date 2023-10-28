import { Component } from 'react';
import BerriesList from '../components/PokemonsList';
import FallbackUIButton from '../components/FallbackUIButton';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import { ContainerWrapper } from '../styles';
import PokemonsAPI from '../API/Pokemons';
import { AppState } from './types/types';

class App extends Component<NonNullable<unknown>, AppState> {
  constructor(props: NonNullable<unknown>) {
    super(props);
    this.state = { loading: false, error: '', pokemons: [] };
  }

  componentDidMount(): void {
    this.fetchBerries();
  }

  fetchBerries = async () => {
    this.setState({ loading: true });
    this.setState({ error: '' });

    const pokemonsResponse = await PokemonsAPI.getPokemons();

    if (pokemonsResponse) {
      if (typeof pokemonsResponse === 'string') {
        this.setState({ error: pokemonsResponse });
      } else {
        this.setState({ pokemons: pokemonsResponse.results });
      }
    }
    this.setState({ loading: false });
  };

  render() {
    let content: JSX.Element;

    const { loading, error, pokemons } = this.state;

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
            <BerriesList pokemons={pokemons} />
            <FallbackUIButton />
          </ContainerWrapper>
        );
        break;
    }

    return content;
  }
}

export default App;
