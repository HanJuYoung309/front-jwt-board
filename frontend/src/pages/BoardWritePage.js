// src/pages/BoardWritePage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBoard } from '../services/boardService';

function BoardWritePage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const newBoard = await createBoard(title, content);
            alert('게시글이 작성되었습니다.');
            navigate(`/boards/${newBoard.id}`);
        } catch (err) {
            setError(err.response?.data || '게시글 작성에 실패했습니다.');
            console.error(err);
            if (err.response && err.response.status === 401) {
                alert('로그인이 필요합니다.');
                navigate('/login');
            }
        }
    };

    return (
        <div style={containerStyle}>
            <h2>새 게시글 작성</h2>
            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={formGroupStyle}>
                    <label htmlFor="title" style={labelStyle}>제목:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label htmlFor="content" style={labelStyle}>내용:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        rows="10"
                        style={textareaStyle}
                    />
                </div>
                {error && <p style={errorStyle}>{error}</p>}
                <button type="submit" style={buttonStyle}>작성 완료</button>
                <button type="button" onClick={() => navigate('/boards')} style={{ ...buttonStyle, backgroundColor: '#6c757d', marginLeft: '10px' }}>취소</button>
            </form>
        </div>
    );
}

const containerStyle = {
    maxWidth: '700px',
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

const textareaStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
    resize: 'vertical',
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

export default BoardWritePage;