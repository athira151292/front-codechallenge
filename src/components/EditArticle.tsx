import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleDetails } from '../redux/articles/articlesThunks';
import ArticleForm from './ArticleForm';
import { Article } from '../redux/articles/articlesSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const EditArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchArticle = async () => {
      if (id) {
        try {
          const articleDetails = await dispatch(fetchArticleDetails(parseInt(id)));
          if (articleDetails.payload) {
            setArticle(articleDetails.payload as Article);
          }
        } catch (error) {
          console.error('Failed to fetch article details:', error);
        }
      }
    };

    fetchArticle();

  }, [id, dispatch]);


  return (
    <div>
      {article &&
        <ArticleForm article={article} />
      }
    </div>
  );
};

export default EditArticle;
