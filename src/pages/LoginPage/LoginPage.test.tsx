import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import { useAuth } from '../../context/AuthContext';

jest.mock('../../context/AuthContext', () => ({
    useAuth: jest.fn(),
}));

const mockLogin = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('LoginPage', () => {
    beforeEach(() => {
        (useAuth as jest.Mock).mockReturnValue({
            login: mockLogin,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should render the login button', () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );

        const loginButton = screen.getByTestId('login-button');
        expect(loginButton).toBeInTheDocument();
    });

    test('should call login and navigate to homepage on login button click', () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );

        const loginButton = screen.getByTestId('login-button');

        fireEvent.click(loginButton);

        expect(mockLogin).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
