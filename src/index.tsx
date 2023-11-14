import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './app';
import './index.scss';
import ErrorPage from './pages/ErrorPage';
import PokemonPage from './pages/PokemonPage';
import { store } from './store';
import Theme from './theme';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'search/:pokemonId',
        element: <PokemonPage />,
      },
    ],
  },
]);

// async function enableMocking() {
//   if (!import.meta.env.DEV) {
//     return;
//   }

//   const { worker } = await import('./mocks/browser');

//   return worker.start();
// }

// enableMocking().then(() => {
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </Theme>
  </React.StrictMode>
);
// });
