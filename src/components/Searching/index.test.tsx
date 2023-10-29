import { render } from '@testing-library/react';
import { describe, it, vi } from 'vitest';

import { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import Theme from '../../theme';
import Searching from '.';

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
        <Searching />
      </MemoryRouter>
    </Theme>
  );
}

describe('Searching', () => {
  it('should render Searching', async () => {
    render(<Wrapper />);
  });
});
