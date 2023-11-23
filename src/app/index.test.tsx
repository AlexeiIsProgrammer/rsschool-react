import React from 'react';
import { describe, it } from 'vitest';
import { render } from '@testing-library/react';
import App from '../pages';
import Theme from '../theme';

describe('App', () => {
  it('should render hello world', () => {
    render(
      <Theme>
        <App />
      </Theme>
    );
  });
});
