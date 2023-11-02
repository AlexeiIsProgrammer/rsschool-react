import { Outlet } from 'react-router-dom';
import TextAnimation from '../components/Animation/TextAnimation';
import ErrorBoundary from '../components/ErrorBoundary';
import Searching from '../components/Searching';
import { Welcome } from './styles';

function App() {
  return (
    <ErrorBoundary>
      <TextAnimation />
      <Searching />
      <Welcome>
        Welcome <br /> to this <br /> PokeProject
      </Welcome>
      <Outlet />
    </ErrorBoundary>
  );
}

export default App;
