import React, { useState } from 'react';
import ArticleList from '../components/ArticleList';
import AddArticle from '../components/AddArticle';

const Dashboard: React.FC = () => {

    const [openAddArticle, setOpenAddArticle] = useState<boolean>(false);

    const addArticle = () => {
        setOpenAddArticle(true);
    }

    return (
        <div>
        <h1>Dashboard</h1>
        <button onClick={addArticle}>Add article</button>
        <AddArticle open={openAddArticle} />
        <ArticleList />
        </div>
    );
};

export default Dashboard;