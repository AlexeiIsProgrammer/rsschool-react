import React from 'react';
import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import ErrorPage from '.';
import { renderWithProviders } from '../../test';

describe('Error page', () => {
  it('Should render component', async () => {
    renderWithProviders(<ErrorPage />);

    expect(await screen.getByText('Oops!')).toBeDefined();
  });
});
