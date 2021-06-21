import React from 'react';
import { render, screen } from '@testing-library/react';
import FacetookApp from './App';

test('renders without crashing', () => {
  const div = document.createElement('div');
  const { unmount } = render(<FacetookApp />, div);
  unmount();
});
