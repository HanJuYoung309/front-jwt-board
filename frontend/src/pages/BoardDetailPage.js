// src/pages/BoardDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBoardById, deleteBoard } from '../services/boardService';
import { getUsername } from '../utils/auth';

function BoardDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const currentUser = getUsername();

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                setLoading(true);
                const data = await getBoardById(id);
                setBoard(data);
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
    }, [id, navigate]);

    const handleDelete = async () => {
        if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
            try {
                await deleteBoard(id);
                alert('게시글이 삭제되었습니다.');
                navigate('/boards');
            } catch (err) {
                setError('게시글 삭제에 실패했습니다.');
                console.error(err);
                if (err.response && err.response.status === 403) {
                    alert('삭제 권한이 없습니다.');
                }
            }
        }
    };

    if (loading) return <div style={loadingStyle}>게시글 로딩 중...</div>;
    if (error) return <div style={errorStyle}>{error}</div>;
    if (!board) return <div style={errorStyle}>게시글을 찾을 수 없습니다.</div>;

    return (
        <div style={containerStyle}>
            <h2>{board.title}</h2>
            <p style={metaStyle}>
                작성자: {board.author} | 작성일: {new Date(board.createdAt).toLocaleString()}
            </p>
            <div style={contentStyle}>{board.content}</div>
            <div style={buttonGroupStyle}>
                <Link to="/boards" style={buttonStyle}>목록으로</Link>
                {currentUser === board.author && (
                    <>
                        <Link to={`/boards/edit/${board.id}`} style={{ ...buttonStyle, backgroundColor: '#ffc107', color: '#333' }}>수정</Link>
                        <button onClick={handleDelete} style={{ ...buttonStyle, backgroundColor: '#dc3545' }}>삭제</button>
                    </>
                )}
            </div>
        </div>
    );
}

const containerStyle = {
    maxWidth: '800px',
    margin: '50px auto',
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9',
};

const metaStyle = {
    fontSize: '0.9em',
    color: '#666',
    marginBottom: '20px',
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
};

const contentStyle = {
    padding: '20px',
    backgroundColor: 'white',
    border: '1px solid #eee',
    borderRadius: '5px',
    minHeight: '200px',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap', // 줄바꿈, 공백 유지
    marginBottom: '30px',
};

const buttonGroupStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
};

const buttonStyle = {
    backgroundColor: '#6c757d',
    color: 'white',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '0.9em',
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

export default BoardDetailPage;