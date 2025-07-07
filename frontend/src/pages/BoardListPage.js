// src/pages/BoardListPage.js
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBoards } from '../services/boardService'; 
import SearchBar from '../components/SearchBar'; // SearchBar 컴포넌트 임포트

function BoardListPage() {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [keyword, setKeyword] = useState(''); // 검색어 상태 추가
    const navigate = useNavigate();

  
  useEffect(() => {
        const fetchBoards = async () => { // 더 이상 인자로 page, keyword를 받지 않아도 됩니다.
            try {
                setLoading(true);
                setError(''); // 새로운 fetch 전에 에러 초기화
                const response = await getBoards(page, 10, 'createdAt,desc', keyword); // 현재 state 값 사용
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

        fetchBoards(); // 함수 정의 후 호출
    }, [page, keyword, navigate]); // 의존성 배열에는 page, keyword, navigate만 유지

 const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };


    // SearchBar 컴포넌트에서 호출될 검색 핸들러
    const handleSearch = (searchTerm) => {
        setKeyword(searchTerm); // 검색어 상태 업데이트
        setPage(0); // 검색 시 첫 페이지로 이동
    };

    if (loading) return <div style={loadingStyle}>게시글 로딩 중...</div>;
    if (error) return <div style={errorStyle}>{error}</div>;

    return (
        <div style={containerStyle}>
            <h2>게시판</h2>
            <div style={topSectionStyle}>
                <Link to="/boards/write" style={writeButtonStyle}>글쓰기</Link>
                <SearchBar onSearch={handleSearch} /> {/* 검색창 추가 */}
            </div>
            
            {boards.length === 0 && !loading ? ( // 로딩 중이 아닐 때 게시글이 없으면 메시지 표시
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

// 스타일 정의 (기존 스타일 유지 및 새로운 스타일 추가)
const containerStyle = {
    maxWidth: '900px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    backgroundColor: '#f9f9f9',
};

const topSectionStyle = {
    display: 'flex',
    justifyContent: 'space-between', // 글쓰기 버튼과 검색창을 양쪽 끝으로 정렬
    alignItems: 'center',
    marginBottom: '20px',
};

const writeButtonStyle = {
    display: 'inline-block',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '8px 15px',
    borderRadius: '5px',
    textDecoration: 'none',
    // marginBottom: '20px', // topSectionStyle에서 margin 처리하므로 제거
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

// CSS-in-JS에서 가상 선택자 (hover)를 직접 사용하는 것은 제한적입니다.
// styled-components나 emotion 같은 라이브러리를 사용하거나, 별도의 CSS 파일을 사용하거나,
// React의 이벤트 핸들러를 이용해 스타일을 동적으로 변경해야 합니다.
// 여기서는 단순화를 위해 직접적인 :hover 스타일은 제거합니다.
// trStyle[':hover'] = {
//     backgroundColor: '#f1f1f1',
// };

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