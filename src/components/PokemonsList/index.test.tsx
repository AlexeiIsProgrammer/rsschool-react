import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import PokemonsList from '.';
import { renderWithProviders } from '../../test';

describe('App', () => {
  it('should render message about empty array', () => {
    renderWithProviders(<PokemonsList />);

    const expectedText = 'Array is empty';

    const value = screen.getByText(expectedText);

    expect(value).toHaveTextContent(expectedText);
  });
  it('should render cards', () => {
    renderWithProviders(<PokemonsList />);
  });
});
