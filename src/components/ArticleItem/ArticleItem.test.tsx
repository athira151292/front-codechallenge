import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ArticleItem from './ArticleItem';
import { useAppDispatch } from '../../app/hooks';
import { deleteArticle } from '../../redux/articles/articlesThunks';
import { BrowserRouter } from 'react-router-dom';
import { Article } from '../../redux/articles/articlesSlice';

jest.mock('../../app/hooks');
jest.mock('../../redux/articles/articlesThunks');
jest.mock('@mui/icons-material/Edit', () => () => <span>EditIcon</span>);
jest.mock('@mui/icons-material/Delete', () => () => <span>DeleteIcon</span>);

const mockUseAppDispatch = useAppDispatch as unknown as jest.Mock;

const article: Article = {
    id: 1,
    title: 'Sample Article',
    content: 'This is a sample article.',
    dateCreated: 'July 10, 2024',
    tags: ['tag1', 'tag2'],
};

describe('ArticleItem', () => {
    beforeEach(() => {
        mockUseAppDispatch.mockReturnValue(jest.fn());
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should render article details and action buttons', () => {
        render(
            <BrowserRouter>
                <ArticleItem article={article} />
            </BrowserRouter>
        );

        expect(screen.getByText('Sample Article')).toBeInTheDocument();
        expect(screen.getByText('This is a sample article.')).toBeInTheDocument();
        expect(screen.getByText('July 10, 2024')).toBeInTheDocument();
        expect(screen.getByTestId('edit-button')).toBeInTheDocument();
        expect(screen.getByTestId('delete-button')).toBeInTheDocument();
    });

    test('should open delete confirmation modal on delete button click', () => {
        render(
            <BrowserRouter>
                <ArticleItem article={article} />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId('delete-button'));

        expect(screen.getByText('Delete Article')).toBeInTheDocument();
        expect(screen.getByText('Are you sure you want to delete the article "Sample Article"?')).toBeInTheDocument();
    });

    test('should dispatch deleteArticle action on delete confirmation', () => {
        const mockDispatch = jest.fn();
        mockUseAppDispatch.mockReturnValue(mockDispatch);

        render(
            <BrowserRouter>
                <ArticleItem article={article} />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByTestId('delete-button'));

        fireEvent.click(screen.getByTestId('yes-button'));

        expect(mockDispatch).toHaveBeenCalledWith(deleteArticle(1));
        expect(screen.queryByText('Delete Article')).not.toBeInTheDocument();
    });

    test('should close delete confirmation modal on cancel', () => {
        render(
            <BrowserRouter>
                <ArticleItem article={article} />
            </BrowserRouter>
        );
        fireEvent.click(screen.getByTestId('delete-button'));
        fireEvent.click(screen.getByTestId('no-button'));

        expect(screen.queryByText('Delete Article')).not.toBeInTheDocument();
    });
});
