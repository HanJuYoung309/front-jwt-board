// src/services/authService.js
import axios from 'axios';
import { setToken, setUsername, setRole, removeToken, removeUsername, removeRole } from '../utils/auth';

const API_URL = 'http://localhost:8080/api/auth';

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        const { token, username: user, role } = response.data;
        setToken(token);
        setUsername(user);
        setRole(role);
        return true;
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};

export const join = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/join`, { username, password });
        return response.data;
    } catch (error) {
        console.error('Join failed:', error);
        throw error;
    }
};

export const logout = () => {
    removeToken();
    removeUsername();
    removeRole();
};