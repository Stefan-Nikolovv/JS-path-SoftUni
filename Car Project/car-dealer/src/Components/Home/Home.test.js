import {fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Home } from './Home';


describe('Home Page Testing', () => {
    test('Home is loading', () => {
        render(
        <Router>
        <Home/>
        </Router> );
        const homeElement = screen.getByTestId('homepage');
        expect(homeElement).toBeInTheDocument();
       
    });
    test('HomePage H1 textContent', () => {
        render(
            <Router>
            <Home/>
            </Router> );
            const homeElement = screen.getByTestId('homepage');
            expect(homeElement).toHaveTextContent('Welcome To Car Tube');
    });

    test('HomePage H2 textContent', () => {
        render(
            <Router>
            <Home/>
            </Router> );
            const homeElement = screen.getByTestId('homepage');
            expect(homeElement).toHaveTextContent('To see all the listings click the link below:');
    });
    
    test("HomePage to have a link to catalog", async() => {
        render(
            <Router>
            <Home/>
            </Router> );
            const linkElement = screen.getByRole('link', { name: 'All Cars' });
            expect(linkElement).toHaveAttribute('href', '/catalog');
    });

});

