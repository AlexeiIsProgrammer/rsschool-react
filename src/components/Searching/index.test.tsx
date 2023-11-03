import { beforeEach, describe, it, vi } from 'vitest';

import { useState } from 'react';
import Searching from '.';
import { renderWithProviders } from '../../test';

import { useGetPokemonsQuery } from '../../services/PokemonAPI';

vi.mock('../../services/PokemonAPI');

let mockSearchParam = '';

vi.mock('react-router-dom', async () => {
  const actual: object = await vi.importActual('react-router-dom');

  return {
    ...actual,
    useSearchParams: () => {
      const [params, setParams] = useState(new URLSearchParams(mockSearchParam));
      return [
        params,
        (newParams: string) => {
          mockSearchParam = newParams;
          setParams(new URLSearchParams(newParams));
        },
      ];
    },
  };
});

describe('Searching', () => {
  beforeEach(() => {
    useGetPokemonsQuery.mockClear();
  });

  it('should render Searching', async () => {
    const mockData = {
      count: null,
      next: '',
      previous: null,
      results: [
        {
          name: 'Bulbasaur',
          url: '',
        },
      ],
    };

    useGetPokemonsQuery.mockReturnValueOnce({
      data: mockData,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null,
    });

    renderWithProviders(<Searching />);
  });
});
