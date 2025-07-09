// src/components/CommentSection.js
import React, { useEffect, useState, useCallback } from 'react'; // useCallback 추가
import { Link } from 'react-router-dom'; // Link 임포트 추가
import { getRepliesByBoardId, createReply } from '../services/replyService';
import { getUsername } from '../utils/auth'; // auth.js에서 getUsername 임포트 경로 수정

function CommentSection({ boardId }) {
    const [replies, setReplies] = useState([]);
    const [newCommentContent, setNewCommentContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const currentUser = getUsername();

    const fetchReplies = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const response = await getRepliesByBoardId(boardId); // response는 Page 객체
            setReplies(response.content); // <--- 여기서 response.content를 사용하도록 수정
        } catch (err) {
            setError('댓글을 불러오는 데 실패했습니다.');
            console.error('댓글 불러오기 실패:', err);
        } finally {
            setLoading(false);
        }
    }, [boardId]);

    useEffect(() => {
        if (boardId) {
            fetchReplies();
        }
    }, [boardId, fetchReplies]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newCommentContent.trim()) {
            alert('댓글 내용을 입력해주세요.');
            return;
        }
        if (!currentUser) {
            alert('로그인 후 댓글을 작성할 수 있습니다.');
            return;
        }

        try {
            await createReply(boardId, { replyContent: newCommentContent });
            setNewCommentContent('');
            fetchReplies();
        } catch (err) {
            setError('댓글 작성에 실패했습니다.');
            console.error('댓글 작성 실패:', err);
            if (err.response && err.response.status === 401) {
                alert('로그인이 필요합니다.');
            }
        }
    };

    if (loading) return <div style={commentLoadingStyle}>댓글 로딩 중...</div>;
    if (error) return <div style={commentErrorStyle}>{error}</div>;

    return (
        <div style={commentSectionContainerStyle}>
            <h3>댓글</h3>
            {replies.length === 0 ? (
                <p style={noCommentsStyle}>아직 댓글이 없습니다. 첫 댓글을 작성해보세요!</p>
            ) : (
                <ul style={commentListStyle}>
                    {replies.map((reply) => (
                        <li key={reply.replyId} style={commentItemStyle}>
                            <div style={commentMetaStyle}>
                                <strong>{reply.replyAuthor}</strong>
                                <span style={commentDateStyle}>{new Date(reply.createdAt).toLocaleString()}</span>
                            </div>
                            <p style={commentContentStyle}>{reply.replyContent}</p>
                        </li>
                    ))}
                </ul>
            )}

            {currentUser ? (
                <form onSubmit={handleCommentSubmit} style={commentFormStyle}>
                    <textarea
                        style={commentTextareaStyle}
                        placeholder="댓글을 입력하세요..."
                        value={newCommentContent}
                        onChange={(e) => setNewCommentContent(e.target.value)}
                        rows="4"
                    ></textarea>
                    <button type="submit" style={commentSubmitButtonStyle}>댓글 작성</button>
                </form>
            ) : (
                <p style={loginPromptStyle}>댓글을 작성하려면 <Link to="/login" style={loginLinkStyle}>로그인</Link> 해주세요.</p>
            )}
        </div>
    );
}

// --- CommentSection Styles ---
const commentSectionContainerStyle = {
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid #eee',
};

const commentListStyle = {
    listStyle: 'none',
    padding: '0',
    margin: '0',
};

const commentItemStyle = {
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
};

const commentMetaStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    fontSize: '0.9em',
    color: '#555',
};

const commentDateStyle = {
    color: '#888',
    fontSize: '0.85em',
};

const commentContentStyle = {
    lineHeight: '1.5',
    color: '#333',
    whiteSpace: 'pre-wrap',
};

const noCommentsStyle = {
    textAlign: 'center',
    color: '#777',
    padding: '20px',
    border: '1px dashed #ddd',
    borderRadius: '5px',
    backgroundColor: '#f5f5f5',
};

const commentFormStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '25px',
    paddingTop: '20px',
    borderTop: '1px solid #eee',
};

const commentTextareaStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1em',
    resize: 'vertical',
    boxSizing: 'border-box',
};

const commentSubmitButtonStyle = {
    backgroundColor: '#007bff',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
    alignSelf: 'flex-end',
    transition: 'background-color 0.2s ease',
};

commentSubmitButtonStyle[':hover'] = {
    backgroundColor: '#0056b3',
};

const commentLoadingStyle = {
    textAlign: 'center',
    marginTop: '20px',
    color: '#555',
};

const commentErrorStyle = {
    textAlign: 'center',
    marginTop: '20px',
    color: 'red',
};

const loginPromptStyle = {
    textAlign: 'center',
    marginTop: '20px',
    padding: '15px',
    backgroundColor: '#ffeeba',
    border: '1px solid #ffc107',
    borderRadius: '5px',
    color: '#856404',
};

const loginLinkStyle = {
    color: '#007bff',
    fontWeight: 'bold',
    textDecoration: 'none',
};

export default CommentSection;
