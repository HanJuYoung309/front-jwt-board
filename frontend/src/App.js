// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import JoinPage from './pages/JoinPage';
import BoardListPage from './pages/BoardListPage';
import BoardDetailPage from './pages/BoardDetailPage';
import BoardWritePage from './pages/BoardWritePage';
import BoardEditPage from './pages/BoardEditPage';

function App() {
    return (
        <Router>
            <Header />
            <main style={mainStyle}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/join" element={<JoinPage />} />

                    {/* Private Routes */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/boards" element={<BoardListPage />} />
                        <Route path="/boards/write" element={<BoardWritePage />} />
                        <Route path="/boards/:id" element={<BoardDetailPage />} />
                        <Route path="/boards/edit/:id" element={<BoardEditPage />} />
                    </Route>

                    {/* Fallback for unmatched routes */}
                    <Route path="*" element={<h2>페이지를 찾을 수 없습니다.</h2>} />
                </Routes>
            </main>
        </Router>
    );
}

const mainStyle = {
    padding: '20px',
};

export default App;