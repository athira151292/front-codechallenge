import { createAsyncThunk } from '@reduxjs/toolkit';
import { addArticleApi, deleteArticleApi, editArticleApi, fetchArticleDetailsApi, fetchArticlesApi } from '../../api/articleApi';
import { Article } from '../../redux/articles/articlesSlice';

// fetching articles
export const fetchArticles = createAsyncThunk('articles/fetchArticles', async () => {
  const response = await fetchArticlesApi();
  return response;
});

// fetching an article
export const fetchArticleDetails = createAsyncThunk('articles/fetchArticleDetails', async (id: number) => {
  const response = await fetchArticleDetailsApi(id);
  return response;
});

// adding an article
export const addArticle = createAsyncThunk('articles/addArticle', async (article: Article) => {
  const response = await addArticleApi(article);
  return response;
});

// editing an article
export const editArticle = createAsyncThunk('articles/editArticle', async (article: Article) => {
  const response = await editArticleApi(article);
  return response;
});

// deleting an article
export const deleteArticle = createAsyncThunk('articles/deleteArticle', async (articleId: number) => {
  await deleteArticleApi(articleId);
  return articleId;
});
