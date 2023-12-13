import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import LoginPage from './pages/login/loginPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element = {<App/>}/>
            <Route path='/login' element = {<LoginPage/>} />
        </Routes>
    </BrowserRouter>
 
);

