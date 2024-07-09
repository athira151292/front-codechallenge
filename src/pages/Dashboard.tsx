import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchArticles } from '../redux/articles/articlesThunks';
import AddArticle from '../components/AddArticle';
import ArticleItem from '../components/ArticleItem';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { articles } = useAppSelector(state => state.articles);
 
    const addArticle = () => {
        navigate('/add-article');
    }

    useEffect(() => {
        dispatch(fetchArticles());
      }, [dispatch]);

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={addArticle}>Add article</button>
            <ul>
                {articles.map(article => {
                    return (
                        <ArticleItem article={article}></ArticleItem>
                    )
                })}
            </ul>
        </div>
    );
};

export default Dashboard;