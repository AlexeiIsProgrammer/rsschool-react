import React from 'react';
import { userEvent } from '@testing-library/user-event';
import { act, fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import mockRouter from 'next-router-mock';
import Pagination from '.';
import { renderWithProviders } from '../../test';

vi.mock('next/router', () => vi.importActual('next-router-mock'));

describe('Pagination', () => {
  userEvent.setup();

  const setPage = vi.fn();

  beforeEach(() => {
    act(() => {
      renderWithProviders(<Pagination page={1} total_pages={5} setPage={setPage} />);
    });
  });

  it('should render message about empty array', () => {
    const prevButton = screen.getByText('Prev');
    const nextButton = screen.getByText('Next');

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('should click next button', () => {
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);

    expect(setPage).toHaveBeenCalledWith(2);
    expect(setPage).toHaveBeenCalled();
  });

  it('should click prev button', () => {
    const prevButton = screen.getByText('Prev');
    expect(prevButton).toBeInTheDocument();

    fireEvent.click(prevButton);

    expect(setPage).toHaveBeenCalledWith(2);
    expect(setPage).toHaveBeenCalled();
  });

  describe('Make sure the component updates URL query parameter when page changes', async () => {
    it('change param', async () => {
      const nextButton = screen.getByText('Next');

      await act(async () => {
        await userEvent.click(nextButton);
      });

      expect(mockRouter.query.page).toBe('2');
    });
  });
});
