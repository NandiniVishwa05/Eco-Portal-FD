import api from "./apiClient"; // same axios instance you use elsewhere

export const getAvailableRewards = async () => {
    const res = await api.get("/reward/get_available_rewards");
    return res.data.rewards;
};

export const getCreatedRewardsByUser = async () => {
    const res = await api.get("/reward/get_created_rewards_by_user");
    return res.data.data;
};

export const getRewardHistoryForUser = async () => {
    const res = await api.get("/reward/get_rewards_history_for_user");
    return res.data.rewards;
};

export const redeemReward = async (rewardId) => {
    const res = await api.get(`/reward/redeem_reward/${rewardId}`);
    return res.data;
};

export const createReward = async (payload) => {
    const res = await api.post("/reward/create_reward", payload);
    return res.data;
};
