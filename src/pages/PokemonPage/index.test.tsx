import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';

import PokemonPage from '.';
import Theme from '../../theme';

let mockSearchParam = '';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');

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

function Wrapper() {
  return (
    <Theme>
      <MemoryRouter>
        <PokemonPage />
      </MemoryRouter>
    </Theme>
  );
}

describe('Pokemon', () => {
  it('should render PokemonPage', () => {
    render(<Wrapper />);
  });
});
