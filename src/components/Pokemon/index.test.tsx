import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Searching from '../Searching';
import { renderWithProviders } from '../../test';
import { server } from '../../mocks/browser';

describe('Pokemon', () => {
  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  beforeEach(async () => {
    renderWithProviders(<Searching />, {
      preloadedState: {
        searchReducer: {
          query: '',
          itemsPerPage: [],
          viewMode: '1',
          isLoading: false,
          error: '',
        },
      },
    });
  });

  it('Ensure that the card component renders the relevant card data', async () => {
    waitFor(() => {
      expect(screen.findByText('Ivysaur')).toHaveTextContent('Ivysaur');
      expect(screen.findByRole('link')).toHaveAttribute('href', '/search/2?details=1&page=1');
    });
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    const { container } = renderWithProviders(<Searching />, {
      preloadedState: {
        searchReducer: {
          query: '',
          itemsPerPage: [],
          viewMode: '1',
          isLoading: false,
          error: '',
        },
      },
    });

    await waitFor(() => {
      const detailedInfo = container.querySelector('.sc-idOjMB'); // Classname for detailed info container

      expect(detailedInfo).not.toBeInTheDocument();
    });

    const button: HTMLButtonElement = await screen.findByText('Open the pokemon');
    fireEvent.click(button);

    await waitFor(() => {
      const detailedInfo = container.querySelector('.sc-idOjMB'); // Classname for detailed info container

      expect(detailedInfo).toBeInTheDocument();
    });
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const button: HTMLButtonElement = await screen.findByText('Open the pokemon');
    fireEvent.click(button);

    waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });
});
