import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchArticles, fetchArticleDetails, addArticle, editArticle, deleteArticle} from './articlesThunks';
import { RootState } from '../../app/store';

export interface Article {
  id: number;
  dateCreated: string;
  tags: string[];
  title: string;
  content: string;
}

interface ArticlesState {
  articles: Article[];
  loading: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: null,
};

export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
  },  
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch articles';
      })
      .addCase(fetchArticleDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchArticleDetails.fulfilled, (state, action: PayloadAction<Article>) => {
        state.loading = false;
      })
      .addCase(fetchArticleDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch article';
      })
      .addCase(addArticle.fulfilled, (state, action: PayloadAction<Article>) => {
        state.articles.push(action.payload);
      })
      .addCase(editArticle.fulfilled, (state, action: PayloadAction<Article>) => {
        const index = state.articles.findIndex((article) => article.id === action.payload.id);
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
      })
      .addCase(deleteArticle.fulfilled, (state, action: PayloadAction<number>) => {
        state.articles = state.articles.filter((article) => article.id !== action.payload);
      });
  }  
});

export const selectArticles = (state: RootState) => state.articles.articles;

export default articleSlice.reducer;

