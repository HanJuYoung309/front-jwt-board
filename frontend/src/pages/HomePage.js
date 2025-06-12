// src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div style={containerStyle}>
            <h2>환영합니다!</h2>
            <p>이곳은 Spring Boot와 React를 이용한 게시판 애플리케이션입니다.</p>
            <p>
                <Link to="/boards" style={linkStyle}>게시판으로 이동</Link>
            </p>
        </div>
    );
}

const containerStyle = {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'center',
};

const linkStyle = {
    display: 'inline-block',
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '5px',
};

export default HomePage;