// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // 선택적으로 전역 CSS 파일
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);