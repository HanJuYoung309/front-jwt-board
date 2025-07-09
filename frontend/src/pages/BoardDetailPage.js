// src/pages/BoardDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getBoardById, deleteBoard } from '../services/boardService';
import { getUsername } from '../utils/auth'; // 현재 로그인 사용자 이름 가져오기
import CommentSection from '../components/CommentSection'; // CommentSection 컴포넌트 임포트

function BoardDetailPage() {
    const { id } = useParams(); // URL 파라미터에서 게시글 ID 가져오기
    const navigate = useNavigate();
    const [board, setBoard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const currentUser = getUsername(); // 현재 로그인한 사용자 이름 (작성자 확인용)

    // 게시글 데이터 불러오기
    useEffect(() => {
        const fetchBoard = async () => {
            try {
                setLoading(true);
                setError(''); // 새로운 fetch 전에 에러 초기화
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
    }, [id, navigate]); // id와 navigate가 변경될 때마다 다시 실행

    // 게시글 삭제 핸들러
    const handleDelete = async () => {
        // alert 대신 커스텀 모달 또는 라이브러리를 사용하는 것이 좋습니다.
        if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
            try {
                await deleteBoard(id);
                alert('게시글이 삭제되었습니다.'); // alert 대신 사용자에게 피드백 제공
                navigate('/boards'); // 목록 페이지로 이동
            } catch (err) {
                setError('게시글 삭제에 실패했습니다.');
                console.error(err);
                if (err.response && err.response.status === 403) {
                    alert('삭제 권한이 없습니다.'); // alert 대신 사용자에게 피드백 제공
                }
            }
        }
    };

    // 로딩, 에러, 게시글 없음 상태 처리
    if (loading) return <div style={loadingStyle}>게시글 로딩 중...</div>;
    if (error) return <div style={errorStyle}>{error}</div>;
    if (!board) return <div style={errorStyle}>게시글을 찾을 수 없습니다.</div>;

    return (
        <div style={containerStyle}>
            {/* 게시글 내용 */}
            <h2>{board.title}</h2>
            <p style={metaStyle}>
                작성자: {board.author} | 작성일: {new Date(board.createdAt).toLocaleString()}
            </p>
            <div style={contentStyle}>{board.content}</div>

            {/* 게시글 액션 버튼 그룹 */}
            <div style={buttonGroupStyle}>
                <Link to="/boards" style={buttonStyle}>목록으로</Link>
                {/* 현재 로그인한 사용자가 게시글 작성자와 동일할 경우에만 수정/삭제 버튼 표시 */}
                {currentUser === board.author && (
                    <>
                        <Link to={`/boards/edit/${board.id}`} style={{ ...buttonStyle, backgroundColor: '#ffc107', color: '#333' }}>수정</Link>
                        <button onClick={handleDelete} style={{ ...buttonStyle, backgroundColor: '#dc3545' }}>삭제</button>
                    </>
                )}
            </div>

            {/* 댓글 섹션 추가 */}
            {/* board.id가 유효할 때만 CommentSection을 렌더링 */}
            {board.id && <CommentSection boardId={board.id} />}
        </div>
    );
}

// --- Styles (기존 스타일 유지) ---
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