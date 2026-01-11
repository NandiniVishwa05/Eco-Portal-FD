import api from "./apiClient";

export const getAvailableReports = async () => {
    const res = await api.get("/report/get_reports");
    console.log(res);
    
    return res.data.Reports;
};