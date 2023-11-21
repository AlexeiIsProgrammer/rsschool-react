import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.scss';
import { store } from './store';
import Theme from './theme';
import Page from './pages';

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: 'search/:pokemonId',
//         element: <PokemonPage />,
//       },
//     ],
//   },
// ]);

// async function enableMocking() {
//   // Remove '!' to see all items and real API callings
//   if (!import.meta.env.DEV) {
//     return;
//   }

//   const { worker } = await import('./mocks/browser');

//   return worker.start();
// }

// enableMocking().then(() => {
// });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme>
      <Provider store={store}>
        <Page />
      </Provider>
    </Theme>
  </React.StrictMode>
);
