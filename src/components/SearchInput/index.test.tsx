import { describe, expect, it } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';

import SearchInput from '.';
import { renderWithProviders } from '../../test';

describe('SearchInput', () => {
  it('should render component', async () => {
    renderWithProviders(<SearchInput />);

    expect(await screen.findByPlaceholderText('Search your Pokemon')).toBeInTheDocument();
    expect(await screen.findByText('Search')).toBeInTheDocument();
  });
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    renderWithProviders(<SearchInput />);

    const input = await screen.findByPlaceholderText('Search your Pokemon');
    const button = await screen.findByText('Search');

    fireEvent.change(input, {
      target: { value: 'bulbasaur' },
    });

    fireEvent.click(button);

    expect(await window.localStorage.getItem('query')).toBe('bulbasaur');
  });
  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    window.localStorage.setItem('query', 'ivysaur');

    renderWithProviders(<SearchInput />);

    const input: HTMLInputElement = await screen.findByPlaceholderText('Search your Pokemon');

    expect(input.value).toBe('ivysaur');
  });
});
