import React, { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddArticle from './pages/AddArticlePage';
import EditArticle from './pages/EditArticlePage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage'; 

const App:FC = () => {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-article" element={<AddArticle />} />
            <Route path="/edit-article/:id" element={<EditArticle />} />
          </Route>
        </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
