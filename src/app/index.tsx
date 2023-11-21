import React from 'react';
import TextAnimation from '../components/Animation/TextAnimation';
import ErrorBoundary from '../components/ErrorBoundary';
import Searching from '../components/Searching';
import Theme from '../theme';
import { Welcome } from './styles';
import PokemonPage from '../components/PokemonPage';

function App() {
  return (
    <Theme>
      <ErrorBoundary>
        <TextAnimation />
        <Searching />
        <Welcome>
          Welcome <br /> to this <br /> PokeProject
        </Welcome>
        <PokemonPage />
      </ErrorBoundary>
    </Theme>
  );
}

export default App;
