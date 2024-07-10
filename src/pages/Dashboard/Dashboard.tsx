import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchArticles } from '../../redux/articles/articlesThunks';
import ArticleItem from '../../components/ArticleItem/ArticleItem';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ButtonWrap, DashboardWrap } from './Dashboard.styles';

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
        <DashboardWrap>
            <ButtonWrap>
                <Button variant="contained" onClick={addArticle}>Add article</Button>
            </ButtonWrap>
            <ul>
                {articles.map(article => {
                    return (
                        <ArticleItem key={article.id} article={article}></ArticleItem>
                    )
                })}
            </ul>
        </DashboardWrap>
    );
};

export default Dashboard;