import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import ReactHookFormPage from '../pages/ReactHookFormPage';
import UncontrolledPage from '../pages/UncontrolledPage';
import MainPage from '../pages/MainPage';
import Layout from '../pages/Layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout component={<MainPage />} />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/react-hook-form',
    element: <Layout component={<ReactHookFormPage />} />,
  },
  {
    path: '/uncontrolled',
    element: <Layout component={<UncontrolledPage />} />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
