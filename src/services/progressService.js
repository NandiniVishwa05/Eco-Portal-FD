import api from "./apiClient";

export const getProgressData = async () => {
    const res = await api.get("/activity/progress");
    return res.data.data || [];
};
