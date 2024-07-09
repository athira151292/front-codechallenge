import React, { FC } from "react";
import { useAppDispatch } from "../app/hooks";
import { deleteArticle } from "../redux/articles/articlesThunks";
import { Article } from "../redux/articles/articlesSlice";
import { useNavigate } from "react-router-dom";

interface ArticleProps {
    article: Article;
}

const ArticleItem:FC<ArticleProps> = ({article}) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit-article/${article.id}`);
    };

    const handleDelete = () => {
        dispatch(deleteArticle(article.id));
    };

    return (
        <li key={article.id}>
            <h1>{article.title}</h1>
            <p>{article.content}</p>
            <span>{article.dateCreated}</span>
            <button onClick={handleEdit}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
}

export default ArticleItem;