import React, { FC } from "react";
import { Button } from '@mui/base';
import { FormData } from "../types";

interface ArticleProps {
    article: FormData;
}

const Article:FC<ArticleProps> = ({article}) => {

    const editArticle = () => {
        
    }

    return (
        <li>
            <h2>{article.title}</h2>
            <p>{article.desc}</p>{article.dateCreated}
            <span></span>
            <Button onClick={editArticle}>Edit</Button>
        </li>
    );
}

export default Article;