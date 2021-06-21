import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Paginator from './Paginator';

test('if total count of pages is more than 10, only 10 spans should be showed', () => {
    render(<Paginator totalCount={44} perPage={4} page={1} portionSize={10} />);
    const spans = screen.getAllByText(/[0-9]/);
    expect(spans.length).toBe(10);
});

test('if total count of pages is more than 10, the next button should be showed', () => {
    render(<Paginator totalCount={44} perPage={4} page={1} portionSize={10} />);
    const button = screen.getByText(/вправо/i);
    expect(button).toBeInTheDocument();
});