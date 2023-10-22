import { Component } from 'react';
import { Spin, Alert } from 'antd';
import BerriesAPI from '../API/Berries';
import BerriesList from '../components/BerriesList';
import { OneBerry } from '../API/types/interfaces';

type AppState = {
  berries: OneBerry[];
  loading: boolean;
  error: string;
};

class App extends Component<NonNullable<unknown>, AppState> {
  constructor(props: NonNullable<unknown>) {
    super(props);
    this.state = { loading: false, error: '', berries: [] };
  }

  componentDidMount(): void {
    this.fetchBerries();
  }

  fetchBerries = async () => {
    this.setState({ loading: true });
    this.setState({ error: '' });

    const berriesResponse = await BerriesAPI.getBerries();

    if (berriesResponse) {
      if (typeof berriesResponse === 'string') {
        this.setState({ error: berriesResponse });
      } else {
        this.setState({ berries: berriesResponse.results });
      }
    }
    this.setState({ loading: false });
  };

  render() {
    let content: JSX.Element;

    const { loading, error, berries } = this.state;

    switch (true) {
      case loading:
        content = <Spin />;
        break;
      case error !== '':
        content = <Alert message="Error !!!" description={error} type="error" />;
        break;
      default:
        content = <BerriesList berries={berries} />;
        break;
    }

    return content;
  }
}

export default App;
