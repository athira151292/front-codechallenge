import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { LoginPageWrap } from './LoginPage.styles';

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = () => {
        login();
        navigate("/");
    };

    return (
        <LoginPageWrap>
            <Button variant="contained" onClick={handleLogin}>Login</Button>
        </LoginPageWrap>
    );
};

export default LoginPage;
