import axios from "axios";
import { store } from '../app/store'
import { logout } from "../features/auth/authSlice";

let hasShownSessionAlert = false; // 🔥 prevents infinite alert

const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL,
    withCredentials: true
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;
        const requestUrl = error?.config?.url || "";

        if (status === 401) {
            // Always clear auth
            store.dispatch(logout());

            // 🔕 SILENT for auth bootstrap / public endpoints
            if (
                requestUrl.includes("/auth/user-info") ||
                requestUrl.includes("/auth/signin") ||
                requestUrl.includes("/auth/signup")
            ) {
                return Promise.reject(error);
            }

            // 🔔 Show alert ONLY ONCE
            if (!hasShownSessionAlert) {
                hasShownSessionAlert = true;
                alert("Your session has expired. Please sign in again.");
            }

            // Redirect safely
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default api;
