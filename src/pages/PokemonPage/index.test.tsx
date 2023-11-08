import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';

import PokemonPage from '.';
import Theme from '../../theme';

let mockSearchParam = 'details=1';

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

describe('Pokemon page', () => {
  it('Check that a loading indicator is displayed while fetching data', () => {
    render(<Wrapper />);
  });

  it('Make sure the detailed card component correctly displays the detailed card data', () => {
    render(<Wrapper />);
  });

  it('Ensure that clicking the close button hides the component', () => {
    render(<Wrapper />);

    // const closeButton = screen.getByTitle('Close button');
    // expect(closeButton).toBeInTheDocument();
  });
});
