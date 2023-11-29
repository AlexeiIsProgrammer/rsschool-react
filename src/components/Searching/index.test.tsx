import React from 'react';
import { describe, it } from 'vitest';

import Searching from '.';
import { renderWithProviders } from '../../test';

vi.mock('next/router', () => vi.importActual('next-router-mock'));
describe('Searching', () => {
  it('should render Searching', async () => {
    renderWithProviders(<Searching />);
  });
});
