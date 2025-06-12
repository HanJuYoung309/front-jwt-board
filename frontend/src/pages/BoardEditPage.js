// src/pages/BoardEditPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBoardById, updateBoard } from '../services/boardService';
import { getUsername } from '../utils/auth';

function BoardEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const currentUser = getUsername();

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const data = await getBoardById(id);
                if (data.author !== currentUser) {
                    alert('게시글 수정 권한이 없습니다.');
                    navigate(`/boards/${id}`);
                    return;
                }
                setTitle(data.title);
                setContent(data.content);
            } catch (err) {
                setError('게시글을 불러오는 데 실패했습니다.');
                console.error(err);
                if (err.response && err.response.status === 401) {
                    alert('로그인이 필요합니다.');
                    navigate('/login');
                } else if (err.response && err.response.status === 404) {
                    setError('게시글을 찾을 수 없습니다.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchBoard();
    }, [id, navigate, currentUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await updateBoard(id, title, content);
            alert('게시글이 수정되었습니다.');
            navigate(`/boards/${id}`);
        } catch (err) {
            setError(err.response?.data || '게시글 수정에 실패했습니다.');
            console.error(err);
            if (err.response && err.response.status === 401) {
                alert('로그인이 필요합니다.');
                navigate('/login');
            } else if (err.response && err.response.status === 403) {
                alert('수정 권한이 없습니다.');
            }
        }
    };

    if (loading) return <div style={loadingStyle}>게시글 로딩 중...</div>;
    if (error) return <div style={errorStyle}>{error}</div>;

    return (
        <div style={containerStyle}>
            <h2>게시글 수정</h2>
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
                <button type="submit" style={buttonStyle}>수정 완료</button>
                <button type="button" onClick={() => navigate(`/boards/${id}`)} style={{ ...buttonStyle, backgroundColor: '#6c757d', marginLeft: '10px' }}>취소</button>
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
    backgroundColor: '#007bff',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
};

const loadingStyle = {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '1.2em',
    color: '#555',
};

const errorStyle = {
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '1.2em',
    color: 'red',
};

export default BoardEditPage;