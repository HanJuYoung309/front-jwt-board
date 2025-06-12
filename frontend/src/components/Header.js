// src/components/Header.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, getUsername, logout } from '../utils/auth';

function Header() {
    const navigate = useNavigate();
    const isLoggedIn = isAuthenticated();
    const username = getUsername();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header style={headerStyle}>
            <nav style={navStyle}>
                <Link to="/" style={linkStyle}>홈</Link>
                <Link to="/boards" style={linkStyle}>게시판</Link>
                <div style={authButtonsStyle}>
                    {isLoggedIn ? (
                        <>
                            <span style={loggedInUserStyle}>{username}님 환영합니다!</span>
                            <button onClick={handleLogout} style={buttonStyle}>로그아웃</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={buttonStyle}>로그인</Link>
                            <Link to="/join" style={buttonStyle}>회원가입</Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

const headerStyle = {
    backgroundColor: '#333',
    padding: '10px 20px',
    color: 'white',
    textAlign: 'center',
};

const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
};

const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    margin: '0 10px',
    fontWeight: 'bold',
};

const authButtonsStyle = {
    display: 'flex',
    alignItems: 'center',
};

const loggedInUserStyle = {
    marginRight: '15px',
    fontSize: '0.9em',
};

const buttonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    marginLeft: '10px',
    fontSize: '0.9em',
};

export default Header;