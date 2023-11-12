import { describe, expect, it } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';

import SearchInput from '.';
import { renderWithProviders } from '../../test';

const localStorageMock = (function localStorageMockFunc() {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('SearchInput', () => {
  it('should render component', async () => {
    renderWithProviders(<SearchInput />, {
      preloadedState: {
        searchReducer: {
          query: '',
          itemsPerPage: [],
          viewMode: '1',
          isLoading: false,
          error: '',
        },
      },
    });

    expect(await screen.findByPlaceholderText('Search your Pokemon')).toBeInTheDocument();
    expect(await screen.findByText('Search')).toBeInTheDocument();
  });
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    renderWithProviders(<SearchInput />, {
      preloadedState: {
        searchReducer: {
          query: '',
          itemsPerPage: [],
          viewMode: '1',
          isLoading: false,
          error: '',
        },
      },
    });

    const input = await screen.findByPlaceholderText('Search your Pokemon');
    const button = await screen.findByText('Search');

    fireEvent.input(input, {
      target: { value: 'bulbasaur' },
    });

    fireEvent.click(button);

    expect(await window.localStorage.getItem('query')).toBe('bulbasaur');
  });
  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    window.localStorage.setItem('query', 'ivysaur');

    renderWithProviders(<SearchInput />, {
      preloadedState: {
        searchReducer: {
          query: '',
          itemsPerPage: [{ name: 'ivysaur', url: '' }],
          viewMode: '1',
          isLoading: false,
          error: '',
        },
      },
    });

    const input: HTMLInputElement = await screen.findByPlaceholderText('Search your Pokemon');

    expect(input.value).toBe('ivysaur');
  });
});
