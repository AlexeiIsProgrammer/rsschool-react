import React from 'react';
import { describe, it, vi } from 'vitest';

import { renderWithProviders } from '../../../test';
import PokemonPage from '.';

vi.mock('next/router', () => vi.importActual('next-router-mock'));
describe('Pokemon', () => {
  it('should render PokemonPage', () => {
    renderWithProviders(<PokemonPage />);
  });
});
