import React from 'react';
import TextAnimation from '../components/Animation/TextAnimation';
import ErrorBoundary from '../components/ErrorBoundary';
import Searching from '../components/Searching';
import Theme from '../theme';
import { Welcome } from './styles';

function App({ children }: { children?: JSX.Element }) {
  return (
    <Theme>
      <ErrorBoundary>
        <TextAnimation />
        <Searching />
        <Welcome>
          Welcome <br /> to this <br /> PokeProject
        </Welcome>
        {children}
      </ErrorBoundary>
    </Theme>
  );
}

export default App;
