import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary';
import Searching from '../components/Searching';
import { Welcome } from './styles';

function App() {
  return (
    <ErrorBoundary>
      <Searching />
      <Welcome>
        Welcome <br /> to this <br /> PokeProject
      </Welcome>
      <Outlet />
    </ErrorBoundary>
  );
}

export default App;
