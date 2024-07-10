import React, { FC, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { deleteArticle } from '../../redux/articles/articlesThunks';
import { Article } from '../../redux/articles/articlesSlice';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ListItem, DateCreated, Tag, ActionButton } from './ArticleItem.styles';

interface ArticleProps {
  article: Article;
}

const ArticleItem: FC<ArticleProps> = ({ article }) => {
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
  };

  const deleteConfirmation: JSX.Element = (
    <div>
      <h1>Delete Article</h1>
      <p>Are you sure you want to delete the article "{article.title}"?</p>
    </div>
  );

  return (
    <>
      <ListItem key={article.id} data-testid='list-item'>
        <div>
          <h1>{article.title}</h1>
          <p>{article.content}</p>
          <DateCreated>{article.dateCreated}</DateCreated>
          <div>{article?.tags?.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
        </div>
        <div>
          <ActionButton
            onClick={handleEdit}
            title='Edit'
            data-testid='edit-button'
          >
            <EditIcon></EditIcon>
          </ActionButton>
          <ActionButton
            onClick={handleDelete}
            title='Delete'
            data-testid='delete-button'
          >
            <DeleteIcon></DeleteIcon>
          </ActionButton>
        </div>
      </ListItem>
      <ConfirmationModal
        open={deleteModalOpen}
        modalContent={deleteConfirmation}
        actionConfirmed={handleDeleteConfirmation}
      />
    </>
  );
};

export default ArticleItem;
