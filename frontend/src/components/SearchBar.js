// src/components/SearchBar.js
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지
        onSearch(searchTerm); // 부모 컴포넌트로 검색어 전달
    };

    return (
        <form onSubmit={handleSubmit} style={searchFormStyle}>
            <input
                type="text"
                placeholder="제목 또는 내용 검색..."
                value={searchTerm}
                onChange={handleChange}
                style={searchInputStyle}
            />
            <button type="submit" style={searchButtonStyle}>검색</button>
        </form>
    );
}

const searchFormStyle = {
    display: 'flex',
    marginBottom: '20px',
    gap: '10px',
};

const searchInputStyle = {
    flexGrow: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    fontSize: '1em',
};

const searchButtonStyle = {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '1em',
};

export default SearchBar;