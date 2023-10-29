import { Outlet } from 'react-router-dom';
import Searching from '../components/Searching';

function App() {
  return (
    <>
      <Searching />
      <Outlet />;
    </>
  );
}

export default App;
