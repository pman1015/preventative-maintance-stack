import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import LoginPage from './pages/login/loginPage';
import DashboardPage from './pages/dashboard/dashboard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element = {<LoginPage/>} />
            <Route path='/dashboard' element = {<DashboardPage/>} />
        </Routes>
    </BrowserRouter>
 
);

