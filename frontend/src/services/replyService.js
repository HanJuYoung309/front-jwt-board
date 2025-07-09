// src/services/replyService.js
import axios from 'axios';
import { getToken } from '../utils/auth';
// API 기본 URL (실제 백엔드 API URL로 변경해주세요)
const API_URL = 'http://localhost:8080/api/boards'; // 게시글 API 기본 경로

// 요청 헤더에 JWT 토큰을 포함시키는 함수 (인증이 필요한 경우)
const getConfig = () => {
    const token = getToken(); // 로컬 스토리지 등에서 토큰 가져오기
    return {
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        }
    };
};

/**
 * 특정 게시글의 댓글 목록을 조회합니다.
 * @param {string} boardId - 댓글을 조회할 게시글의 ID.
 * @returns {Promise<Array>} - 댓글 목록 (ReplyResponse DTO 배열).
 */
export const getRepliesByBoardId = async (boardId) => {
    try {
        // 백엔드 API 경로: /api/boards/{boardId}/replies
        const response = await axios.get(`${API_URL}/${boardId}/replies`, getConfig());
        return response.data; // List<ReplyResponse> 형태의 데이터가 반환될 것으로 예상
    } catch (error) {
        console.error(`게시글 ${boardId}의 댓글 조회 실패:`, error);
        throw error;
    }
};

/**
 * 특정 게시글에 새로운 댓글을 작성합니다.
 * @param {string} boardId - 댓글을 작성할 게시글의 ID.
 * @param {object} replyRequest - 댓글 내용을 담은 객체 ({ replyContent: "내용" }).
 * @returns {Promise<object>} - 생성된 댓글 정보 (ReplyResponse DTO).
 */
export const createReply = async (boardId, replyRequest) => {
    try {
        // 백엔드 API 경로: /api/boards/{boardId}/replies
        const response = await axios.post(`${API_URL}/${boardId}/replies`, replyRequest, getConfig());
        return response.data; // ReplyResponse 형태의 데이터가 반환될 것으로 예상
    } catch (error) {
        console.error(`게시글 ${boardId}에 댓글 작성 실패:`, error);
        throw error;
    }
};
