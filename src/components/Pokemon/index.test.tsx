import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

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
  it('Ensure that the card component renders the relevant card data', () => {
    render(<Wrapper />);

    const name = screen.getByText('bulbasaur');
    expect(name).toBeInTheDocument();
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    render(<Wrapper />);

    const button: HTMLButtonElement = await screen.findByText('Open the pokemon');
    fireEvent.click(button);
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    render(<Wrapper />);

    const button: HTMLButtonElement = await screen.findByText('Open the pokemon');
    fireEvent.click(button);
  });
});
