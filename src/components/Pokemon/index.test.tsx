import { fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { renderWithProviders } from '../../test';
import Pokemon from '.';
import App from '../../app';

describe('Pokemon', () => {
  beforeEach(async () => {
    renderWithProviders(
      <Pokemon pokemon={{ name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' }} />
    );
  });

  it('Ensure that the card component renders the relevant card data', async () => {
    expect(await screen.findByText('ivysaur')).toBeInTheDocument();
    expect(await screen.findByRole('link')).toHaveAttribute(
      'href',
      '/search/2?details=1&page=null'
    );
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    const { container } = renderWithProviders(<App />);

    await waitFor(() => {
      const detailedInfo = container.querySelector('.sc-idOjMB'); // Classname for detailed info container

      expect(detailedInfo).not.toBeInTheDocument();
    });

    const button: HTMLButtonElement = await screen.findByText('Open the pokemon');
    fireEvent.click(button);

    await waitFor(() => {
      const detailedInfo = container.querySelector('.sc-idOjMB'); // Classname for detailed info container

      expect(detailedInfo).not.toBeInTheDocument();
    });
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const button: HTMLButtonElement = await screen.findByText('Open the pokemon');
    fireEvent.click(button);

    waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });
});
