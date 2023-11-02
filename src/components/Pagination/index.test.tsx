import { describe, expect, it } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';

import Pagination from '.';
import { renderWithProviders } from '../../test';

describe('Pagination', () => {
  it('should render message about empty array', () => {
    renderWithProviders(<Pagination setPage={() => {}} page={1} count={10} offset={2} />);

    const prevButton = screen.getByText('Prev');
    const nextButton = screen.getByText('Next');

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('should click next button', () => {
    renderWithProviders(<Pagination setPage={() => {}} page={1} count={10} offset={2} />);

    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);
  });

  it('should click prev button', () => {
    renderWithProviders(<Pagination setPage={() => {}} page={1} count={10} offset={2} />);

    const prevButton = screen.getByText('Prev');
    expect(prevButton).toBeInTheDocument();

    fireEvent.click(prevButton);
  });
});
