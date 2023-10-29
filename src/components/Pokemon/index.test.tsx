import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import Pokemon from '.';
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
        <Pokemon pokemon={{ name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' }} />
      </MemoryRouter>
    </Theme>
  );
}

describe('Pokemon', () => {
  it('should render pokemon component', () => {
    render(<Wrapper />);
  });

  it('should click pokemon link', async () => {
    render(<Wrapper />);

    const button: HTMLButtonElement = await screen.findByText('Open the pokemon');
    fireEvent.click(button);
  });
});
