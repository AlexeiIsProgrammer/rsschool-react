import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.scss';
import { store } from './store';
import Theme from './theme';
import Page from './pages';

async function enableMocking() {
  // Remove '!' to see all items and real API callings
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Theme>
        <Provider store={store}>
          <Page />
        </Provider>
      </Theme>
    </React.StrictMode>
  );
});
