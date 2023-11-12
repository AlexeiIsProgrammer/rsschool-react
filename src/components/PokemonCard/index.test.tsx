import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, it } from 'vitest';

import PokemonCard from '.';
import { renderWithProviders } from '../../test';
import App from '../../app';

const pokemon = {
  name: 'Ivysaur',
  sprites: {
    front_default: '',
  },
  height: 200,
  weight: 100,
};

describe('Pokemon card', () => {
  it('Check that a loading indicator is displayed while fetching data', async () => {
    const { container } = renderWithProviders(<PokemonCard pokemon={pokemon} loading />);

    waitFor(() => {
      const spinner = container.querySelector('.kZUWme'); // Classname for spinner

      expect(spinner).toBeInTheDocument();
    });
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    renderWithProviders(<PokemonCard pokemon={pokemon} loading={false} />, {
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

    expect(await screen.findByText(/IVYSAUR/)).toBeInTheDocument();
  });

  it('Ensure that clicking the close button hides the component', async () => {
    renderWithProviders(<App />);

    const openPokemonButton: HTMLButtonElement = await screen.findByText('Open the pokemon');
    fireEvent.click(openPokemonButton);

    waitFor(async () => {
      const nameElement = await screen.findByText('IVYSAUR');

      expect(nameElement).toBeInTheDocument();

      const closeButton = await screen.findByTitle('close');

      fireEvent.click(closeButton);

      const nameElementAfterClosingDetails = await screen.findByText('IVYSAUR');

      expect(nameElementAfterClosingDetails).not.toBeInTheDocument();
    });
  });
});
