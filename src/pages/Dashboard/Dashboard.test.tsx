import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchArticles } from '../../redux/articles/articlesThunks';
import { useNavigate } from 'react-router-dom';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';

jest.mock('../../app/hooks', () => ({
    useAppDispatch: jest.fn(),
    useAppSelector: jest.fn(),
}));

jest.mock('../../redux/articles/articlesThunks', () => ({
    fetchArticles: jest.fn(),
}));

const mockDispatch = jest.fn() as jest.MockedFunction<Dispatch<AnyAction>>;
const mockNavigate = jest.fn() as jest.MockedFunction<ReturnType<typeof useNavigate>>;

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('Dashboard', () => {
    beforeEach(() => {
        (useAppDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
        (useAppSelector as unknown as jest.Mock).mockReturnValue({
            articles: [
                {
                    id: 1,
                    dateCreated: '2024-07-09',
                    title: 'First Article',
                    content: 'This is the content of the first article',
                    tags: ['tag1'],
                },
                {
                    id: 2,
                    dateCreated: '2024-07-10',
                    title: 'Second Article',
                    content: 'This is the content of the second article',
                    tags: ['tag2'],
                },
            ],
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should render the Dashboard and articles', () => {
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        const addButton = screen.getByRole('button', { name: /add article/i });
        expect(addButton).toBeInTheDocument();

        const articles = screen.getAllByTestId('list-item');
        expect(articles).toHaveLength(2);
    });

    test('should navigate to add-article page on button click', () => {
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        const addButton = screen.getByRole('button', { name: /add article/i });

        fireEvent.click(addButton);

        expect(mockNavigate).toHaveBeenCalledWith('/add-article');
    });

    test('should dispatch fetchArticles on component mount', () => {
        render(
            <BrowserRouter>
                <Dashboard />
            </BrowserRouter>
        );

        expect(mockDispatch).toHaveBeenCalledWith(fetchArticles());
    });
});
