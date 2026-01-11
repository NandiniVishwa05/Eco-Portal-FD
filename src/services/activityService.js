import api from "./apiClient";

export const getBuyerActivities = async () => {
    const res = await api.get("/activity/buyer");
    return res.data.data;
};

export const getSellerActivities = async () => {
    const res = await api.get("/activity/seller");
    return res.data.data;
};

export const getAllActivities = async () => {
    const res = await api.get("/activity/all-activity");
    return res.data.data;
};

export const getActivityAnalytics = async () => {
    const res = await api.get("/activity/get-analytics");
    return res.data.data;
};

export const getOverview = async () => {
    const res = await api.get("/activity/get-overview");
    return res.data.data;
};
