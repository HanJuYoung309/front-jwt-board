// src/pages/BoardListPage.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBoards } from '../services/boardService';

function BoardListPage() {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                setLoading(true);
                const response = await getBoards(page);
                setBoards(response.content);
                setTotalPages(response.totalPages);
            } catch (err) {
                setError('게시글을 불러오는 데 실패했습니다.');
                console.error(err);
                if (err.response && err.response.status === 401) {
                    alert('로그인이 필요합니다.');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchBoards();
    }, [page, navigate]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    if (loading) return <div style={loadingStyle}>게시글 로딩 중...</div>;
    if (error) return <div style={errorStyle}>{error}</div>;

    return (
        <div style={containerStyle}>
            <h2>게시판</h2>
            <Link to="/boards/write" style={writeButtonStyle}>글쓰기</Link>
            {boards.length === 0 ? (
                <p>게시글이 없습니다.</p>
            ) : (
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>번호</th>
                            <th style={thStyle}>제목</th>
                            <th style={thStyle}>작성자</th>
                            <th style={thStyle}>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {boards.map((board) => (
                            <tr key={board.id} style={trStyle}>
                                <td style={tdStyle}>{board.id}</td>
                                <td style={tdStyle}>
                                    <Link to={`/boards/${board.id}`} style={linkStyle}>{board.title}</Link>
                                </td>
                                <td style={tdStyle}>{board.author}</td>
                                <td style={tdStyle}>{new Date(board.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <div style={paginationStyle}>
                <button onClick={() => handlePageChange(page - 1)} disabled={page === 0} style={pageButtonStyle}>이전</button>
                <span style={pageInfoStyle}>{page + 1} / {totalPages}</span>
                <button onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages - 1} style={pageButtonStyle}>다음</button>
            </div>
        </div>
    );
}

const containerStyle = {
    maxWidth: '900px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9',
};

const writeButtonStyle = {
    display: 'inline-block',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 15px',
    borderRadius: '5px',
    textDecoration: 'none',
    marginBottom: '20px',
};

const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
};

const thStyle = {
    border: '1px solid #ddd',
    padding: '10px',
    backgroundColor: '#e9e9e9',
    textAlign: 'left',
};

const tdStyle = {
    border: '1px solid #ddd',
    padding: '10px',
};

const trStyle = {
    transition: 'background-color 0.2s',
};

trStyle[':hover'] = {
    backgroundColor: '#f1f1f1',
};

const linkStyle = {
    textDecoration: 'none',
    color: '#007bff',
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

const paginationStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
};

const pageButtonStyle = {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '8px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    margin: '0 5px',
};

const pageInfoStyle = {
    margin: '0 10px',
    fontWeight: 'bold',
};

export default BoardListPage;