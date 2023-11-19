import { describe, it, vi } from 'vitest';

import { useState } from 'react';
import { renderWithProviders } from '../../test';
import PokemonPage from '.';

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

describe('Pokemon', () => {
  it('should render PokemonPage', () => {
    renderWithProviders(<PokemonPage />);
  });
});
