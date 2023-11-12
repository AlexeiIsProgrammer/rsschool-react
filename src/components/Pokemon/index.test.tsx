import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Searching from '../Searching';
import { renderWithProviders } from '../../test';

describe('Pokemon', () => {
  const pokemon = {
    name: 'Ivysaur',
    sprites: {
      front_default: '',
    },
    height: 200,
    weight: 100,
  };

  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: { pokemon },
        }),
    })
  ) as unknown as typeof global.fetch;

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
    expect(await screen.findByText('Ivysaur')).toHaveTextContent('Ivysaur');
    expect(await screen.findByRole('link')).toHaveAttribute('href', '/search/2?details=1&page=1');
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
