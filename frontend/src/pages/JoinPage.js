// src/pages/JoinPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { join } from '../services/authService';

function JoinPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            await join(username, password);
            alert('회원가입 성공! 로그인 해주세요.');
            navigate('/login');
        } catch (err) {
            setError(err.response?.data || '회원가입 실패');
        }
    };

    return (
        <div style={containerStyle}>
            <h2>회원가입</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={formGroupStyle}>
                    <label htmlFor="username" style={labelStyle}>아이디:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="password" style={labelStyle}>비밀번호:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="confirmPassword" style={labelStyle}>비밀번호 확인:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                {error && <p style={errorStyle}>{error}</p>}
                <button type="submit" style={buttonStyle}>회원가입</button>
            </form>
        </div>
    );
}

const containerStyle = {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9',
};

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
};

const formGroupStyle = {
    marginBottom: '15px',
};

const labelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
};

const buttonStyle = {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
};

const errorStyle = {
    color: 'red',
    marginBottom: '10px',
};

export default JoinPage;