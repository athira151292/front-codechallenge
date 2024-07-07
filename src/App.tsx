import React, { useState } from 'react';
import Articles from './components/Articles';
import AddArticle from './components/AddArticle';
import './App.css';
import { FormData } from './types';

const App = () => {

  const [open, setOpen] = useState<boolean>(false);
  const [articles, setArticles] = useState<FormData[]>([]);

  const addArticle = () => {
    setOpen(true);
  }

  const handleArticleAdded = (article: FormData) => {
    setArticles([
      ...articles,
      article
    ]);
  }

  return (
    <div className="App">
      <header >
      </header>
      <div>
        <button onClick={addArticle}>Add article</button>
        <AddArticle open={open} articleAdded={handleArticleAdded} />
      </div>
      <Articles articles={articles} />
    </div>
  );
}

export default App;
