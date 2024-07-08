import React, { FC } from "react";
import { Button } from '@mui/base';
import { Article } from "../types";

interface ArticleProps {
    article: Article;
}

const Article:FC<ArticleProps> = ({article}) => {

    const editArticle = () => {
        
    }

    return (
        <li>
            <h2>{article.title}</h2>
            <p>{article.content}</p>{article.dateCreated}
            <span></span>
            
             
        </li>
    );
}

export default Article;