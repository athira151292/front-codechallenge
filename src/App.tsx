import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddArticle from './pages/AddArticle';
import EditArticle from './pages/EditArticle';

const App = () => {

  return (
    <>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-article" element={<AddArticle />} />
            <Route path="/edit-article/:id" element={<EditArticle />} />
          </Routes>
        </div>
    </Router>
    </>
  );
}

export default App;
