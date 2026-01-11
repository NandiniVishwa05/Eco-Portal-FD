import api from "./apiClient";

export const fetchHeatmapPoints = async () => {
    const response = await api.get("/map/heatmap");
    return response.data.data;
};

export const fetchNearbyOrganizations = async ({ lat, lng }) => {
    const response = await api.post("/map/nearby-organizations", {
        lat,
        lng
    });
    return response.data.data;
};
