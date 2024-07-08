import React, { FC, useState, useEffect } from "react";
import { getArticles, deleteArticle, Article } from '../api/mockApi';

const ArticleList:FC = () => {

    const [articles, setArticles] = useState<Article[]>([]);

    const handleEdit = () => {
        
    }

    const handleDelete = async (id: string) => {
        await deleteArticle(id);
        setArticles(articles.filter((article) => article.id !== id));
      };    

    useEffect(() => {
        const fetchArticles = async () => {
          const data = await getArticles();
          setArticles(data);
        };
        fetchArticles();
    }, []);

    return (
        <ul>
            {articles.map(article => {
                return (
                    <li key={article.title}>
                        <h1>{article.title}</h1>
                        <p>{article.content}</p>
                        <span>{article.dateCreated}</span>
                        <button onClick={handleEdit}>Edit</button>
                        <button onClick={() => handleDelete(article.id)}>Delete</button>
                    </li>
                )
            })}
        </ul>
    );
}

export default ArticleList;