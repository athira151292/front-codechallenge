import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ArticleForm from './ArticleForm';
import { useAppDispatch } from '../../app/hooks';
import { addArticle, editArticle } from '../../redux/articles/articlesThunks';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../app/hooks');
jest.mock('../../redux/articles/articlesThunks');
jest.mock('react-select/creatable', () => (props: any) => (
  <div data-testid="select-mock" onClick={() => props.onChange([{ value: 'tag1', label: 'Tag 1' }])}>
    Select Mock
  </div>
));

const mockUseAppDispatch = useAppDispatch as unknown as jest.Mock;
const mockAddArticle = addArticle as jest.MockedFunction<typeof addArticle>;
const mockEditArticle = editArticle as jest.MockedFunction<typeof editArticle>;

describe('ArticleForm', () => {
  beforeEach(() => {
    mockUseAppDispatch.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render form elements', () => {
    render(
      <BrowserRouter>
        <ArticleForm />
      </BrowserRouter>
    );

    expect(screen.getByTestId('title-input')).toBeInTheDocument();
    expect(screen.getByTestId('content-input')).toBeInTheDocument();
    expect(screen.getByTestId('publish-button')).toBeInTheDocument();
  });

  test('should handle input changes', () => {
    render(
      <BrowserRouter>
        <ArticleForm />
      </BrowserRouter>
    );

    const titleInput = screen.getByTestId('title-input') as HTMLInputElement;
    const contentTextarea = screen.getByTestId('content-input') as HTMLTextAreaElement;

    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    fireEvent.change(contentTextarea, { target: { value: 'New Content' } });

    expect(titleInput.value).toBe('New Title');
    expect(contentTextarea.value).toBe('New Content');
  });

  test('should validate form inputs', () => {
    render(
      <BrowserRouter>
        <ArticleForm />
      </BrowserRouter>
    );

    fireEvent.submit(screen.getByTestId('publish-button'));

    expect(screen.getByTestId('content-input')).toHaveStyle('border-color: #b62906');
  });

  test('should handle form submission for adding a new article', () => {
    const mockDispatch = jest.fn();
    mockUseAppDispatch.mockReturnValue(mockDispatch);

    render(
      <BrowserRouter>
        <ArticleForm />
      </BrowserRouter>
    );

    const titleInput = screen.getByTestId('title-input') as HTMLInputElement;
    const contentTextarea = screen.getByTestId('content-input') as HTMLTextAreaElement;

    fireEvent.change(titleInput, { target: { value: 'New Title' } });
    fireEvent.change(contentTextarea, { target: { value: 'New Content' } });

    fireEvent.submit(screen.getByTestId('publish-button'));

    expect(mockAddArticle).toHaveBeenCalledWith(expect.objectContaining({
      title: 'New Title',
      content: 'New Content',
      tags: [],
    }));
  });

  test('should handle form submission for editing an article', () => {
    const mockDispatch = jest.fn();
    mockUseAppDispatch.mockReturnValue(mockDispatch);

    const article = {
      id: 1,
      title: 'Existing Title',
      content: 'Existing Content',
      dateCreated: '2024-07-09',
      tags: ['tag1'],
    };

    render(
      <BrowserRouter>
        <ArticleForm article={article} />
      </BrowserRouter>
    );

    const titleInput = screen.getByTestId('title-input') as HTMLInputElement;
    const contentTextarea = screen.getByTestId('content-input') as HTMLTextAreaElement;

    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.change(contentTextarea, { target: { value: 'Updated Content' } });

    fireEvent.submit(screen.getByText(/Publish/i));

    expect(mockEditArticle).toHaveBeenCalledWith(expect.objectContaining({
      id: 1,
      title: 'Updated Title',
      content: 'Updated Content',
      tags: ['tag1'],
    }));
  });
});
