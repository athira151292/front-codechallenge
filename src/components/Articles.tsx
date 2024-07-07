import React, { FC } from "react";
import { FormData } from "../types";
import Article from "./Article";

interface ArticlesProps {
    articles: FormData[];
}

const Articles:FC<ArticlesProps> = ({articles}) => {

    return (
        <ul>
            {articles.map(item => {
                return (
                    <Article article={item} />
                )
            })}
        </ul>
    );
}

export default Articles;