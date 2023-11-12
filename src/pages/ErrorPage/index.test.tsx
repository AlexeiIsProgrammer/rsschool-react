import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import Theme from '../../theme';
import ErrorPage from '.';
import App from '../../app';

describe('Error page', () => {
  it('Should render component', async () => {
    const routes = [
      {
        path: '/',
        element: <ErrorPage />,
      },
    ];

    const router = createMemoryRouter(routes);

    render(
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    );

    expect(await screen.getByText('Oops!')).toBeInTheDocument();
  });

  it('Ensure that the 404 page is displayed when navigating to an invalid route', async () => {
    const routes = [
      {
        path: '/invalid-link',
        element: <App />,
        errorElement: <ErrorPage />,
      },
    ];

    const router = createMemoryRouter(routes);

    render(
      <Theme>
        <RouterProvider router={router} />
      </Theme>
    );

    expect(await screen.getByText('Oops!')).toBeInTheDocument();
  });
});
