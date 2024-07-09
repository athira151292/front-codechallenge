import React, { FC, useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { deleteArticle } from "../redux/articles/articlesThunks";
import { Article } from "../redux/articles/articlesSlice";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "./ConfirmationModal";

interface ArticleProps {
    article: Article;
}

const ArticleItem:FC<ArticleProps> = ({article}) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);

    const handleEdit = () => {
        navigate(`/edit-article/${article.id}`);
    };

    const handleDelete = () => {
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirmation = (confirmFlag: boolean) => {
        if (confirmFlag) {
            dispatch(deleteArticle(article.id));
        }
        setDeleteModalOpen(false);
    }

    const deleteConfirmation: JSX.Element = (
        <div>
            <h1>Delete Article</h1>
            <p>Are you sure you want to delete the article "{article.title}"?</p>
        </div>
    );

    return (
        <>
            <li key={article.id}>
                <h1>{article.title}</h1>
                <p>{article.content}</p>
                <span>{article.dateCreated}</span>
                <button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </li>
            <ConfirmationModal 
                open={deleteModalOpen} 
                modalContent={deleteConfirmation}
                actionConfirmed={handleDeleteConfirmation}
            />
        </>
    );
}

export default ArticleItem;