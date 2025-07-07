// src/services/boardService.js
import axios from 'axios';
import { getToken } from '../utils/auth';

const API_URL = 'http://localhost:8080/api/boards';

const getConfig = () => {
    const token = getToken();
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

export const createBoard = async (title, content) => {
    try {
        const response = await axios.post(API_URL, { title, content }, getConfig());
        return response.data;
    } catch (error) {
        console.error('Create board failed:', error);
        throw error;
    }
};

export const getBoards = async (page = 0, size = 10, sort = 'createdAt,desc', keyword = '') => {
    try {
        let url = `${API_URL}?page=${page}&size=${size}&sort=${sort}`;

        // keyword가 존재하고 비어있지 않다면 URL에 추가
        if (keyword && keyword.trim() !== '') {
            url += `&keyword=${encodeURIComponent(keyword.trim())}`; // URL 인코딩 적용
        }

        const response = await axios.get(url, getConfig());
        return response.data; // 백엔드에서 Page<BoardResponse> 형태로 데이터가 반환될 것으로 예상
    } catch (error) {
        console.error('게시글 조회 실패:', error);
        throw error;
    }
};
export const getBoardById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`, getConfig());
        return response.data;
    } catch (error) {
        console.error('Get board by ID failed:', error);
        throw error;
    }
};

export const updateBoard = async (id, title, content) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, { title, content }, getConfig());
        return response.data;
    } catch (error) {
        console.error('Update board failed:', error);
        throw error;
    }
};

export const deleteBoard = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`, getConfig());
        return true;
    } catch (error) {
        console.error('Delete board failed:', error);
        throw error;
    }
};

