// src/utils/auth.js
export const setToken = (token) => {
    localStorage.setItem('jwtToken', token);
};

export const getToken = () => {
    return localStorage.getItem('jwtToken');
};

export const removeToken = () => {
    localStorage.removeItem('jwtToken');
};

export const setUsername = (username) => {
    localStorage.setItem('username', username);
};

export const getUsername = () => {
    return localStorage.getItem('username');
};

export const removeUsername = () => {
    localStorage.removeItem('username');
};

export const setRole = (role) => {
    localStorage.setItem('role', role);
};

export const getRole = () => {
    return localStorage.getItem('role');
};

export const removeRole = () => {
    localStorage.removeItem('role');
};

export const isAuthenticated = () => {
    return !!getToken();
};


// --- 이 부분이 핵심 ---
export const logout = () => {
    removeToken();
    removeUsername();
    removeRole();
    // 필요하다면 추가적인 로그아웃 관련 로직 (예: 서버에 로그아웃 요청)
    console.log("Logged out successfully.");
};