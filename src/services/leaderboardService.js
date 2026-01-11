import api from "./apiClient";

/**
 * Fetch government leaderboard
 */
export const fetchLeaderboardService = async () => {
    const response = await api.get("/leaderboard/get-leaderboard");
    return response.data.data;
};
