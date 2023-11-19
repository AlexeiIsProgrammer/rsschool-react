'use client';

import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import '../fonts/index.scss';
import App from '../app';
import Theme from '../theme';
import { store } from '../store';
import PokemonPage from '../components/PokemonPage';

export default function Page() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Theme>
      <Provider store={store}>
        <App>{id && <PokemonPage />}</App>
      </Provider>
    </Theme>
  );
}
