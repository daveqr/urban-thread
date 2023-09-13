import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LandingPageHome from './LandingPageHome';

describe('<LandingPageHome />', () => {
  test('it should mount', () => {
    render(<LandingPageHome />);
    
    const landingPageHome = screen.getByTestId('LandingPageHome');

    expect(landingPageHome).toBeInTheDocument();
  });
});