import React, { FC, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button, TextareaAutosize } from '@mui/material';
import { addArticle, editArticle } from '../../redux/articles/articlesThunks';
import { Article } from '../../redux/articles/articlesSlice';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import CreatableSelect from 'react-select/creatable';
import { tagOptions } from '../../constants';
import { InputGroup, Form, RequiredLabel } from './ArticleForm.styles';
import { ActionMeta, MultiValue } from 'react-select';

interface ArticleFormProps {
  article?: Article;
}

const initialFormData: Article = {
  id: 0,
  title: '',
  content: '',
  dateCreated: '',
  tags: [],
};

const ArticleForm: FC<ArticleFormProps> = ({ article }) => {
  const [formData, setFormData] = useState<Article>(initialFormData);
  const [errors, setErrors] = useState({ title: '', content: '' });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagsChange = (
    newValue: MultiValue<{ value: string; label: string }>,
    actionMeta: ActionMeta<{ value: string; label: string }>
  ) => {
    if (
      actionMeta.action === 'select-option' ||
      actionMeta.action === 'create-option' ||
      actionMeta.action === 'remove-value'
    ) {
      const tags = newValue.map((option) => option.value);
      setFormData({
        ...formData,
        tags: tags,
      });
    }
  };

  const validateForm = () => {
    const newErrors = { title: '', content: '' };
    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.content) newErrors.content = 'Content is required';
    setErrors(newErrors);
    return !newErrors.title && !newErrors.content;
  };

  const submitArticle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const newArticle: Article = {
      ...formData,
      dateCreated: currentDate,
    };

    if (formData.id === 0) {
      newArticle.id = Date.now();
      dispatch(addArticle(newArticle));
    } else {
      dispatch(editArticle(newArticle));
    }
    setFormData(initialFormData);
    navigate('/');
  };

  useEffect(() => {
    if (article) {
      setFormData(article);
    }
  }, [article]);

  return (
    <Form onSubmit={submitArticle}>
      <InputGroup>
        <RequiredLabel aria-labelledby='title'>Title</RequiredLabel>
        <TextField
          variant='outlined'
          name='title'
          id='title'
          onChange={handleInput}
          value={formData?.title}
          error={!!errors.title}
          inputProps={{ 'data-testid': 'title-input' }}
        />
      </InputGroup>
      <InputGroup>
        <RequiredLabel aria-labelledby='content'>Description</RequiredLabel>
        <TextareaAutosize
          name='content'
          id='content'
          minRows={3}
          onChange={handleInput}
          value={formData?.content}
          style={{ borderColor: errors.content ? '#b62906' : undefined }}
          data-testid='content-input'
        />
      </InputGroup>
      <InputGroup>
        <label>Tags</label>
        <CreatableSelect
          isMulti
          onChange={handleTagsChange}
          options={tagOptions}
          value={formData.tags.map((tag) => ({ value: tag, label: tag }))}
        />
      </InputGroup>
      <Button type='submit' variant='contained' data-testid='publish-button'>
        Publish
      </Button>
    </Form>
  );
};

export default ArticleForm;
