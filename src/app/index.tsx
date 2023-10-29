import { Outlet } from 'react-router-dom';
import Searching from '../components/Searching';
import { Welcome } from './styles';
import ErrorBoundary from '../components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Searching />
      <Welcome>
        Welcome <br /> to this <br /> page
      </Welcome>
      <Outlet />
    </ErrorBoundary>
  );
}

export default App;
