// src/pages/Dashboard.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import Dashboard from './Dashboard';
import  { EnhancedStore } from '@reduxjs/toolkit';
import articlesReducer, { Article } from '../../redux/articles/articlesSlice';
import { fetchArticles } from '../../redux/articles/articlesThunks';
import { RootState } from '../../app/store';

jest.mock('../redux/articles/articlesThunks', () => ({
  fetchArticles: jest.fn(() => async (dispatch: any) => {
    dispatch({
      type: 'articles/fetchArticles/fulfilled',
      payload: [
        { id: 1, title: 'Article 1', content: 'Content 1', dateCreated: '2023-01-01', tags: ['tag1'] },
        { id: 2, title: 'Article 2', content: 'Content 2', dateCreated: '2023-01-02', tags: ['tag2'] },
      ],
    });
  }),
}));

const initialState = {
  articles: {
    articles: [],
    loading: false,
    error: null,
  },
};

describe('Dashboard Component', () => {
  let store: EnhancedStore<RootState>;;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        articles: articlesReducer,
      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
      preloadedState: initialState,
    });
  });

  test('renders articles and add article button', () => {
    render(
      <Provider store={store}>
        <Router>
          <Dashboard />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Add article')).toBeInTheDocument();
  });

  test('navigates to add article page on button click', () => {
    render(
      <Provider store={store}>
        <Router>
          <Dashboard />
        </Router>
      </Provider>
    );

    fireEvent.click(screen.getByText('Add article'));
    expect(window.location.pathname).toBe('/add-article');
  });
});
