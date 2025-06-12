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

export const getBoards = async (page = 0, size = 10, sort = 'createdAt,desc') => {
    try {
        const response = await axios.get(`${API_URL}?page=${page}&size=${size}&sort=${sort}`, getConfig());
        return response.data;
    } catch (error) {
        console.error('Get boards failed:', error);
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