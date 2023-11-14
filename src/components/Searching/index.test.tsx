import { describe, it } from 'vitest';

import Searching from '.';
import { renderWithProviders } from '../../test';

describe('Searching', () => {
  it('should render Searching', async () => {
    renderWithProviders(<Searching />);
  });
});
